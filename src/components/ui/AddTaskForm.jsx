import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
const TYPES = ["Revenue task","Delivery task","Client retention","Learning"];
export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("Revenue task");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !value) return;
    setLoading(true);
    try {
      await onAdd({ title: title.trim(), value: parseInt(value), type });
      setTitle(""); setValue("");
      toast.success(`✅ Task added — KES ${parseInt(value).toLocaleString()} planned!`);
    } catch { toast.error("Failed to add task"); }
    finally { setLoading(false); }
  };
  return (
    <form onSubmit={handleSubmit} style={{ display:"grid", gap:"0.75rem" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 0.8fr", gap:"0.75rem" }}>
        <div className="field"><label>Task name</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Deploy homepage" required /></div>
        <div className="field"><label>KES value</label>
          <input type="number" min="0" step="100" value={value} onChange={e=>setValue(e.target.value)} placeholder="2500" required /></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"0.75rem", alignItems:"end" }}>
        <div className="field"><label>Category</label>
          <select value={type} onChange={e=>setType(e.target.value)}>{TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
        <button className="btn-gradient" type="submit" disabled={loading} style={{ marginBottom:"2px" }}>
          <FiPlus size={16}/>{loading?"Adding…":"Add task"}</button>
      </div>
    </form>
  );
}
