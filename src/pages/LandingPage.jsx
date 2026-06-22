import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiArrowRight, FiShield, FiBriefcase, FiZap } from "react-icons/fi";
export default function LandingPage() {
  const { user } = useAuth();
  return (
    <div>
      <section style={{ padding:"5rem 0 4rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 60% 40%, rgba(34,211,238,.08) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(167,139,250,.1) 0%, transparent 60%)", pointerEvents:"none" }}/>
        <div className="wrap" style={{ position:"relative", display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:"3rem", alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.4rem 1rem", borderRadius:"var(--radius-full)", background:"var(--primary-dim)", border:"1px solid rgba(34,211,238,.25)", fontSize:"var(--text-xs)", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--primary)", marginBottom:"1.5rem" }}>🚀 Built for Kenyan builders</div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.8rem,1.5rem + 4vw,5.5rem)", lineHeight:0.92, letterSpacing:"-.05em", marginBottom:"1.25rem" }}>Know what to <span className="grad-text">finish</span><br/>every single day.</h1>
            <p style={{ color:"var(--muted)", maxWidth:"52ch", marginBottom:"2rem" }}>Fanya Leo ties your daily tasks to real income momentum. Every task carries a KES value — so you know exactly when to stop adding and start shipping.</p>
            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
              <Link to={user?"/dashboard":"/auth"} className="btn-gradient">{user?"Go to dashboard":"Start free today"} <FiArrowRight size={16}/></Link>
              <Link to="/jobs" className="btn-outline">Find freelance work →</Link>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.75rem", marginTop:"2.5rem" }}>
              {[["Daily goal","KES 5,000"],["Tasks done","6 / 9"],["🔥 Streak","12 days"]].map(([l,v])=>(
                <div key={l} className="card-sm"><div style={{ fontSize:"var(--text-xs)", color:"var(--muted)" }}>{l}</div><div style={{ fontSize:"var(--text-lg)", fontWeight:700, marginTop:"0.25rem" }}>{v}</div></div>
              ))}
            </div>
          </div>
          <div style={{ display:"grid", gap:"1rem" }}>
            <div className="card glow-cyan">
              <div style={{ fontSize:"var(--text-xs)", color:"var(--muted)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.75rem" }}>Today's income progress</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}><span style={{ fontWeight:700 }}>68% covered</span><span style={{ fontSize:"var(--text-xs)", color:"var(--muted)" }}>Goal: KES 5,000</span></div>
              <div className="meter-track"><div className="meter-fill" style={{ width:"68%" }}/></div>
            </div>
            <div className="card glow-violet">
              <div style={{ fontSize:"var(--text-xs)", color:"var(--muted)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.75rem" }}>Top tasks today</div>
              {[{t:"Deploy clinic website",v:1200,d:true},{t:"Firebase auth fix",v:900,d:false},{t:"Send LipaFundi invoice",v:2100,d:false}].map(({t,v,d})=>(
                <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0", borderBottom:"1px solid var(--border)" }}>
                  <div style={{ width:"1.2rem", height:"1.2rem", borderRadius:"0.35rem", background:d?"var(--success)":"var(--surface-3)", border:d?"none":"1.5px solid var(--border-bright)", flexShrink:0 }}/>
                  <span style={{ flex:1, fontSize:"var(--text-sm)", fontWeight:600, textDecoration:d?"line-through":"none", opacity:d?0.6:1 }}>{t}</span>
                  <span className={`pill ${d?"pill-green":"pill-cyan"}`}>KES {v.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding:"4rem 0", background:"var(--surface)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <h2 className="section-title">Everything you need to win your day</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
            {[
              {icon:<FiZap size={24}/>,title:"Income momentum",desc:"Every task carries a KES value. Watch your daily target fill up as you work.",color:"var(--primary)",dim:"var(--primary-dim)"},
              {icon:<FiShield size={24}/>,title:"Bank-grade security",desc:"Firebase Auth, Firestore rules. Your data is protected and never exposed.",color:"var(--success)",dim:"var(--success-dim)"},
              {icon:<FiBriefcase size={24}/>,title:"Built-in job board",desc:"Top freelance platforms curated for developers in Kenya with proposal tips.",color:"var(--accent)",dim:"var(--accent-dim)"},
            ].map(({icon,title,desc,color,dim})=>(
              <div key={title} className="card" style={{ textAlign:"center" }}>
                <div style={{ width:"3.5rem", height:"3.5rem", borderRadius:"var(--radius-xl)", background:dim, color, display:"grid", placeItems:"center", margin:"0 auto 1rem" }}>{icon}</div>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)", marginBottom:"0.5rem" }}>{title}</h3>
                <p style={{ color:"var(--muted)", fontSize:"var(--text-sm)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding:"5rem 0", textAlign:"center" }}>
        <div className="wrap"><div style={{ maxWidth:"600px", margin:"0 auto" }}>
          <h2 className="section-title" style={{ marginBottom:"1rem" }}>Ready to <span className="grad-text">finish the day with proof?</span></h2>
          <p style={{ color:"var(--muted)", marginBottom:"2rem" }}>Join freelancers across Kenya who track work that actually matters.</p>
          <Link to={user?"/dashboard":"/auth"} className="btn-gradient" style={{ fontSize:"var(--text-base)", padding:"0 2rem", minHeight:52 }}>
            {user?"Open dashboard":"Create free account"} <FiArrowRight size={18}/>
          </Link>
        </div></div>
      </section>
    </div>
  );
}
