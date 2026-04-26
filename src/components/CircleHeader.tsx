import Link from "next/link";

type CircleHeaderProps = {
  name: string;
};

export default function CircleHeader({ name }: CircleHeaderProps) {
  return (
    <header className="space-y-4">
      <Link
        href="/circles"
        className="text-sm font-medium text-[#1DA1F2] transition hover:text-[#0d8bd9]"
      >
        Circles
      </Link>
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
          Circle conversation
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          {name}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600">
          A simple space where OFWs share thoughts, and those thoughts become
          signals the circle can understand together.
        </p>
      </div>
    </header>
  );
}
