import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

export default function Home() {
  return (
    <div >
    <Header />
    <SideMenu />
    <Dashboard />
    </div>
  );
}
