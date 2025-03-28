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
          data: [getTotalSpending],
          backgroundColor: ["#FF6384"],
          borderColor: ["#FFFFFF"],
          borderWidth: 1,
        },
      ],
    }),
    [getTotalSpending]
  );

  const categoryColours = [
    "#36A2EB",
    "#FF6384",
    "#4BC0C0",
    "#FFCE56",
    "#9966FF",
    "#FF9F40",
  ];

  const spendingByCategoryData: ChartData = useMemo(
    () => ({
      labels: Object.keys(getSpendingByCategory),
      datasets: [
        {
          label: "Spending by Category",
          data: Object.values(getSpendingByCategory),
          backgroundColor: Object.keys(getSpendingByCategory).map(
            (_, index) => categoryColours[index % categoryColours.length]
          ),
          borderColor:["#FFFFFF"],
          borderWidth: 1,
        },
      ],
    }),
    [getSpendingByCategory]
  );

  const incomeVsExpensesData: ChartData = useMemo(
    () => ({
      labels: ["Income", "Expenses"],
      datasets: [
        {
          label: "Income vs. Expenses",
          data: [getIncomeVsExpenses.income, getIncomeVsExpenses.expenses],
          backgroundColor: ["#4BC0C0", "#FFCE56"],
          borderColor: ["#FFFFFF"],
          borderWidth: 1,
        },
      ],
    }),
    [getIncomeVsExpenses]
  );

  return {
    totalSpendingData,
    spendingByCategoryData,
    incomeVsExpensesData,
  };
};