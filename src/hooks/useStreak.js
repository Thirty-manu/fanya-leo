import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useStreak(userId) {
  const [streak, setStreak] = useState(0);
  const [lastActive, setLastActive] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const ref = doc(db, "streaks", userId);

    const updateStreak = async () => {
      const snap = await getDoc(ref);
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (!snap.exists()) {
        await setDoc(ref, { streak: 1, lastActive: today });
        setStreak(1);
        return;
      }

      const { streak: s, lastActive: last } = snap.data();

      if (last === today) {
        setStreak(s);
        setLastActive(last);
        return;
      }

      if (last === yesterday) {
        const newStreak = s + 1;
        await setDoc(ref, { streak: newStreak, lastActive: today });
        setStreak(newStreak);
      } else {
        await setDoc(ref, { streak: 1, lastActive: today });
        setStreak(1);
      }
    };

    updateStreak();
  }, [userId]);

  return streak;
}
