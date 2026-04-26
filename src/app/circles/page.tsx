import Link from "next/link";
import { circles } from "@/lib/circles";

export default function CirclesPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
          myCHAT circles
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          OFW circles
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600">
          Choose a circle, read the prompt, and share what leadership should
          understand from the conversation.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {circles.map((circle) => (
          <Link
            key={circle.slug}
            href={`/circles/${circle.slug}`}
            className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-[#1DA1F2] hover:shadow-md"
          >
            <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
              {circle.name}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">Open circle</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
