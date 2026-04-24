"use client";

export type TimelineYearItemProps = {
  year: string;
  isActive: boolean;
  itemClassName: string;
  onClick: (year: string) => void;
};

export const TimelineYearItem = ({ year, isActive, itemClassName, onClick }: TimelineYearItemProps) => {
  return (
    <li
      className={`static box-border caret-transparent list-item justify-normal min-h-[auto] min-w-[auto] transform-none origin-[50%_50%] w-full top-auto md:absolute md:flex md:justify-end md:min-h-0 md:min-w-0 md:origin-[0%_50%] md:top-2/4 ${itemClassName}`}
    >
      <button
        type="button"
        onClick={() => onClick(year)}
        className={`relative text-[13px] font-medium bg-transparent caret-transparent inline-block h-[29px] tracking-[-0.13px] leading-[13px] min-h-0 min-w-0 pointer-events-auto text-center w-full p-0 md:block md:h-10 md:min-h-[auto] md:min-w-[auto] md:w-auto md:text-[28px] md:font-normal md:tracking-[-0.96px] md:leading-[normal] overflow-hidden ${
          isActive
            ? "text-white"
            : "text-neutral-400 md:opacity-50 hover:!opacity-100 hover:text-white"
        }`}
        style={{
          transition: "color 0.3s ease, opacity 0.3s ease",
        }}
      >
        <span className="relative inline-block text-[13px] font-medium box-border caret-transparent tracking-[-0.13px] leading-[13px] md:text-[28px] md:font-normal md:tracking-[-0.96px] md:leading-[normal]">
          <span className="hidden md:inline-block">{year}</span>
          <span className="md:hidden">{year}</span>
        </span>
        <span
          className="absolute bottom-0 left-0 rounded-full hidden md:block"
          style={{
            width: isActive ? "100%" : "0%",
            transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </button>
    </li>
  );
};
  
