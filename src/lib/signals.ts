export type Signal = {
  id: string;
  circle: string;
  text: string;
  votes: number;
};

export function normalizeMessageText(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 160);
}
