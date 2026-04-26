import { circles } from "@/lib/circles";
import { normalizeMessageText } from "@/lib/signals";
import { supabase } from "@/lib/supabase";

type MessageBody = {
  circle?: unknown;
  p1?: unknown;
  p2?: unknown;
  p3?: unknown;
};

export async function POST(request: Request) {
  if (!supabase) {
    return Response.json(
      { error: "Supabase is not configured." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as MessageBody;
  const circle = typeof body.circle === "string" ? body.circle : "";
  const values = [body.p1, body.p2, body.p3].map((value) =>
    normalizeMessageText(typeof value === "string" ? value : ""),
  );

  if (!circles.some((item) => item.slug === circle)) {
    return Response.json({ error: "Invalid circle." }, { status: 400 });
  }

  if (values.some((value) => value.length === 0)) {
    return Response.json(
      { error: "Please share three thoughts before sending." },
      { status: 400 },
    );
  }

  if (new Set(values).size !== values.length) {
    return Response.json(
      { error: "Please share three different thoughts." },
      { status: 400 },
    );
  }

  const [p1, p2, p3] = values;
  const { error: messageError } = await supabase.from("submissions").insert({
    circle,
    priority_1: p1,
    priority_2: p2,
    priority_3: p3,
  });

  if (messageError) {
    return Response.json({ error: messageError.message }, { status: 500 });
  }

  for (const text of values) {
    const { data: existing, error: selectError } = await supabase
      .from("priorities")
      .select("id, votes")
      .eq("circle", circle)
      .eq("text", text)
      .maybeSingle();

    if (selectError) {
      return Response.json({ error: selectError.message }, { status: 500 });
    }

    if (existing) {
      const { error: updateError } = await supabase
        .from("priorities")
        .update({ votes: (existing.votes ?? 0) + 1 })
        .eq("id", existing.id);

      if (updateError) {
        return Response.json({ error: updateError.message }, { status: 500 });
      }
    } else {
      const { error: insertError } = await supabase.from("priorities").insert({
        circle,
        text,
        votes: 1,
      });

      if (insertError) {
        return Response.json({ error: insertError.message }, { status: 500 });
      }
    }
  }

  return Response.json({ ok: true });
}
