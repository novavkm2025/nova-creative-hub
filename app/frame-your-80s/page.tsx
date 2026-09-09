// app/frame-your-80s/page.tsx

"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

const FRAME_OPTIONS = [
  { id: "6x4", label: "6 × 4 inch", price: 80 },
  { id: "8x6", label: "8 × 6 inch", price: 140 },
  { id: "12x8", label: "12 × 8 inch", price: 220 },
];

const AI_EDITING_PRICE = 50;
const COURIER_PRICE = 60;
const WHATSAPP_NUMBER = "919048842580";

export default function FrameYour80sPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [frame, setFrame] = useState(FRAME_OPTIONS[0]);
  const [aiEditing, setAiEditing] = useState(false);

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const total = useMemo(
    () =>
      frame.price +
      (aiEditing ? AI_EDITING_PRICE : 0) +
      COURIER_PRICE,
    [frame, aiEditing]
  );

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError("Photo must be smaller than 15 MB.");
      return;
    }

    setError("");
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  }

  async function compressImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        const maxSize = 2200;

        let width = img.width;
        let height = img.height;

        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height / width) * maxSize);
            width = maxSize;
          } else {
            width = Math.round((width / height) * maxSize);
            height = maxSize;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error("Unable to process image."));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);

            if (!blob) {
              reject(new Error("Unable to process image."));
              return;
            }

            resolve(
              new File([blob], "customer-photo.jpg", {
                type: "image/jpeg",
              })
            );
          },
          "image/jpeg",
          0.88
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Unable to process image."));
      };

      img.src = url;
    });
  }

  async function submitOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!photo) {
      setError("Please upload your photo.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!whatsapp.trim()) {
      setError("Please enter your WhatsApp number.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const compressedPhoto = await compressImage(photo);

      const formData = new FormData();

      formData.append("photo", compressedPhoto);
      formData.append("name", name.trim());
      formData.append("whatsapp", whatsapp.trim());
      formData.append("address", address.trim());
      formData.append("pincode", pincode.trim());
      formData.append("frameSize", frame.label);
      formData.append("framePrice", String(frame.price));
      formData.append("aiEditing", String(aiEditing));
      formData.append("aiEditingPrice", String(aiEditing ? AI_EDITING_PRICE : 0));
      formData.append("courierPrice", String(COURIER_PRICE));
      formData.append("total", String(total));

      const response = await fetch("/api/frame-your-80s/order", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to place order.");
      }

      setOrderId(result.orderId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    const message = `Hi, I have completed my order ID "${orderId}". Please let me know after completing the order and send me the payment details/QR.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  if (orderId) {
    return (
      <main className="min-h-screen bg-neutral-950 px-5 py-10 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-white/10 bg-white/[0.06] p-7 text-center shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-black">
              ✓
            </div>

            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/50">
              Order received
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Thank You!
            </h1>

            <p className="mt-4 text-white/70">
              Your order has been submitted successfully.
            </p>

            <div className="my-7 rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-widest text-white/40">
                Order ID
              </p>
              <p className="mt-2 text-2xl font-bold tracking-wider">
                {orderId}
              </p>
            </div>

            <p className="mb-6 text-sm leading-6 text-white/60">
              Continue to WhatsApp and send your order ID. We will contact you
              with the payment details / QR code.
            </p>

            <button
              onClick={openWhatsApp}
              className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-white/90"
            >
              Continue to WhatsApp
            </button>

            <a
              href="/"
              className="mt-5 block text-sm text-white/50 hover:text-white"
            >
              Back to Nova Creative Hub
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            Nova Creative Hub
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            FRAME YOUR <span className="italic">80&apos;s</span>
          </h1>

          <p className="mt-3 text-lg text-white/60">
            Turn your favourite 80&apos;s photo into a beautiful framed memory.
          </p>
        </div>

        <form onSubmit={submitOrder} className="space-y-5">
          {/* PHOTO */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest text-white/40">
                Step 01
              </p>
              <h2 className="mt-1 text-xl font-bold">Upload your photo</h2>
            </div>

            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhoto}
                className="hidden"
              />

              <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/20 bg-black/30">
                {preview ? (
                  <img
                    src={preview}
                    alt="Photo preview"
                    className="max-h-80 w-full object-contain"
                  />
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto mb-4 text-4xl">📸</div>
                    <p className="font-semibold">
                      Click to upload your photo
                    </p>
                    <p className="mt-2 text-sm text-white/40">
                      JPG, PNG or WEBP
                    </p>
                  </div>
                )}
              </div>
            </label>

            {photo && (
              <p className="mt-3 truncate text-sm text-white/50">
                {photo.name}
              </p>
            )}
          </section>

          {/* FRAME */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest text-white/40">
                Step 02
              </p>
              <h2 className="mt-1 text-xl font-bold">Choose your frame</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {FRAME_OPTIONS.map((option) => {
                const selected = frame.id === option.id;

                return (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => setFrame(option)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      selected
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-black/20 hover:border-white/30"
                    }`}
                  >
                    <div className="text-lg font-bold">{option.label}</div>
                    <div
                      className={`mt-2 text-2xl font-black ${
                        selected ? "text-black" : "text-white"
                      }`}
                    >
                      ₹{option.price}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-white/40">
              Black frame with matte lamination.
            </p>
          </section>

          {/* AI */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest text-white/40">
                Step 03
              </p>
              <h2 className="mt-1 text-xl font-bold">AI editing</h2>
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div>
                <p className="font-semibold">I need AI editing</p>
                <p className="mt-1 text-sm text-white/45">
                  AI editing charges extra ₹50
                </p>
              </div>

              <input
                type="checkbox"
                checked={aiEditing}
                onChange={(e) => setAiEditing(e.target.checked)}
                className="h-6 w-6 accent-black"
              />
            </label>
          </section>

          {/* DETAILS */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest text-white/40">
                Step 04
              </p>
              <h2 className="mt-1 text-xl font-bold">Your details</h2>
            </div>

            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none placeholder:text-white/30 focus:border-white/40"
              />

              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp number"
                inputMode="tel"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none placeholder:text-white/30 focus:border-white/40"
              />

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Complete delivery address"
                rows={4}
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none placeholder:text-white/30 focus:border-white/40"
              />

              <input
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Pincode"
                inputMode="numeric"
                maxLength={6}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none placeholder:text-white/30 focus:border-white/40"
              />
            </div>
          </section>

          {/* SUMMARY */}
          <section className="rounded-3xl border border-white/10 bg-white p-5 text-black sm:p-7">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest text-black/40">
                Order summary
              </p>
              <h2 className="mt-1 text-xl font-bold">Your order</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span>{frame.label} frame</span>
                <span>₹{frame.price}</span>
              </div>

              {aiEditing && (
                <div className="flex justify-between gap-4">
                  <span>AI editing</span>
                  <span>₹{AI_EDITING_PRICE}</span>
                </div>
              )}

              <div className="flex justify-between gap-4">
                <span>Courier</span>
                <span>₹{COURIER_PRICE}</span>
              </div>

              <div className="my-4 border-t border-black/10" />

              <div className="flex justify-between gap-4 text-xl font-black">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </section>

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white px-6 py-5 text-lg font-black text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting Order..." : `Submit Order • ₹${total}`}
          </button>

          <p className="pb-8 text-center text-xs leading-5 text-white/35">
            Payment details will be sent manually through WhatsApp after your
            order is received.
          </p>
        </form>
      </div>
    </main>
  );
}