type MetricTab = {
  label: string;
};

type MetricsTabsProps = {
  tabs: MetricTab[];
  activeIndex: number;
  onChange: (index: number) => void;
};

export function MetricsTabs({ tabs, activeIndex, onChange }: MetricsTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="About me metrics"
      className="flex w-full flex-col gap-3 md:flex-row md:gap-8 xl:gap-10"
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(index)}
            className={`border-b pb-3 text-left text-[13px] font-medium uppercase leading-none tracking-[0.18em] transition-colors md:min-h-[44px] md:max-w-[210px] md:text-[17px] xl:max-w-[220px] ${
              isActive
                ? "border-white text-white"
                : "border-white/18 text-white/42 hover:border-white/45 hover:text-white/78"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default MetricsTabs;
