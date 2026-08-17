import fs from "fs";
import path from "path";
import InvitationGallery from "@/components/InvitationGallery";

const supportedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
];

export default function InvitationsPage() {
  const invitationsDirectory = path.join(
    process.cwd(),
    "public",
    "invitations"
  );

  let images: string[] = [];

  if (fs.existsSync(invitationsDirectory)) {
    images = fs
      .readdirSync(invitationsDirectory)
      .filter((file) =>
        supportedExtensions.includes(
          path.extname(file).toLowerCase()
        )
      )
      .sort((a, b) =>
        a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      )
      .map(
        (file) =>
          `/invitations/${encodeURIComponent(file)}`
      );
  }

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="px-5 pb-12 pt-28 md:px-10 md:pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Nova Creative Hub
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Wedding Invitations
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 opacity-70 md:text-lg">
              Explore our collection of beautiful wedding
              invitation designs. Select a design to view it
              in full size.
            </p>
          </div>

          {/* Invitation Gallery */}
          <InvitationGallery images={images} />

        </div>
      </section>
    </main>
  );
}