import { useMemo } from "react";
import { totalSpending, spendingByCategory, incomeVsExpenses } from "../utils/processData";
import { ChartData, Payment } from "../utils/processData";

export const useChartData = (data: Payment[]) => {
  const getTotalSpending = useMemo(() => totalSpending(data), [data]);
  const getSpendingByCategory = useMemo(() => spendingByCategory(data), [data]);
  const getIncomeVsExpenses = useMemo(() => incomeVsExpenses(data), [data]);

  // Chart data
  const totalSpendingData: ChartData = useMemo(
    () => ({
      labels: ["Total Spending"],
      datasets: [
        {
          label: "Total Spending",
          data: [totalSpending],
          backgroundColor: ["#FF6384"],
          borderColor: ["#FFFFFF"],
          borderWidth: 1,
        },
      ],
    }),
    [totalSpending]
  );

  const spendingByCategoryData: ChartData = useMemo(
    () => ({
      labels: Object.keys(spendingByCategory),
      datasets: [
        {
          label: "Spending by Category",
          data: Object.values(spendingByCategory),
          backgroundColor: "#36A2EB",
          borderColor: "#FFFFFF",
          borderWidth: 1,
        },
      ],
    }),
    [spendingByCategory]
  );

  const incomeVsExpensesData: ChartData = useMemo(
    () => ({
      labels: ["Income", "Expenses"],
      datasets: [
        {
          label: "Income vs. Expenses",
          data: [incomeVsExpenses.income, incomeVsExpenses.expenses],
          backgroundColor: ["#4BC0C0", "#FFCE56"],
          borderColor: ["#FFFFFF"],
          borderWidth: 1,
        },
      ],
    }),
    [incomeVsExpenses]
  );

  return {
    totalSpendingData,
    spendingByCategoryData,
    incomeVsExpensesData,
  };
};