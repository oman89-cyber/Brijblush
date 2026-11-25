import * as React from "react";

export function BrijblashLogo({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const ink = inverted ? "#F8F1E3" : "#211D19";
  const green = inverted ? "#E9B949" : "#173F35";
  const gold = "#E9B949";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="1.5"
          y="1.5"
          width="33"
          height="33"
          stroke={ink}
          strokeWidth="2"
          fill={inverted ? "#173F35" : "#F8F1E3"}
        />
        {/* Delicate Peacock Feather Eye + Flute Diagonal */}
        <path
          d="M18 6C13.5 9.5 11.5 14 13 18.5C14.3 22.3 18 24 18 24C18 24 21.7 22.3 23 18.5C24.5 14 22.5 9.5 18 6Z"
          stroke={green}
          strokeWidth="1.75"
          fill="none"
        />
        <circle cx="18" cy="14.5" r="2.6" fill={gold} stroke={ink} strokeWidth="1.2" />
        {/* Delicate Bansuri (Flute) line */}
        <line x1="7" y1="27.5" x2="29" y2="23.5" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="15" cy="26.1" r="0.9" fill={gold} />
        <circle cx="19" cy="25.3" r="0.9" fill={gold} />
        <circle cx="23" cy="24.6" r="0.9" fill={gold} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-editorial text-xl sm:text-2xl font-bold tracking-tight"
          style={{ color: ink }}
        >
          BRIJBLASH
        </span>
        <span
          className="text-[9px] font-bold uppercase tracking-[0.26em] mt-0.5"
          style={{ color: inverted ? "#E9B949" : "#173F35" }}
        >
          Braj Heritage House
        </span>
      </span>
    </span>
  );
}

export function LotusDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-[1.5px] flex-1 bg-[#211D19]/25" />
      <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
        <path
          d="M14 2C11.5 6 11.5 10.5 14 14C16.5 10.5 16.5 6 14 2Z"
          fill="#E9B949"
          stroke="#211D19"
          strokeWidth="1.3"
        />
        <path
          d="M14 14C9.5 13 6.5 9.8 6 5.5C9.5 6.5 12 9 14 14Z"
          fill="#173F35"
          stroke="#211D19"
          strokeWidth="1.2"
        />
        <path
          d="M14 14C18.5 13 21.5 9.8 22 5.5C18.5 6.5 16 9 14 14Z"
          fill="#173F35"
          stroke="#211D19"
          strokeWidth="1.2"
        />
      </svg>
      <div className="h-[1.5px] flex-1 bg-[#211D19]/25" />
    </div>
  );
}

export function PeacockFeatherWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 220"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M90 12C50 42 36 86 48 130C58 166 90 198 90 198C90 198 122 166 132 130C144 86 130 42 90 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M90 42C66 64 58 94 66 124C72 148 90 166 90 166C90 166 108 148 114 124C122 94 114 64 90 42Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <ellipse cx="90" cy="96" rx="16" ry="22" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="90" cy="96" r="6" fill="currentColor" fillOpacity="0.25" />
      <line x1="90" y1="12" x2="90" y2="212" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function VrindavanArchBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border-[1.5px] border-[#211D19] bg-[#FFFFFF] ${className}`}>
      <div className="h-2 bg-[#173F35] border-b-[1.5px] border-[#211D19]" />
      {children}
    </div>
  );
}
