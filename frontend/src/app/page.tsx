import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import scss from "./pages/Home.module.scss";
import Login from "./components/Login";
import { useSession } from "next-auth/react";

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className={scss.main}>
      {session && <Dashboard />}
      {!session && <Login />}
    </main>
  );
};

export default Home;