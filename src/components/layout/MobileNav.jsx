import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiBriefcase, FiShield } from "react-icons/fi";

const links = [
  { to:"/",          icon:<FiHome size={19}/>,      label:"Home" },
  { to:"/dashboard", icon:<FiGrid size={19}/>,      label:"Dashboard" },
  { to:"/jobs",      icon:<FiBriefcase size={19}/>, label:"Jobs" },
  { to:"/security",  icon:<FiShield size={19}/>,    label:"Security" },
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      {links.map(({to,icon,label})=>(
        <NavLink key={to} to={to} end={to==="/"} style={({isActive})=>({
          display:"flex", flexDirection:"column",
          alignItems:"center", gap:"0.2rem",
          padding:"var(--s-2) var(--s-4)",
          borderRadius:"var(--r-lg)",
          color: isActive ? "var(--gold)" : "var(--stone)",
          background: isActive ? "var(--gold-soft)" : "transparent",
          fontSize:"0.62rem",
          fontFamily:"var(--font-mono)",
          fontWeight: isActive ? 600 : 400,
          letterSpacing:"0.03em",
          minWidth:52,
          transition:"all var(--t-fast)",
        })}>
          {icon}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
