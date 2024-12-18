import { Box, Grid } from "@mui/material";
import React from "react";
import sccs from "../pages/Home.module.scss";
const Dashboard = () => {
    return (
        <div>
        <Box>
            <Grid container gap={4} marginTop={2}>
                {/* <DataRibbon /> */}
                Dashboard
            </Grid>
        </Box>
        </div>
    );
};

export default Dashboard;