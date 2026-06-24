import { FiExternalLink, FiRefreshCw, FiClock, FiBriefcase } from "react-icons/fi";
import { useState, useEffect } from "react";

const PLATFORMS = [
  { name:"Upwork",       tag:"upwork",      tc:"#14b8a6", tb:"rgba(20,184,166,.12)",   desc:"World's largest marketplace. Strong demand for React, Firebase, and full-stack devs.", pay:"$15–$80/hr",       tags:["React","Firebase","Full-stack"],  url:"https://upwork.com" },
  { name:"Fiverr",       tag:"fiverr",      tc:"#10b981", tb:"rgba(16,185,129,.12)",   desc:"Package-based freelancing. Build a gig once — earn repeatedly.",                      pay:"$50–$2,000/project",tags:["Web design","React","MVP builds"], url:"https://fiverr.com" },
  { name:"Toptal",       tag:"premium",     tc:"#6366f1", tb:"rgba(99,102,241,.12)",   desc:"Elite network for top 3% developers. Premium US/EU clients.",                         pay:"$60–$200/hr",      tags:["Senior dev","Vetted","Long-term"], url:"https://toptal.com" },
  { name:"PeoplePerHour",tag:"UK clients",  tc:"#f59e0b", tb:"rgba(245,158,11,.12)",   desc:"UK-based platform with demand for healthcare and agritech projects.",                  pay:"$10–$60/hr",       tags:["UK clients","Healthcare","Hourly"],url:"https://peopleperhour.com" },
  { name:"Guru.com",     tag:"milestones",  tc:"#ec4899", tb:"rgba(236,72,153,.12)",   desc:"Milestone billing. Lower competition than Upwork.",                                   pay:"$8–$50/hr",        tags:["Full-stack","SQL","Milestone pay"], url:"https://guru.com" },
  { name:"Remote OK",    tag:"remote",      tc:"#22d3ee", tb:"rgba(34,211,238,.12)",   desc:"Fully remote contract roles. No fees — apply directly.",                              pay:"$3k–$12k/mo",      tags:["Remote","Contract","No fees"],    url:"https://remoteok.com" },
];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

