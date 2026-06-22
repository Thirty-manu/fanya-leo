import { useState } from "react";
import toast from "react-hot-toast";

const CATEGORIES = ["Build","Learn","Ship","Connect","Rest"];
const ENERGIES   = ["High","Medium","Low"];
const WIN_PTS    = [3,5,7,10];

export default function AddTaskForm({ onAdd }) {
  const [title,    setTitle]    = useState("");
  const [winPoints,setWinPoints]= useState(5);
  const [category, setCategory] = useState("Build");
  const [energy,   setEnergy]   = useState("Medium");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onAdd({ title: title.trim(), winPoints: parseInt(winPoints), category, energy });
      setTitle("");
      toast.success(`🏆 +${winPoints} Win Points logged`);
    } catch {
      toast.error("Couldn't add task. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display:"grid", gap:"var(--s-4)" }}>
      <div className="field">
        <label className="field-label">Task name</label>
        <input
          className="input"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          placeholder="e.g. Deploy new feature"
          required
        />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"var(--s-3)" }}>
        <div className="field">
          <label className="field-label">Win Pts</label>
          <select className="input" value={winPoints} onChange={e=>setWinPoints(e.target.value)}>
            {WIN_PTS.map(p=><option key={p} value={p}>{p} pts</option>)}
          </select>
        </div>
        <div className="field">
          <label className="field-label">Category</label>
          <select className="input" value={category} onChange={e=>setCategory(e.target.value)}>
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="field-label">Energy</label>
          <select className="input" value={energy} onChange={e=>setEnergy(e.target.value)}>
            {ENERGIES.map(en=><option key={en}>{en}</option>)}
          </select>
        </div>
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading} style={{ justifyContent:"center" }}>
        {loading ? "Adding…" : "+ Log task"}
      </button>
    </form>
  );
}
