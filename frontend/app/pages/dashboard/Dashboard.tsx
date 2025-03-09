"use client";
import { Box, ThemeProvider, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import data from "../../utils/data.json";
import darkTheme from "../../theme/darkTheme";

interface Payment {
  id: number;
  Date: string;
  Payment: string;
  Amount: string;
  Type: string;
}

interface Column {
  id: keyof Payment;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: "Date", label: "Date", minWidth: 100 },
  { id: "Payment", label: "Payment", minWidth: 150 },
  { id: "Amount", label: "Amount", minWidth: 100, align: "right" },
  { id: "Type", label: "Type", minWidth: 100 },
];

const Dashboard: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State to manage side menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  useEffect(() => {
    try {

      const sortedData = data.sort((a, b) => {
        // Convert to "YYYY-MM-DD"
        const dateA = new Date(a.Date.split("/").reverse().join("-")); 
        const dateB = new Date(b.Date.split("/").reverse().join("-")); 
        // Sort by descending date
        return dateB.getTime() - dateA.getTime(); 
      });

      setPayments(sortedData);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
        <Typography variant="h3" gutterBottom>
        Dashboard
        </Typography>

        <Typography variant="h5" gutterBottom>
        Welcome John Doe
        </Typography>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {payments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payment) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={payment.id}>
                        {columns.map((column) => {
                          const value = payment[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "string"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={payments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default Dashboard;