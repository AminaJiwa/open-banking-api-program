"use client";

import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import scss from "./pages/Home.module.scss";
import Login from "./components/Login";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";

const Home: React.FC = () => {
  const { data: session } = useSession();
  return (
    <main className={scss.main}>
      {session ? <Dashboard /> : <Login />}
    </main>
  );
};

export default Home;