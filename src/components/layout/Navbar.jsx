import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const handleLogout = async () => { await logout(); toast.success("Logged out"); navigate("/"); };
  return (
    <header style={{ position:"sticky", top:0, zIndex:50, background:"color-mix(in oklab, var(--bg) 82%, transparent)", backdropFilter:"blur(16px)", borderBottom:"1px solid var(--border)" }}>
      <nav className="wrap" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem", padding:"0.75rem 1.25rem" }}>
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
          <div style={{ width:"2.6rem", height:"2.6rem", borderRadius:"0.85rem", background:"var(--grad-brand)", display:"grid", placeItems:"center", boxShadow:"var(--glow-cyan)", color:"#fff", flexShrink:0 }}>
            <svg viewBox="0 0 48 48" width="22" height="22" fill="none">
              <path d="M10 28C10 17.5 18.5 9 29 9H38V18C38 28.5 29.5 37 19 37H10V28Z" stroke="#fff" strokeWidth="3" strokeLinejoin="round"/>
              <path d="M18 22H30" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="grad-text" style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", lineHeight:1, letterSpacing:"-0.03em" }}>Fanya Leo</span>
        </Link>
        <div style={{ display:"flex", gap:"0.25rem" }}>
          {[{to:"/",label:"Home"},{to:"/dashboard",label:"Dashboard"},{to:"/jobs",label:"Get Jobs"},{to:"/security",label:"Security"}].map(({to,label})=>(
            <NavLink key={to} to={to} end={to==="/"} style={({isActive})=>({ padding:"0.5rem 1rem", borderRadius:"var(--radius-full)", fontSize:"var(--text-sm)", fontWeight:600, color:isActive?"var(--text)":"var(--muted)", background:isActive?"var(--primary-dim)":"transparent", transition:"all 160ms" })}>{label}</NavLink>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <button className="btn-icon" onClick={toggle} aria-label="Toggle theme">
            {theme==="dark" ? <FiSun size={18}/> : <FiMoon size={18}/>}
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="btn-outline" style={{ minHeight:40, fontSize:"var(--text-sm)" }}>
                <FiUser size={15}/>{user.displayName?.split(" ")[0]||"Dashboard"}
              </Link>
              <button className="btn-icon" onClick={handleLogout}><FiLogOut size={17}/></button>
            </>
          ) : (
            <Link to="/auth" className="btn-gradient" style={{ minHeight:40 }}>Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
