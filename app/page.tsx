import Image from "next/image";

export default function NikeCheckout() {
  return (
    <div className="min-h-screen bg-white">
      {/* Browser chrome */}
      <div className="bg-[#fcf9f4] border-b border-[#d9d9d9] flex items-center justify-center h-[52px] px-6">
        <div className="flex items-center gap-1 border border-[#dedbd7] rounded-[8px] px-[10px] h-[28px] w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/checkout/lock.svg" alt="" className="w-[9px] h-[11px] shrink-0" />
          <span className="text-[11px] text-[#4c4c4c] font-['SF_Pro:Regular',system-ui,sans-serif] leading-none">
            nike.com/checkout
          </span>
        </div>
      </div>

      {/* Nike site header */}
      <header className="border-b border-[#e5e7eb] h-[64px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Nike logo */}
          <Image
            src="/images/checkout/nike-logo.png"
            alt="Nike"
            width={86}
            height={33}
            className="object-contain"
            priority
          />

          {/* Nav right */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Bag icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/checkout/icon-ship.svg" alt="" className="w-4 h-4" />

            {/* User */}
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/checkout/icon-user.svg" alt="" className="w-4 h-4" />
              <span
                className="hidden sm:inline text-[16px] text-[#001435] leading-none whitespace-nowrap"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Alisha Burgos
              </span>
            </div>

            {/* Phone */}
            <span className="hidden md:inline text-[14px] text-[#0a0a0a] tracking-[-0.015em] whitespace-nowrap font-normal" style={{ fontFamily: "system-ui, sans-serif" }}>
              1-800-806-6453
            </span>

            {/* Live Chat */}
            <div className="hidden md:flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/checkout/icon-chat.svg" alt="" className="w-4 h-4" />
              <span className="text-[14px] text-[#0a0a0a] underline tracking-[-0.015em] whitespace-nowrap" style={{ fontFamily: "system-ui, sans-serif" }}>
                Live Chat
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 pb-16">
        <h1 className="text-[24px] font-medium text-[#0a0a0a] tracking-[0.007em] leading-8 mb-8" style={{ fontFamily: "system-ui, sans-serif" }}>
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Left column ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* "Is all your information correct?" card */}
            <div className="border border-[#d1d5dc] rounded-[4px] p-6">
              <h2
                className="text-[20px] font-medium text-[#0a0a0a] tracking-[-0.022em] leading-[30px] mb-3"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Is all your information correct?
              </h2>
              <p
                className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5 mb-8 max-w-[760px]"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Before you submit payment, please take a moment to review your shipping information, billing information, and bag summary.
              </p>
              <div className="flex justify-end">
                <a
                  href="/paypal"
                  className="inline-flex items-center gap-1 bg-black text-white rounded-full px-8 h-[48px] text-[16px] tracking-[-0.031em] leading-6 hover:bg-[#222] transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <span className="font-normal">Pay with&nbsp;</span>
                  <span className="font-bold text-white">PayPal</span>
                </a>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="border-b border-[#d1d5dc] pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[20px] font-medium text-[#0a0a0a] tracking-[-0.022em] leading-7"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Delivery Options
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/checkout/icon-check.svg" alt="Confirmed" className="w-5 h-5" />
                </div>
                <button className="text-[14px] font-medium text-[#0a0a0a] underline tracking-[-0.015em]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Edit
                </button>
              </div>

              {/* Ship / Pick Up toggle */}
              <div className="flex gap-[16px] mb-6">
                <button className="flex items-center justify-center gap-2 h-[52px] flex-1 border-2 border-black rounded-[4px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/checkout/icon-ship.svg" alt="" className="w-5 h-5" />
                  <span className="text-[16px] font-medium text-[#0a0a0a] tracking-[-0.031em]" style={{ fontFamily: "system-ui, sans-serif" }}>Ship</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-[52px] flex-1 border border-[#d1d5dc] rounded-[4px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/checkout/icon-pickup.svg" alt="" className="w-5 h-5" />
                  <span className="text-[16px] font-medium text-[#0a0a0a] tracking-[-0.031em]" style={{ fontFamily: "system-ui, sans-serif" }}>Pick Up</span>
                </button>
              </div>

              {/* Shipping Address */}
              <div className="mb-4">
                <h3 className="text-[18px] font-medium text-[#0a0a0a] tracking-[-0.024em] leading-[27px] mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Shipping Address
                </h3>
                <div className="flex flex-col gap-1">
                  {["Timothy Valderrama", "1822 Adams Street", "San Mateo CA 94403", "(415) 685-3878"].map((line) => (
                    <p key={line} className="text-[14px] text-[#364153] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Shipping Speed */}
              <div>
                <h3 className="text-[18px] font-medium text-[#0a0a0a] tracking-[-0.024em] leading-[27px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Shipping Speed
                </h3>
                <p className="text-[14px] text-[#364153] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>Free Shipping</p>
                <p className="text-[14px] text-[#6a7282] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>Arrives Tue, Jun 30 - Mon, Jul 6</p>
              </div>
            </div>

            {/* Payment */}
            <div className="border-b border-[#d1d5dc] pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[20px] font-medium text-[#0a0a0a] tracking-[-0.022em] leading-7" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Payment
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/checkout/icon-check.svg" alt="Confirmed" className="w-5 h-5" />
                </div>
                <button className="text-[14px] font-medium text-[#0a0a0a] underline tracking-[-0.015em]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Edit
                </button>
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#0a0a0a] tracking-[-0.015em] leading-5 mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Payment Method
                </p>
                <div className="flex items-center gap-2">
                  <div className="relative w-[64px] h-[20px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/checkout/paypal-badge.svg" alt="" className="absolute inset-0 w-full h-full" />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[8.75px] leading-none" style={{ fontFamily: "Arial, sans-serif" }}>
                      PayPal
                    </span>
                  </div>
                  <span className="text-[14px] text-[#364153] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>PayPal</span>
                </div>
              </div>
            </div>

            {/* Order Review */}
            <div>
              <h2 className="text-[20px] font-medium text-[#0a0a0a] tracking-[-0.022em] leading-7 mb-4" style={{ fontFamily: "system-ui, sans-serif" }}>
                Order Review
              </h2>
              <p className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>
                By clicking the &quot;Continue to PayPal&quot; button, you confirm that you have read, understand, and accept our{" "}
                <span className="underline text-[#101828]">Terms of Use</span>,{" "}
                <span className="underline text-[#101828]">Terms of Sale</span>, and{" "}
                <span className="underline text-[#101828]">Return Policy</span>{" "}
                and acknowledge that you have read Nike&apos;s{" "}
                <span className="underline text-[#101828]">Privacy Policy</span>.
              </p>
            </div>
          </div>

          {/* ── Right column ─────────────────────────────────────── */}
          <div className="w-full lg:w-[389px] shrink-0">
            <div className="border-b border-[#d1d5dc] pb-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[20px] font-medium text-[#0a0a0a] tracking-[-0.022em] leading-7" style={{ fontFamily: "system-ui, sans-serif" }}>
                  In Your Bag
                </span>
                <button className="text-[14px] font-medium text-[#0a0a0a] underline tracking-[-0.015em]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Edit
                </button>
              </div>

              {/* Order summary */}
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>Subtotal</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/checkout/icon-info.svg" alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>$210.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>Shipping</span>
                  <span className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>$0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>Estimated Tax</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/checkout/icon-info.svg" alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>$0.00</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#d1d5dc] pt-4">
                  <span className="text-[16px] text-[#0a0a0a] tracking-[-0.031em] leading-6" style={{ fontFamily: "system-ui, sans-serif" }}>Total</span>
                  <span className="text-[16px] text-[#0a0a0a] tracking-[-0.031em] leading-6" style={{ fontFamily: "system-ui, sans-serif" }}>$210.00</span>
                </div>
              </div>

              {/* Arrival */}
              <p className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5 mb-4" style={{ fontFamily: "system-ui, sans-serif" }}>
                Arrives Tue, Jun 30 - Mon, Jul 6
              </p>

              {/* Product */}
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-[#f3f4f6] rounded-[4px] shrink-0 overflow-hidden relative">
                  <Image
                    src="/images/checkout/NikePictureShoe.png"
                    alt="Nike Vomero Plus By You"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>$210.00</p>
                  <p className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>Nike Vomero Plus By You</p>
                  <p className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5 truncate" style={{ fontFamily: "system-ui, sans-serif" }}>Custom Men&apos;s Road Runnin...</p>
                  <p className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>Multi-Color/Multi-Color</p>
                  <p className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5" style={{ fontFamily: "system-ui, sans-serif" }}>Qty: 1 | Size: M 9 / W 10.5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
