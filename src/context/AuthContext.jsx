import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, signInWithPopup, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return unsub;
  }, []);
  const signup = (email, password, name) =>
    createUserWithEmailAndPassword(auth, email, password).then((cred) =>
      updateProfile(cred.user, { displayName: name }));
  const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signinGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signinGoogle, logout, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
