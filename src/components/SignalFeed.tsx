import type { Signal } from "@/lib/signals";

type SignalFeedProps = {
  signals: Signal[];
};

export default function SignalFeed({ signals }: SignalFeedProps) {
  if (signals.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
        No signals yet. Be the first to add a thought to the circle.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {signals.map((signal, index) => (
        <li
          key={signal.id}
          className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
                Signal {index + 1}
              </p>
              <p className="text-sm font-medium leading-6 text-zinc-900">
                {signal.text}
              </p>
            </div>
            <div className="shrink-0 rounded-full bg-[#1DA1F2]/10 px-3 py-1 text-sm font-semibold text-[#1DA1F2]">
              {signal.votes} {signal.votes === 1 ? "agreement" : "agreements"}
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">Resonates with this circle</p>
        </li>
      ))}
    </ul>
  );
}
