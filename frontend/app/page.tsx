"use client";

import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import scss from "./pages/Home.module.scss";
import Login from "./components/Login";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  session: Session | null
}

const Home: React.FC<Props> = ({ session }) => {
  // const { data: session } = useSession();

  return (
    <SessionProvider session={session}>
    <main className={scss.main}>
      {session ? <Dashboard /> : <Login />}
    </main>
    </SessionProvider>
  );
};

export default Home;