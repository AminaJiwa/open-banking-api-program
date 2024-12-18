import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Login from "./components/Login";

export default function Home() {
  return (
    <div >
    <Header />
    <SideMenu />
    <Dashboard />
    <Login />
    </div>
  );
}
