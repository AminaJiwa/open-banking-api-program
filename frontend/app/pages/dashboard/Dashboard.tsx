"use client";
import { Box, Grid } from "@mui/material";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Dashboard: React.FC = () => {
    const searchParams = useSearchParams();
    const banksParam = searchParams.get("banks");
    console.log('Banks Param:', banksParam);


    let banks: any[] = [];
    try {
        if (banksParam) {
            banks = JSON.parse(decodeURIComponent(banksParam));
        }
    } catch (error: any) {
        console.error("Failed to parse banks data:", error);
    }
    console.log(banks);

    return (
        <div>
            <h1>Dashboard</h1>
        <Box>
            <Grid container gap={4} marginTop={2}>
                {banks.map((bank: any) => (
                    <Grid item key={bank}>
                        {bank}
                    </Grid>
                ))}
                Dashboard
            </Grid>
        </Box>
        </div>
    );
};

export default Dashboard;