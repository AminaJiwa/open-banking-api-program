"use client";

import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import scss from "./pages/Home.module.scss";
import Login from "./components/Login";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./theme/darkTheme";

const Home: React.FC = () => {
  const { data: session } = useSession();
  return (
    <main className={scss.main}>
      <ThemeProvider theme={darkTheme}>
        <Dashboard />
        <Login />
      </ThemeProvider>
    </main>
  );
};

export default Home;