import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--border)", padding:"2rem 0", marginTop:"auto" }}>
      <div className="wrap" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <span style={{ fontSize:"var(--text-sm)", color:"var(--muted)" }}>© 2026 Fanya Leo · Built for builders in Nairobi, Kenya.</span>
        <nav style={{ display:"flex", gap:"1.5rem" }}>
          {[["Home","/"],["Dashboard","/dashboard"],["Get Jobs","/jobs"],["Security","/security"]].map(([l,t])=>(
            <Link key={t} to={t} style={{ fontSize:"var(--text-sm)", color:"var(--muted)" }}>{l}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
