"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <div className="absolute" style={{ inset: "33.33% 22.22% 33.35% 22.22%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/paypal/chevron-down-icon.svg" />
      </div>
    </div>
  );
}

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <div className="absolute" style={{ inset: "33.33% 22.22% 33.35% 22.22%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/paypal/chevron-up-icon.svg" />
      </div>
    </div>
  );
}

const ADDRESSES = [
  { name: "Alisha Burgos", address: "208 Copperhead Road, Hartford, CT 95821" },
  { name: "Alisha Burgos", address: "123 Relington Street, Apt 3, Los Angeles, CA 90210" },
  { name: "Alisha Burgos", address: "456 Doral Street, Miami, FL 33156" },
  { name: "Isabella Harrell", address: "83 NW. Carpenter Street, Apt 378, Brooklyn, NY 11235" },
  { name: "Ewan McPherson", address: "725 Southampton Ave, Apt 41, Brooklyn, NY 11256" },
];

const DELIVERY_OPTIONS = [
  { label: "Standard", sublabel: "5-7 business days", price: "$0.00", cost: 0.00, summary: "5–7 days" },
  { label: "USPS 2-Day Select", sublabel: "3-5 business days", price: "$5.95", cost: 5.95, summary: "3–5 days" },
  { label: "Express 1 Day Overnight", sublabel: "1-2 business days", price: "$20.25", cost: 20.25, summary: "1–2 days" },
];

