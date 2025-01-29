"use client";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Dashboard: React.FC = () => {
    const [banks, setBanks] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await fetch("/openbank");
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

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <h1>Dashboard</h1>
        <Box>
            <Grid container gap={4} marginTop={2}>
                {banks.map((bank: any, index: number) => (
                    <Grid item key={index}>
                        {bank.name}
                    </Grid>
                ))}
                Dashboard
            </Grid>
        </Box>
        </div>
    );
};

export default Dashboard;