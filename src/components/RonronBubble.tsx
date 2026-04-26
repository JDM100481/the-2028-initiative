import Image from "next/image";

type RonronBubbleProps = {
  message: string;
  variant?: "default" | "success" | "warning" | "insight";
  className?: string;
};

const variantStyles = {
  default: "border-zinc-200 bg-zinc-50 text-zinc-800",
  success: "border-[#1DA1F2]/20 bg-[#1DA1F2]/5 text-zinc-800",
  warning: "border-amber-200 bg-amber-50 text-zinc-800",
  insight: "border-zinc-200 bg-white text-zinc-800",
};

export default function RonronBubble({
  message,
  variant = "default",
  className = "",
}: RonronBubbleProps) {
  return (
    <aside className={`flex items-start gap-3 ${className}`}>
      <Image
        src="/assets/ronron.png"
        alt="Ronron, fictional civic analyst mascot"
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full border border-zinc-200 bg-zinc-50 object-cover"
      />
      <div
        className={`max-w-2xl rounded-[24px] rounded-tl-md border px-4 py-3 shadow-sm ${variantStyles[variant]}`}
      >
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
          Ronron, fictional analyst
        </p>
        <p className="mt-1 text-sm leading-6">{message}</p>
      </div>
    </aside>
  );
}
