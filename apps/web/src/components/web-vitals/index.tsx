"use client";

import { useReportWebVitals } from "next/web-vitals";
import { sendToGA4, logMetric } from "./web-vital-reports";

/**
 * @see https://github.com/madewithnovel/next.js/blob/80185c2dea73ed8a70fe03b75b43e950af3ef7a6/app/vitals.tsx
 */

interface WebVitalsProps {
  gaId: string | undefined;
}

export function WebVitals({ gaId }: WebVitalsProps) {
  useReportWebVitals((metric) => {
    sendToGA4(metric, gaId);
    logMetric(metric);
  });

  return null;
}
