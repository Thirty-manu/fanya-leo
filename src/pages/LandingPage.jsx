import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* Score system data — single source of truth */
const SCORES = [
  { emoji:"🏆", key:"win",    label:"Win Points",   value:"48 pts",  sub:"of 50 goal",  color:"var(--gold)",    fill:"fill-gold" },
  { emoji:"🌱", key:"growth", label:"Growth",        value:"Level 7", sub:"Build & Learn",color:"var(--sage)",    fill:"fill-sage" },
  { emoji:"⚡", key:"energy", label:"Energy",        value:"On Fire", sub:"High intensity",color:"var(--sky)",   fill:"fill-lavender" },
  { emoji:"🎯", key:"impact", label:"Impact",        value:"Strong",  sub:"Ship & Connect",color:"var(--clay)",  fill:"fill-warm" },
];

const CATEGORIES = [
  { e:"🔨", cat:"Build",   desc:"Code · Design · Create",  color:"var(--lavender)", dim:"var(--lavender-soft)" },
  { e:"📚", cat:"Learn",   desc:"Study · Research · Grow",  color:"var(--sage)",     dim:"var(--sage-soft)" },
  { e:"🚀", cat:"Ship",    desc:"Launch · Deploy · Submit", color:"var(--sky)",      dim:"var(--sky-soft)" },
  { e:"🤝", cat:"Connect", desc:"Clients · Network · Team", color:"var(--gold)",     dim:"var(--gold-soft)" },
  { e:"😌", cat:"Rest",    desc:"Recharge · Reflect · Plan",color:"var(--clay)",     dim:"var(--clay-soft)" },
];

const DEMO_TASKS = [
  { title:"Deployed new feature",   pts:10, cat:"Ship",    done:true },
  { title:"Read system design docs",pts:7,  cat:"Learn",   done:true },
  { title:"Client brief review",    pts:5,  cat:"Connect", done:false },
];

