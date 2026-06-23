import { FiExternalLink } from "react-icons/fi";

const JOBS = [
  { name:"Upwork", tag:"upwork", tc:"#14b8a6", tb:"rgba(20,184,166,.12)", desc:"World's largest marketplace. Strong demand for React, Firebase, and full-stack devs.", pay:"$15–$80/hr", tags:["React","Firebase","Full-stack"], url:"https://upwork.com" },
  { name:"Fiverr", tag:"fiverr", tc:"#10b981", tb:"rgba(16,185,129,.12)", desc:"Package-based freelancing. Build a gig once — earn repeatedly.", pay:"$50–$2,000/project", tags:["Web design","React","MVP builds"], url:"https://fiverr.com" },
  { name:"Toptal", tag:"premium", tc:"#6366f1", tb:"rgba(99,102,241,.12)", desc:"Elite network for top 3% developers. Premium US/EU clients.", pay:"$60–$200/hr", tags:["Senior dev","Vetted","Long-term"], url:"https://toptal.com" },
  { name:"PeoplePerHour", tag:"UK clients", tc:"#f59e0b", tb:"rgba(245,158,11,.12)", desc:"UK-based platform with demand for healthcare and agritech projects.", pay:"$10–$60/hr", tags:["UK clients","Healthcare","Hourly"], url:"https://peopleperhour.com" },
  { name:"Guru.com", tag:"milestones", tc:"#ec4899", tb:"rgba(236,72,153,.12)", desc:"Milestone billing. Lower competition than Upwork.", pay:"$8–$50/hr", tags:["Full-stack","SQL","Milestone pay"], url:"https://guru.com" },
  { name:"Remote OK", tag:"remote", tc:"#22d3ee", tb:"rgba(34,211,238,.12)", desc:"Fully remote contract roles. No fees — apply directly.", pay:"$3k–$12k/mo", tags:["Remote","Contract","No fees"], url:"https://remoteok.com" },
];

export default function JobsPage() {
  return (
    <div style={{ padding:"2rem 0 6rem" }}>
      <div className="wrap">
        <div style={{ marginBottom:"2.5rem" }}>
          <h1 className="section-title" style={{ fontSize:"clamp(1.8rem, 7vw, 2.8rem)" }}>Find freelance jobs today</h1>
          <p className="section-sub">Top platforms that work well from Kenya — payouts via Wise or Payoneer.</p>
        </div>

        <div className="jobs-grid">
          {JOBS.map(({ name, tag, tc, tb, desc, pay, tags, url }) => (
            <div key={name} className="card" style={{ display:"grid", gap:"0.75rem" }}>
              <span style={{ display:"inline-block", padding:"0.3rem 0.75rem", borderRadius:"var(--radius-full,999px)", fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase", color:tc, background:tb, width:"fit-content", letterSpacing:"0.05em" }}>{tag}</span>
              <h3 style={{ fontWeight:700, fontSize:"var(--text-lg,1.1rem)", fontFamily:"var(--font-display)", margin:0 }}>{name}</h3>
              <p style={{ fontSize:"var(--text-sm,0.875rem)", color:"var(--muted)", lineHeight:1.6, margin:0 }}>{desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                {tags.map(t => (
                  <span key={t} style={{ padding:"0.2rem 0.6rem", borderRadius:"999px", fontSize:"0.72rem", fontWeight:600, background:"var(--surface-3)", color:"var(--muted)", border:"1px solid var(--border)" }}>{t}</span>
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"0.25rem" }}>
                <span style={{ fontSize:"0.8rem", color:"var(--faint)", fontWeight:600 }}>{pay}</span>
                <a href={url} target="_blank" rel="noopener" className="btn-gradient" style={{ minHeight:36, padding:"0 0.9rem", fontSize:"0.78rem", display:"inline-flex", alignItems:"center", gap:"0.3rem" }}>
                  Apply <FiExternalLink size={12}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .jobs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .jobs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
