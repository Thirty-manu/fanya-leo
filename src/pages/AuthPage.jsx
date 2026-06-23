import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
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
    if (tab === "signup" && password !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      if (tab === "signup") { await signup(email, password, name); toast.success("🎉 Welcome to Fanya Leo!"); }
      else { await signin(email, password); toast.success("👋 Welcome back!"); }
      navigate("/dashboard");
    } catch(err) { toast.error(err.message || "Authentication failed"); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    try { await signinGoogle(); toast.success("✅ Signed in!"); navigate("/dashboard"); }
    catch(err) { toast.error(err.message || "Google sign-in failed"); }
  };

  return (
    <div style={{
      minHeight: "100dvh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      overflow: "hidden",
    }} className="auth-page">

      {/* ── LEFT PANEL — Brand ───────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #0e0f11 0%, #1a1507 50%, #0e0f11 100%)",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }} className="auth-left">

        {/* Glow orbs */}
        <div style={{ position:"absolute", top:"-10%", right:"-10%", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle, rgba(217,119,6,0.18) 0%, transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-10%", left:"-10%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 65%)", pointerEvents:"none" }}/>

        {/* Logo */}
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:"0.75rem", textDecoration:"none", position:"relative" }}>
          <div style={{ width:38, height:38, borderRadius:"10px", background:"var(--grad-gold)", display:"grid", placeItems:"center", flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L7 3L12 11" stroke="#0e0f11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 8.5H10" stroke="#0e0f11" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily:"var(--font-serif)", fontSize:"1.25rem", letterSpacing:"-0.02em", color:"var(--cream)" }}>Fanya Leo</span>
        </Link>

        {/* Centre content */}
        <div style={{ position:"relative" }}>
          <p style={{ fontSize:"0.7rem", fontFamily:"var(--font-mono)", color:"var(--gold)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1.5rem" }}>
            Built for builders in Nairobi 🇰🇪
          </p>
          <h2 style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(1.8rem, 3vw, 2.6rem)", lineHeight:1.15, letterSpacing:"-0.03em", color:"var(--cream)", marginBottom:"1.5rem", fontWeight:400 }}>
            Finish every day<br/>with proof<br/>
            <em style={{ fontStyle:"italic", color:"var(--gold)" }}>you grew.</em>
          </h2>
          <p style={{ fontSize:"var(--t-sm)", color:"var(--stone)", lineHeight:1.7, maxWidth:"34ch" }}>
            Four scoring systems that turn your daily work into measurable momentum — Win Points, Growth Level, Energy, and Impact.
          </p>

          {/* Social proof */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginTop:"2rem" }}>
            <div style={{ display:"flex" }}>
              {["#d97706","#818cf8","#4ade80","#38bdf8","#fb7185"].map((c,i)=>(
                <div key={i} style={{ width:26, height:26, borderRadius:"50%", background:c, border:"2px solid #0e0f11", marginLeft:i===0?0:-7, flexShrink:0 }}/>
              ))}
            </div>
            <p style={{ fontSize:"0.72rem", color:"var(--stone)", fontFamily:"var(--font-mono)" }}>Builders growing every day</p>
          </div>
        </div>

        {/* Score chips preview */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", position:"relative" }}>
          {[
            { e:"🏆", label:"Win Points", val:"48 pts", c:"var(--gold)" },
            { e:"🌱", label:"Growth", val:"Level 7", c:"#4ade80" },
            { e:"⚡", label:"Energy", val:"On Fire", c:"#818cf8" },
            { e:"🎯", label:"Impact", val:"Strong", c:"#38bdf8" },
          ].map(({e,label,val,c})=>(
            <div key={label} style={{ padding:"0.75rem", borderRadius:"10px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", backdropFilter:"blur(8px)" }}>
              <div style={{ fontSize:"1.1rem", marginBottom:"0.25rem" }}>{e}</div>
              <div style={{ fontSize:"0.62rem", color:"var(--stone)", fontFamily:"var(--font-mono)", marginBottom:"0.15rem" }}>{label}</div>
              <div style={{ fontSize:"0.75rem", fontWeight:700, color:c, fontFamily:"var(--font-mono)" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ───────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        background: "var(--ink)",
        overflowY: "auto",
      }}>
        <div style={{ width:"100%", maxWidth:"400px" }}>

          {/* Header */}
          <div style={{ marginBottom:"2rem" }}>
            <h1 style={{ fontFamily:"var(--font-serif)", fontSize:"1.8rem", letterSpacing:"-0.03em", color:"var(--cream)", marginBottom:"0.4rem", fontWeight:400 }}>
              {tab === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p style={{ fontSize:"var(--t-sm)", color:"var(--stone)" }}>
              {tab === "signin" ? "Sign in to continue your momentum." : "Start tracking your growth today."}
            </p>
          </div>

          {/* Tab toggle */}
          <div style={{ display:"flex", background:"var(--ink-3)", borderRadius:"10px", padding:"0.2rem", marginBottom:"1.75rem", border:"1px solid var(--line)" }}>
            {["signin","signup"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex:1, padding:"0.6rem", borderRadius:"8px",
                fontWeight:600, fontSize:"0.82rem",
                background: tab === t ? "var(--ink-5,#2a2a2a)" : "transparent",
                color: tab === t ? "var(--cream)" : "var(--stone)",
                border: tab === t ? "1px solid var(--line-bright)" : "1px solid transparent",
                transition:"all 0.2s", cursor:"pointer",
              }}>
                {t === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {/* Google button */}
          <button onClick={handleGoogle} style={{
            width:"100%", padding:"0.75rem 1rem",
            borderRadius:"10px", border:"1px solid var(--line-bright)",
            background:"var(--ink-3)", color:"var(--cream)",
            display:"flex", alignItems:"center", justifyContent:"center", gap:"0.6rem",
            fontSize:"0.88rem", fontWeight:500, cursor:"pointer",
            marginBottom:"1.5rem", transition:"all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background="var(--ink-4,#2a2a2a)"}
          onMouseLeave={e => e.currentTarget.style.background="var(--ink-3)"}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
              <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.5rem" }}>
            <div style={{ flex:1, height:"1px", background:"var(--line)" }}/>
            <span style={{ fontSize:"0.72rem", color:"var(--stone)", fontFamily:"var(--font-mono)" }}>or with email</span>
            <div style={{ flex:1, height:"1px", background:"var(--line)" }}/>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:"grid", gap:"1rem" }}>
            {tab === "signup" && (
              <div>
                <label style={{ display:"block", fontSize:"0.78rem", fontWeight:600, color:"var(--stone)", marginBottom:"0.4rem", fontFamily:"var(--font-mono)" }}>Full name</label>
                <div style={{ position:"relative" }}>
                  <FiUser size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--stone)" }}/>
                  <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" required
                    style={{ width:"100%", padding:"0.7rem 0.75rem 0.7rem 2.2rem", borderRadius:"10px", border:"1px solid var(--line)", background:"var(--ink-3)", color:"var(--cream)", fontSize:"0.88rem", boxSizing:"border-box", outline:"none" }}
                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                    onBlur={e=>e.target.style.borderColor="var(--line)"}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display:"block", fontSize:"0.78rem", fontWeight:600, color:"var(--stone)", marginBottom:"0.4rem", fontFamily:"var(--font-mono)" }}>Email address</label>
              <div style={{ position:"relative" }}>
                <FiMail size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--stone)" }}/>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required
                  style={{ width:"100%", padding:"0.7rem 0.75rem 0.7rem 2.2rem", borderRadius:"10px", border:"1px solid var(--line)", background:"var(--ink-3)", color:"var(--cream)", fontSize:"0.88rem", boxSizing:"border-box", outline:"none" }}
                  onFocus={e=>e.target.style.borderColor="var(--gold)"}
                  onBlur={e=>e.target.style.borderColor="var(--line)"}
                />
              </div>
            </div>

            <div>
              <label style={{ display:"block", fontSize:"0.78rem", fontWeight:600, color:"var(--stone)", marginBottom:"0.4rem", fontFamily:"var(--font-mono)" }}>Password</label>
              <div style={{ position:"relative" }}>
                <FiLock size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--stone)" }}/>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min 8 characters" required
                  style={{ width:"100%", padding:"0.7rem 0.75rem 0.7rem 2.2rem", borderRadius:"10px", border:"1px solid var(--line)", background:"var(--ink-3)", color:"var(--cream)", fontSize:"0.88rem", boxSizing:"border-box", outline:"none" }}
                  onFocus={e=>e.target.style.borderColor="var(--gold)"}
                  onBlur={e=>e.target.style.borderColor="var(--line)"}
                />
              </div>
            </div>

            {tab === "signup" && (
              <div>
                <label style={{ display:"block", fontSize:"0.78rem", fontWeight:600, color:"var(--stone)", marginBottom:"0.4rem", fontFamily:"var(--font-mono)" }}>Confirm password</label>
                <div style={{ position:"relative" }}>
                  <FiLock size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--stone)" }}/>
                  <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat password" required
                    style={{ width:"100%", padding:"0.7rem 0.75rem 0.7rem 2.2rem", borderRadius:"10px", border:"1px solid var(--line)", background:"var(--ink-3)", color:"var(--cream)", fontSize:"0.88rem", boxSizing:"border-box", outline:"none" }}
                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                    onBlur={e=>e.target.style.borderColor="var(--line)"}
                  />
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width:"100%", padding:"0.8rem 1rem",
              borderRadius:"10px", border:"none",
              background: loading ? "var(--ink-3)" : "linear-gradient(135deg, #d97706, #f59e0b)",
              color: loading ? "var(--stone)" : "#0e0f11",
              fontWeight:700, fontSize:"0.9rem",
              display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition:"all 0.2s", marginTop:"0.25rem",
              boxShadow: loading ? "none" : "0 4px 20px rgba(217,119,6,0.3)",
            }}>
              {loading ? "Please wait…" : tab === "signin" ? "Sign in" : "Create account"}
              {!loading && <FiArrowRight size={15}/>}
            </button>
          </form>

          <p style={{ textAlign:"center", fontSize:"0.78rem", color:"var(--stone)", marginTop:"1.5rem" }}>
            {tab === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setTab(tab === "signin" ? "signup" : "signin")} style={{
              color:"var(--gold)", fontWeight:700, fontSize:"inherit",
              background:"none", border:"none", cursor:"pointer",
            }}>
              {tab === "signin" ? "Create one →" : "Sign in →"}
            </button>
          </p>
        </div>
      </div>

      {/* Mobile: hide left panel */}
      <style>{`
        @media (max-width: 768px) {
          .auth-page { grid-template-columns: 1fr !important; }
          .auth-left { display: none !important; }
        }
      `}</style>
    </div>
  );
}
