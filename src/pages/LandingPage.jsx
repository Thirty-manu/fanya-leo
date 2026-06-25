import { Trophy, Sprout, Zap, Target } from 'lucide-react'
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ICON_MAP = { Trophy, Sprout, Zap, Target }

const SCORES = [
  { icon:"Trophy", key:"win",    label:"Win Points",  value:"48 pts",  sub:"of 50 goal",     color:"var(--gold)",    fill:"fill-gold" },
  { icon:"Sprout", key:"growth", label:"Growth",      value:"Level 7", sub:"Build & Learn",  color:"var(--sage)",    fill:"fill-sage" },
  { icon:"Zap",    key:"energy", label:"Energy",      value:"On Fire", sub:"High intensity", color:"var(--sky)",     fill:"fill-lavender" },
  { icon:"Target", key:"impact", label:"Impact",      value:"Strong",  sub:"Ship & Connect", color:"var(--clay)",    fill:"fill-warm" },
];

const CATEGORIES = [
  { e:"🔨", cat:"Build",   desc:"Code · Design · Create",    color:"var(--lavender)", dim:"var(--lavender-soft)" },
  { e:"📚", cat:"Learn",   desc:"Study · Research · Grow",   color:"var(--sage)",     dim:"var(--sage-soft)" },
  { e:"🚀", cat:"Ship",    desc:"Launch · Deploy · Submit",  color:"var(--sky)",      dim:"var(--sky-soft)" },
  { e:"🤝", cat:"Connect", desc:"Clients · Network · Team",  color:"var(--gold)",     dim:"var(--gold-soft)" },
  { e:"😌", cat:"Rest",    desc:"Recharge · Reflect · Plan", color:"var(--clay)",     dim:"var(--clay-soft)" },
];

const DEMO_TASKS = [
  { title:"Deployed new feature",    pts:10, cat:"Ship",    done:true },
  { title:"Read system design docs", pts:7,  cat:"Learn",   done:true },
  { title:"Client brief review",     pts:5,  cat:"Connect", done:false },
];

const CAT_BADGE = {
  Ship:"badge-sky", Learn:"badge-sage", Connect:"badge-gold",
  Build:"badge-lavender", Rest:"badge-clay",
};

const STEPS = [
  { num:"01", emoji:"✅", title:"Add your tasks", desc:"Log what you're working on — coding, studying, client calls, shipping. Tag each task with a category." },
  { num:"02", emoji:"⚡", title:"Score your day", desc:"Every task earns Win Points, Growth XP, Energy, and Impact — automatically calculated as you work." },
  { num:"03", emoji:"🏆", title:"Track your growth", desc:"Watch your streak grow, hit your daily goal, and level up. See your momentum build day by day." },
];

