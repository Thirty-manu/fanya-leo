export default function Meter({ value, max, label }) {
  const pct = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
        <span style={{ fontWeight:700 }}>{pct}% covered</span>
        {label && <span style={{ fontSize:"var(--text-xs)", color:"var(--muted)" }}>{label}</span>}
      </div>
      <div className="meter-track"><div className="meter-fill" style={{ width: pct+"%" }} /></div>
    </div>
  );
}
