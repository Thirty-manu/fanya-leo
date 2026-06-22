import { FiTrash2 } from "react-icons/fi";

const CAT_BADGE = {
  Build:"badge-lavender", Learn:"badge-sage", Ship:"badge-sky",
  Connect:"badge-gold", Rest:"badge-clay",
};
const ENERGY_COLOR = { High:"var(--sage)", Medium:"var(--gold)", Low:"var(--stone)" };

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article style={{
      display:"flex", alignItems:"center", gap:"var(--s-3)",
      padding:"var(--s-3) var(--s-4)",
      borderRadius:"var(--r-lg)",
      background:"var(--ink-3)",
      border:"1px solid var(--line)",
      opacity: task.done ? 0.55 : 1,
      transition:"all 200ms",
    }}>
      {/* Custom checkbox — not a browser default */}
      <button
        onClick={()=>onToggle(task.id,task.done)}
        style={{
          width:20, height:20, borderRadius:6, flexShrink:0,
          border: task.done ? "none" : "1.5px solid var(--fog)",
          background: task.done ? "var(--sage)" : "transparent",
          display:"grid", placeItems:"center",
          transition:"all 150ms",
        }}
        aria-label={task.done ? "Mark incomplete" : "Mark complete"}
      >
        {task.done && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="#0e0f11" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Task info */}
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{
          fontSize:"var(--t-sm)", fontWeight:500,
          color: task.done ? "var(--stone)" : "var(--cream)",
          textDecoration: task.done ? "line-through" : "none",
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
        }}>{task.title}</p>
        <div style={{ display:"flex", gap:"var(--s-2)", marginTop:"var(--s-1)", alignItems:"center" }}>
          <span className={`badge ${CAT_BADGE[task.category]||"badge-stone"}`}>{task.category}</span>
          <span style={{ fontSize:"0.65rem", color:ENERGY_COLOR[task.energy]||"var(--stone)", fontFamily:"var(--font-mono)" }}>
            ⚡ {task.energy}
          </span>
          <span style={{ fontSize:"0.65rem", color:"var(--gold)", fontFamily:"var(--font-mono)", fontWeight:600 }}>
            +{task.winPoints||5}pts
          </span>
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={()=>onDelete(task.id)}
        style={{ color:"var(--fog)", transition:"color var(--t-fast)", padding:"var(--s-2)", flexShrink:0 }}
        onMouseEnter={e=>e.currentTarget.style.color="var(--clay)"}
        onMouseLeave={e=>e.currentTarget.style.color="var(--fog)"}
        aria-label="Delete task"
      >
        <FiTrash2 size={14}/>
      </button>
    </article>
  );
}
