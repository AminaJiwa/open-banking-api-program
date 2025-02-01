"use client";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header"; 
import SideMenu from "../../components/SideMenu";

const Dashboard: React.FC = () => {
  const [banks, setBanks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // State to manage side menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("/api/auth/openbank");
        if (!response.ok) {
          throw new Error("Failed to fetch banks");
        }
        const data = await response.json();
        setBanks(data.banks || []);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchBanks();
  }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header with Hamburger Icon */}
      <Header onMenuToggle={handleMenuToggle} />

      {/* Side Menu */}
      <SideMenu open={isMenuOpen} onMenuToggle={handleMenuToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isMenuOpen ? "240px" : "0", // Adjust margin based on menu state
          transition: "margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms", // Smooth transition
        }}
      >
        <h1>Dashboard</h1>
        <Grid container gap={4} marginTop={2}>
          {banks.map((bank: any, index: number) => (
            <Grid item key={index}>
              {bank.name}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;