const CAT_BADGE = {
  Ship:"badge-sky", Learn:"badge-sage", Connect:"badge-gold",
  Build:"badge-lavender", Rest:"badge-clay",
};

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* ── HERO — Asymmetric, editorial ─────────────────── */}
      <section style={{ padding:"var(--s-24) 0 var(--s-20)", position:"relative", overflow:"hidden" }}>
        {/* Ambient light — intentionally off-center */}
        <div style={{
          position:"absolute", top:"-15%", right:"5%",
          width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(217,119,6,0.09) 0%, transparent 65%)",
          pointerEvents:"none",
        }}/>
        <div style={{
          position:"absolute", bottom:"0", left:"-5%",
          width:350, height:350, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 65%)",
          pointerEvents:"none",
        }}/>

        <div className="wrap">
          {/* Eyebrow — mono, restrained */}
          <p className="eyebrow anim-fade-up" style={{ marginBottom:"var(--s-5)" }}>
            Productivity · Growth · Momentum · Kenya 🇰🇪
          </p>

          {/* Two-column asymmetric layout */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"1.1fr 0.9fr",
            gap:"var(--s-16)",
            alignItems:"center",
          }} data-mobile-stack>

            {/* Left — editorial headline */}
            <div className="anim-fade-up stagger">
              <h1 className="heading-xl" style={{ marginBottom:"var(--s-6)" }}>
                Finish every day<br/>
                with proof<br/>
                <em className="text-gold" style={{ fontStyle:"italic" }}>you grew.</em>
              </h1>
              <p className="body-lg" style={{ maxWidth:"44ch", marginBottom:"var(--s-8)" }}>
                Four scoring systems — Win Points, Growth Level, Energy Units, and Impact Score — that turn your daily work into measurable momentum.
              </p>

              {/* CTA row — asymmetric gap intentional */}
              <div style={{ display:"flex", gap:"var(--s-3)", flexWrap:"wrap", marginBottom:"var(--s-10)" }}>
                <Link to={user?"/dashboard":"/auth"} className="btn btn-primary btn-lg">
                  {user ? "Open Dashboard" : "Start for free"} →
                </Link>
                <Link to="/jobs" className="btn btn-ghost btn-lg">
                  Browse job board
                </Link>
              </div>

              {/* Social proof — human, not generic "10,000 users" */}
              <div style={{ display:"flex", alignItems:"center", gap:"var(--s-4)" }}>
                <div style={{ display:"flex" }}>
                  {["#d97706","#818cf8","#4ade80","#38bdf8","#fb7185"].map((c,i)=>(
                    <div key={i} style={{
                      width:28, height:28, borderRadius:"50%",
                      background:c,
                      border:"2px solid var(--ink)",
                      marginLeft: i===0 ? 0 : -7,
                      flexShrink:0,
                    }}/>
                  ))}
                </div>
                <p style={{ fontSize:"var(--t-sm)", color:"var(--stone)", lineHeight:1.4 }}>
                  Builders in Nairobi growing every day
                </p>
              </div>
            </div>

            {/* Right — live dashboard preview */}
            <div style={{ display:"grid", gap:"var(--s-4)" }} className="anim-fade-up">
              {/* Main score card */}
              <div className="card" style={{
                borderColor:"rgba(217,119,6,0.2)",
                boxShadow:"var(--shadow-md), 0 0 40px rgba(217,119,6,0.08)",
              }}>
                <div style={{
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"flex-start",
                  marginBottom:"var(--s-5)",
                }}>
                  <div>
                    <p className="eyebrow" style={{ marginBottom:"var(--s-2)" }}>Today's Progress</p>
                    <p className="heading-md">82% <span style={{ fontSize:"var(--t-sm)", color:"var(--stone)", fontFamily:"var(--font-sans)", fontWeight:400 }}>of daily goal</span></p>
                  </div>
                  <span className="badge badge-gold">🔥 On streak</span>
                </div>

                <div className="track track-md" style={{ marginBottom:"var(--s-5)" }}>
                  <div className="fill fill-gold" style={{ width:"82%" }}/>
                </div>

                {/* 4 score chips */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"var(--s-2)" }}>
                  {SCORES.map(({emoji,label,value,color})=>(
                    <div key={label} style={{
                      textAlign:"center",
                      padding:"var(--s-3) var(--s-2)",
                      borderRadius:"var(--r-lg)",
                      background:"var(--ink-3)",
                      border:"1px solid var(--line)",
                    }}>
                      <div style={{ fontSize:"1.1rem", marginBottom:"var(--s-1)" }}>{emoji}</div>
                      <div style={{ fontSize:"0.68rem", color:"var(--stone)", fontFamily:"var(--font-mono)", marginBottom:"0.15rem" }}>{label}</div>
                      <div style={{ fontSize:"var(--t-xs)", fontWeight:700, color, fontFamily:"var(--font-mono)" }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task preview — compact */}
              <div className="card" style={{ padding:"var(--s-5)" }}>
                <p className="eyebrow" style={{ marginBottom:"var(--s-4)" }}>Recent Tasks</p>
                <div style={{ display:"grid", gap:"var(--s-2)" }}>
                  {DEMO_TASKS.map(({title,pts,cat,done})=>(
                    <div key={title} style={{
                      display:"flex", alignItems:"center", gap:"var(--s-3)",
                      padding:"var(--s-3) var(--s-4)",
                      borderRadius:"var(--r-lg)",
                      background:"var(--ink-3)",
                    }}>
                      {/* Checkbox */}
                      <div style={{
                        width:18, height:18, borderRadius:5, flexShrink:0,
                        background: done ? "var(--sage)" : "transparent",
                        border: done ? "none" : "1.5px solid var(--fog)",
                        display:"grid", placeItems:"center",
                      }}>
                        {done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#0e0f11" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <span style={{
                        flex:1, fontSize:"var(--t-sm)", fontWeight:500,
                        color: done ? "var(--stone)" : "var(--cream)",
                        textDecoration: done ? "line-through" : "none",
                      }}>{title}</span>
                      <span className={`badge ${CAT_BADGE[cat]}`}>{cat}</span>
                      <span style={{ fontSize:"var(--t-xs)", fontWeight:700, color:"var(--gold)", fontFamily:"var(--font-mono)" }}>+{pts}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule wrap"/>

      {/* ── FOUR SYSTEMS ────────────────────────────────── */}
      <section style={{ padding:"var(--s-20) 0" }}>
        <div className="wrap">
          {/* Intentionally left-aligned, not centered */}
          <div style={{ maxWidth:"520px", marginBottom:"var(--s-12)" }}>
            <p className="eyebrow" style={{ marginBottom:"var(--s-3)" }}>The scoring system</p>
            <h2 className="heading-lg">Four metrics.<br/>One honest view of your day.</h2>
          </div>

          {/* Asymmetric 2+2 grid — not a boring 4-col row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"var(--s-4)" }}>
            {SCORES.map(({emoji,label,value,sub,color,fill},i)=>(
              <div key={label} className="card card-lift" style={{
                /* First card slightly larger — editorial hierarchy */
                gridColumn: i===0 ? "span 1" : "span 1",
                borderTop:`2px solid ${color}`,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"var(--s-4)" }}>
                  <span style={{ fontSize:"2rem" }}>{emoji}</span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"var(--t-xs)", color:"var(--stone)" }}>{sub}</span>
                </div>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:"var(--t-xl)", color, marginBottom:"var(--s-2)" }}>{label}</p>
                <p className="body-sm">
                  {label==="Win Points" && "Score 3–10 points per task. Hit 50 to complete your day."}
                  {label==="Growth" && "Level up through Learn and Build tasks. Track your trajectory."}
                  {label==="Energy" && "High, Medium or Low intensity per task. Stay in the zone."}
                  {label==="Impact" && "Ship and Connect tasks boost your real-world impact score."}
                </p>
                <div className="track" style={{ marginTop:"var(--s-4)" }}>
                  <div className={`fill ${fill}`} style={{ width: ["82%","65%","90%","70%"][i] }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rule wrap"/>

      {/* ── CATEGORIES ──────────────────────────────────── */}
      <section style={{ padding:"var(--s-20) 0", background:"var(--ink-2)", borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)" }}>
        <div className="wrap">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"var(--s-12)", alignItems:"center" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom:"var(--s-3)" }}>Task types</p>
              <h2 className="heading-lg">Five categories.<br/>A balanced day.</h2>
              <p className="body-sm" style={{ marginTop:"var(--s-4)" }}>Each category feeds different scores. Mix them for a rounded, sustainable day of work.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"var(--s-3)" }}>
              {CATEGORIES.map(({e,cat,desc,color,dim})=>(
                <div key={cat} className="card-sm" style={{
                  textAlign:"center",
                  borderTop:`2px solid ${color}`,
                  paddingTop:"var(--s-5)",
                }}>
                  <div style={{
                    width:44, height:44, borderRadius:"var(--r-xl)",
                    background:dim, margin:"0 auto var(--s-3)",
                    display:"grid", placeItems:"center", fontSize:"1.4rem",
                  }}>{e}</div>
                  <p style={{ fontWeight:700, fontSize:"var(--t-sm)", color, marginBottom:"var(--s-2)" }}>{cat}</p>
                  <p style={{ fontSize:"var(--t-xs)", color:"var(--stone)", lineHeight:1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ padding:"var(--s-24) 0", position:"relative", overflow:"hidden" }}>
        <div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(ellipse 50% 70% at 50% 50%, rgba(217,119,6,0.06) 0%, transparent 70%)",
          pointerEvents:"none",
        }}/>
        {/* Intentionally narrow — draws the eye */}
        <div className="wrap-narrow" style={{ textAlign:"center", position:"relative" }}>
          <p className="eyebrow" style={{ marginBottom:"var(--s-4)" }}>Ready?</p>
          <h2 className="heading-lg" style={{ marginBottom:"var(--s-5)" }}>
            End your day knowing<br/>
            <em className="text-gold" style={{ fontStyle:"italic" }}>exactly how much you grew.</em>
          </h2>
          <p className="body-lg" style={{ marginBottom:"var(--s-8)" }}>
            Free forever. No income tracking. No surveillance. Just you and your growth.
          </p>
          <Link to={user?"/dashboard":"/auth"} className="btn btn-primary btn-lg anim-breathe">
            {user ? "Go to Dashboard" : "Create free account"} →
          </Link>
        </div>
      </section>
    </div>
  );
}
