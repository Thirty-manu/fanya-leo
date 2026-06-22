import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

const ENERGY_MAP = { High: 3, Medium: 2, Low: 1 };
const IMPACT_MAP = { Ship: 3, Connect: 2, Build: 2, Learn: 1, Rest: 1 };

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid), where("date", "==", today), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => { setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); setLoading(false); });
    return unsub;
  }, [user, today]);

  const addTask = (data) => addDoc(collection(db, "tasks"), { ...data, uid: user.uid, date: today, done: false, createdAt: serverTimestamp() });
  const toggleTask = (id, done) => updateDoc(doc(db, "tasks", id), { done: !done });
  const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

  const winPoints = tasks.filter(t => t.done).reduce((s, t) => s + (t.winPoints || 5), 0);
  const totalPoints = tasks.reduce((s, t) => s + (t.winPoints || 5), 0);
  const doneCount = tasks.filter(t => t.done).length;
  const energyScore = tasks.filter(t => t.done).reduce((s, t) => s + (ENERGY_MAP[t.energy] || 2), 0);
  const impactScore = tasks.filter(t => t.done).reduce((s, t) => s + (IMPACT_MAP[t.category] || 1), 0);
  const growthLevel = Math.floor(tasks.filter(t => t.done && (t.category === "Learn" || t.category === "Build")).length * 1.5) + 1;

  return { tasks, loading, addTask, toggleTask, deleteTask, winPoints, totalPoints, doneCount, energyScore, impactScore, growthLevel };
}
