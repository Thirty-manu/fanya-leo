import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
export default function AuthPage() {
  const { signup, signin, signinGoogle } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    if (tab==="signup" && password!==confirm) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      if (tab==="signup") { await signup(email,password,name); toast.success("🎉 Welcome to Fanya Leo!"); }
      else { await signin(email,password); toast.success("👋 Welcome back!"); }
      navigate("/dashboard");
    } catch(err) { toast.error(err.message||"Authentication failed"); }
    finally { setLoading(false); }
  };
  const handleGoogle = async () => {
    try { await signinGoogle(); toast.success("✅ Signed in!"); navigate("/dashboard"); }
    catch(err) { toast.error(err.message||"Google sign-in failed"); }
  };
  return (
    <div style={{ minHeight:"80vh", display:"grid", placeItems:"center", padding:"2rem 1rem" }}>
      <div style={{ width:"100%", maxWidth:"440px" }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-xl)", marginBottom:"0.5rem" }}>{tab==="signin"?"Welcome back":"Create your account"}</h1>
        </div>
        <div className="card glow-cyan">
          <div style={{ display:"flex", background:"var(--surface-3)", borderRadius:"var(--radius-full)", padding:"0.2rem", marginBottom:"1.5rem" }}>
            {["signin","signup"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:"0.55rem", borderRadius:"var(--radius-full)", fontWeight:700, fontSize:"var(--text-sm)", background:tab===t?"var(--surface)":"transparent", color:tab===t?"var(--text)":"var(--muted)" }}>
                {t==="signin"?"Sign in":"Create account"}
              </button>
            ))}
          </div>
          <button onClick={handleGoogle} className="btn-outline" style={{ width:"100%", justifyContent:"center", marginBottom:"1.25rem" }}>🌐 Continue with Google</button>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.25rem" }}>
            <div style={{ flex:1, height:"1px", background:"var(--border)" }}/>
            <span style={{ fontSize:"var(--text-xs)", color:"var(--faint)" }}>or with email</span>
            <div style={{ flex:1, height:"1px", background:"var(--border)" }}/>
          </div>
          <form onSubmit={handleSubmit} style={{ display:"grid", gap:"1rem" }}>
            {tab==="signup" && <div className="field"><label><FiUser size={13} style={{display:"inline",marginRight:4}}/>Full name</label><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" required/></div>}
            <div className="field"><label><FiMail size={13} style={{display:"inline",marginRight:4}}/>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></div>
            <div className="field"><label><FiLock size={13} style={{display:"inline",marginRight:4}}/>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min 8 characters" required/></div>
            {tab==="signup" && <div className="field"><label><FiLock size={13} style={{display:"inline",marginRight:4}}/>Confirm password</label><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat password" required/></div>}
            <button className="btn-gradient" type="submit" disabled={loading} style={{ width:"100%", justifyContent:"center" }}>
              {loading?"Please wait…":tab==="signin"?"Sign in":"Create account"}
            </button>
          </form>
          <p style={{ textAlign:"center", fontSize:"var(--text-xs)", color:"var(--faint)", marginTop:"1.25rem" }}>
            {tab==="signin"?"No account? ":"Already have one? "}
            <button onClick={()=>setTab(tab==="signin"?"signup":"signin")} style={{ color:"var(--primary)", fontWeight:700, fontSize:"inherit", background:"none", border:"none", cursor:"pointer" }}>
              {tab==="signin"?"Create one →":"Sign in →"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
