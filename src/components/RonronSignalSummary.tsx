import RonronBubble from "@/components/RonronBubble";
import { ronronMessages } from "@/data/ronronMessages";
import type { Signal } from "@/lib/signals";

type RonronSignalSummaryProps = {
  signals?: Signal[];
  fallbackMessage?: string;
  className?: string;
};

export default function RonronSignalSummary({
  signals = [],
  fallbackMessage = ronronMessages.emptyState,
  className,
}: RonronSignalSummaryProps) {
  const topSignals = signals.slice(0, 3).map((signal) => signal.text);
  const message =
    topSignals.length > 0
      ? `${ronronMessages.dashboardIntro} ${topSignals.join(", ")}.`
      : fallbackMessage;

  return (
    <RonronBubble message={message} variant="insight" className={className} />
  );
}
