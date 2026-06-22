import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";
import { useGoal } from "../hooks/useGoal";
import AddTaskForm from "../components/ui/AddTaskForm";
import TaskItem from "../components/ui/TaskItem";
import Meter from "../components/ui/Meter";
import StatChip from "../components/ui/StatChip";
import { FiEdit2, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, loading, addTask, toggleTask, deleteTask, planned, earned, doneCount } = useTasks();
  const { goal, setGoal } = useGoal();
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState("");
  const handleDelete = async (id) => { await deleteTask(id); toast.success("Task removed"); };
  const saveGoal = async () => {
    const val = parseInt(goalInput);
    if (!val||val<100) return toast.error("Enter a valid goal");
    await setGoal(val); setEditingGoal(false);
    toast.success(`🎯 Goal: KES ${val.toLocaleString()}`);
  };
  return (
    <div style={{ padding:"2rem 0 4rem" }}>
      <div className="wrap">
        <div style={{ marginBottom:"2rem" }}>
          <h1 className="section-title">Good morning, <span className="grad-text">{user?.displayName?.split(" ")[0]||"Builder"}</span> 👋</h1>
          <p className="section-sub">Here's your momentum board for today.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0.75rem", marginBottom:"2rem" }}>
          <StatChip label="Daily goal" value={`KES ${goal.toLocaleString()}`}/>
          <StatChip label="Planned" value={`KES ${planned.toLocaleString()}`} color="var(--primary)"/>
          <StatChip label="Earned" value={`KES ${earned.toLocaleString()}`} color="var(--success)"/>
          <StatChip label="Done" value={`${doneCount} / ${tasks.length}`}/>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1.15fr 0.85fr", gap:"1.5rem", alignItems:"start" }}>
          <div className="card glow-cyan">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)" }}>Today's tasks</h2>
              <span className="pill pill-cyan">{tasks.length} tasks</span>
            </div>
            <AddTaskForm onAdd={addTask}/>
            <div style={{ marginTop:"1.5rem", display:"grid", gap:"0.75rem" }}>
              {loading && <p style={{ color:"var(--muted)" }}>Loading…</p>}
              {!loading && tasks.length===0 && <div style={{ textAlign:"center", padding:"2rem", color:"var(--faint)" }}>No tasks yet. Add your first task! 🚀</div>}
              {tasks.map(task=><TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={handleDelete}/>)}
            </div>
          </div>
          <div style={{ display:"grid", gap:"1rem" }}>
            <div className="card">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)" }}>Daily KES goal</h3>
                <button className="btn-icon" style={{ width:36,height:36 }} onClick={()=>{setEditingGoal(!editingGoal);setGoalInput(goal)}}><FiEdit2 size={14}/></button>
              </div>
              {editingGoal ? (
                <div style={{ display:"flex", gap:"0.5rem" }}>
                  <input type="number" value={goalInput} onChange={e=>setGoalInput(e.target.value)} style={{ flex:1, minHeight:40, borderRadius:"var(--radius-lg)", border:"1px solid var(--border-bright)", background:"var(--surface-2)", padding:"0 0.75rem", color:"var(--text)" }} placeholder="e.g. 5000" autoFocus/>
                  <button className="btn-gradient" style={{ minHeight:40, padding:"0 0.9rem" }} onClick={saveGoal}><FiCheck size={15}/></button>
                </div>
              ) : (
                <div style={{ fontSize:"2.2rem", fontFamily:"var(--font-display)", letterSpacing:"-0.04em" }}>KES {goal.toLocaleString()}</div>
              )}
              <div style={{ marginTop:"1rem" }}><Meter value={earned} max={goal} label={`Goal: KES ${goal.toLocaleString()}`}/></div>
            </div>
            <div className="card">
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)", marginBottom:"1rem" }}>Daily checklist</h3>
              {[["Set your KES goal",true],["Add 3+ tasks",tasks.length>=3],["Complete a task",doneCount>=1],["Hit 80% of goal",earned>=goal*0.8],["Invoice client",false]].map(([label,done])=>(
                <div key={label} style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0", borderBottom:"1px solid var(--border)" }}>
                  <div style={{ width:"1.2rem", height:"1.2rem", borderRadius:"0.35rem", background:done?"var(--success)":"var(--surface-3)", border:done?"none":"1.5px solid var(--border-bright)", display:"grid", placeItems:"center", flexShrink:0 }}>
                    {done && <FiCheck size={10} color="#fff" strokeWidth={3}/>}
                  </div>
                  <span style={{ fontSize:"var(--text-sm)", color:done?"var(--text)":"var(--muted)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
