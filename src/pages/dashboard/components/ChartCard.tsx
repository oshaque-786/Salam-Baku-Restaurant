import { memo } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({
  title,
  children,
}: ChartCardProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h3 className="mb-5 text-lg font-semibold text-white">
          {title}
        </h3>

        {children}
      </m.div>
    </LazyMotion>
  );
}

export default memo(ChartCard);