export default function PayIn4() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const [dragged, setDragged] = useState(false);
  const [shipToExpanded, setShipToExpanded] = useState(false);
  const [deliveryExpanded, setDeliveryExpanded] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState(0);

  const currentTotal = 210.00 + DELIVERY_OPTIONS[selectedDelivery].cost;
  const currentInstallment = currentTotal / 4;

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    setDragged(false);
    dragStartX.current = e.pageX - (carouselRef.current?.offsetLeft ?? 0);
    dragScrollLeft.current = carouselRef.current?.scrollLeft ?? 0;
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const delta = x - dragStartX.current;
    if (Math.abs(delta) > 4) setDragged(true);
    carouselRef.current.scrollLeft = dragScrollLeft.current - delta;
  }

  function onMouseUp() {
    isDragging.current = false;
  }

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
          className="bg-[#f1f2f3] sm:rounded-[32px] sm:border sm:border-[#cfd3d8] flex flex-col overflow-clip shrink-0 relative w-full sm:max-w-[424px] sm:min-h-[700px] sm:max-h-[900px]"
        >
          {/* Nav header */}
          <div className="bg-[#f1f2f3] flex items-end h-[60px] overflow-clip shrink-0 w-full">
            <button
              onClick={() => router.push("/")}
              className="flex flex-col items-start justify-center pb-[12px] pt-[16px] px-[20px] shrink-0 w-[74px] cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Close" className="w-[16px] h-[16px]" src="/images/paypal/close-color.svg" />
            </button>

            <div className="flex flex-1 items-center justify-center pb-[8px] pt-[16px] h-[52px]">
              <div className="relative h-[24px] w-[83px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="PayPal" className="absolute inset-0 w-full h-full object-contain" src="/images/paypal/paypal-wordmark-color.svg" />
              </div>
            </div>

            <div className="flex items-center justify-end pb-[8px] pr-[20px] pt-[12px] shrink-0 w-[74px]">
              <div className="rounded-full overflow-clip shrink-0 w-[32px] h-[32px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Profile" className="w-full h-full object-cover" src="/images/paypal/avatar-profile.svg" />
              </div>
            </div>
          </div>

          {/* Payment carousel */}
          <div className="relative h-[149px] shrink-0 w-full overflow-hidden">
            <div
              ref={carouselRef}
              className="absolute inset-0 flex gap-[8px] items-stretch overflow-x-auto overflow-y-hidden pt-[12px] px-[20px] pb-[12px] select-none"
              style={{ scrollbarWidth: "none", cursor: dragged ? "grabbing" : "grab" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {/* Pay in full — unselected */}
              <button
                onClick={() => { if (!dragged) router.push("/paypal"); }}
                className="bg-white flex flex-col items-start overflow-clip rounded-[16px] shrink-0 w-[128px] text-left cursor-pointer"
                style={{
                  border: "1px solid #e9ecf0",
                  boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex flex-col gap-[2px] items-start pb-[8px] shrink-0 w-full">
                  <div className="flex items-center shrink-0 w-full">
                    <div className="flex items-start pl-[10px] pt-[10px] shrink-0">
                      <div className="relative rounded-[4px] shrink-0 size-[18px]">
                        <div className="absolute inset-0 rounded-full bg-white border border-[#929496]" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-row items-center self-stretch">
                      <div className="flex flex-1 gap-[4px] h-full items-end min-w-0 pb-px pl-[8px] pt-[10px]">
                        <p className="text-[16px] font-semibold text-[#001435] leading-[21px] whitespace-nowrap" style={{ fontFamily: "system-ui, sans-serif" }}>
                          Pay in full
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start px-[12px] shrink-0 w-full">
                    <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      ${currentTotal.toFixed(2)} today
                    </p>
                  </div>
                </div>
              </button>

              {/* Pay in 4 — selected */}
              <div
                className="bg-white flex flex-col items-start overflow-clip rounded-[16px] shrink-0 w-[192px]"
                style={{
                  border: "1.5px solid #097FF5",
                  boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex flex-col gap-[2px] items-start pb-[8px] shrink-0 w-full">
                  <div className="flex items-center shrink-0 w-full">
                    <div className="flex items-start pl-[10px] pt-[10px] shrink-0">
                      <div className="relative rounded-[4px] shrink-0 size-[18px]">
                        <div className="absolute inset-0 rounded-full bg-white border border-[#929496]" />
                        <div className="absolute inset-[-16.67%]">
                          <div className="absolute inset-[12.5%]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img alt="" className="absolute inset-0 w-full h-full" src="/images/paypal/checkmark-color.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-row items-center self-stretch">
                      <div className="flex flex-1 gap-[4px] h-full items-end min-w-0 pb-px pl-[8px] pt-[10px]">
                        <p className="text-[16px] font-semibold text-[#001435] leading-[21px] whitespace-nowrap" style={{ fontFamily: "system-ui, sans-serif" }}>
                          Pay in 4
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start px-[12px] shrink-0 w-full">
                    <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      4 interest-free payments of ${currentInstallment.toFixed(2)}. No late fees.
                    </p>
                  </div>
                </div>
                <div
                  className="relative flex gap-[12px] h-[44px] items-center pb-[12px] pt-[10px] px-[12px] shrink-0 w-full border-t border-[#cdd0d4]"
                >
                  <div className="flex flex-1 flex-col items-start min-w-0 relative">
                    <span
                      className="bg-[rgba(209,229,249,0.9)] text-[14px] text-[#001435] leading-[20px] px-[8px] py-[2px] rounded-[6px] whitespace-nowrap"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      Pre-approved
                    </span>
                  </div>
                  <span
                    className="text-[14px] text-[#0070e0] leading-[20px] underline shrink-0 relative whitespace-nowrap cursor-pointer hover:text-[#004e9e] transition-colors"
                    onClick={() => router.push("/paypal/pay-in-4-terms?from=pay-in-4")}
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Terms
                  </span>
                </div>
              </div>

              {/* Pay Monthly */}
              <div
                className="bg-white flex flex-col items-start overflow-clip rounded-[16px] shrink-0 w-[192px]"
                style={{
                  border: "1px solid #e9ecf0",
                  boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex flex-col gap-[2px] items-start pb-[8px] shrink-0 w-full">
                  <div className="flex items-center shrink-0 w-full">
                    <div className="flex items-start pl-[10px] pt-[10px] shrink-0">
                      <div className="relative rounded-[4px] shrink-0 size-[18px]">
                        <div className="absolute inset-0 rounded-full bg-white border border-[#929496]" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-row items-center self-stretch">
                      <div className="flex flex-1 gap-[4px] h-full items-end min-w-0 pb-px pl-[8px] pt-[10px]">
                        <p className="text-[16px] font-semibold text-[#001435] leading-[21px] whitespace-nowrap" style={{ fontFamily: "system-ui, sans-serif" }}>
                          Pay Monthly
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start px-[12px] shrink-0 w-full">
                    <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Make 6 payments of ${((currentTotal * 1.06514) / 6).toFixed(2)}/mo.
                    </p>
                  </div>
                </div>
                <div
                  className="relative flex gap-[12px] h-[44px] items-center pb-[12px] pt-[10px] px-[12px] shrink-0 w-full"
                >
                  <div className="flex flex-1 min-w-0 h-[24px] relative" />
                  <span
                    className="text-[14px] text-[#0070e0] leading-[20px] underline shrink-0 relative whitespace-nowrap"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Terms
                  </span>
                </div>
              </div>

              {/* Spacer */}
              <div className="shrink-0 w-[12px]" />
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex flex-1 flex-col items-start min-h-0 overflow-y-auto w-full" style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.04)" }}>

            {/* Unified Info Block */}
            <div className="px-[20px] pt-[12px] pb-[8px] w-full shrink-0">
              <div
                className="bg-white rounded-[16px] overflow-clip w-full"
                style={{ border: "0.5px solid #e9ecf0" }}
              >
                {/* Offer header: icon + title + subtitle */}
                <div className="flex items-start gap-[16px] px-[16px] pt-[16px] pb-[12px]">
                  {/* Pay in 4 card art */}
                  <div className="h-[36px] rounded-[4px] shrink-0 w-[54px] overflow-clip">
                    <Image src="/images/paypal/PayIn4CardArt.png" alt="" width={54} height={36} className="object-cover w-full h-full" />
                  </div>

                  {/* Title + subtitle */}
                  <div className="flex flex-1 flex-col gap-[2px] min-w-0 pt-[2px]">
                    <p className="text-[18px] font-semibold text-[#001435] leading-[24px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Pay in 4
                    </p>
                    <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      4 interest-free payments of ${currentInstallment.toFixed(2)}. Total ${currentTotal.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Payment schedule */}
                <div className="px-[16px] py-[14px] bg-white border-b border-[#e9ecf0]">
                  <div className="relative w-full">
                    {/* Continuous horizontal connector line */}
                    <div className="absolute left-[12.5%] right-[12.5%] top-[5px] h-px bg-[#cdd0d4] z-0" />

                    <div className="flex items-center justify-between gap-[8px] relative z-10">
                      {[
                        { amount: `$${currentInstallment.toFixed(2)}`, label: "Due today" },
                        { amount: `$${currentInstallment.toFixed(2)}`, label: "Oct 23" },
                        { amount: `$${currentInstallment.toFixed(2)}`, label: "Nov 6" },
                        { amount: `$${currentInstallment.toFixed(2)}`, label: "Nov 20" },
                      ].map((payment, i) => (
                        <div key={i} className="flex flex-1 flex-col items-center gap-[6px]">
                          {/* Dot container */}
                          <div className="relative flex items-center justify-center w-full h-[10px]">
                            <div
                              className="rounded-full shrink-0"
                              style={{
                                width: 10,
                                height: 10,
                                background: i === 0 ? "#0070e0" : "#cdd0d4",
                              }}
                            />
                          </div>
                          <p className="text-[13px] font-semibold text-[#001435] leading-[18px] text-center" style={{ fontFamily: "system-ui, sans-serif" }}>
                            {payment.amount}
                          </p>
                          <p className="text-[12px] text-[#545d68] leading-[16px] text-center" style={{ fontFamily: "system-ui, sans-serif" }}>
                            {payment.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="px-[16px] py-[12px]">
                  <p className="text-[12px] text-[#6c7480] leading-[17px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    No late fees. Subject to eligibility. Payments are automatically charged every 2 weeks.{" "}
                    <span 
                      className="text-[#0070e0] underline cursor-pointer hover:text-[#004e9e] transition-colors" 
                      onClick={() => router.push("/paypal/pay-in-4-terms?from=pay-in-4")}
                    >
                      See terms
                    </span>
                  </p>
                </div>

                {/* Ship to row */}
                {!shipToExpanded ? (
                  <button
                    onClick={() => setShipToExpanded(true)}
                    className="relative flex items-start w-full overflow-clip bg-white border-t border-[#e9ecf0] cursor-pointer text-left"
                  >
                    <div className="flex flex-col items-start overflow-clip pl-[16px] pr-[12px] py-[14px] shrink-0 w-[96px]">
                      <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Ship to
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-px items-start min-w-0 py-[14px]">
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {ADDRESSES[selectedAddress].name}
                      </p>
                      <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {ADDRESSES[selectedAddress].address}
                      </p>
                    </div>
                    <div className="flex flex-col items-start pl-[8px] pr-[16px] py-[16px] shrink-0">
                      <ChevronDown />
                    </div>
                  </button>
                ) : (
                  <div className="relative flex flex-col w-full bg-white border-t border-[#e9ecf0]">
                    {/* Header — click to collapse */}
                    <button
                      onClick={() => setShipToExpanded(false)}
                      className="flex items-center justify-between pl-[16px] pr-[16px] py-[14px] w-full cursor-pointer"
                    >
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Ship to
                      </p>
                      <ChevronUp />
                    </button>

                    {/* Address rows */}
                    {ADDRESSES.map((addr, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedAddress(i);
                          setShipToExpanded(false);
                        }}
                        className="w-full flex items-start pl-[16px] pr-[16px] py-[12px] gap-[12px] cursor-pointer text-left"
                      >
                        {selectedAddress === i ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img alt="" className="w-[24px] h-[24px] shrink-0 mt-px" src="/images/paypal/radio-selected.svg" />
                        ) : (
                          <div className="rounded-full border border-[#737b84] shrink-0 size-[24px] bg-white mt-px" />
                        )}
                        <div className="flex flex-1 flex-col gap-px min-w-0">
                          <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>{addr.name}</p>
                          <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>{addr.address}</p>
                        </div>
                      </button>
                    ))}

                    {/* Add address */}
                    <div className="flex items-center pl-[16px] pr-[16px] py-[12px] gap-[12px]">
                      <div className="relative shrink-0 size-[24px]">
                        <div className="absolute" style={{ inset: "16.67%" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="" className="absolute inset-0 w-full h-full" src="/images/paypal/icon-add.svg" />
                        </div>
                      </div>
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>Add address</p>
                    </div>
                  </div>
                )}

                {/* Delivery row */}
                {!deliveryExpanded ? (
                  <button
                    onClick={() => setDeliveryExpanded(true)}
                    className="relative flex items-start w-full overflow-clip bg-white border-t border-[#e9ecf0] cursor-pointer text-left"
                  >
                    <div className="flex flex-col items-start overflow-clip pl-[16px] pr-[12px] py-[14px] shrink-0 w-[96px]">
                      <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Delivery
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-px items-start min-w-0 py-[14px]">
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {DELIVERY_OPTIONS[selectedDelivery].label}
                      </p>
                      <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {DELIVERY_OPTIONS[selectedDelivery].summary}
                      </p>
                    </div>
                    <div className="flex flex-col items-start pl-[8px] pr-[16px] py-[16px] shrink-0">
                      <ChevronDown />
                    </div>
                  </button>
                ) : (
                  <div className="relative flex flex-col w-full bg-white border-t border-[#e9ecf0]">
                    {/* Header — click to collapse */}
                    <button
                      onClick={() => setDeliveryExpanded(false)}
                      className="flex items-center justify-between pl-[16px] pr-[16px] py-[14px] w-full cursor-pointer"
                    >
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Delivery
                      </p>
                      <ChevronUp />
                    </button>

                    {/* Delivery option rows */}
                    {DELIVERY_OPTIONS.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedDelivery(i);
                          setDeliveryExpanded(false);
                        }}
                        className="w-full flex items-center pl-[16px] pr-[16px] py-[12px] gap-[12px] cursor-pointer text-left"
                      >
                        {selectedDelivery === i ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img alt="" className="w-[24px] h-[24px] shrink-0" src="/images/paypal/radio-selected.svg" />
                        ) : (
                          <div className="rounded-full border border-[#737b84] shrink-0 size-[24px] bg-white" />
                        )}
                        <div className="flex flex-1 flex-col gap-px min-w-0">
                          <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>{opt.label}</p>
                          <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>{opt.sublabel}</p>
                        </div>
                        <p className="text-[14px] text-[#001435] leading-[20px] shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>{opt.price}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Spacer to push CTA to bottom */}
            <div className="flex-1" />

          </div>

          {/* CTA footer */}
          <div
            className="relative flex flex-col items-start shrink-0 w-full pb-[8px] bg-[#f1f2f3]"
            style={{
              boxShadow: "0px 0px 4px rgba(0,0,0,0.04), inset 0px 1px 0px 0px #cdd0d4",
            }}
          >
            {/* About payment methods link */}
            <div className="flex flex-col items-center pt-[8px] px-[24px] shrink-0 w-full">
              <p
                className="text-[14px] text-[#0070e0] leading-[20px] underline text-center w-full max-w-[327px] cursor-pointer"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                About payment methods
              </p>
            </div>

            {/* Continue button */}
            <div className="flex flex-col items-start px-[20px] py-[12px] shrink-0 w-full">
              <button
                onClick={() => router.push("/paypal/pay-in-4-apply")}
                className="relative flex gap-[4px] h-[48px] items-center justify-center px-[32px] py-[12px] rounded-[100px] w-full bg-[#0544b5] cursor-pointer hover:bg-[#003da8] transition-colors"
              >
                <p className="text-[16px] text-white font-semibold leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Continue
                </p>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
