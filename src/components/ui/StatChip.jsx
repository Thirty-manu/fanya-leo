export default function StatChip({ label, value, color }) {
  return (
    <div className="card-sm" style={{ textAlign:"center" }}>
      <div style={{ fontSize:"var(--text-xs)", color:"var(--muted)", marginBottom:"0.35rem" }}>{label}</div>
      <div style={{ fontSize:"var(--text-lg)", fontWeight:700, color: color||"var(--text)" }}>{value}</div>
    </div>
  );
}
