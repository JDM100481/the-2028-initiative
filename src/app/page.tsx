import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-5 py-16 sm:px-8">
      <section className="max-w-3xl space-y-5">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
          The 2028 Initiative
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-950">
          OFW thoughts, gathered into signals.
        </h1>
        <p className="text-lg leading-8 text-zinc-600">
          A simple, nonpartisan space where diaspora circles share what matters
          and turn everyday messages into something meaningful.
        </p>
      </section>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/circles"
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#1DA1F2] px-6 text-sm font-semibold text-white transition hover:bg-[#0d8bd9]"
        >
          View circles
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-950 transition hover:border-[#1DA1F2]"
        >
          View signals
        </Link>
      </div>
    </main>
  );
}
