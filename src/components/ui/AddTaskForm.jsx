import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
const CATEGORIES = ["Build","Learn","Ship","Connect","Rest"];
const ENERGIES = ["High","Medium","Low"];
const WIN_PTS = [3,5,7,10];
export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [winPoints, setWinPoints] = useState(5);
  const [category, setCategory] = useState("Build");
  const [energy, setEnergy] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onAdd({ title: title.trim(), winPoints: parseInt(winPoints), category, energy });
      setTitle("");
      toast.success(`🏆 +${winPoints} Win Points added!`);
    } catch { toast.error("Failed to add task"); }
    finally { setLoading(false); }
  };
  return (
    <form onSubmit={handleSubmit} style={{ display:"grid", gap:"0.75rem" }}>
      <div className="field"><label>Task name</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Deploy new feature" required /></div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.75rem" }}>
        <div className="field"><label>🏆 Win Points</label>
          <select value={winPoints} onChange={e=>setWinPoints(e.target.value)}>
            {WIN_PTS.map(p=><option key={p} value={p}>{p} pts</option>)}
          </select></div>
        <div className="field"><label>📂 Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select></div>
        <div className="field"><label>⚡ Energy</label>
          <select value={energy} onChange={e=>setEnergy(e.target.value)}>
            {ENERGIES.map(en=><option key={en}>{en}</option>)}
          </select></div>
      </div>
      <button className="btn-gradient" type="submit" disabled={loading}>
        <FiPlus size={16}/>{loading?"Adding…":"Add task"}
      </button>
    </form>
  );
}
