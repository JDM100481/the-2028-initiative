"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import RonronBubble from "@/components/RonronBubble";
import { ronronMessages } from "@/data/ronronMessages";
import { normalizeMessageText } from "@/lib/signals";

type MessageComposerProps = {
  circle: string;
};

const initialValues = {
  p1: "",
  p2: "",
  p3: "",
};

export default function MessageComposer({ circle }: MessageComposerProps) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const normalizedMessages = useMemo(
    () => [
      normalizeMessageText(values.p1),
      normalizeMessageText(values.p2),
      normalizeMessageText(values.p3),
    ],
    [values],
  );
  const hasEmptyMessage = normalizedMessages.some((value) => value.length === 0);
  const hasDuplicates =
    new Set(normalizedMessages).size !== normalizedMessages.length;
  const isDisabled = status === "loading" || hasEmptyMessage || hasDuplicates;

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          circle,
          p1: values.p1,
          p2: values.p2,
          p3: values.p3,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Message was not sent.");
      }

      setValues(initialValues);
      setStatus("success");
      setMessage("Salamat. Kasama ang boses mo sa usapan.");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Message was not sent.");
    }
  }

  return (
    <form
      onSubmit={handleSend}
      className="space-y-4 rounded-[28px] border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <div className="rounded-3xl bg-zinc-50 px-4 py-3">
        <p className="text-sm font-semibold text-zinc-950">
          Anong mahalaga para sa&apos;yo?
        </p>
        <p className="mt-1 text-sm leading-6 text-zinc-500">
          Share three thoughts this circle should understand.
        </p>
      </div>

      <div className="space-y-3">
        {(["p1", "p2", "p3"] as const).map((field, index) => (
          <label key={field} className="block">
            <span className="sr-only">Thought {index + 1}</span>
            <input
              value={values[field]}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field]: event.target.value,
                }))
              }
              maxLength={160}
              className="h-12 w-full rounded-full border border-zinc-200 bg-white px-4 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#1DA1F2] focus:ring-4 focus:ring-[#1DA1F2]/10"
              placeholder={`Thought ${index + 1}`}
            />
          </label>
        ))}
      </div>

      {hasDuplicates && !hasEmptyMessage ? (
        <p className="px-1 text-sm text-red-600">
          Please share three different thoughts.
        </p>
      ) : null}

      {message ? (
        status === "success" ? (
          <div className="space-y-3">
            <p className="px-1 text-sm text-[#1DA1F2]">{message}</p>
            <RonronBubble
              message={ronronMessages.afterSubmission}
              variant="success"
            />
          </div>
        ) : (
          <p className="px-1 text-sm text-red-600">{message}</p>
        )
      ) : null}

      <button
        type="submit"
        disabled={isDisabled}
        className="h-12 w-full rounded-full bg-[#1DA1F2] px-5 text-sm font-semibold text-white transition hover:bg-[#0d8bd9] disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        {status === "loading" ? "Sending..." : "Share your thoughts"}
      </button>
    </form>
  );
}
