"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function formatDob(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function PayIn4Apply() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [dobValue, setDobValue] = useState("");
  const [dobFocused, setDobFocused] = useState(false);
  const dobRef = useRef<HTMLInputElement>(null);

  const dobIsFloating = dobFocused || dobValue.length > 0;
  const dobIsError = dobValue.length === 10 && dobValue !== "06/01/1980";
  const dobBorderColor = dobIsError ? "#d50102" : dobFocused ? "#097bf5" : "#737b84";
  const dobBorderWidth = dobIsError || dobFocused ? 2 : 1;
  const dobBorderRadius = dobFocused && !dobIsError ? 6 : 4;

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
          className="bg-white rounded-[32px] border border-[#cfd3d8] flex flex-col overflow-clip shrink-0"
          style={{ width: 424, minHeight: 700, maxHeight: 900 }}
        >
          {/* Nav header */}
          <div className="flex items-center h-[60px] shrink-0 w-full relative">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center h-full px-[20px] shrink-0 w-[74px] cursor-pointer"
            >
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
                <path d="M8.5 1.5L1.5 8.5L8.5 15.5" stroke="#001435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Title centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-[17px] font-bold text-[#001435] leading-none" style={{ fontFamily: "system-ui, sans-serif" }}>
                Pay in 4
              </p>
            </div>
            {/* Cancel */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-end h-full px-[20px] shrink-0 w-[74px] ml-auto cursor-pointer"
            >
              <span className="text-[17px] text-[#0070e0] leading-none" style={{ fontFamily: "system-ui, sans-serif" }}>
                Cancel
              </span>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">

            {/* Section header */}
            <div className="px-[20px] py-[14px] shrink-0">
              <p className="text-[20px] text-[#001435] leading-[28px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                Confirm a few details to apply
              </p>
            </div>

            {/* White card: billing address + autopay */}
            <div className="mx-[20px] mb-[8px] rounded-[16px] overflow-hidden" style={{ border: "0.5px solid #e0e3e7" }}>

              {/* Billing address header */}
              <div className="flex items-center justify-between px-[16px] pt-[12px] pb-[10px]">
                <p className="text-[14px] text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Billing address and phone number
                </p>
                <button className="text-[14px] text-[#0070e0] leading-[20px] cursor-pointer shrink-0 ml-[8px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Edit
                </button>
              </div>

              {/* Address row */}
              <div className="flex items-start gap-[12px] px-[16px] py-[12px]" style={{ borderBottom: "0.5px solid #e0e3e7" }}>
                {/* Avatar */}
                <div className="shrink-0 w-[48px] h-[48px] rounded-full overflow-hidden bg-[#e8ebee]">
                  <Image src="/images/paypal/AvatarImage.png" alt="" width={48} height={48} className="w-full h-full object-cover" />
                </div>
                {/* Info */}
                <div className="flex flex-col gap-[2px] min-w-0">
                  <p className="text-[16px] font-semibold text-[#001435] leading-[22px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Alisha Burgos
                  </p>
                  <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    208 Copperhead Road
                  </p>
                  <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Hartford, CT 95821
                  </p>
                  <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    (650) 234-5678
                  </p>
                </div>
              </div>

              {/* Autopay row */}
              <div className="flex items-center gap-[12px] px-[16px] py-[12px]">
                <p className="text-[14px] font-semibold text-[#001435] leading-[20px] shrink-0 w-[56px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Autopay
                </p>
                <div className="flex flex-1 items-center gap-[10px] min-w-0">
                  {/* Card art */}
                  <div className="h-[36px] rounded-[4px] shrink-0 w-[54px] overflow-clip">
                    <Image src="/images/paypal/BankOfAmericaCardArt.png" alt="" width={54} height={36} className="object-cover w-full h-full" />
                  </div>
                  {/* Card info */}
                  <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                    <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Bank of America Debit
                    </p>
                    <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Debit ••7485
                    </p>
                  </div>
                  {/* Chevron */}
                  <svg className="shrink-0" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#545D68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date of birth input */}
            <div className="px-[20px] py-[8px] flex flex-col gap-[4px]">
              <div
                className="relative cursor-text bg-white"
                style={{
                  height: 64,
                  border: `${dobBorderWidth}px solid ${dobBorderColor}`,
                  borderRadius: dobBorderRadius,
                }}
                onClick={() => dobRef.current?.focus()}
              >
                {/* Label — centered when resting, floats to top when focused or filled */}
                <span
                  className="pointer-events-none absolute left-[12px]"
                  style={{
                    top: dobIsFloating ? 8 : "50%",
                    transform: dobIsFloating ? "none" : "translateY(-50%)",
                    fontSize: dobIsFloating ? 14 : 16,
                    lineHeight: dobIsFloating ? "20px" : "24px",
                    color: "#545d68",
                    fontFamily: "system-ui, sans-serif",
                    transition: "top 0.15s ease, font-size 0.15s ease, transform 0.15s ease",
                    zIndex: 1,
                  }}
                >
                  Date of birth
                </span>
                {/* Value input — sits below the floating label */}
                <input
                  ref={dobRef}
                  type="text"
                  value={dobValue}
                  onChange={(e) => setDobValue(formatDob(e.target.value))}
                  onFocus={() => setDobFocused(true)}
                  onBlur={() => setDobFocused(false)}
                  className="absolute"
                  style={{
                    bottom: 8,
                    left: 12,
                    right: 8,
                    height: 24,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: "#001435",
                    fontFamily: "system-ui, sans-serif",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    opacity: dobIsFloating ? 1 : 0,
                    pointerEvents: dobIsFloating ? "auto" : "none",
                  }}
                />
              </div>
              {dobIsError ? (
                <div className="flex items-center gap-[4px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M12 4L21 19H3L12 4Z" fill="#d50102" />
                    <path d="M12 10V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="16.5" r="0.75" fill="white" />
                  </svg>
                  <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Date of birth doesn&apos;t match our records.
                  </p>
                </div>
              ) : (
                <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  We&apos;ll use it to verify your identity
                </p>
              )}
            </div>

            {/* Legal text */}
            <div className="px-[20px] py-[8px]">
              <p className="text-[14px] text-[#364153] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                By continuing, you agree to the{" "}
                <span className="text-[#0070e0] underline cursor-pointer">E-Sign Consent</span>{" "}
                and{" "}
                <span className="text-[#0070e0] underline cursor-pointer">State Disclosures</span>
                . You also agree to let us run a soft credit check, which won&apos;t affect your credit score.
              </p>
            </div>

            {/* Checkbox consent */}
            <div className="px-[10px] pt-[4px] pb-[8px]">
              {/* Checkbox row */}
              <div className="flex items-center gap-[12px] px-[4px] py-[12px]">
                <button
                  onClick={() => { setAgreed(!agreed); setConsentError(false); }}
                  className="shrink-0 w-[24px] h-[24px] rounded-[4px] flex items-center justify-center cursor-pointer"
                  style={{ border: agreed ? "none" : consentError ? "2px solid #d50102" : "1.5px solid #737b84", background: agreed ? "#0070e0" : "white" }}
                >
                  {agreed && (
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                      <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <p className="text-[14px] text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  You have read and agree to:
                </p>
              </div>
              {/* Supporting text */}
              <div className="pl-[44px] pr-[10px] pb-[4px]">
                <p className="text-[14px] text-[#364153] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  The{" "}
                  <span className="text-[#0070e0] underline cursor-pointer">Loan Agreement</span>{" "}
                  and{" "}
                  <span className="text-[#0070e0] underline cursor-pointer">Payment Authorization</span>{" "}
                  for autopay.
                </p>
              </div>
              {/* Consent error message */}
              {consentError && (
                <div className="flex items-center gap-[4px] px-[4px] pt-[4px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M12 4L21 19H3L12 4Z" fill="#d50102" />
                    <path d="M12 10V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="16.5" r="0.75" fill="white" />
                  </svg>
                  <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Please agree to continue
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA footer */}
          <div
            className="bg-[#f1f2f3] flex flex-col items-center gap-[12px] px-[20px] pt-[8px] pb-[12px] shrink-0 w-full"
            style={{ boxShadow: "inset 0 0.5px 0 0 #e0e3e7" }}
          >
            <button className="text-[14px] font-medium text-[#0070e0] leading-[20px] cursor-pointer pt-[4px]" style={{ fontFamily: "system-ui, sans-serif" }}>
              About payment methods
            </button>
            <button
              onClick={() => { if (!agreed) setConsentError(true); }}
              className="bg-[#0544b5] rounded-full flex items-center justify-center h-[48px] w-full cursor-pointer hover:bg-[#003da8] transition-colors"
            >
              <span className="text-[16px] font-semibold text-white leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                Agree and Apply
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
