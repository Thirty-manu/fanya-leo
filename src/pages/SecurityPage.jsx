import { Link } from "react-router-dom";
import { FiShield, FiLock, FiKey, FiSmartphone } from "react-icons/fi";

const FEATURES = [
  { icon:<FiLock size={22}/>,     title:"AES-256 encryption at rest",  desc:"All task data and client info is encrypted before storage.",          color:"var(--primary)",  dim:"var(--primary-dim)"      },
  { icon:<FiKey size={22}/>,      title:"JWT + refresh token auth",     desc:"Short-lived access tokens with automatic refresh.",                   color:"var(--success)",  dim:"var(--success-dim)"      },
  { icon:<FiShield size={22}/>,   title:"Firestore security rules",     desc:"Each user can only read and write their own documents.",               color:"var(--accent)",   dim:"var(--accent-dim)"       },
  { icon:<FiSmartphone size={22}/>,title:"2FA + Google sign-in",        desc:"Optional two-factor auth. Google OAuth for secure login.",             color:"var(--warning)",  dim:"rgba(251,191,36,.12)"    },
];

export default function SecurityPage() {
  return (
    <div style={{ padding:"2rem 0 6rem" }}>
      <div className="wrap">

        {/* Hero */}
        <div style={{ marginBottom:"2.5rem", maxWidth:"560px" }}>
          <p style={{ fontSize:"0.72rem", fontFamily:"var(--font-mono)", color:"var(--gold,#d97706)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.75rem" }}>
            Security
          </p>
          <h1 style={{
            fontFamily:"var(--font-serif)",
            fontSize:"clamp(1.8rem, 7vw, 2.8rem)",
            fontWeight:400,
            lineHeight:1.15,
            letterSpacing:"-0.03em",
            color:"var(--cream,#f5f0e8)",
            marginBottom:"1rem",
          }}>
            Your data is protected,<br/>always.
          </h1>
          <p style={{ fontSize:"var(--t-sm,0.9rem)", color:"var(--stone,#9ca3af)", lineHeight:1.7, marginBottom:"1.5rem" }}>
            Layered security model. Encrypted end-to-end and never shared.
          </p>
          <Link to="/auth" style={{
            display:"inline-flex", alignItems:"center", gap:"0.4rem",
            padding:"0.7rem 1.4rem",
            borderRadius:"10px",
            background:"linear-gradient(135deg,#d97706,#f59e0b)",
            color:"#0e0f11",
            fontWeight:700,
            fontSize:"0.88rem",
            textDecoration:"none",
            boxShadow:"0 4px 20px rgba(217,119,6,0.3)",
          }}>
            Create secure account →
          </Link>
        </div>

        {/* Feature cards */}
        <div className="security-grid">
          {FEATURES.map(({ icon, title, desc, color, dim }) => (
            <div key={title} className="card" style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
              <div style={{
                width:"2.75rem", height:"2.75rem", borderRadius:"12px",
                background:dim, color,
                display:"grid", placeItems:"center", flexShrink:0,
              }}>
                {icon}
              </div>
              <div>
                <h3 style={{ fontWeight:700, fontSize:"var(--t-sm,0.9rem)", marginBottom:"0.35rem", color:"var(--cream,#f5f0e8)" }}>{title}</h3>
                <p style={{ fontSize:"var(--t-sm,0.875rem)", color:"var(--stone,#9ca3af)", lineHeight:1.6, margin:0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .security-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 560px) {
          .security-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
