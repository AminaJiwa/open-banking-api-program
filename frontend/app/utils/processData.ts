import data from "./data.json";

export interface Payment {
    id: number;
    Date: string;
    Category: string;
    Amount: string;
    Type: string;
}

export interface SpendingByCategory {
    [key: string]: number;
}

interface IncomeVsExpenses {
    income: number;
    expenses: number;
}

export interface ChartData {
    labels: string[];
    datasets: {
        label: string; 
        data: number[];
        backgroundColor: string[];
        borderColor?: string[];
        borderWidth?: number;
    }[];
}

export const totalSpending = (data: Payment[]): number => {
    return data
    .filter((item) => item.Type === "Expense")
    .reduce((sum: number, item) => sum + parseFloat(item.Amount.replace("£", "")), 0);

};
export const spendingByCategory = (data: Payment[]): SpendingByCategory => {
    return data
    .filter((item) => item.Type === "Expense")
    .reduce((acc, item) => {
        if (!acc[item.Category]) {
            acc[item.Category] = 0;
        }
        acc[item.Category] += parseFloat(item.Amount.replace("£", ""));
        return acc;
    }, {} as SpendingByCategory);

};

export const incomeVsExpenses = (data: Payment[]): IncomeVsExpenses => {
    return data.reduce(
        (acc, item) => {
            const amount = parseFloat(item.Amount.replace("£", ""));
            if (item.Type === "Income") {
                acc.income += amount;
            } else {
                acc.expenses += amount;
            }
            return acc;
        },
        { income: 0, expenses: 0 }
    );
};