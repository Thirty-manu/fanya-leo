import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try { await logout(); toast.success("Signed out"); navigate("/"); }
    catch { toast.error("Could not sign out. Please try again."); }
  };

  const links = [
    { to:"/", label:"Home" },
    { to:"/dashboard", label:"Dashboard" },
    { to:"/jobs", label:"Jobs" },
    { to:"/security", label:"Security" },
  ];

  return (
    <header style={{
      position:"sticky", top:0, zIndex:100,
      borderBottom:"1px solid var(--line)",
      background:"color-mix(in srgb, var(--ink) 85%, transparent)",
      backdropFilter:"blur(18px) saturate(160%)",
    }}>
      <div className="wrap" style={{
        display:"flex", alignItems:"center",
        justifyContent:"space-between",
        height:58,
      }}>
        {/* Wordmark — intentionally typographic, not icon-heavy */}
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:"var(--s-3)" }}>
          <div style={{
            width:30, height:30,
            borderRadius:"var(--r-md)",
            background:"var(--grad-gold)",
            display:"grid", placeItems:"center",
            flexShrink:0,
          }}>
            {/* Custom minimal mark — not a generic icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L7 3L12 11" stroke="#0e0f11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 8.5H10" stroke="#0e0f11" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily:"var(--font-serif)",
            fontSize:"1.15rem",
            letterSpacing:"-0.02em",
            color:"var(--cream)",
          }}>Fanya Leo</span>
        </Link>

        {/* Nav links — clean, no pill backgrounds on inactive */}
        <nav className="hide-mobile" style={{
          display:"flex", alignItems:"center", gap:"var(--s-1)"
        }}>
          {links.map(({to,label})=>(
            <NavLink key={to} to={to} end={to==="/"} style={({isActive})=>({
              padding:"var(--s-2) var(--s-4)",
              borderRadius:"var(--r-md)",
              fontSize:"var(--t-sm)",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "var(--cream)" : "var(--stone)",
              background: isActive ? "var(--ink-3)" : "transparent",
              transition:"all var(--t-fast)",
            })}>{label}</NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display:"flex", alignItems:"center", gap:"var(--s-2)" }}>
          <button className="btn-icon" onClick={toggle} aria-label="Toggle theme">
            {theme==="dark" ? <FiSun size={15}/> : <FiMoon size={15}/>}
          </button>

          {user ? (
            <>
              {/* Avatar chip — minimal, human */}
              <div className="hide-mobile" style={{
                display:"flex", alignItems:"center", gap:"var(--s-2)",
                padding:"var(--s-2) var(--s-3)",
                borderRadius:"var(--r-pill)",
                border:"1px solid var(--line-bright)",
                background:"var(--ink-3)",
              }}>
                <div style={{
                  width:24, height:24, borderRadius:"50%",
                  background:"var(--grad-lavender)",
                  display:"grid", placeItems:"center",
                  fontSize:"0.65rem", fontWeight:700, color:"#fff",
                  flexShrink:0,
                }}>
                  {user.displayName?.[0]?.toUpperCase()||"U"}
                </div>
                <span style={{ fontSize:"var(--t-sm)", fontWeight:500, color:"var(--cream-2)" }}>
                  {user.displayName?.split(" ")[0]}
                </span>
              </div>
              <button className="btn-icon" onClick={handleLogout} aria-label="Sign out">
                <FiLogOut size={15}/>
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary btn-sm">Sign in</Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="btn-icon"
            style={{ display:"none" }}
            id="hamburger"
            onClick={()=>setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <FiX size={17}/> : <FiMenu size={17}/>}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          borderTop:"1px solid var(--line)",
          background:"var(--ink-2)",
          padding:"var(--s-3) var(--s-4) var(--s-5)",
        }}>
          {links.map(({to,label})=>(
            <NavLink key={to} to={to} end={to==="/"} onClick={()=>setOpen(false)}
              style={({isActive})=>({
                display:"block",
                padding:"var(--s-3) var(--s-4)",
                borderRadius:"var(--r-lg)",
                fontSize:"var(--t-base)",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--cream)" : "var(--stone)",
                background: isActive ? "var(--ink-4)" : "transparent",
                marginBottom:"var(--s-1)",
                transition:"all var(--t-fast)",
              })}>{label}</NavLink>
          ))}
          {!user && (
            <Link to="/auth" className="btn btn-primary"
              style={{ width:"100%", marginTop:"var(--s-3)" }}
              onClick={()=>setOpen(false)}>
              Sign in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
