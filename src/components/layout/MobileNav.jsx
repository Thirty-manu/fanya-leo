import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiBriefcase, FiShield } from "react-icons/fi";

const links = [
  { to:"/", icon:<FiHome size={20}/>, label:"Home" },
  { to:"/dashboard", icon:<FiGrid size={20}/>, label:"Dashboard" },
  { to:"/jobs", icon:<FiBriefcase size={20}/>, label:"Jobs" },
  { to:"/security", icon:<FiShield size={20}/>, label:"Security" },
];

export default function MobileNav() {
  return (
    <div className="mobile-bottom-nav" style={{ display:"none" }}>
      {links.map(({to,icon,label})=>(
        <NavLink key={to} to={to} end={to==="/"} style={({isActive})=>({
          display:"flex", flexDirection:"column", alignItems:"center", gap:"0.2rem",
          padding:"0.4rem 1rem",
          borderRadius:"var(--radius-lg)",
          color: isActive ? "var(--indigo-light)" : "var(--muted)",
          background: isActive ? "var(--indigo-dim)" : "transparent",
          fontSize:"0.65rem", fontWeight:600,
          transition:"all 200ms",
          minWidth:60,
        })}>
          {icon}
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );
}
