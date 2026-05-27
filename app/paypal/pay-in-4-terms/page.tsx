"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const PAYMENTS = [
  { amount: "$52.50", label: "Due today" },
  { amount: "$52.50", label: "Oct 23" },
  { amount: "$52.50", label: "Nov 6" },
  { amount: "$52.50", label: "Nov 20" },
];

const WHAT_TO_KNOW = [
  "If you no longer meet the criteria used to select you for this offer, or give info we can't match, pre-approval won't apply and you may be declined for Pay in 4.",
  "This offer starts on [date] and ends when you exit checkout, or when the session expires, or if you make another Pay in 4 purchase while this session is active.",
  "We didn't use info from a credit bureau to make this offer.",
];

const HOW_IT_WORKS = [
  "Choose PayPal at checkout to pay later with Pay in 4.",
  "Complete your purchase with a 25% down payment.",
  "Use autopay for the rest of your payments. It's easy!",
];

export default function PayIn4Terms() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Browser chrome */}
      <div className="bg-[#fcf9f4] border-b border-[#d9d9d9] flex items-center justify-center h-[52px] px-6 shrink-0">
        <div className="flex items-center gap-1 border border-[#dedbd7] rounded-[8px] px-[10px] h-[28px] w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="w-[9px] h-[11px] shrink-0" src="/images/paypal/lock-color.svg" />
          <span className="text-[11px] text-[#4c4c4c] leading-none" style={{ fontFamily: "'SF Pro', system-ui, sans-serif" }}>
            paypal.com
          </span>
        </div>
      </div>

      {/* Dark background */}
      <div
        className="flex-1 flex items-center justify-center py-[60px]"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #222 0%, #181818 25%, #101010 50%, #080808 75%, #000 100%)",
        }}
      >
        {/* Modal card */}
        <div
          className="bg-[#f1f2f3] rounded-[32px] border border-[#cfd3d8] flex flex-col overflow-clip shrink-0"
          style={{ width: 424, minHeight: 700, maxHeight: 900 }}
        >
          {/* Nav header */}
          <div className="bg-[#f1f2f3] flex items-center h-[52px] shrink-0 w-full">
            <button
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                const fromVal = params.get("from");
                const isApproved = params.get("approved") === "true";
                if (fromVal === "pay-in-4-approved") {
                  router.push("/paypal/pay-in-4-approved?approved=true");
                } else if (fromVal === "pay-in-4") {
                  router.push("/paypal/pay-in-4");
                } else {
                  router.push(isApproved ? "/paypal?approved=true" : "/paypal");
                }
              }}
              className="flex items-center justify-center h-full px-[20px] shrink-0 cursor-pointer"
            >
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
                <path d="M8.5 1.5L1.5 8.5L8.5 15.5" stroke="#001435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">

            {/* Header section — card art + title + subtitle, left-aligned */}
            <div className="flex flex-col items-start px-[20px] pt-[8px] pb-[20px]">
              {/* Card art icon */}
              <div className="w-[96px] h-[96px] rounded-[20px] overflow-hidden bg-[#e8ebee] flex items-center justify-center mb-[16px]">
                <Image src="/images/paypal/PayIn4CardArt.png" alt="" width={96} height={60} className="object-cover w-full" />
              </div>
              {/* Title + badge */}
              <div className="flex items-center gap-[8px] mb-[8px]">
                <p className="text-[32px] font-semibold text-[#001435] leading-[38px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Pay in 4
                </p>
                <span
                  className="bg-[rgba(209,229,249,0.9)] text-[13px] text-[#001435] leading-[18px] px-[8px] py-[2px] rounded-[6px] whitespace-nowrap"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Pre-approved
                </span>
              </div>
              {/* Subtitle */}
              <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                Split $210.00 into 4 interest-free payments with no impact on credit score and no late fees.
              </p>
            </div>

            {/* Payment timeline */}
            <div className="px-[20px] pb-[20px]">
              <div className="relative w-full">
                {/* Continuous horizontal connector line */}
                <div className="absolute left-[12.5%] right-[12.5%] top-[4px] h-px bg-[#cdd0d4] z-0" />

                <div className="flex items-start justify-between relative z-10">
                  {PAYMENTS.map((p, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-[6px]">
                      <div className="relative flex items-center justify-center w-full">
                        <div
                          className="relative z-10 rounded-full shrink-0"
                          style={{ width: 9, height: 9, background: i === 0 ? "#0070e0" : "#cdd0d4" }}
                        />
                      </div>
                      <p className="text-[13px] font-semibold text-[#001435] leading-[18px] text-center" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {p.amount}
                      </p>
                      <p className="text-[12px] text-[#545d68] leading-[16px] text-center" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {p.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-[20px] h-px bg-[#e0e3e7] mb-[20px]" />

            {/* What to know section */}
            <div className="px-[20px] pb-[20px] flex flex-col gap-[12px]">
              <p className="text-[18px] font-semibold text-[#001435] leading-[24px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                What to know about pre-approval
              </p>
              <ul className="flex flex-col gap-[10px]" style={{ listStyleType: "disc", paddingLeft: "18px" }}>
                {WHAT_TO_KNOW.map((text, i) => (
                  <li key={i} className="text-[14px] text-[#364153] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="mx-[20px] h-px bg-[#e0e3e7] mb-[20px]" />

            {/* How Pay in 4 works section */}
            <div className="px-[20px] pb-[20px] flex flex-col gap-[12px]">
              <p className="text-[18px] font-semibold text-[#001435] leading-[24px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                How Pay in 4 works
              </p>
              <div className="flex flex-col gap-[12px]">
                {HOW_IT_WORKS.map((text, i) => (
                  <div key={i} className="flex items-start gap-[12px]">
                    <div className="shrink-0 w-[24px] h-[24px] rounded-full bg-[#001435] flex items-center justify-center">
                      <span className="text-[13px] font-semibold text-white leading-none" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#364153] leading-[20px] pt-[2px] flex-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal disclaimer */}
            <div className="px-[20px] pb-[24px]">
              <p className="text-[12px] text-[#6c7480] leading-[17px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                Pay in 4 is available to consumers upon approval for purchases of $30 to $1,500. Pay in 4 is currently not available to residents of MO or NV. Offer availability depends on the merchant and also may not be available for certain recurring, subscription services. When applying, a soft credit check may be needed, but will not affect your credit score. You must be 18 years old or older to apply. PayPal, Inc.: Loans to CA residents are made or arranged pursuant to a CA Financing Law License. GA Installment Lender Licensee, NMLS #910457. RI Small Loan Lender Licensee. NM: Find more disclosures related to Pay in 4.
              </p>
            </div>
          </div>

          {/* CTA footer */}
          <div
            className="bg-[#f1f2f3] flex flex-col items-center gap-[12px] px-[20px] pt-[16px] pb-[24px] shrink-0 w-full"
            style={{ boxShadow: "inset 0 0.5px 0 0 #e0e3e7" }}
          >
            <button className="text-[14px] text-[#0070e0] leading-[20px] cursor-pointer" style={{ fontFamily: "system-ui, sans-serif" }}>
              About payment methods
            </button>
            <button
              onClick={() => router.push("/paypal/pay-in-4-apply")}
              className="bg-[#0544b5] rounded-full flex items-center justify-center h-[48px] w-full cursor-pointer hover:bg-[#003da8] transition-colors"
            >
              <span className="text-[16px] font-semibold text-white leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                Continue with Pay in 4
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
