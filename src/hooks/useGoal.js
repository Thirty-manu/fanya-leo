import { useState, useEffect } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
export function useGoal() {
  const { user } = useAuth();
  const [goal, setGoalState] = useState(50);
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "goals", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setGoalState(snap.data().daily || 50);
    });
    return unsub;
  }, [user]);
  const setGoal = (value) => setDoc(doc(db, "goals", user.uid), { daily: value }, { merge: true });
  return { goal, setGoal };
}
