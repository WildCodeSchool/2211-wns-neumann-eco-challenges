export const Emoji = ({ symbol, label }: { symbol: string; label: string }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </span>
);

export const ORDERED_EMOJI = ["👍", "😂", "❤️", "😮", "🥲", "🚀", "🔥"];
