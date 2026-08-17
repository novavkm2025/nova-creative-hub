"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface InvitationGalleryProps {
  images: string[];
}

const whatsappNumber = "919048842580";

export default function InvitationGallery({
  images,
}: InvitationGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sendWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi Nova Creative Hub, I am interested in a wedding invitation design. I have attached the screenshot of the design I selected."
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
        <p className="text-gray-500">
          No invitation designs found.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Add images to the public/invitations folder.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery */}
      <div className="invitation-gallery">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="invitation-card group"
            aria-label={`View invitation ${index + 1}`}
          >
            <Image
              src={image}
              alt={`Wedding invitation design ${index + 1}`}
              width={900}
              height={1200}
              className="invitation-image"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            <div className="invitation-overlay">
              <span>View Design</span>
            </div>
          </button>
        ))}
      </div>

      {/* Full-screen Preview */}
      {selectedImage && (
        <div
          className="invitation-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>

          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Selected wedding invitation"
              width={1400}
              height={1900}
              className="lightbox-image"
              priority
            />

            <div className="lightbox-actions">
              <p>
                Like this design? Take a screenshot and send it with quantity you need.
                
              </p>

              <button
                type="button"
                onClick={sendWhatsApp}
                className="whatsapp-order-button"
              >
                <span className="whatsapp-icon">◉</span>
                Send on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp */}
      <button
        type="button"
        onClick={sendWhatsApp}
        className="floating-whatsapp"
        aria-label="Contact Nova Creative Hub on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.48 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.59 5.96L.05 24l6.29-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.42-8.42ZM12.04 21.82h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.88 9.88 0 0 1-1.51-5.3c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.91 7.05c-.01 5.47-4.47 9.93-9.96 9.93Zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </button>
    </>
  );
}