import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
  borderColor: string;
  delay?: number;
}

function StatCard({
  title,
  value,
  icon: Icon,
  textColor,
  bgColor,
  borderColor,
  delay = 0,
}: StatCardProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className={`${bgColor} ${borderColor} rounded-2xl border p-6`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={`${textColor} text-sm`}>
              {title}
            </p>

            <h2 className={`${textColor} mt-2 text-4xl font-bold`}>
              {value}
            </h2>
          </div>

          <Icon className={`h-9 w-9 ${textColor}`} />
        </div>
      </m.div>
    </LazyMotion>
  );
}

export default memo(StatCard);