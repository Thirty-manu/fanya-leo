import { FiTrash2, FiCheck } from "react-icons/fi";
const CAT_PILL = { Build:"pill-cyan", Learn:"pill-green", Ship:"pill-violet", Connect:"pill-yellow", Rest:"pill-pink" };
const ENERGY_COLOR = { High:"var(--success)", Medium:"var(--warning)", Low:"var(--muted)" };
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article style={{ display:"grid", gridTemplateColumns:"auto 1fr auto", gap:"0.75rem", alignItems:"center",
      background:"var(--surface)", borderRadius:"var(--radius-xl)", padding:"1rem",
      border:"1px solid var(--border)", opacity: task.done ? 0.55 : 1, transition:"all 200ms" }}>
      <button onClick={() => onToggle(task.id, task.done)}
        style={{ width:"1.4rem", height:"1.4rem", borderRadius:"0.4rem", flexShrink:0,
          border: task.done ? "none" : "1.5px solid var(--border-bright)",
          background: task.done ? "var(--success)" : "transparent",
          display:"grid", placeItems:"center", color:"#fff", transition:"all 180ms" }}>
        {task.done && <FiCheck size={12} strokeWidth={3} />}
      </button>
      <div>
        <div style={{ fontWeight:700, fontSize:"var(--text-sm)", textDecoration: task.done?"line-through":"none" }}>{task.title}</div>
        <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.35rem", flexWrap:"wrap", alignItems:"center" }}>
          <span className={`pill ${CAT_PILL[task.category]||"pill-cyan"}`}>{task.category}</span>
          <span style={{ fontSize:"var(--text-xs)", color:ENERGY_COLOR[task.energy]||"var(--muted)", fontWeight:600 }}>⚡{task.energy}</span>
          <span style={{ fontSize:"var(--text-xs)", color:"var(--warning)", fontWeight:700 }}>🏆 +{task.winPoints||5}pts</span>
        </div>
      </div>
      <button onClick={() => onDelete(task.id)} style={{ color:"var(--faint)", transition:"color 160ms", padding:"0.25rem", background:"none", border:"none", cursor:"pointer" }}
        onMouseEnter={e=>e.currentTarget.style.color="var(--danger)"}
        onMouseLeave={e=>e.currentTarget.style.color="var(--faint)"}>
        <FiTrash2 size={15} />
      </button>
    </article>
  );
}
