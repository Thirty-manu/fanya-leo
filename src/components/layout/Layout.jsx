import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout() {
  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100dvh" }}>
      <Navbar /><main style={{ flex:1 }}><Outlet /></main><Footer />
    </div>
  );
}