export default function JobsPage() {
  const [liveJobs, setLiveJobs] = useState([]);
  const [loadingLive, setLoadingLive] = useState(true);
  const [liveError, setLiveError] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);
  const [category, setCategory] = useState("software-dev");

  const CATEGORIES = [
    { value:"software-dev",  label:"💻 Dev" },
    { value:"design",        label:"🎨 Design" },
    { value:"data",          label:"📊 Data" },
    { value:"devops",        label:"⚙️ DevOps" },
    { value:"writing",       label:"✍️ Writing" },
  ];

  const fetchLiveJobs = async (cat = category) => {
    setLoadingLive(true);
    setLiveError(false);
    try {
      const res = await fetch(`https://remotive.com/api/remote-jobs?category=${cat}&limit=9`);
      const data = await res.json();
      setLiveJobs(data.jobs || []);
      setLastFetched(new Date());
    } catch {
      setLiveError(true);
    } finally {
      setLoadingLive(false);
    }
  };

  useEffect(() => { fetchLiveJobs(); }, []);

  const handleCategory = (cat) => {
    setCategory(cat);
    fetchLiveJobs(cat);
  };

  return (
    <div style={{ padding:"2rem 0 6rem" }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ marginBottom:"2.5rem" }}>
          <h1 className="section-title" style={{ fontSize:"clamp(1.8rem,7vw,2.8rem)" }}>Find freelance jobs today</h1>
          <p className="section-sub">Top platforms + live remote job listings updated in real-time.</p>
        </div>

        {/* Top Platforms */}
        <div style={{ marginBottom:"3rem" }}>
          <h2 style={{ fontSize:"var(--t-lg,1.1rem)", fontWeight:700, marginBottom:"1rem", color:"var(--cream,#f5f0e8)" }}>🌍 Top Platforms</h2>
          <div className="jobs-grid">
            {PLATFORMS.map(({ name, tag, tc, tb, desc, pay, tags, url }) => (
              <div key={name} className="card" style={{ display:"grid", gap:"0.75rem" }}>
                <span style={{ display:"inline-block", padding:"0.3rem 0.75rem", borderRadius:"999px", fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase", color:tc, background:tb, width:"fit-content", letterSpacing:"0.05em" }}>{tag}</span>
                <h3 style={{ fontWeight:700, fontSize:"1rem", margin:0 }}>{name}</h3>
                <p style={{ fontSize:"0.875rem", color:"var(--muted,#9ca3af)", lineHeight:1.6, margin:0 }}>{desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {tags.map(t => <span key={t} style={{ padding:"0.2rem 0.6rem", borderRadius:"999px", fontSize:"0.72rem", fontWeight:600, background:"var(--surface-3)", color:"var(--muted)", border:"1px solid var(--border)" }}>{t}</span>)}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:"0.8rem", color:"var(--faint)", fontWeight:600 }}>{pay}</span>
                  <a href={url} target="_blank" rel="noopener" className="btn-gradient" style={{ minHeight:36, padding:"0 0.9rem", fontSize:"0.78rem", display:"inline-flex", alignItems:"center", gap:"0.3rem" }}>
                    Apply <FiExternalLink size={12}/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Jobs Feed */}
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem", marginBottom:"1rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", flexWrap:"wrap" }}>
              <h2 style={{ fontSize:"var(--t-lg,1.1rem)", fontWeight:700, color:"var(--cream,#f5f0e8)", margin:0 }}>
                🔴 Live Remote Jobs
              </h2>
              <span style={{ fontSize:"0.72rem", fontFamily:"var(--font-mono)", color:"var(--stone,#9ca3af)" }}>
                {lastFetched ? `Updated ${timeAgo(lastFetched)}` : "Fetching…"}
              </span>
            </div>
            <button onClick={() => fetchLiveJobs()} style={{
              display:"flex", alignItems:"center", gap:"0.4rem",
              padding:"0.45rem 0.9rem", borderRadius:"8px",
              border:"1px solid var(--border)", background:"var(--surface-2)",
              color:"var(--stone)", fontSize:"0.78rem", cursor:"pointer",
            }}>
              <FiRefreshCw size={13} style={{ animation: loadingLive ? "spin 1s linear infinite" : "none" }}/>
              Refresh
            </button>
          </div>

          {/* Category filter */}
          <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"1.25rem" }}>
            {CATEGORIES.map(({ value, label }) => (
              <button key={value} onClick={() => handleCategory(value)} style={{
                padding:"0.4rem 0.9rem", borderRadius:"999px",
                fontSize:"0.78rem", fontWeight:600, cursor:"pointer",
                background: category === value ? "linear-gradient(135deg,#d97706,#f59e0b)" : "var(--surface-3)",
                color: category === value ? "#0e0f11" : "var(--muted)",
                border: category === value ? "none" : "1px solid var(--border)",
                transition:"all 0.2s",
              }}>{label}</button>
            ))}
          </div>

          {/* Jobs list */}
          {loadingLive ? (
            <div style={{ display:"grid", gap:"0.75rem" }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} className="card" style={{ display:"flex", gap:"1rem", alignItems:"center" }}>
                  <div style={{ width:44, height:44, borderRadius:8, background:"var(--surface-3)", flexShrink:0, animation:"pulse 1.5s ease-in-out infinite" }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ height:"0.9rem", background:"var(--surface-3)", borderRadius:4, width:"60%", marginBottom:"0.5rem", animation:"pulse 1.5s ease-in-out infinite" }}/>
                    <div style={{ height:"0.75rem", background:"var(--surface-3)", borderRadius:4, width:"40%", animation:"pulse 1.5s ease-in-out infinite" }}/>
                  </div>
                </div>
              ))}
            </div>
          ) : liveError ? (
            <div className="card" style={{ textAlign:"center", padding:"2.5rem", color:"var(--muted)" }}>
              <FiBriefcase size={32} style={{ margin:"0 auto 0.75rem", opacity:0.4 }}/>
              <p style={{ marginBottom:"0.75rem" }}>Could not load live jobs. Check your connection.</p>
              <button onClick={() => fetchLiveJobs()} className="btn-gradient" style={{ minHeight:36, padding:"0 1rem", fontSize:"0.82rem" }}>Try again</button>
            </div>
          ) : liveJobs.length === 0 ? (
            <div className="card" style={{ textAlign:"center", padding:"2.5rem", color:"var(--muted)" }}>
              <p>No jobs found in this category right now. Try another category.</p>
            </div>
          ) : (
            <div style={{ display:"grid", gap:"0.75rem" }}>
              {liveJobs.map(job => (
                <div key={job.id} className="card" style={{ display:"flex", gap:"1rem", alignItems:"flex-start", padding:"1rem 1.25rem" }}>
                  {job.company_logo ? (
                    <img src={job.company_logo} alt={job.company_name} style={{ width:44, height:44, borderRadius:8, objectFit:"contain", background:"#fff", padding:3, flexShrink:0 }}
                      onError={e => { e.target.style.display="none"; }}/>
                  ) : (
                    <div style={{ width:44, height:44, borderRadius:8, background:"var(--surface-3)", display:"grid", placeItems:"center", flexShrink:0, fontSize:"1.2rem" }}>💼</div>
                  )}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"0.5rem", flexWrap:"wrap", marginBottom:"0.3rem" }}>
                      <h3 style={{ fontWeight:700, fontSize:"0.9rem", margin:0, color:"var(--cream,#f5f0e8)" }}>{job.title}</h3>
                      <span style={{ fontSize:"0.7rem", color:"var(--stone)", fontFamily:"var(--font-mono)", flexShrink:0, display:"flex", alignItems:"center", gap:"0.25rem" }}>
                        <FiClock size={11}/> {timeAgo(job.publication_date)}
                      </span>
                    </div>
                    <p style={{ fontSize:"0.8rem", color:"var(--stone)", margin:"0 0 0.5rem" }}>{job.company_name} · {job.candidate_required_location || "Worldwide"}</p>
                    <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", alignItems:"center" }}>
                      {job.salary && <span style={{ fontSize:"0.72rem", fontWeight:700, color:"#d97706", fontFamily:"var(--font-mono)" }}>{job.salary}</span>}
                      <span style={{ padding:"0.15rem 0.55rem", borderRadius:"999px", fontSize:"0.68rem", fontWeight:600, background:"rgba(217,119,6,0.1)", color:"#d97706", border:"1px solid rgba(217,119,6,0.2)" }}>{job.job_type}</span>
                    </div>
                  </div>
                  <a href={job.url} target="_blank" rel="noopener" className="btn-gradient" style={{ minHeight:36, padding:"0 0.9rem", fontSize:"0.78rem", display:"inline-flex", alignItems:"center", gap:"0.3rem", flexShrink:0 }}>
                    Apply <FiExternalLink size={12}/>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) { .jobs-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .jobs-grid { grid-template-columns: 1fr; } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}
