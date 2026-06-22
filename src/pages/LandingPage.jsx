import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiArrowRight, FiZap, FiTrendingUp, FiShield, FiBriefcase } from "react-icons/fi";

const SCORES = [
  { emoji:"🏆", label:"Win Points", value:"48 / 50", color:"var(--amber)" },
  { emoji:"🌱", label:"Growth", value:"Level 7", color:"var(--emerald)" },
  { emoji:"⚡", label:"Energy", value:"On Fire", color:"var(--cyan)" },
  { emoji:"🎯", label:"Impact", value:"Strong", color:"var(--violet)" },
];

const FEATURES = [
  { icon:<FiZap size={20}/>, title:"Win Point System", desc:"Score every task 3–10 points based on difficulty. Hit your daily target.", color:"var(--indigo)", dim:"var(--indigo-dim)" },
  { icon:<FiTrendingUp size={20}/>, title:"4 Growth Metrics", desc:"Track Win Points, Growth Level, Energy Units and Impact Score simultaneously.", color:"var(--violet)", dim:"var(--violet-dim)" },
  { icon:<FiShield size={20}/>, title:"Private & Secure", desc:"Firebase Auth protects your data. No income tracking, no surveillance.", color:"var(--emerald)", dim:"var(--emerald-dim)" },
  { icon:<FiBriefcase size={20}/>, title:"Built-in Job Board", desc:"Top freelance platforms curated for developers in Kenya.", color:"var(--cyan)", dim:"var(--cyan-dim)" },
];

const TASKS_DEMO = [
  { title:"Deploy new feature", pts:10, cat:"Ship", done:true },
  { title:"Study system design", pts:7, cat:"Learn", done:true },
  { title:"Client call prep", pts:5, cat:"Connect", done:false },
];

const CAT_COLOR = { Ship:"badge-violet", Learn:"badge-emerald", Connect:"badge-amber", Build:"badge-indigo", Rest:"badge-pink" };

