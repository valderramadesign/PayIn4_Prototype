import Image from "next/image";
import Link from "next/link";

export default function NikeThankYou() {
  return (
    <div className="min-h-screen bg-white">
      {/* Browser chrome */}
      <div className="bg-[#fcf9f4] border-b border-[#d9d9d9] flex items-center justify-center h-[52px] px-6">
        <div className="flex items-center gap-1 border border-[#dedbd7] rounded-[8px] px-[10px] h-[28px] w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/checkout/lock.svg" alt="" className="w-[9px] h-[11px] shrink-0" />
          <span className="text-[11px] text-[#4c4c4c] font-['SF_Pro:Regular',system-ui,sans-serif] leading-none">
            nike.com/orders/confirmation
          </span>
        </div>
      </div>

      {/* Nike site header */}
      <header className="border-b border-[#e5e7eb] h-[64px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Image
            src="/images/checkout/nike-logo.png"
            alt="Nike"
            width={86}
            height={33}
            className="object-contain"
            priority
          />

          <div className="flex items-center gap-4 sm:gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/checkout/icon-ship.svg" alt="" className="w-4 h-4" />

            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/checkout/icon-user.svg" alt="" className="w-4 h-4" />
              <span
                className="text-[16px] text-[#001435] leading-none whitespace-nowrap hidden sm:inline"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Alisha Burgos
              </span>
            </div>

            <span
              className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] whitespace-nowrap font-normal hidden md:inline"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              1-800-806-6453
            </span>

            <div className="hidden md:flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/checkout/icon-chat.svg" alt="" className="w-4 h-4" />
              <span
                className="text-[14px] text-[#0a0a0a] underline tracking-[-0.015em] whitespace-nowrap"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Live Chat
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* ── Left column — confirmation ─────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/checkout/icon-check.svg" alt="" className="w-10 h-10" />
            </div>

            <h1
              className="text-[32px] sm:text-[48px] font-medium text-[#0a0a0a] tracking-[-0.025em] leading-[40px] sm:leading-[56px] mb-3"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Thank you for your order
            </h1>
            <p
              className="text-[16px] text-[#4a5565] tracking-[-0.015em] leading-6 mb-10 max-w-[560px]"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              We&apos;ve received your order and sent a confirmation to{" "}
              <span className="text-[#0a0a0a]">grace.hamilton@gmail.com</span>. You&apos;ll get another note as soon as it ships.
            </p>

            {/* Order info card */}
            <div className="border border-[#d1d5dc] rounded-[4px] p-6 mb-10 max-w-[560px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <p
                    className="text-[12px] uppercase tracking-[0.08em] text-[#6a7282] leading-4 mb-2"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Order Number
                  </p>
                  <p
                    className="text-[16px] font-medium text-[#0a0a0a] tracking-[-0.015em] leading-6"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    C00742519183
                  </p>
                </div>
                <div>
                  <p
                    className="text-[12px] uppercase tracking-[0.08em] text-[#6a7282] leading-4 mb-2"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Estimated Delivery
                  </p>
                  <p
                    className="text-[16px] font-medium text-[#0a0a0a] tracking-[-0.015em] leading-6"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Tue, Jun 30 – Mon, Jul 6
                  </p>
                </div>
                <div>
                  <p
                    className="text-[12px] uppercase tracking-[0.08em] text-[#6a7282] leading-4 mb-2"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Shipping To
                  </p>
                  <p
                    className="text-[16px] font-medium text-[#0a0a0a] tracking-[-0.015em] leading-6"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Alisha Burgos
                  </p>
                  <p
                    className="text-[14px] text-[#364153] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    208 Copperhead Road
                  </p>
                  <p
                    className="text-[14px] text-[#364153] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Hartford, CT 95821
                  </p>
                </div>
                <div>
                  <p
                    className="text-[12px] uppercase tracking-[0.08em] text-[#6a7282] leading-4 mb-2"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Payment
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="relative w-[64px] h-[20px] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/checkout/paypal-badge.svg" alt="" className="absolute inset-0 w-full h-full" />
                      <span
                        className="absolute inset-0 flex items-center justify-center text-white font-bold text-[8.75px] leading-none"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        PayPal
                      </span>
                    </div>
                    <span
                      className="text-[14px] text-[#364153] tracking-[-0.015em] leading-5"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      Pay in 4
                    </span>
                  </div>
                  <p
                    className="text-[14px] text-[#364153] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    4 payments of $52.50
                  </p>
                </div>
              </div>
            </div>

            {/* What's next */}
            <div className="mb-10 max-w-[560px]">
              <h2
                className="text-[20px] font-medium text-[#0a0a0a] tracking-[-0.022em] leading-7 mb-4"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                What&apos;s next
              </h2>
              <ol className="flex flex-col gap-3">
                {[
                  "We&apos;ll send a shipping confirmation with tracking once your order leaves the warehouse.",
                  "Your first installment of $52.50 was paid today. The next three will be auto-charged every two weeks.",
                  "Manage your order anytime from your Nike account.",
                ].map((line, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="shrink-0 w-6 h-6 rounded-full bg-[#0a0a0a] text-white text-[12px] font-medium leading-6 text-center"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {i + 1}
                    </span>
                    <p
                      className="text-[14px] text-[#364153] tracking-[-0.015em] leading-6 pt-[1px]"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  </li>
                ))}
              </ol>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-black text-white rounded-full px-8 h-[48px] text-[16px] tracking-[-0.031em] leading-6 hover:bg-[#222] transition-colors"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="text-[14px] font-medium text-[#0a0a0a] underline tracking-[-0.015em]"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                View order details
              </Link>
            </div>
          </div>

          {/* ── Right column — order summary ─────────────────────── */}
          <div className="w-full lg:w-[389px] lg:shrink-0">
            <div className="border border-[#d1d5dc] rounded-[4px] p-6">
              <h2
                className="text-[20px] font-medium text-[#0a0a0a] tracking-[-0.022em] leading-7 mb-6"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Order Summary
              </h2>

              {/* Product */}
              <div className="flex gap-4 pb-6 border-b border-[#d1d5dc]">
                <div className="w-24 h-24 bg-[#f3f4f6] rounded-[4px] shrink-0 overflow-hidden relative">
                  <Image
                    src="/images/checkout/NikePictureShoe.png"
                    alt="Nike Vomero Plus By You"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <p
                    className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    $210.00
                  </p>
                  <p
                    className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Nike Vomero Plus By You
                  </p>
                  <p
                    className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5 truncate"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Custom Men&apos;s Road Runnin...
                  </p>
                  <p
                    className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Multi-Color/Multi-Color
                  </p>
                  <p
                    className="text-[14px] text-[#4a5565] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Qty: 1 | Size: M 9 / W 10.5
                  </p>
                </div>
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-4 py-6 border-b border-[#d1d5dc]">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    $210.00
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Shipping
                  </span>
                  <span
                    className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    $0.00
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Estimated Tax
                  </span>
                  <span
                    className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    $0.00
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mb-4">
                <span
                  className="text-[16px] font-medium text-[#0a0a0a] tracking-[-0.031em] leading-6"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Total
                </span>
                <span
                  className="text-[16px] font-medium text-[#0a0a0a] tracking-[-0.031em] leading-6"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  $210.00
                </span>
              </div>

              {/* Pay in 4 schedule */}
              <div className="bg-[#f3f4f6] rounded-[4px] p-4">
                <p
                  className="text-[12px] uppercase tracking-[0.08em] text-[#6a7282] leading-4 mb-3"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Payment Schedule
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Today", value: "$52.50", paid: true },
                    { label: "In 2 weeks", value: "$52.50", paid: false },
                    { label: "In 4 weeks", value: "$52.50", paid: false },
                    { label: "In 6 weeks", value: "$52.50", paid: false },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {row.paid ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src="/images/checkout/icon-check.svg" alt="" className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#9aa3af]" />
                        )}
                        <span
                          className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                          style={{ fontFamily: "system-ui, sans-serif" }}
                        >
                          {row.label}
                        </span>
                      </div>
                      <span
                        className="text-[14px] text-[#0a0a0a] tracking-[-0.015em] leading-5"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
