import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";
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
  const planned = tasks.reduce((s, t) => s + (t.value || 0), 0);
  const earned = tasks.filter((t) => t.done).reduce((s, t) => s + (t.value || 0), 0);
  const doneCount = tasks.filter((t) => t.done).length;
  return { tasks, loading, addTask, toggleTask, deleteTask, planned, earned, doneCount };
}
