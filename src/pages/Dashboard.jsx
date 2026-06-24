import { Trophy, Sprout, Zap, Target } from 'lucide-react'
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";
import { useGoal } from "../hooks/useGoal";
import { useStreak } from "../hooks/useStreak";
import AddTaskForm from "../components/ui/AddTaskForm";
import TaskItem from "../components/ui/TaskItem";
import Meter from "../components/ui/Meter";
import { FiEdit2, FiCheck, FiFlame } from "react-icons/fi";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, loading, addTask, toggleTask, deleteTask, winPoints, doneCount, energyScore, impactScore, growthLevel } = useTasks();
  const { goal, setGoal } = useGoal();
  const streak = useStreak(user?.uid);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState("");
  const goalHitRef = useRef(false);

  // 🎉 Confetti when goal is hit
  useEffect(() => {
    if (winPoints >= goal && goal > 0 && !goalHitRef.current) {
      goalHitRef.current = true;
      confetti({
        particleCount: 180,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d97706", "#f59e0b", "#818cf8", "#4ade80", "#38bdf8"],
      });
      toast.success("🏆 Daily goal crushed! You're on fire!", { duration: 4000 });
    }
    if (winPoints < goal) goalHitRef.current = false;
  }, [winPoints, goal]);

  const handleDelete = async (id) => { await deleteTask(id); toast.success("Task removed"); };
  const saveGoal = async () => {
    const val = parseInt(goalInput);
    if (!val || val < 10) return toast.error("Enter a valid goal");
    await setGoal(val); setEditingGoal(false);
    toast.success(`🎯 Daily goal: ${val} Win Points`);
  };

  const getEnergyLabel = (score) => score >= 6 ? "🔥 On Fire" : score >= 3 ? "⚡ Flowing" : "😌 Warming Up";
  const getImpactLabel = (score) => score >= 8 ? "🚀 High Impact" : score >= 4 ? "🎯 Solid Impact" : "🌱 Building Up";

  const streakColor = streak >= 7 ? "var(--gold,#d97706)" : streak >= 3 ? "#f97316" : "var(--stone,#9ca3af)";

  return (
    <div style={{ padding:"2rem 0 4rem" }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"2rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <h1 className="section-title" style={{ fontSize:"clamp(1.5rem,5vw,2rem)", marginBottom:"0.3rem" }}>
              Good day, <span className="grad-text">{user?.displayName?.split(" ")[0] || "Builder"}</span> 👋
            </h1>
            <p className="section-sub">Your momentum board for today.</p>
          </div>

          {/* 🔥 Streak badge */}
          <div style={{
            display:"flex", alignItems:"center", gap:"0.5rem",
            padding:"0.6rem 1rem",
            borderRadius:"999px",
            background: streak >= 3 ? "rgba(217,119,6,0.12)" : "var(--surface-2,#1f2028)",
            border: `1px solid ${streakColor}`,
            flexShrink:0,
          }}>
            <FiFlame size={16} color={streakColor} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.82rem", fontWeight:700, color:streakColor }}>
              {streak} day{streak !== 1 ? "s" : ""} streak
            </span>
          </div>
        </div>

        {/* 4 Score Cards */}
        <div className="score-grid" style={{ marginBottom:"2rem" }}>
          {[
            { label:"Win Points",   value:`${winPoints} / ${goal}`, color:"var(--warning,#f59e0b)",  emoji:"🏆" },
            { label:"Growth Level", value:`Level ${growthLevel}`,   color:"var(--success,#4ade80)",  emoji:"🌱" },
            { label:"Energy",       value:getEnergyLabel(energyScore), color:"var(--primary,#818cf8)", emoji:"⚡" },
            { label:"Impact",       value:getImpactLabel(impactScore), color:"var(--accent,#38bdf8)",  emoji:"🎯" },
          ].map(({ label, value, color, emoji }) => (
            <div key={label} className="card-sm" style={{ textAlign:"center" }}>
              <div style={{ fontSize:"1.5rem", marginBottom:"0.25rem" }}>{emoji}</div>
              <div style={{ fontSize:"var(--text-xs,0.72rem)", color:"var(--muted)" }}>{label}</div>
              <div style={{ fontSize:"var(--text-sm,0.875rem)", fontWeight:700, color, marginTop:"0.2rem" }}>{value}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          {/* Tasks column */}
          <div className="card glow-cyan">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem", flexWrap:"wrap", gap:"0.5rem" }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)" }}>Today's tasks</h2>
              <span className="pill pill-cyan">{tasks.length} tasks · {doneCount} done</span>
            </div>
            <AddTaskForm onAdd={addTask} />
            <div style={{ marginTop:"1.5rem", display:"grid", gap:"0.75rem" }}>
              {loading && <p style={{ color:"var(--muted)" }}>Loading…</p>}
              {!loading && tasks.length === 0 && (
                <div style={{ textAlign:"center", padding:"2rem", color:"var(--faint)" }}>
                  No tasks yet. Add your first win! 🏆
                </div>
              )}
              {tasks.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={handleDelete} />)}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display:"grid", gap:"1rem" }}>

            {/* Daily Win Goal */}
            <div className="card">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)" }}>Daily Win Goal</h3>
                <button className="btn-icon" style={{ width:36, height:36 }} onClick={() => { setEditingGoal(!editingGoal); setGoalInput(goal); }}>
                  <FiEdit2 size={14} />
                </button>
              </div>
              {editingGoal ? (
                <div style={{ display:"flex", gap:"0.5rem" }}>
                  <input type="number" value={goalInput} onChange={e => setGoalInput(e.target.value)}
                    style={{ flex:1, minHeight:40, borderRadius:"var(--radius-lg)", border:"1px solid var(--border-bright)", background:"var(--surface-2)", padding:"0 0.75rem", color:"var(--text)" }}
                    placeholder="e.g. 50" autoFocus />
                  <button className="btn-gradient" style={{ minHeight:40, padding:"0 0.9rem" }} onClick={saveGoal}>
                    <FiCheck size={15} />
                  </button>
                </div>
              ) : (
                <div style={{ fontSize:"2.2rem", fontFamily:"var(--font-display)", letterSpacing:"-0.04em" }}>🏆 {goal} pts</div>
              )}
              <div style={{ marginTop:"1rem" }}><Meter value={winPoints} max={goal} label={`Goal: ${goal} pts`} /></div>
            </div>

            {/* Score Breakdown */}
            <div className="card">
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)", marginBottom:"1rem" }}>Score Breakdown</h3>
              {[
                { label:"Win Points", value:`${winPoints}pts`, bar:Math.min((winPoints/goal)*100,100), color:"var(--warning)" },
                { label:"Growth",     value:`Lv ${growthLevel}`, bar:Math.min(growthLevel*10,100),    color:"var(--success)" },
                { label:"Energy",     value:`${energyScore} units`, bar:Math.min(energyScore*10,100), color:"var(--primary)" },
                { label:"Impact",     value:`${impactScore} pts`, bar:Math.min(impactScore*8,100),    color:"var(--accent)" },
              ].map(({ label, value, bar, color }) => (
                <div key={label} style={{ marginBottom:"0.85rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.3rem" }}>
                    <span style={{ fontSize:"var(--text-sm)", fontWeight:600 }}>{label}</span>
                    <span style={{ fontSize:"var(--text-xs)", color, fontWeight:700 }}>{value}</span>
                  </div>
                  <div className="meter-track" style={{ height:"0.45rem" }}>
                    <div style={{ height:"100%", width:`${bar}%`, borderRadius:"inherit", background:color, transition:"width 600ms" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Checklist */}
            <div className="card">
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)", marginBottom:"1rem" }}>Daily Checklist</h3>
              {[
                ["Set your Win goal", true],
                ["Add 3+ tasks", tasks.length >= 3],
                ["Complete a task", doneCount >= 1],
                ["Hit 80% of goal", winPoints >= goal * 0.8],
                ["Try all 5 categories", new Set(tasks.filter(t => t.done).map(t => t.category)).size >= 5],
              ].map(([label, done]) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0", borderBottom:"1px solid var(--border)" }}>
                  <div style={{ width:"1.2rem", height:"1.2rem", borderRadius:"0.35rem", background:done?"var(--success)":"var(--surface-3)", border:done?"none":"1.5px solid var(--border-bright)", display:"grid", placeItems:"center", flexShrink:0 }}>
                    {done && <FiCheck size={10} color="#fff" strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize:"var(--text-sm)", color:done?"var(--text)":"var(--muted)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .score-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .score-grid { grid-template-columns: repeat(2, 1fr); }
          .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
