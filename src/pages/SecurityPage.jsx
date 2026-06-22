import { Link } from "react-router-dom";
import { FiShield, FiLock, FiKey, FiSmartphone, FiCheckCircle } from "react-icons/fi";
const FEATURES=[
  {icon:<FiLock size={20}/>,title:"AES-256 encryption at rest",desc:"All task data and client info is encrypted before storage.",color:"var(--primary)",dim:"var(--primary-dim)"},
  {icon:<FiKey size={20}/>,title:"JWT + refresh token auth",desc:"Short-lived access tokens with automatic refresh.",color:"var(--success)",dim:"var(--success-dim)"},
  {icon:<FiShield size={20}/>,title:"Firestore security rules",desc:"Each user can only read and write their own documents.",color:"var(--accent)",dim:"var(--accent-dim)"},
  {icon:<FiSmartphone size={20}/>,title:"2FA + Google sign-in",desc:"Optional two-factor auth. Google OAuth for secure login.",color:"var(--warning)",dim:"rgba(251,191,36,.12)"},
];
export default function SecurityPage() {
  return (
    <div style={{ padding:"3rem 0 5rem" }}>
      <div className="wrap">
        <div style={{ marginBottom:"3rem" }}>
          <h1 className="section-title">Your data is protected, always.</h1>
          <p className="section-sub">Layered security model. Encrypted end-to-end and never shared.</p>
          <Link to="/auth" className="btn-gradient" style={{ marginTop:"1.5rem", display:"inline-flex" }}>Create secure account →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.25rem" }}>
          {FEATURES.map(({icon,title,desc,color,dim})=>(
            <div key={title} className="card" style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"1rem", alignItems:"start" }}>
              <div style={{ width:"2.75rem", height:"2.75rem", borderRadius:"var(--radius-lg)", background:dim, color, display:"grid", placeItems:"center", flexShrink:0 }}>{icon}</div>
              <div><h3 style={{ fontWeight:700, marginBottom:"0.35rem" }}>{title}</h3><p style={{ fontSize:"var(--text-sm)", color:"var(--muted)" }}>{desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
