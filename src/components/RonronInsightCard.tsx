import Image from "next/image";

type RonronInsightCardProps = {
  title: string;
  whatHappened: string;
  whyItMatters: string;
  whatPeopleFeel: string;
  humorLine: string;
  practicalTakeaway: string;
};

export default function RonronInsightCard({
  title,
  whatHappened,
  whyItMatters,
  whatPeopleFeel,
  humorLine,
  practicalTakeaway,
}: RonronInsightCardProps) {
  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/ronron.png"
          alt="Ronron, fictional civic analyst mascot"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-zinc-200 bg-zinc-50 object-cover"
        />
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1DA1F2]">
          Ronron reads the room
        </p>
      </div>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">
        {title}
      </h2>
      <dl className="mt-5 space-y-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            What happened?
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700">
            {whatHappened}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Why it matters
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700">
            {whyItMatters}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            What ordinary people feel
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700">
            {whatPeopleFeel}
          </dd>
        </div>
        <div className="rounded-2xl bg-zinc-50 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Ronron line
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-800">{humorLine}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Practical takeaway
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700">
            {practicalTakeaway}
          </dd>
        </div>
      </dl>
    </article>
  );
}
