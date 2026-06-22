import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon, FiLogOut, FiMenu, FiX, FiZap } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = [{to:"/",label:"Home"},{to:"/dashboard",label:"Dashboard"},{to:"/jobs",label:"Jobs"},{to:"/security",label:"Security"}];
  const handleLogout = async () => { await logout(); toast.success("Signed out"); navigate("/"); };

  return (
    <header style={{
      position:"sticky", top:0, zIndex:100,
      borderBottom:"1px solid var(--border)",
      background:"color-mix(in srgb, var(--bg) 80%, transparent)",
      backdropFilter:"blur(20px) saturate(180%)",
    }}>
      <div className="wrap" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>

        {/* Logo */}
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
          <div style={{
            width:32, height:32, borderRadius:10,
            background:"var(--grad-1)",
            display:"grid", placeItems:"center",
            boxShadow:"0 0 20px rgba(99,102,241,0.4)"
          }}>
            <FiZap size={16} color="#fff" strokeWidth={2.5}/>
          </div>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.1rem", letterSpacing:"-0.02em" }}>
            Fanya Leo
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display:"flex", alignItems:"center", gap:"0.25rem" }} className="hide-mobile">
          {links.map(({to,label})=>(
            <NavLink key={to} to={to} end={to==="/"} style={({isActive})=>({
              padding:"0.4rem 0.875rem",
              borderRadius:"var(--radius-md)",
              fontSize:"var(--text-sm)", fontWeight:500,
              color: isActive ? "var(--text)" : "var(--muted)",
              background: isActive ? "var(--surface-3)" : "transparent",
              transition:"all var(--t)"
            })}>{label}</NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <button className="btn-icon" onClick={toggle} style={{ width:36, height:36 }}>
            {theme==="dark" ? <FiSun size={15}/> : <FiMoon size={15}/>}
          </button>
          {user ? (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.3rem 0.75rem 0.3rem 0.3rem", borderRadius:"var(--radius-full)", border:"1px solid var(--border-bright)", background:"var(--surface-2)" }} className="hide-mobile">
                <div style={{ width:26, height:26, borderRadius:"50%", background:"var(--grad-1)", display:"grid", placeItems:"center", fontSize:"0.7rem", fontWeight:700, color:"#fff", flexShrink:0 }}>
                  {user.displayName?.[0]?.toUpperCase()||"U"}
                </div>
                <span style={{ fontSize:"var(--text-sm)", fontWeight:500 }}>{user.displayName?.split(" ")[0]}</span>
              </div>
              <button className="btn-icon" onClick={handleLogout} style={{ width:36, height:36 }}>
                <FiLogOut size={15}/>
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary btn-sm">Sign in</Link>
          )}
          <button className="btn-icon" style={{ display:"none", width:36, height:36 }} id="hamburger" onClick={()=>setOpen(!open)}>
            {open ? <FiX size={17}/> : <FiMenu size={17}/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop:"1px solid var(--border)", background:"var(--surface)", padding:"0.75rem 1rem 1rem" }}>
          {links.map(({to,label})=>(
            <NavLink key={to} to={to} end={to==="/"} onClick={()=>setOpen(false)}
              style={({isActive})=>({
                display:"block", padding:"0.65rem 0.875rem",
                borderRadius:"var(--radius-md)",
                fontSize:"var(--text-sm)", fontWeight:500,
                color: isActive ? "var(--text)" : "var(--muted)",
                background: isActive ? "var(--surface-3)" : "transparent",
                marginBottom:"0.25rem"
              })}>{label}</NavLink>
          ))}
          {!user && <Link to="/auth" className="btn btn-primary" style={{ width:"100%", justifyContent:"center", marginTop:"0.5rem" }} onClick={()=>setOpen(false)}>Sign in</Link>}
        </div>
      )}
    </header>
  );
}
