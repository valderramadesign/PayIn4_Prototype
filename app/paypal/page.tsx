"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

function ListRow({
  label,
  children,
  roundedTop = false,
  roundedBottom = false,
}: {
  label: string;
  children: React.ReactNode;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}) {
  const radiusClass = [
    roundedTop ? "rounded-tl-[16px] rounded-tr-[16px]" : "",
    roundedBottom ? "rounded-bl-[16px] rounded-br-[16px]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex items-start px-[20px] w-full shrink-0">
      <div className="flex-1 min-w-0">
        <div
          className={`relative flex items-start w-full overflow-clip bg-white ${radiusClass}`}
          style={{
            boxShadow: roundedTop && roundedBottom
              ? "inset 0 0.5px 0 0 #cdd0d4, inset 0 -0.5px 0 0 #cdd0d4, inset 0.5px 0 0 0 #e9ecf0, inset -0.5px 0 0 0 #e9ecf0"
              : roundedTop
              ? "inset 0 -0.5px 0 0 #cdd0d4"
              : roundedBottom
              ? "inset 0 0.5px 0 0 #cdd0d4, inset 0 -0.5px 0 0 #cdd0d4, inset 0.5px 0 0 0 #e9ecf0, inset -0.5px 0 0 0 #e9ecf0"
              : "inset 0 0.5px 0 0 #cdd0d4, inset 0 -0.5px 0 0 #cdd0d4, inset 0.5px 0 0 0 #e9ecf0, inset -0.5px 0 0 0 #e9ecf0",
          }}
        >
          {/* Label column */}
          <div className="flex flex-col items-start overflow-clip pl-[16px] pr-[12px] py-[14px] shrink-0 w-[96px]">
            <p className="text-[14px] text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
              {label}
            </p>
          </div>

          {/* Content column */}
          <div className="flex flex-1 flex-col gap-px items-start min-w-0 py-[14px]">
            {children}
          </div>

          {/* Chevron */}
          <div className="flex flex-col items-start pl-[8px] pr-[16px] py-[16px] shrink-0">
            <ChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
}

const PAYMENT_METHODS = [
  { id: 0, name: "Chase Sapphire Visa", detail: "Credit ••3339", image: "/images/paypal/card-thumbnail.png" },
  { id: 1, name: "Bank of America", detail: "Debit ••7485", image: "/images/paypal/BankOfAmericaCardArt.png" },
  { id: 2, name: "PayPal balance", detail: "Use $20.00", image: "/images/paypal/PayPalBalanceCardArt.png" },
  { id: 3, name: "PayPal Rewards", detail: "Redeem 500 pts ($5.00)", image: "/images/paypal/PayPalRewardsCardArt.png" },
];

const ADDRESSES = [
  { name: "Alisha Burgos", address: "208 Copperhead Road, Hartford, CT 95821" },
  { name: "Alisha Burgos", address: "123 Relington Street, Apt 3, Los Angeles, CA 90210" },
  { name: "Alisha Burgos", address: "456 Doral Street, Miami, FL 33156" },
  { name: "Isabella Harrell", address: "83 NW. Carpenter Street, Apt 378, Brooklyn, NY 11235" },
  { name: "Ewan McPherson", address: "725 Southampton Ave, Apt 41, Brooklyn, NY 11256" },
];

const DELIVERY_OPTIONS = [
  { label: "Standard", sublabel: "5-7 business days", price: "$0.00", cost: 0.00, summary: "5-7 business days, $0.00" },
  { label: "USPS 2-Day Select", sublabel: "3-5 business days", price: "$5.95", cost: 5.95, summary: "3-5 business days, $5.95" },
  { label: "Express 1 Day Overnight", sublabel: "1-2 business days", price: "$20.25", cost: 20.25, summary: "1-2 business days, $20.25" },
];

export default function PayPalCheckout() {
  const router = useRouter();
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("approved") === "true") {
        setIsApproved(true);
      }
    }
  }, []);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const [dragged, setDragged] = useState(false);
  const [payWithExpanded, setPayWithExpanded] = useState(false);
  const [shipToExpanded, setShipToExpanded] = useState(false);
  const [deliveryExpanded, setDeliveryExpanded] = useState(false);
  const [contactExpanded, setContactExpanded] = useState(false);
  const [orderExpanded, setOrderExpanded] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState(0);

  const currentTotal = 210.00 + DELIVERY_OPTIONS[selectedDelivery].cost;

  function scrollRight() {
    carouselRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  }

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

      {/* Dark background with radial gradient */}
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
            {/* Close */}
            <button
              onClick={() => router.push("/")}
              className="flex flex-col items-start justify-center pb-[12px] pt-[16px] px-[20px] shrink-0 w-[74px] cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Close" className="w-[16px] h-[16px]" src="/images/paypal/close-color.svg" />
            </button>

            {/* PayPal wordmark — centered */}
            <div className="flex flex-1 items-center justify-center pb-[8px] pt-[16px] h-[52px]">
              <div className="relative h-[24px] w-[83px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="PayPal" className="absolute inset-0 w-full h-full object-contain" src="/images/paypal/paypal-wordmark-color.svg" />
              </div>
            </div>

            {/* Avatar */}
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
              {/* Pay in full — selected */}
              <div
                className="bg-white flex flex-col items-start overflow-clip rounded-[16px] shrink-0 w-[128px]"
                style={{
                  border: "1.5px solid #097FF5",
                  boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex flex-col gap-[2px] items-start pb-[8px] shrink-0 w-full">
                  <div className="flex items-center shrink-0 w-full">
                    {/* Radio button — checked */}
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
              </div>

              {/* Pay in 4 */}
              <button
                onClick={() => {
                  if (!dragged) {
                    if (isApproved) {
                      router.push("/paypal/pay-in-4-approved?approved=true");
                    } else {
                      router.push("/paypal/pay-in-4");
                    }
                  }
                }}
                className="bg-white flex flex-col items-start overflow-clip rounded-[16px] shrink-0 w-[192px] text-left cursor-pointer"
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
                          Pay in 4
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start px-[12px] shrink-0 w-full">
                    <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      4 interest-free payments of ${(currentTotal / 4).toFixed(2)}. No late fees.
                    </p>
                  </div>
                </div>
                {/* Pre-approved + Terms footer */}
                <div
                  className="relative flex gap-[12px] h-[44px] items-center pb-[12px] pt-[10px] px-[12px] shrink-0 w-full border-t border-[#cdd0d4]"
                >
                  <div className="flex flex-1 flex-col items-start min-w-0 relative">
                    <span
                      className="bg-[rgba(209,229,249,0.9)] text-[14px] text-[#001435] leading-[20px] px-[8px] py-[2px] rounded-[6px] whitespace-nowrap"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {isApproved ? "Approved" : "Pre-approved"}
                    </span>
                  </div>
                  <span
                    className="text-[14px] text-[#0070e0] leading-[20px] underline shrink-0 relative whitespace-nowrap cursor-pointer hover:text-[#004e9e] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(isApproved ? "/paypal/pay-in-4-terms?from=pay-in-4-approved&approved=true" : "/paypal/pay-in-4-terms");
                    }}
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Terms
                  </span>
                </div>
              </button>

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
            </div>

            {/* Right arrow — CarouselArrows component */}
            <div className="absolute right-[20px] top-1/2 -translate-y-1/2 mt-[5.5px]">
              <button onClick={scrollRight} className="bg-[rgba(255,255,255,0.9)] border border-[#545d68] flex flex-col items-start p-[8px] rounded-[20px] drop-shadow-[0px_0px_4px_rgba(0,0,0,0.04)] cursor-pointer">
                {/* ChevronRight — 24px icon, arrow color fill rotated 90° within inset bounds */}
                <div className="relative shrink-0 size-[24px]">
                  <div className="absolute flex items-center justify-center" style={{ inset: "17.08% 31.26%", containerType: "size" }}>
                    <div className="flex-none rotate-90" style={{ height: "100cqw", width: "100cqh" }}>
                      <div className="relative size-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/paypal/chevron-right-arrow.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Accordion list rows */}
          <div className="flex flex-1 flex-col items-start min-h-0 overflow-y-auto pb-[12px] w-full" style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.04)" }}>
            {/* Pay with — collapsed or expanded */}
            {payWithExpanded ? (
              <div className="flex items-start pt-[12px] px-[20px] w-full">
                <div className="flex-1 min-w-0">
                  <div
                    className="relative flex flex-col w-full bg-white"
                    style={{ border: "0.5px solid #e9ecf0" }}
                  >
                    {/* Header — click to collapse */}
                    <button
                      onClick={() => setPayWithExpanded(false)}
                      className="flex items-center justify-between pl-[16px] pr-[16px] py-[14px] w-full cursor-pointer"
                    >
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Pay with
                      </p>
                      <ChevronUp />
                    </button>

                    {/* Dynamic payment methods */}
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => {
                          setSelectedPayment(method.id);
                          setPayWithExpanded(false);
                        }}
                        className="w-full flex items-center pl-[16px] pr-[16px] py-[12px] gap-[12px] cursor-pointer text-left"
                      >
                        {selectedPayment === method.id ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img alt="" className="w-[24px] h-[24px] shrink-0" src="/images/paypal/radio-selected.svg" />
                        ) : (
                          <div className="rounded-full border border-[#737b84] shrink-0 size-[24px] bg-white" />
                        )}
                        <div className="h-[36px] rounded-[4px] shrink-0 w-[54px] overflow-clip">
                          <Image src={method.image} alt="" width={54} height={36} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex flex-1 flex-col gap-px min-w-0">
                          <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>{method.name}</p>
                          <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>{method.detail}</p>
                        </div>
                        {method.id === 0 && (
                          <p className="text-[16px] font-semibold text-[#001435] leading-[21px] shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>${currentTotal.toFixed(2)}</p>
                        )}
                      </button>
                    ))}

                    {/* Add card */}
                    <div className="flex items-center pl-[16px] pr-[16px] py-[12px] gap-[12px]">
                      <div className="relative shrink-0 size-[24px]">
                        <div className="absolute" style={{ inset: "16.67%" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="" className="absolute inset-0 w-full h-full" src="/images/paypal/icon-add.svg" />
                        </div>
                      </div>
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>Add card</p>
                    </div>

                    {/* PayPal Credit */}
                    <div className="flex items-start pl-[16px] pr-[16px] py-[12px] gap-[12px]">
                      <div className="h-[36px] rounded-[4px] shrink-0 w-[54px] overflow-clip">
                        <Image src="/images/paypal/PayPalCreditCardArt.png" alt="" width={54} height={36} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex flex-1 flex-col gap-px min-w-0">
                        <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>PayPal Credit</p>
                        <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                          Subject to credit approval.{" "}
                          <span className="text-[#0070e0] underline">See terms</span>
                        </p>
                      </div>
                      <button className="text-[14px] text-[#0070e0] leading-[20px] shrink-0 whitespace-nowrap cursor-pointer" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start pt-[12px] px-[20px] shrink-0 w-full">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setPayWithExpanded(true)}
                    className="relative flex items-start w-full overflow-clip bg-white rounded-tl-[16px] rounded-tr-[16px] cursor-pointer text-left"
                    style={{ boxShadow: "inset 0 -0.5px 0 0 #cdd0d4", border: "0.5px solid #e9ecf0" }}
                  >
                    {/* Label */}
                    <div className="flex flex-col items-start overflow-clip pl-[16px] pr-[12px] py-[14px] shrink-0 w-[96px]">
                      <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Pay with
                      </p>
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 items-start min-w-0 overflow-clip">
                      <div className="flex flex-col items-start pr-[12px] pt-[17px] shrink-0">
                        <div className="h-[36px] rounded-[4px] shrink-0 w-[54px] overflow-clip">
                          <Image
                            src={PAYMENT_METHODS[selectedPayment].image}
                            alt=""
                            width={54}
                            height={36}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col gap-px items-start min-w-0 py-[14px]">
                        <p className="text-[16px] font-semibold text-[#001435] leading-[21px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>
                          {PAYMENT_METHODS[selectedPayment].name}
                        </p>
                        <p className="text-[14px] text-[#545d68] leading-[20px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>
                          {PAYMENT_METHODS[selectedPayment].detail}
                        </p>
                      </div>
                    </div>
                    {/* Chevron */}
                    <div className="flex flex-col items-start pl-[8px] pr-[16px] py-[16px] shrink-0">
                      <ChevronDown />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Ship to — collapsed or expanded */}
            {shipToExpanded ? (
              <div className="flex items-start px-[20px] w-full">
                <div className="flex-1 min-w-0">
                  <div
                    className="relative flex flex-col w-full bg-white"
                    style={{ border: "0.5px solid #e9ecf0" }}
                  >
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
                </div>
              </div>
            ) : (
              <div className="flex items-start px-[20px] shrink-0 w-full">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setShipToExpanded(true)}
                    className="relative flex items-start w-full overflow-clip bg-white cursor-pointer text-left"
                    style={{ boxShadow: "inset 0 0.5px 0 0 #cdd0d4, inset 0 -0.5px 0 0 #cdd0d4, inset 0.5px 0 0 0 #e9ecf0, inset -0.5px 0 0 0 #e9ecf0" }}
                  >
                    <div className="flex flex-col items-start overflow-clip pl-[16px] pr-[12px] py-[14px] shrink-0 w-[96px]">
                      <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Ship to</p>
                    </div>
                    <div className="flex flex-1 flex-col gap-px items-start min-w-0 py-[14px]">
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>{ADDRESSES[selectedAddress].name}</p>
                      <p className="text-[14px] text-[#545d68] leading-[20px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>{ADDRESSES[selectedAddress].address}</p>
                    </div>
                    <div className="flex flex-col items-start pl-[8px] pr-[16px] py-[16px] shrink-0">
                      <ChevronDown />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Delivery — collapsed or expanded */}
            {deliveryExpanded ? (
              <div className="flex items-start px-[20px] w-full">
                <div className="flex-1 min-w-0">
                  <div
                    className="relative flex flex-col w-full bg-white"
                    style={{ border: "0.5px solid #e9ecf0" }}
                  >
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
                </div>
              </div>
            ) : (
              <div className="flex items-start px-[20px] shrink-0 w-full">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setDeliveryExpanded(true)}
                    className="relative flex items-start w-full overflow-clip bg-white cursor-pointer text-left"
                    style={{ boxShadow: "inset 0 0.5px 0 0 #cdd0d4, inset 0 -0.5px 0 0 #cdd0d4, inset 0.5px 0 0 0 #e9ecf0, inset -0.5px 0 0 0 #e9ecf0" }}
                  >
                    <div className="flex flex-col items-start overflow-clip pl-[16px] pr-[12px] py-[14px] shrink-0 w-[96px]">
                      <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Delivery</p>
                    </div>
                    <div className="flex flex-1 flex-col gap-px items-start min-w-0 py-[14px]">
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>{DELIVERY_OPTIONS[selectedDelivery].label}</p>
                      <p className="text-[14px] text-[#545d68] leading-[20px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>{DELIVERY_OPTIONS[selectedDelivery].summary}</p>
                    </div>
                    <div className="flex flex-col items-start pl-[8px] pr-[16px] py-[16px] shrink-0">
                      <ChevronDown />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Contact — collapsed or expanded */}
            {contactExpanded ? (
              <div className="flex items-start px-[20px] w-full">
                <div className="flex-1 min-w-0">
                  <div
                    className="relative flex flex-col w-full bg-white"
                    style={{ border: "0.5px solid #e9ecf0" }}
                  >
                    {/* Header — click to collapse */}
                    <button
                      onClick={() => setContactExpanded(false)}
                      className="flex items-center justify-between pl-[16px] pr-[16px] py-[14px] w-full cursor-pointer"
                    >
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Contact
                      </p>
                      <ChevronUp />
                    </button>

                    {/* Contact info */}
                    <div className="flex flex-col gap-px pl-[16px] pr-[16px] py-[14px]">
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>alisha.burgos@gmail.com</p>
                      <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>(650) 234-5678</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start px-[20px] shrink-0 w-full">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setContactExpanded(true)}
                    className="relative flex items-start w-full overflow-clip bg-white cursor-pointer text-left"
                    style={{ boxShadow: "inset 0 0.5px 0 0 #cdd0d4, inset 0 -0.5px 0 0 #cdd0d4, inset 0.5px 0 0 0 #e9ecf0, inset -0.5px 0 0 0 #e9ecf0" }}
                  >
                    <div className="flex flex-col items-start overflow-clip pl-[16px] pr-[12px] py-[14px] shrink-0 w-[96px]">
                      <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Contact</p>
                    </div>
                    <div className="flex flex-1 flex-col gap-px items-start min-w-0 py-[14px]">
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>alisha.burgos@gmail.com</p>
                      <p className="text-[14px] text-[#545d68] leading-[20px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>(650) 234-5678</p>
                    </div>
                    <div className="flex flex-col items-start pl-[8px] pr-[16px] py-[16px] shrink-0">
                      <ChevronDown />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Order — collapsed or expanded */}
            {orderExpanded ? (
              <div className="flex items-start px-[20px] w-full">
                <div className="flex-1 min-w-0">
                  <div
                    className="relative flex flex-col w-full bg-white"
                    style={{ border: "0.5px solid #e9ecf0" }}
                  >
                    {/* Header — click to collapse */}
                    <button
                      onClick={() => setOrderExpanded(false)}
                      className="flex items-center justify-between pl-[16px] pr-[16px] py-[14px] w-full cursor-pointer"
                    >
                      <p className="text-[16px] font-semibold text-[#001435] leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Order details
                      </p>
                      <ChevronUp />
                    </button>

                    {/* Product 1 */}
                    <div className="flex items-start pl-[16px] pr-[16px] py-[12px] gap-[12px]">
                      <div className="flex flex-1 flex-col gap-px min-w-0">
                        <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Men&apos;s Nike Air Max Flyknit Racer Next Nature</p>
                        <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Black / White <span style={{ color: "#b5b7ba" }}>|</span> 9</p>
                        <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Quantity: 1</p>
                      </div>
                      <p className="text-[14px] text-[#001435] leading-[20px] shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>$155.00</p>
                    </div>

                    {/* Product 2 */}
                    <div className="flex items-start pl-[16px] pr-[16px] py-[12px] gap-[12px]">
                      <div className="flex flex-1 flex-col gap-px min-w-0">
                        <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Nike Victori One</p>
                        <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Black / Black / White <span style={{ color: "#b5b7ba" }}>|</span> W 10 / M 9</p>
                        <p className="text-[14px] text-[#545d68] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Quantity: 1</p>
                      </div>
                      <p className="text-[14px] text-[#001435] leading-[20px] shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>$100.00</p>
                    </div>

                    {/* Summary rows */}
                    <div className="flex flex-col pl-[16px] pr-[16px] py-[12px] gap-[8px]">
                      {[
                        { label: "Subtotal", value: "$255.00" },
                        { label: "Shipping", value: DELIVERY_OPTIONS[selectedDelivery].price },
                        { label: "Tax", value: "$10.00" },
                      ].map(row => (
                        <div key={row.label} className="flex items-center justify-between">
                          <p className="text-[14px] text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>{row.label}</p>
                          <p className="text-[14px] text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>{row.value}</p>
                        </div>
                      ))}

                      {/* Offers */}
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>3 offers applied:</p>
                      </div>
                      {[
                        { label: "Christmasdeal2023", value: "-$15.00" },
                        { label: "Voucher 1", value: "-$20.00" },
                        { label: "Voucher 2", value: "-$20.00" },
                      ].map(offer => (
                        <div key={offer.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-[6px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img alt="" className="w-[14px] h-[14px] shrink-0" src="/images/paypal/checkmark-color.svg" />
                            <p className="text-[14px] text-[#388c00] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>{offer.label}</p>
                          </div>
                          <p className="text-[14px] text-[#388c00] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>{offer.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Total row */}
                    <div className="flex items-center justify-between pl-[16px] pr-[16px] py-[12px]">
                      <p className="text-[14px] text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Total</p>
                      <p className="text-[20px] font-medium text-[#001435] leading-[26px]" style={{ fontFamily: "system-ui, sans-serif" }}>${currentTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start px-[20px] w-full shrink-0">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setOrderExpanded(true)}
                    className="relative flex items-start w-full overflow-clip bg-white rounded-bl-[16px] rounded-br-[16px] cursor-pointer text-left"
                    style={{
                      border: "0.5px solid #e9ecf0",
                      boxShadow: "inset 0 0.5px 0 0 #cdd0d4, inset 0 -0.5px 0 0 #cdd0d4, inset 0.5px 0 0 0 #e9ecf0, inset -0.5px 0 0 0 #e9ecf0",
                    }}
                  >
                    <div className="flex flex-col items-start overflow-clip pl-[16px] pr-[12px] py-[14px] shrink-0 w-[96px]">
                      <p className="text-[14px] font-semibold text-[#001435] leading-[20px]" style={{ fontFamily: "system-ui, sans-serif" }}>Order</p>
                    </div>
                    <div className="flex flex-1 flex-col gap-px items-start min-w-0 py-[14px]">
                      <div className="flex gap-[4px] items-end w-full">
                        <p className="text-[16px] font-semibold text-[#001435] leading-[21px] whitespace-nowrap" style={{ fontFamily: "system-ui, sans-serif" }}>${currentTotal.toFixed(2)}</p>
                        <p className="text-[14px] text-[#545d68] leading-[18px] line-through whitespace-nowrap" style={{ fontFamily: "system-ui, sans-serif" }}>${(265.00 + DELIVERY_OPTIONS[selectedDelivery].cost).toFixed(2)}</p>
                      </div>
                      <p className="text-[14px] text-[#388c00] leading-[20px] w-full" style={{ fontFamily: "system-ui, sans-serif" }}>You&apos;re saving $55.00!</p>
                    </div>
                    <div className="flex flex-col items-start pl-[8px] pr-[16px] py-[16px] shrink-0">
                      <ChevronDown />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CTA footer */}
          <div
            className="relative flex flex-col items-start shrink-0 w-full pb-[8px]"
            style={{
              background: "#f1f2f3",
              boxShadow: "0px 0px 4px rgba(0,0,0,0.04), inset 0px 1px 0px 0px #cdd0d4",
            }}
          >
            {/* About payment methods link */}
            <div className="flex flex-col items-center pt-[8px] px-[24px] shrink-0 w-full">
              <p
                className="text-[14px] text-[#0070e0] leading-[20px] underline text-center w-full max-w-[327px]"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                About payment methods
              </p>
            </div>

            {/* Pay button */}
            <div className="flex flex-col items-start px-[20px] py-[12px] shrink-0 w-full">
              <div className="relative flex gap-[4px] h-[48px] items-center justify-center px-[32px] py-[12px] rounded-[100px] w-full bg-[#0544b5]">
                {/* "Pay" left side */}
                <div className="flex flex-1 flex-col justify-center min-w-0">
                  <p className="text-[16px] text-white leading-[21px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Pay
                  </p>
                </div>
                {/* Divider + amount */}
                <div className="flex gap-[8px] items-center justify-end shrink-0">
                  {/* Vertical divider line */}
                  <div className="h-[24px] w-px bg-white opacity-30 shrink-0" />
                  <p className="text-[16px] text-white leading-[21px] whitespace-nowrap" style={{ fontFamily: "system-ui, sans-serif" }}>
                    ${currentTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
