"use client";
import { Box, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header"; 
import SideMenu from "../../components/SideMenu";
import data from "../../utils/data.json"; 

const Dashboard: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // State to manage side menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  useEffect(() => {
    try {
      console.log("Imported data:", data); // Debug: Check imported data
      setPayments(data);
      console.log("Payments state:", payments); // Debug: Check state
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh"  }}>
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
          border: "1px solid red", // Debug: Add border to check layout
        }}
      >
        <h1>Dashboard</h1>
        <Grid2 container spacing={2} marginTop={2}>
          {payments.length > 0 ? (
            payments.map((payment: any, index: number) => (
              <Grid2
                key={index}
                component="div" // Specify the HTML element
                sx={{
                  // Add item behavior using sx prop
                  gridColumn: "span 1", // Example of grid behavior
                }}
              >
                <div>
                  <strong>Date:</strong> {payment.Date}
                </div>
                <div>
                  <strong>Payment:</strong> {payment.Payment}
                </div>
                <div>
                  <strong>Amount:</strong> {payment.Amount}
                </div>
                <div>
                  <strong>Type:</strong> {payment.Type}
                </div>
              </Grid2>
            ))
          ) : (
            <div>No payments found.</div>
          )}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Dashboard;