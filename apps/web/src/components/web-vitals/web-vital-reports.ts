import { NextWebVitalsMetric } from "next/app";

export const sendToGA4 = (
  metric: NextWebVitalsMetric,
  gaId: string | undefined,
) => {
  const metricValue = Math.round(
    metric.name === "CLS" ? metric.value * 1000 : metric.value,
  );

  if (gaId && typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      value: metricValue,
      event_label: metric.id,
      non_interaction: true,
    });
    console.log(
      `[GA4] Sent metric: ${metric.name}, value: ${metricValue}, id: ${metric.id}`,
    );
  } else {
    console.warn(
      "[GA4] gtag is not available or Google Analytics ID is missing",
    );
  }
};

function fixNum(num: number) {
  return Number((num / 1000).toFixed(6));
}

export const logMetric = (metric: NextWebVitalsMetric) => {
  switch (metric.name) {
    case "Next.js-hydration":
      console.log("Next.js hydration (s): ", metric.value);
      break;
    case "FCP":
      console.log(`First Contentful Paint (s): `, metric.value);
      break;
    case "LCP":
      console.log("Largest Contentful Paint (s): ", metric.value);
      break;
    case "CLS":
      console.log("Cumulative Layout Shift (s): ", fixNum(metric.startTime));
      break;
    case "FID":
      console.log("First Input Delay (s): ", metric.value);
      break;
    case "TTFB":
      console.log("Time to First Byte (s): ", metric.value);
      break;
    default:
      console.log(`${metric.name} (s): `, metric.value);
      break;
  }
};
