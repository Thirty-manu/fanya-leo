import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      borderTop:"1px solid var(--line)",
      padding:"var(--s-10) 0",
      marginTop:"auto",
    }}>
      <div className="wrap" style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexWrap:"wrap",
        gap:"var(--s-4)",
      }}>
        <div>
          <p style={{ fontFamily:"var(--font-serif)", fontSize:"var(--t-md)", color:"var(--cream-2)", marginBottom:"var(--s-1)" }}>Fanya Leo</p>
          <p style={{ fontSize:"var(--t-xs)", color:"var(--stone)", fontFamily:"var(--font-mono)" }}>Built for builders in Nairobi, Kenya 🇰🇪</p>
        </div>
        <nav style={{ display:"flex", gap:"var(--s-5)", flexWrap:"wrap" }}>
          {[["Home","/"],["Dashboard","/dashboard"],["Jobs","/jobs"],["Security","/security"]].map(([l,t])=>(
            <Link key={t} to={t} style={{
              fontSize:"var(--t-sm)", color:"var(--stone)",
              transition:"color var(--t-fast)",
            }}
            onMouseEnter={e=>e.target.style.color="var(--cream)"}
            onMouseLeave={e=>e.target.style.color="var(--stone)"}
            >{l}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
