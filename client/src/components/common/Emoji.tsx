export const Emoji = ({ symbol, label }: { symbol: string; label: string }) => (
  <div
    className="emoji"
    role="img"
    style={{ fontSize: "30px" }}
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </div>
);
