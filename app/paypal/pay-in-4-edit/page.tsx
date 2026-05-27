"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function FloatingInput({
  label,
  defaultValue = "",
}: {
  label: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const isFloating = focused || value.length > 0;

  return (
    <div
      className="relative bg-white w-full cursor-text"
      style={{
        height: 64,
        border: focused ? "2px solid #097bf5" : "1px solid #737b84",
        borderRadius: focused ? 10 : 8,
      }}
      onClick={() => ref.current?.focus()}
    >
      <span
        className="pointer-events-none absolute"
        style={{
          left: 12,
          top: isFloating ? 8 : "50%",
          transform: isFloating ? "none" : "translateY(-50%)",
          fontSize: isFloating ? 14 : 16,
          lineHeight: isFloating ? "20px" : "24px",
          color: "#545d68",
          fontFamily: "system-ui, sans-serif",
          transition: "top 0.15s ease, font-size 0.15s ease, transform 0.15s ease",
          zIndex: 1,
        }}
      >
        {label}
      </span>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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
          opacity: isFloating ? 1 : 0,
          pointerEvents: isFloating ? "auto" : "none",
        }}
      />
    </div>
  );
}

function DropdownField({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="relative bg-white w-full"
      style={{ height: 64, border: "1px solid #737b84", borderRadius: 8 }}
    >
      <span
        className="pointer-events-none absolute"
        style={{
          left: 12,
          top: 8,
          fontSize: 14,
          lineHeight: "20px",
          color: "#545d68",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {label}
      </span>
      <span
        className="absolute"
        style={{
          left: 12,
          bottom: 8,
          fontSize: 16,
          lineHeight: "24px",
          color: "#001435",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {value}
      </span>
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center" style={{ width: 48 }}>
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path d="M1 1L6 6L11 1" stroke="#545D68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function PayIn4Edit() {
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
        className="flex-1 flex items-stretch sm:items-center justify-center py-0 sm:py-[60px] px-0 sm:px-4"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #222 0%, #181818 25%, #101010 50%, #080808 75%, #000 100%)",
        }}
      >
        {/* Modal card */}
        <div
          className="bg-[#f1f2f3] sm:rounded-[32px] sm:border sm:border-[#cfd3d8] flex flex-col overflow-clip shrink-0 w-full sm:max-w-[424px] sm:min-h-[700px] sm:max-h-[900px]"
        >
          {/* Nav */}
          <div className="bg-[#f1f2f3] flex items-center h-[52px] shrink-0 w-full relative">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center h-full px-[20px] shrink-0 w-[74px] cursor-pointer"
            >
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
                <path d="M8.5 1.5L1.5 8.5L8.5 15.5" stroke="#001435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-[20px] text-[#001435] leading-[24px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                Edit
              </p>
            </div>
          </div>

          {/* Section header */}
          <div className="flex items-center px-[20px] shrink-0" style={{ minHeight: 60 }}>
            <p className="text-[20px] font-medium text-[#001435] leading-[24px]" style={{ fontFamily: "system-ui, sans-serif" }}>
              Billing address and phone number
            </p>
          </div>

          {/* Scrollable form */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="px-[20px] pb-[8px] flex flex-col gap-[16px]">
              <FloatingInput label="Street address" defaultValue="208 Copperhead Road" />
              <FloatingInput label="Apt., ste., bldg. (optional)" />
              <FloatingInput label="City" defaultValue="Hartford" />

              {/* State + ZIP */}
              <div className="flex gap-[16px]">
                <div className="flex-1">
                  <DropdownField label="State" value="CT" />
                </div>
                <div className="flex-1">
                  <FloatingInput label="ZIP Code" defaultValue="95821" />
                </div>
              </div>

              {/* Phone type + Phone number */}
              <div className="flex gap-[16px]">
                <div className="flex-1">
                  <DropdownField label="Phone type" value="Mobile" />
                </div>
                <div className="flex-1">
                  <FloatingInput label="Phone number" defaultValue="(650) 234-5678" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA footer */}
          <div
            className="bg-[#f1f2f3] flex flex-col items-center px-[20px] pt-[12px] pb-[24px] shrink-0 w-full"
            style={{ boxShadow: "inset 0 0.5px 0 0 #e0e3e7" }}
          >
            <button
              onClick={() => router.back()}
              className="bg-[#0544b5] rounded-full flex items-center justify-center h-[48px] w-full cursor-pointer hover:bg-[#003da8] transition-colors"
            >
              <span className="text-[16px] font-semibold text-white leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                Save
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
