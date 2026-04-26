import CircleHeader from "@/components/CircleHeader";
import MessageComposer from "@/components/MessageComposer";
import RonronBubble from "@/components/RonronBubble";
import SignalFeed from "@/components/SignalFeed";
import { ronronMessages } from "@/data/ronronMessages";
import { circles } from "@/lib/circles";
import type { Signal } from "@/lib/signals";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type CirclePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CirclePage({ params }: CirclePageProps) {
  const { slug } = await params;
  const circle = circles.find((item) => item.slug === slug);

  if (!circle) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-5 py-10 sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Circle not found
        </h1>
      </main>
    );
  }

  let signals: Signal[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("priorities")
      .select("id, circle, text, votes")
      .eq("circle", slug)
      .order("votes", { ascending: false });

    signals = data ?? [];
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8">
      <CircleHeader name={circle.name} />
      <RonronBubble message={ronronMessages.circleIntro} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <section className="space-y-4 lg:order-2">
          <MessageComposer circle={circle.slug} />
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
            Top signals
          </h2>
          <RonronBubble
            message={ronronMessages.aboveSignalList}
            variant="insight"
          />
          <SignalFeed signals={signals} />
        </section>
      </div>
    </main>
  );
}
