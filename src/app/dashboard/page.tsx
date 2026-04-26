import Link from "next/link";
import RonronBubble from "@/components/RonronBubble";
import RonronInsightCard from "@/components/RonronInsightCard";
import RonronSignalSummary from "@/components/RonronSignalSummary";
import { ronronInsights } from "@/data/ronronInsights";
import { ronronMessages } from "@/data/ronronMessages";
import { circles } from "@/lib/circles";
import type { Signal } from "@/lib/signals";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function SignalsPage() {
  let signals: Signal[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("priorities")
      .select("id, circle, text, votes")
      .order("votes", { ascending: false });

    signals = data ?? [];
  }

  const grouped = circles.map((circle) => ({
    ...circle,
    signals: signals
      .filter((signal) => signal.circle === circle.slug)
      .slice(0, 3),
  }));

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8">
      <header className="space-y-3">
        <Link
          href="/circles"
          className="text-sm font-medium text-[#1DA1F2] transition hover:text-[#0d8bd9]"
        >
          Circles
        </Link>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
          Signals
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          What OFWs are saying
        </h1>
      </header>

      <RonronSignalSummary signals={signals} />

      <section className="space-y-4">
        <RonronBubble
          message={ronronMessages.aboveSignalList}
          variant="insight"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {grouped.map((group) => (
            <section
              key={group.slug}
              className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
                {group.name.replace(" OFW Circle", "")}
              </h2>
              {group.signals.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {group.signals.map((signal) => (
                    <li
                      key={signal.id}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="min-w-0 text-zinc-700">
                        {signal.text}
                      </span>
                      <span className="shrink-0 font-semibold text-[#1DA1F2]">
                        {signal.votes}{" "}
                        {signal.votes === 1 ? "agreement" : "agreements"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-zinc-500">
                  {ronronMessages.emptyState}
                </p>
              )}
            </section>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            National situation notes
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Ronron explains the bigger picture
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-zinc-500">
            Ronron is a fictional civic analyst. These are sample explainers
            about issues, not personalities.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {ronronInsights.map((insight) => (
            <RonronInsightCard key={insight.title} {...insight} />
          ))}
        </div>
      </section>
    </main>
  );
}
