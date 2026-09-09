import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { Readable } from "stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function createOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";

  for (let i = 0; i < 6; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }

  return `NOVA80-${random}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const photo = formData.get("photo");
    const name = String(formData.get("name") || "");
    const whatsapp = String(formData.get("whatsapp") || "");
    const address = String(formData.get("address") || "");
    const pincode = String(formData.get("pincode") || "");

    const frameSize = String(formData.get("frameSize") || "");
    const framePrice = Number(formData.get("framePrice") || 0);

    const aiEditing =
      String(formData.get("aiEditing")) === "true";

    const aiEditingPrice = Number(
      formData.get("aiEditingPrice") || 0
    );

    const courierPrice = Number(
      formData.get("courierPrice") || 60
    );

    const total = Number(
      formData.get("total") || 0
    );

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!(photo instanceof File)) {
      return NextResponse.json(
        { error: "Photo is required." },
        { status: 400 }
      );
    }

    if (
      !name ||
      !whatsapp ||
      !address ||
      !/^\d{6}$/.test(pincode)
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all customer details.",
        },
        { status: 400 }
      );
    }

    if (!frameSize || framePrice <= 0) {
      return NextResponse.json(
        {
          error:
            "Please select a frame size.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // CREATE ORDER ID
    // -----------------------------

    const orderId = createOrderId();

    const photoBuffer = Buffer.from(
      await photo.arrayBuffer()
    );

    // -----------------------------
    // GOOGLE OAUTH
    // -----------------------------

    const clientId =
      process.env.GOOGLE_CLIENT_ID;

    const clientSecret =
      process.env.GOOGLE_CLIENT_SECRET;

    const refreshToken =
      process.env.GOOGLE_REFRESH_TOKEN;

    if (
      !clientId ||
      !clientSecret ||
      !refreshToken
    ) {
      throw new Error(
        "Google OAuth environment variables are missing."
      );
    }

    const oauth2Client =
      new google.auth.OAuth2(
        clientId,
        clientSecret
      );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    // -----------------------------
    // GOOGLE DRIVE
    // -----------------------------

    const driveFolderId =
      process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!driveFolderId) {
      throw new Error(
        "GOOGLE_DRIVE_FOLDER_ID is missing."
      );
    }

    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });

    const safeName = name.replace(
      /[^a-zA-Z0-9-_]/g,
      "_"
    );

    const driveResponse =
      await drive.files.create({
        requestBody: {
          name: `${orderId}-${safeName}.jpg`,
          parents: [driveFolderId],
        },

        media: {
          mimeType: "image/jpeg",
          body: Readable.from(photoBuffer),
        },

        fields: "id,name,webViewLink",
      });

    const driveFileId =
      driveResponse.data.id;

    if (!driveFileId) {
      throw new Error(
        "Google Drive did not return a file ID."
      );
    }

    const fileInfo =
      await drive.files.get({
        fileId: driveFileId,
        fields: "webViewLink",
      });

    const driveLink =
      fileInfo.data.webViewLink || "";

    // -----------------------------
    // EMAIL CONFIGURATION
    // -----------------------------

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.ORDER_EMAIL_TO
    ) {
      throw new Error(
        "SMTP email settings are missing."
      );
    }

    const transporter =
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,

        port: Number(
          process.env.SMTP_PORT || 465
        ),

        secure:
          process.env.SMTP_SECURE !==
          "false",

        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

    await transporter.verify();

    // -----------------------------
    // ORDER TIME
    // -----------------------------

    const submittedAt =
      new Date().toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        }
      );

    // -----------------------------
    // SEND ORDER EMAIL
    // -----------------------------

    await transporter.sendMail({
      from:
        process.env.ORDER_EMAIL_FROM ||
        process.env.SMTP_USER,

      to: process.env.ORDER_EMAIL_TO,

      subject:
        `New Frame Your 80's Order - ${orderId}`,

      text: `
NEW FRAME YOUR 80's ORDER

Order ID: ${orderId}

CUSTOMER
Name: ${name}
WhatsApp: ${whatsapp}

DELIVERY ADDRESS
${address}
Pincode: ${pincode}

ORDER
Frame: ${frameSize}
Frame Cost: ₹${framePrice}
AI Editing: ${aiEditing ? "Yes" : "No"}
AI Editing Cost: ₹${aiEditingPrice}
Courier: ₹${courierPrice}

TOTAL: ₹${total}

PHOTO
${driveLink}

Order Time:
${submittedAt}
      `.trim(),

      html: `
        <h2>New Frame Your 80's Order</h2>

        <p>
          <strong>Order ID:</strong>
          ${escapeHtml(orderId)}
        </p>

        <h3>Customer</h3>

        <p>
          <strong>Name:</strong>
          ${escapeHtml(name)}
          <br>
          <strong>WhatsApp:</strong>
          ${escapeHtml(whatsapp)}
        </p>

        <h3>Delivery Address</h3>

        <p>
          ${escapeHtml(address).replace(
            /\n/g,
            "<br>"
          )}
          <br>
          <strong>Pincode:</strong>
          ${escapeHtml(pincode)}
        </p>

        <h3>Order</h3>

        <p>
          <strong>Frame:</strong>
          ${escapeHtml(frameSize)}
          <br>
          <strong>Frame Cost:</strong>
          ₹${framePrice}
          <br>
          <strong>AI Editing:</strong>
          ${aiEditing ? "Yes" : "No"}
          <br>
          <strong>AI Editing Cost:</strong>
          ₹${aiEditingPrice}
          <br>
          <strong>Courier:</strong>
          ₹${courierPrice}
          <br>
          <strong>Total:</strong>
          ₹${total}
        </p>

        <h3>Customer Photo</h3>

        <p>
          <a
            href="${escapeHtml(driveLink)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Customer Photo in Google Drive
          </a>
        </p>

        <p>
          <strong>Order Time:</strong>
          ${escapeHtml(submittedAt)}
        </p>
      `,
    });

    // -----------------------------
    // SUCCESS
    // -----------------------------

    return NextResponse.json({
      success: true,
      orderId,
      driveLink,
    });

  } catch (error) {
    console.error(
      "FRAME YOUR 80s ORDER ERROR:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unknown server error.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}