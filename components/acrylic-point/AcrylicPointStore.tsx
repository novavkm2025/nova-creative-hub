"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  label?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Photo Miniature Standee",
    category: "Miniatures",
    description: "A favourite memory, made into a display piece.",
    price: 499,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85",
    label: "Signature",
  },
  {
    id: 2,
    name: "Personalized Acrylic Keychain",
    category: "Keychains",
    description: "Names, photos and little details that matter.",
    price: 149,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
    label: "Bestseller",
  },
  {
    id: 3,
    name: "UV Printed Photo Frame",
    category: "Frames",
    description: "Bring your favourite moments to your desk.",
    price: 399,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Custom Event Memento",
    category: "Mementos",
    description: "Made for milestones, teams and celebrations.",
    price: 599,
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Personalized Acrylic Clock",
    category: "Clocks",
    description: "A thoughtful gift that has a place in every home.",
    price: 799,
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Branded Bulk Keychains",
    category: "Bulk Orders",
    description: "Custom designs for events, teams and businesses.",
    price: 99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    label: "Bulk pricing",
  },
];

const categories = ["All Products", "Miniatures", "Keychains", "Frames", "Mementos", "Clocks", "Bulk Orders"];

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function AcrylicPointStore() {
  const [category, setCategory] = useState("All Products");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(
    () =>
      category === "All Products"
        ? products
        : products.filter((product) => product.category === category),
    [category],
  );

  const cartItems = products.filter((product) => (cart[product.id] || 0) > 0);
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0,
  );

  function changeQty(id: number, amount: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
    setNotice("");
  }

  function sendOrder() {
    if (!cartItems.length) {
      setNotice("Add a product to your cart first.");
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      setNotice("Please enter your name and phone number to prepare the order.");
      return;
    }
    const lines = cartItems.map(
      (product) =>
        `• ${product.name} × ${cart[product.id]} — ${money(product.price * cart[product.id])}`,
    );
    const message = [
      "Hello Acrylic Point by Nova! I'd like to enquire about this order:",
      "",
      ...lines,
      "",
      `Estimated subtotal: ${money(subtotal)}`,
      `Name: ${customerName.trim()}`,
      `Phone: ${customerPhone.trim()}`,
      customerAddress.trim() ? `Delivery address: ${customerAddress.trim()}` : "",
      customNotes.trim() ? `Customization / bulk details: ${customNotes.trim()}` : "",
      "",
      "Please confirm final pricing, delivery charges and payment options.",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className="ap-store min-h-screen bg-[#070910] text-white" style={{ backgroundImage: "radial-gradient(ellipse at 8% 18%, rgba(0, 190, 220, 0.10), transparent 35%), radial-gradient(ellipse at 92% 42%, rgba(185, 35, 220, 0.10), transparent 38%)" }}>
      <div className="bg-[#070910] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-200 sm:text-xs">
        Thoughtful gifts. Beautifully made. · Individual & bulk orders
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070910]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <a href="/acrylic-point" className="flex items-center gap-3" aria-label="Acrylic Point home">
            <span className="flex h-11 w-11 items-center justify-center border border-cyan-300 text-lg font-black italic text-sky-300">AP</span>
            <span className="leading-tight">
              <span className="block text-[15px] font-black uppercase italic tracking-[0.12em] sm:text-lg">Acrylic Point</span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.38em] text-cyan-300">by Nova</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.14em] md:flex">
            <a href="#shop" className="transition hover:text-sky-300">Shop</a>
            <a href="#customize" className="transition hover:text-sky-300">Customize</a>
            <a href="#bulk" className="transition hover:text-sky-300">Bulk orders</a>
            <a href="https://novacreativehub.in/" className="text-white/60 transition hover:text-black">Nova Creative Hub ↗</a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setCartOpen(true)} className="relative flex h-11 items-center gap-2 border border-white/15 px-3 text-xs font-bold uppercase tracking-wider transition hover:border-cyan-300" aria-label="Open shopping cart">
              <ShoppingBag size={17} />
              <span className="hidden sm:inline">Bag</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b28c51] px-1 text-[10px] text-white">{cartCount}</span>
            </button>
            <button className="flex h-11 w-11 items-center justify-center border border-white/15 md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="flex flex-col gap-4 border-t border-white/10 px-5 py-5 text-xs font-semibold uppercase tracking-widest md:hidden">
            <a href="#shop" onClick={() => setMobileMenu(false)}>Shop products</a>
            <a href="#customize" onClick={() => setMobileMenu(false)}>Customize</a>
            <a href="#bulk" onClick={() => setMobileMenu(false)}>Bulk orders</a>
            <a href="https://novacreativehub.in/">Nova Creative Hub ↗</a>
          </nav>
        )}
      </header>

      <section className="relative overflow-hidden bg-[#070910] text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(ellipse at 12% 28%, rgba(0, 205, 230, 0.24) 0, transparent 42%), radial-gradient(ellipse at 88% 72%, rgba(195, 20, 225, 0.22) 0, transparent 42%), linear-gradient(120deg, #071017 0%, #080914 55%, #100817 100%)" }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-cyan-300/50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
              <Sparkles size={13} /> Personalized acrylic creations
            </div>
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl">
              Make it
              <span className="block font-serif italic font-normal text-cyan-300">personal.</span>
              Make it last.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
              Miniatures, photo frames, keychains, mementos and clocks — thoughtfully customized for your people, moments and milestones.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex items-center gap-3 bg-cyan-300 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#0a0d16]">
                Explore collection <ArrowRight size={16} />
              </a>
              <a href="#bulk" className="inline-flex items-center border border-white/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-cyan-300 hover:text-cyan-300">
                Bulk enquiries
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-white/55">
              <span className="flex items-center gap-2"><Check size={13} className="text-[#d7b779}" /> Made to personalize</span>
              <span className="flex items-center gap-2"><Check size={13} className="text-cyan-300" /> Retail & bulk orders</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-3 border border-cyan-300/25" />
            <div className="relative grid grid-cols-2 gap-3">
              <div className="space-y-3 pt-10">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#111827]">
                  <Image src={products[0].image} alt="Personalized miniature gift inspiration" fill sizes="(max-width: 768px) 45vw, 260px" className="object-cover transition duration-700 hover:scale-105" unoptimized />
                </div>
                <div className="border border-white/15 p-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-300">Made for your story</span>
                  <p className="mt-1 font-serif text-xl italic">Little things. Big meaning.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border border-white/15 p-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-300">The collection</span>
                  <p className="mt-1 text-sm text-white/70">Personalized gifts, made yours.</p>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#111827]">
                  <Image src={products[2].image} alt="Custom frame gift inspiration" fill sizes="(max-width: 768px) 45vw, 260px" className="object-cover transition duration-700 hover:scale-105" unoptimized />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0a0d16]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-black/10 px-4 sm:grid-cols-4 sm:divide-y-0 sm:px-8">
          {[
            ["01", "Personalized gifts"],
            ["02", "Quality checked"],
            ["03", "Bulk order support"],
            ["04", "By Nova Creative Hub"],
          ].map(([number, label]) => (
            <div key={number} className="flex items-center gap-3 px-3 py-5 sm:px-5">
              <span className="font-serif text-lg italic text-cyan-300">{number}</span>
              <span className="text-[9px] font-bold uppercase leading-4 tracking-[0.12em] sm:text-[10px]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-300">The collection</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Made to mean more.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">Explore personalized pieces for everyday moments, celebrations and meaningful milestones.</p>
          </div>
          <button onClick={() => setCartOpen(true)} className="inline-flex items-center gap-2 self-start border-b border-cyan-300 pb-2 text-xs font-bold uppercase tracking-widest sm:self-auto">View your bag <ArrowRight size={15} /></button>
        </div>

        <div className="mt-9 flex gap-2 overflow-x-auto pb-3">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`shrink-0 border px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] transition ${category === item ? "border-[#171714] bg-[#070910] text-white" : "border-white/15 bg-transparent text-white/65 hover:border-cyan-300 hover:text-black"}`}>
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <article key={product.id} className="group">
              <div className="relative aspect-[4/4.5] overflow-hidden bg-[#111827]">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" unoptimized />
                {product.label && <span className="absolute left-3 top-3 bg-[#070910] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em]">{product.label}</span>}
                <button onClick={() => changeQty(product.id, 1)} className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center bg-[#070910] transition hover:bg-cyan-300" aria-label={`Add ${product.name} to bag`}><Plus size={20} /></button>
              </div>
              <div className="flex items-start justify-between gap-4 pt-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-300">{product.category}</p>
                  <h3 className="mt-2 text-base font-semibold">{product.name}</h3>
                  <p className="mt-1 max-w-xs text-xs leading-5 text-white/60">{product.description}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold">{money(product.price)}</p>
              </div>
              <button onClick={() => changeQty(product.id, 1)} className="mt-4 flex w-full items-center justify-center gap-2 border border-white/15 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition hover:border-cyan-300 hover:bg-[#070910] hover:text-white">
                Add to bag <Plus size={14} />
              </button>
            </article>
          ))}
        </div>
        <p className="mt-8 text-xs leading-5 text-white/45">Prices shown are sample launch prices for layout demonstration. Confirm product specifications, customization charges, shipping and final prices before accepting payment.</p>
      </section>

      <section id="customize" className="scroll-mt-24 bg-[#0b1220]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-300">Your idea, your way</p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">A little more you. In every detail.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">Have a photo, name, logo or special idea in mind? Tell us what you would like to create. We’ll confirm feasibility, artwork, production time and the final quote before production.</p>
            <a href="#bulk" className="mt-7 inline-flex items-center gap-3 bg-[#070910] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-cyan-300">Request a custom order <ArrowRight size={15} /></a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#070910] p-5 sm:p-7"><Heart className="text-sky-300" size={23}/><h3 className="mt-8 text-sm font-semibold">Personal gifts</h3><p className="mt-2 text-xs leading-5 text-white/60">Photos, names, dates and thoughtful messages.</p></div>
            <div className="mt-8 bg-[#070910] p-5 text-white sm:p-7"><Sparkles className="text-cyan-300" size={23}/><h3 className="mt-8 text-sm font-semibold">Custom designs</h3><p className="mt-2 text-xs leading-5 text-white/55">Shapes, sizes and artwork planned for your idea.</p></div>
            <div className="bg-[#070910] p-5 text-white sm:p-7"><ShoppingBag className="text-cyan-300" size={23}/><h3 className="mt-8 text-sm font-semibold">Event keepsakes</h3><p className="mt-2 text-xs leading-5 text-white/55">Mementos and products for special occasions.</p></div>
            <div className="mt-8 bg-[#070910] p-5 sm:p-7"><Check className="text-sky-300" size={23}/><h3 className="mt-8 text-sm font-semibold">Quality checked</h3><p className="mt-2 text-xs leading-5 text-white/60">A final review before dispatch.</p></div>
          </div>
        </div>
      </section>

      <section id="bulk" className="scroll-mt-24 bg-[#070910] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">For businesses & events</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">Big ideas. Bulk made simple.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">Planning a school event, corporate gift, team celebration or branded giveaway? Tell us the quantity, deadline and design requirements to receive a tailored quotation.</p>
            <div className="mt-8 space-y-3 text-xs text-white/75">
              {["School & college mementos", "Corporate gifts & logo keychains", "Event keepsakes and awards", "Custom quantities and artwork"].map((item) => <p key={item} className="flex items-center gap-3"><Check size={15} className="text-[#d7b779}"/>{item}</p>)}
            </div>
          </div>
          <form className="grid gap-4 self-start border border-white/15 bg-[#0a0d16]/[0.03] p-5 sm:p-7" onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const message = [
              "Hello Acrylic Point by Nova, I'd like a bulk/custom order quotation.",
              `Name / Organization: ${data.get("organization")}`,
              `Phone: ${data.get("phone")}`,
              `Product: ${data.get("product")}`,
              `Quantity: ${data.get("quantity")}`,
              `Required by: ${data.get("deadline") || "Flexible"}`,
              `Details: ${data.get("details") || "Please contact me"}`,
            ].join("\n");
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
          }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Name / organization<input required name="organization" className="mt-2 w-full border border-white/15 bg-transparent px-3 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/30 focus:border-cyan-300" placeholder="Your name" /></label>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Phone number<input required name="phone" type="tel" className="mt-2 w-full border border-white/15 bg-transparent px-3 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/30 focus:border-cyan-300" placeholder="Your phone" /></label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Product type<select name="product" className="mt-2 w-full border border-white/15 bg-[#0a0d16] px-3 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-cyan-300"><option>Keychains</option><option>Mementos / awards</option><option>Frames</option><option>Clocks</option><option>Miniatures</option><option>Mixed products</option></select></label>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Approx. quantity<input required name="quantity" className="mt-2 w-full border border-white/15 bg-transparent px-3 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/30 focus:border-cyan-300" placeholder="e.g. 100 pieces" /></label>
            </div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Required by (optional)<input name="deadline" type="date" className="mt-2 w-full border border-white/15 bg-transparent px-3 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-cyan-300" /></label>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Design / order details<textarea name="details" rows={3} className="mt-2 w-full resize-y border border-white/15 bg-transparent px-3 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/30 focus:border-cyan-300" placeholder="Share sizes, logo, customization and deadline…" /></label>
            <button type="submit" className="flex items-center justify-center gap-3 bg-cyan-300 px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#0a0d16]">Prepare WhatsApp enquiry <ArrowRight size={15}/></button>
            <p className="text-[10px] leading-5 text-white/40">This opens WhatsApp with your enquiry prepared. Final pricing and production schedule are confirmed separately.</p>
          </form>
        </div>
      </section>

      <footer className="bg-[#070910]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <a href="/acrylic-point" className="leading-tight">
            <span className="block text-sm font-black uppercase italic tracking-[0.12em]">Acrylic Point</span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.38em] text-cyan-300">by Nova</span>
          </a>
          <p className="text-xs text-white/50">Personalized acrylic creations by Nova Creative Hub.</p>
          <a href="https://novacreativehub.in/" className="text-xs font-bold uppercase tracking-widest underline decoration-cyan-300 underline-offset-4">Visit Nova Creative Hub ↗</a>
        </div>
        <div className="border-t border-white/10 px-5 py-4 text-center text-[10px] text-white/40">© {new Date().getFullYear()} Acrylic Point by Nova. All rights reserved.</div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/55" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-[#070910] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5 sm:p-7">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">Your selection</p><h2 className="mt-1 text-2xl font-semibold">Shopping bag ({cartCount})</h2></div>
              <button onClick={() => setCartOpen(false)} className="flex h-10 w-10 items-center justify-center border border-white/15" aria-label="Close cart"><X size={19}/></button>
            </div>
            <div className="flex-1 space-y-5 p-5 sm:p-7">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center"><ShoppingBag className="mx-auto text-cyan-300" size={34}/><p className="mt-4 font-semibold">Your bag is waiting.</p><p className="mt-2 text-sm text-white/60">Add a product from the collection to get started.</p><button onClick={() => setCartOpen(false)} className="mt-5 border border-black/20 px-5 py-3 text-xs font-bold uppercase tracking-widest">Explore products</button></div>
              ) : cartItems.map((product) => (
                <div key={product.id} className="flex gap-4 border-b border-white/10 pb-5">
                  <div className="relative h-24 w-20 shrink-0 bg-[#111827]"><Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" unoptimized /></div>
                  <div className="flex-1"><h3 className="text-sm font-semibold">{product.name}</h3><p className="mt-1 text-sm text-sky-300">{money(product.price)}</p><div className="mt-3 inline-flex items-center border border-white/15"><button onClick={() => changeQty(product.id, -1)} className="p-2" aria-label="Decrease quantity"><Minus size={13}/></button><span className="min-w-8 text-center text-xs">{cart[product.id]}</span><button onClick={() => changeQty(product.id, 1)} className="p-2" aria-label="Increase quantity"><Plus size={13}/></button></div></div>
                  <button onClick={() => setCart((current) => { const next = { ...current }; delete next[product.id]; return next; })} className="self-start p-1 text-white/45 hover:text-black" aria-label={`Remove ${product.name}`}><X size={16}/></button>
                </div>
              ))}
              {cartItems.length > 0 && (
                <div className="space-y-4 border-b border-white/10 pb-5">
                  <div className="flex items-center justify-between text-sm"><span className="text-white/65">Estimated subtotal</span><strong>{money(subtotal)}</strong></div>
                  <p className="text-[10px] leading-5 text-white/45">Shipping, personalization charges and final availability are confirmed before payment.</p>
                </div>
              )}
              {cartItems.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Order details</h3>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Your name<input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="mt-2 w-full border border-white/15 bg-[#0a0d16] px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-cyan-300" placeholder="Full name"/></label>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Phone number<input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} type="tel" className="mt-2 w-full border border-white/15 bg-[#0a0d16] px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-cyan-300" placeholder="Phone number"/></label>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Delivery address (optional)<textarea value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} rows={2} className="mt-2 w-full border border-white/15 bg-[#0a0d16] px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-cyan-300" placeholder="Address and PIN code"/></label>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Customization / bulk notes (optional)<textarea value={customNotes} onChange={(e) => setCustomNotes(e.target.value)} rows={2} className="mt-2 w-full border border-white/15 bg-[#0a0d16] px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-cyan-300" placeholder="Names, photos, quantity, required date…"/></label>
                  {notice && <p role="alert" className="text-xs font-medium text-red-700">{notice}</p>}
                  <button onClick={sendOrder} className="flex w-full items-center justify-center gap-3 bg-[#070910] px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-cyan-300">Continue via WhatsApp <ArrowRight size={15}/></button>
                  <p className="text-[10px] leading-5 text-white/45">This is an order enquiry, not a completed purchase. Payment is collected only after the final quote is confirmed.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