export default function LandingPage() {
  const { user } = useAuth();
  return (
    <div>
      {/* Hero */}
      <section style={{ padding:"6rem 0 5rem", position:"relative", overflow:"hidden" }}>
        {/* Background blobs */}
        <div style={{ position:"absolute", top:"-20%", right:"-10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-10%", left:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents:"none" }}/>

        <div className="wrap" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>
          <div className="animate-fade-up">
            <div className="section-label">Productivity · Growth · Momentum</div>
            <h1 className="display" style={{ fontSize:"clamp(2.5rem,5vw,4.5rem)", marginBottom:"1.25rem", color:"var(--text)" }}>
              Finish every day<br/>
              <span className="grad-text">with proof you grew.</span>
            </h1>
            <p style={{ color:"var(--muted)", fontSize:"var(--text-lg)", lineHeight:1.7, marginBottom:"2rem", maxWidth:"46ch" }}>
              Four powerful scoring systems that turn your daily tasks into measurable growth — Win Points, Growth Level, Energy Units, and Impact Score.
            </p>
            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", marginBottom:"3rem" }}>
              <Link to={user?"/dashboard":"/auth"} className="btn btn-primary">
                {user?"Open Dashboard":"Get Started Free"} <FiArrowRight size={16}/>
              </Link>
              <Link to="/jobs" className="btn btn-ghost">Explore Job Board</Link>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
              <div style={{ display:"flex" }}>
                {["#6366f1","#8b5cf6","#06b6d4","#10b981"].map((c,i)=>(
                  <div key={i} style={{ width:30, height:30, borderRadius:"50%", background:c, border:"2px solid var(--bg)", marginLeft: i===0?0:-8, display:"grid", placeItems:"center", fontSize:"0.65rem", fontWeight:700, color:"#fff" }}>{["K","A","J","M"][i]}</div>
                ))}
              </div>
              <span style={{ fontSize:"var(--text-sm)", color:"var(--muted)" }}>
                Join builders growing every day
              </span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div style={{ display:"grid", gap:"0.875rem" }}>
            {/* Score card */}
            <div className="card glow-card-indigo">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
                <div>
                  <div style={{ fontSize:"var(--text-xs)", color:"var(--muted)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Today's Progress</div>
                  <div className="display" style={{ fontSize:"1.75rem", marginTop:"0.2rem" }}>82% <span style={{ fontSize:"var(--text-sm)", color:"var(--muted)", fontWeight:400 }}>of daily goal</span></div>
                </div>
                <div style={{ width:48, height:48, borderRadius:"var(--radius-xl)", background:"var(--indigo-dim)", display:"grid", placeItems:"center", color:"var(--indigo-light)" }}>
                  <FiZap size={22}/>
                </div>
              </div>
              <div className="progress-track">
                <div className="progress-fill progress-indigo" style={{ width:"82%" }}/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0.5rem", marginTop:"0.875rem" }}>
                {SCORES.map(({emoji,label,value,color})=>(
                  <div key={label} style={{ textAlign:"center", padding:"0.6rem", borderRadius:"var(--radius-lg)", background:"var(--surface-2)" }}>
                    <div style={{ fontSize:"1.1rem" }}>{emoji}</div>
                    <div style={{ fontSize:"0.7rem", color:"var(--muted)", marginTop:"0.15rem" }}>{label}</div>
                    <div style={{ fontSize:"var(--text-xs)", fontWeight:700, color, marginTop:"0.1rem" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks preview */}
            <div className="card">
              <div style={{ fontSize:"var(--text-xs)", color:"var(--muted)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.875rem" }}>Recent Tasks</div>
              <div style={{ display:"grid", gap:"0.5rem" }}>
                {TASKS_DEMO.map(({title,pts,cat,done})=>(
                  <div key={title} style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.75rem", borderRadius:"var(--radius-lg)", background:"var(--surface-2)" }}>
                    <div style={{ width:18, height:18, borderRadius:6, background:done?"var(--emerald)":"var(--surface-4)", border:done?"none":"1px solid var(--border-bright)", flexShrink:0, display:"grid", placeItems:"center" }}>
                      {done && <span style={{ fontSize:"0.6rem", color:"#fff", fontWeight:900 }}>✓</span>}
                    </div>
                    <span style={{ flex:1, fontSize:"var(--text-sm)", fontWeight:500, textDecoration:done?"line-through":"none", color:done?"var(--muted)":"var(--text)" }}>{title}</span>
                    <span className={`badge ${CAT_COLOR[cat]}`}>{cat}</span>
                    <span style={{ fontSize:"var(--text-xs)", fontWeight:700, color:"var(--amber)", fontFamily:"var(--font-mono)" }}>+{pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:"5rem 0", borderTop:"1px solid var(--border)" }}>
        <div className="wrap">
          <div style={{ marginBottom:"3rem" }}>
            <div className="section-label">Why Fanya Leo</div>
            <h2 className="display" style={{ fontSize:"clamp(1.75rem,3vw,2.5rem)" }}>Everything you need to win your day</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1rem" }}>
            {FEATURES.map(({icon,title,desc,color,dim})=>(
              <div key={title} className="card card-hover" style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                <div style={{ width:44, height:44, borderRadius:"var(--radius-lg)", background:dim, color, display:"grid", placeItems:"center", flexShrink:0, marginTop:2 }}>{icon}</div>
                <div>
                  <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, marginBottom:"0.35rem" }}>{title}</h3>
                  <p style={{ color:"var(--muted)", fontSize:"var(--text-sm)", lineHeight:1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding:"4rem 0", borderTop:"1px solid var(--border)", background:"var(--surface)" }}>
        <div className="wrap">
          <div style={{ marginBottom:"2.5rem" }}>
            <div className="section-label">Task Categories</div>
            <h2 className="display" style={{ fontSize:"clamp(1.75rem,3vw,2.5rem)" }}>Five categories. Balanced day.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"0.875rem" }}>
            {[
              {e:"🔨",cat:"Build",desc:"Code, design, create",color:"var(--indigo)",dim:"var(--indigo-dim)"},
              {e:"📚",cat:"Learn",desc:"Study, research, grow",color:"var(--emerald)",dim:"var(--emerald-dim)"},
              {e:"🚀",cat:"Ship",desc:"Launch, deploy, submit",color:"var(--violet)",dim:"var(--violet-dim)"},
              {e:"🤝",cat:"Connect",desc:"Clients, network, team",color:"var(--amber)",dim:"var(--amber-dim)"},
              {e:"😌",cat:"Rest",desc:"Recharge and reflect",color:"var(--pink)",dim:"var(--pink-dim)"},
            ].map(({e,cat,desc,color,dim})=>(
              <div key={cat} className="card-sm" style={{ textAlign:"center", borderTop:`2px solid ${color}`, paddingTop:"1.25rem" }}>
                <div style={{ width:44, height:44, borderRadius:"var(--radius-xl)", background:dim, display:"grid", placeItems:"center", margin:"0 auto 0.75rem", fontSize:"1.4rem" }}>{e}</div>
                <div style={{ fontWeight:700, color, fontSize:"var(--text-sm)", marginBottom:"0.25rem" }}>{cat}</div>
                <div style={{ fontSize:"var(--text-xs)", color:"var(--muted)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"6rem 0", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div className="wrap" style={{ position:"relative", maxWidth:560, margin:"0 auto" }}>
          <div className="section-label" style={{ textAlign:"center" }}>Start today</div>
          <h2 className="display" style={{ fontSize:"clamp(2rem,4vw,3rem)", marginBottom:"1rem" }}>
            Finish the day with <span className="grad-text">proof you grew.</span>
          </h2>
          <p style={{ color:"var(--muted)", marginBottom:"2rem" }}>Free forever. No income tracking. Just you and your growth.</p>
          <Link to={user?"/dashboard":"/auth"} className="btn btn-primary animate-pulse-glow" style={{ fontSize:"var(--text-base)", minHeight:50, padding:"0 2rem", margin:"0 auto" }}>
            {user?"Go to Dashboard":"Create Free Account"} <FiArrowRight size={18}/>
          </Link>
        </div>
      </section>
    </div>
  );
}