const TESTIMONIALS = [
  { name:"Brian M.", role:"Freelance React Dev · Nairobi", quote:"I used to end the day not knowing if I actually did anything useful. Fanya Leo changed that — I can see my score and feel the progress.", avatar:"B" },
  { name:"Amina K.", role:"UI Designer · Westlands", quote:"The streak feature got me. I haven't missed a day in 3 weeks. It's simple but it works — I'm shipping more than ever.", avatar:"A" },
  { name:"David O.", role:"Full-stack Dev · Kilimani", quote:"Found two Upwork clients through the Jobs page and now I track all my work here. It's become my daily HQ.", avatar:"D" },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* ── HERO ─────────────────────────────────── */}
      <section style={{ padding:"var(--s-20) 0 var(--s-16)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-15%", right:"5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(217,119,6,0.09) 0%, transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"0", left:"-5%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 65%)", pointerEvents:"none" }}/>

        <div className="wrap">
          <p className="eyebrow anim-fade-up" style={{ marginBottom:"var(--s-4)" }}>
            For freelancers & builders in Kenya 🇰🇪
          </p>

          <div className="hero-grid">
            {/* Left */}
            <div className="anim-fade-up stagger">
              <h1 className="heading-xl" style={{ marginBottom:"var(--s-5)" }}>
                Stop guessing.<br/>Start <em className="text-gold" style={{ fontStyle:"italic" }}>measuring</em><br/>your growth.
              </h1>
              <p className="body-lg" style={{ maxWidth:"44ch", marginBottom:"var(--s-6)" }}>
                Fanya Leo turns your daily work into a real score — Win Points, Growth Level, Energy, and Impact. Built for Nairobi builders who want proof they're moving forward.
              </p>
              <div className="hero-btns">
                <Link to={user ? "/dashboard" : "/auth"} className="btn btn-primary btn-lg">
                  {user ? "Open Dashboard" : "Start free today"} →
                </Link>
                <Link to="/jobs" className="btn btn-ghost btn-lg">Browse live jobs</Link>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"var(--s-4)", marginTop:"var(--s-6)", flexWrap:"wrap" }}>
                <div style={{ display:"flex" }}>
                  {["#d97706","#818cf8","#4ade80","#38bdf8","#fb7185"].map((c,i)=>(
                    <div key={i} style={{ width:28, height:28, borderRadius:"50%", background:c, border:"2px solid var(--ink)", marginLeft:i===0?0:-7, flexShrink:0 }}/>
                  ))}
                </div>
                <p style={{ fontSize:"var(--t-sm)", color:"var(--stone)", lineHeight:1.4 }}>Builders in Nairobi growing every day</p>
              </div>
            </div>

            {/* Right — dashboard preview */}
            <div style={{ display:"grid", gap:"var(--s-3)" }} className="anim-fade-up">
              <div className="card" style={{ borderColor:"rgba(217,119,6,0.2)", boxShadow:"var(--shadow-md), 0 0 40px rgba(217,119,6,0.08)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"var(--s-4)" }}>
                  <div>
                    <p className="eyebrow" style={{ marginBottom:"var(--s-1)" }}>Today's Progress</p>
                    <p className="heading-md">82% <span style={{ fontSize:"var(--t-sm)", color:"var(--stone)", fontFamily:"var(--font-sans)", fontWeight:400 }}>of daily goal</span></p>
                  </div>
                  <span className="badge badge-gold">🔥 5-day streak</span>
                </div>
                <div className="track track-md" style={{ marginBottom:"var(--s-4)" }}>
                  <div className="fill fill-gold" style={{ width:"82%" }}/>
                </div>
                <div className="score-chips-grid">
                  {SCORES.map(({ icon, label, value, color }) => {
                    const Icon = ICON_MAP[icon];
                    return (
                      <div key={label} style={{ textAlign:"center", padding:"var(--s-3) var(--s-2)", borderRadius:"var(--r-lg)", background:"var(--ink-3)", border:"1px solid var(--line)" }}>
                        <div style={{ display:"flex", justifyContent:"center", marginBottom:"var(--s-1)" }}>
                          <Icon size={16} color={color} />
                        </div>
                        <div style={{ fontSize:"0.65rem", color:"var(--stone)", fontFamily:"var(--font-mono)", marginBottom:"0.1rem" }}>{label}</div>
                        <div style={{ fontSize:"0.72rem", fontWeight:700, color, fontFamily:"var(--font-mono)" }}>{value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card" style={{ padding:"var(--s-4)" }}>
                <p className="eyebrow" style={{ marginBottom:"var(--s-3)" }}>Recent Tasks</p>
                <div style={{ display:"grid", gap:"var(--s-2)" }}>
                  {DEMO_TASKS.map(({ title, pts, cat, done }) => (
                    <div key={title} style={{ display:"flex", alignItems:"center", gap:"var(--s-3)", padding:"var(--s-2) var(--s-3)", borderRadius:"var(--r-lg)", background:"var(--ink-3)" }}>
                      <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, background:done?"var(--sage)":"transparent", border:done?"none":"1.5px solid var(--fog)", display:"grid", placeItems:"center" }}>
                        {done && <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#0e0f11" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <span style={{ flex:1, fontSize:"var(--t-xs)", fontWeight:500, color:done?"var(--stone)":"var(--cream)", textDecoration:done?"line-through":"none" }}>{title}</span>
                      <span className={`badge ${CAT_BADGE[cat]}`} style={{ fontSize:"0.62rem" }}>{cat}</span>
                      <span style={{ fontSize:"0.68rem", fontWeight:700, color:"var(--gold)", fontFamily:"var(--font-mono)" }}>+{pts}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────── */}
      <div style={{ borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)", background:"var(--ink-2)", padding:"var(--s-5) 0" }}>
        <div className="wrap">
          <div className="stats-bar">
            {[
              { num:"5",    label:"Task categories" },
              { num:"4",    label:"Scoring systems" },
              { num:"6+",   label:"Live job platforms" },
              { num:"100%", label:"Free forever" },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(1.5rem,4vw,2rem)", color:"var(--gold)", letterSpacing:"-0.03em" }}>{num}</div>
                <div style={{ fontSize:"var(--t-xs)", color:"var(--stone)", fontFamily:"var(--font-mono)", marginTop:"0.2rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section style={{ padding:"var(--s-20) 0" }}>
        <div className="wrap">
          <div style={{ textAlign:"center", maxWidth:"520px", margin:"0 auto var(--s-12)" }}>
            <p className="eyebrow" style={{ marginBottom:"var(--s-3)" }}>Simple by design</p>
            <h2 className="heading-lg">How Fanya Leo works</h2>
            <p className="body-sm" style={{ marginTop:"var(--s-3)", color:"var(--stone)" }}>Three steps. No learning curve. Start tracking your first day in under 2 minutes.</p>
          </div>

          <div className="steps-grid">
            {STEPS.map(({ num, emoji, title, desc }, i) => (
              <div key={num} style={{ position:"relative" }}>
                {/* Connector line — desktop only */}
                {i < STEPS.length - 1 && (
                  <div className="step-connector"/>
                )}
                <div className="card card-lift" style={{ textAlign:"center", padding:"var(--s-8) var(--s-6)" }}>
                  <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(217,119,6,0.1)", border:"2px solid rgba(217,119,6,0.3)", display:"grid", placeItems:"center", margin:"0 auto var(--s-4)", fontSize:"1.6rem" }}>
                    {emoji}
                  </div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--gold)", letterSpacing:"0.1em", marginBottom:"var(--s-2)" }}>STEP {num}</div>
                  <h3 style={{ fontWeight:700, fontSize:"var(--t-base)", color:"var(--cream)", marginBottom:"var(--s-3)" }}>{title}</h3>
                  <p style={{ fontSize:"var(--t-sm)", color:"var(--stone)", lineHeight:1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center", marginTop:"var(--s-10)" }}>
            <Link to={user ? "/dashboard" : "/auth"} className="btn btn-primary btn-lg anim-breathe">
              {user ? "Go to Dashboard" : "Try it free — takes 2 minutes"} →
            </Link>
          </div>
        </div>
      </section>

      <div className="rule wrap"/>

      {/* ── FOUR SYSTEMS ─────────────────────────── */}
      <section style={{ padding:"var(--s-20) 0" }}>
        <div className="wrap">
          <div style={{ maxWidth:"520px", marginBottom:"var(--s-10)" }}>
            <p className="eyebrow" style={{ marginBottom:"var(--s-3)" }}>The scoring system</p>
            <h2 className="heading-lg">Four metrics.<br/>One honest view of your day.</h2>
          </div>
          <div className="scores-grid">
            {SCORES.map(({ icon, label, value, sub, color, fill }, i) => {
              const Icon = ICON_MAP[icon];
              return (
                <div key={label} className="card card-lift" style={{ borderTop:`2px solid ${color}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"var(--s-4)" }}>
                    <Icon size={26} color={color} />
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"var(--t-xs)", color:"var(--stone)" }}>{sub}</span>
                  </div>
                  <p style={{ fontFamily:"var(--font-serif)", fontSize:"var(--t-xl)", color, marginBottom:"var(--s-2)" }}>{label}</p>
                  <p className="body-sm">
                    {label==="Win Points" && "Score 3–10 points per task. Hit 50 to complete your day."}
                    {label==="Growth"     && "Level up through Learn and Build tasks. Track your trajectory."}
                    {label==="Energy"     && "High, Medium or Low intensity per task. Stay in the zone."}
                    {label==="Impact"     && "Ship and Connect tasks boost your real-world impact score."}
                  </p>
                  <div className="track" style={{ marginTop:"var(--s-4)" }}>
                    <div className={`fill ${fill}`} style={{ width:["82%","65%","90%","70%"][i] }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="rule wrap"/>

      {/* ── CATEGORIES ───────────────────────────── */}
      <section style={{ padding:"var(--s-20) 0", background:"var(--ink-2)", borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)" }}>
        <div className="wrap">
          <div className="categories-layout">
            <div>
              <p className="eyebrow" style={{ marginBottom:"var(--s-3)" }}>Task types</p>
              <h2 className="heading-lg">Five categories.<br/>A balanced day.</h2>
              <p className="body-sm" style={{ marginTop:"var(--s-4)" }}>Each category feeds different scores. Mix them for a rounded, sustainable day of work.</p>
            </div>
            <div className="categories-grid">
              {CATEGORIES.map(({ e, cat, desc, color, dim }) => (
                <div key={cat} className="card-sm" style={{ textAlign:"center", borderTop:`2px solid ${color}`, paddingTop:"var(--s-4)" }}>
                  <div style={{ width:40, height:40, borderRadius:"var(--r-xl)", background:dim, margin:"0 auto var(--s-2)", display:"grid", placeItems:"center", fontSize:"1.2rem" }}>{e}</div>
                  <p style={{ fontWeight:700, fontSize:"var(--t-sm)", color, marginBottom:"var(--s-1)" }}>{cat}</p>
                  <p style={{ fontSize:"var(--t-xs)", color:"var(--stone)", lineHeight:1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────── */}
      <section style={{ padding:"var(--s-20) 0" }}>
        <div className="wrap">
          <div style={{ textAlign:"center", maxWidth:"480px", margin:"0 auto var(--s-10)" }}>
            <p className="eyebrow" style={{ marginBottom:"var(--s-3)" }}>From the community</p>
            <h2 className="heading-lg">Builders love Fanya Leo</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(({ name, role, quote, avatar }) => (
              <div key={name} className="card card-lift" style={{ display:"grid", gap:"var(--s-4)" }}>
                <p style={{ fontSize:"var(--t-sm)", color:"var(--cream-2)", lineHeight:1.8, fontStyle:"italic" }}>"{quote}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:"var(--s-3)" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"var(--grad-gold)", display:"grid", placeItems:"center", fontWeight:700, fontSize:"0.85rem", color:"#0e0f11", flexShrink:0 }}>{avatar}</div>
                  <div>
                    <p style={{ fontWeight:700, fontSize:"var(--t-sm)", color:"var(--cream)" }}>{name}</p>
                    <p style={{ fontSize:"var(--t-xs)", color:"var(--stone)", fontFamily:"var(--font-mono)" }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{ padding:"var(--s-24) 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 50% 70% at 50% 50%, rgba(217,119,6,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div className="wrap-narrow" style={{ textAlign:"center", position:"relative" }}>
          <p className="eyebrow" style={{ marginBottom:"var(--s-4)" }}>Ready to grow?</p>
          <h2 className="heading-lg" style={{ marginBottom:"var(--s-4)" }}>
            End every day knowing<br/>
            <em className="text-gold" style={{ fontStyle:"italic" }}>exactly how much you grew.</em>
          </h2>
          <p className="body-lg" style={{ marginBottom:"var(--s-7)", color:"var(--stone)" }}>Free forever. No income tracking. No surveillance. Just you and your growth.</p>
          <Link to={user ? "/dashboard" : "/auth"} className="btn btn-primary btn-lg anim-breathe">
            {user ? "Go to Dashboard" : "Create free account"} →
          </Link>
          <p style={{ fontSize:"var(--t-xs)", color:"var(--stone)", marginTop:"var(--s-4)", fontFamily:"var(--font-mono)" }}>No credit card. No setup fee. Built in Nairobi 🇰🇪</p>
        </div>
      </section>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: var(--s-16);
          align-items: center;
        }
        .hero-btns {
          display: flex;
          gap: var(--s-3);
          flex-wrap: wrap;
        }
        .score-chips-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--s-2);
        }
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--s-4);
          text-align: center;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--s-6);
          position: relative;
        }
        .step-connector {
          display: none;
        }
        .scores-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--s-4);
        }
        .categories-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--s-12);
          align-items: center;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--s-3);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--s-4);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: var(--s-8);
          }
          .hero-btns {
            flex-direction: column;
          }
          .hero-btns a {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
          .score-chips-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-bar {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--s-6);
          }
          .steps-grid {
            grid-template-columns: 1fr;
            gap: var(--s-4);
          }
          .scores-grid {
            grid-template-columns: 1fr;
          }
          .categories-layout {
            grid-template-columns: 1fr;
            gap: var(--s-6);
          }
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 420px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .score-chips-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
