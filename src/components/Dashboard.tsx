import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  PlusCircle,
  TrendingUp,
  DollarSign,
  CreditCard,
  Car,
  Coffee,
  Home,
  Briefcase,
  Zap,
  Receipt
} from "lucide-react";
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import { useTransactions } from "@/contexts/TransactionsContext";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const monthlyData = [
  { name: "Ene", gastos: 8400, ingresos: 12000 },
  { name: "Feb", gastos: 7300, ingresos: 11500 },
  { name: "Mar", gastos: 9200, ingresos: 13200 },
  { name: "Abr", gastos: 8100, ingresos: 12800 },
  { name: "May", gastos: 7800, ingresos: 12300 },
  { name: "Jun", gastos: 8900, ingresos: 13500 },
];

const categoryData = [
  { name: "Transporte", value: 2840, color: "hsl(213 94% 68%)" },
  { name: "Alimentación", value: 2130, color: "hsl(142 76% 36%)" },
  { name: "Suministros", value: 1890, color: "hsl(38 92% 50%)" },
  { name: "Otros", value: 1240, color: "hsl(0 84% 60%)" },
];

const categoryIcons: Record<string, any> = {
  "Transporte": Car,
  "Alimentación": Coffee,
  "Suministros": Briefcase,
  "Servicios": Zap,
  "Alquiler": Home,
  "Otros": Receipt,
  "Ventas": TrendingUp,
};

export function Dashboard() {
  const { transactions } = useTransactions();
  const { theme, setTheme } = useTheme();

  // Calculate real totals from transactions
  const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  // Calculate monthly totals (current month)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = Math.abs(monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const monthlyProfit = monthlyIncome - monthlyExpenses;

  // Calculate total income and expenses (all time)
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  // Get recent transactions (last 4, sorted by date descending)
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(transaction => ({
      ...transaction,
      icon: categoryIcons[transaction.category] || Receipt,
    }));

  return (
    <div className="p-4 pb-20 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Control de gastos empresariales</p>
        </div>
        <div className="bg-gradient-primary p-3 rounded-full">
          <Wallet className="h-6 w-6 text-white" />
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Modo Claro"
            type="button"
            className={`p-2 rounded-md transition ${
              theme === "light"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
            onClick={() => setTheme("light")}
          >
            <Sun className="h-5 w-5" />
          </button>
          <button
            aria-label="Modo Oscuro"
            type="button"
            className={`p-2 rounded-md transition ${
              theme === "dark"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-primary text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Saldo total</p>
              <p className="text-3xl font-bold">${totalBalance.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-white/80" />
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              <span>+{monthlyProfit.toLocaleString()}</span>
            </div>
            <span className="text-white/80">Este mes</span>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-success-light p-2 rounded-lg">
                <ArrowUpRight className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ingresos mensuales</p>
                <p className="text-lg font-semibold text-success">
                  ${monthlyIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-50 p-2 rounded-lg">
                <ArrowDownRight className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gastos mensuales</p>
                <p className="text-lg font-semibold text-destructive">
                  ${monthlyExpenses.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Total Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-card border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-success-light p-2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total ingresos</p>
                <p className="text-lg font-semibold text-success">
                  ${totalIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-50 p-2 rounded-lg">
                <CreditCard className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total gastos</p>
                <p className="text-lg font-semibold text-destructive">
                  ${totalExpenses.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Tendencia mensual</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Bar dataKey="ingresos" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="gastos" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Categories Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Gastos por categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="60%" height={120}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  innerRadius={20}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground flex-1">{item.name}</span>
                  <span className="font-medium">${item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Transacciones recientes</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/expenses">Ver todas</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income'
                    ? 'bg-success-light'
                    : 'bg-red-50'
                }`}>
                  <transaction.icon className={`h-4 w-4 ${
                    transaction.type === 'income'
                      ? 'text-success'
                      : 'text-destructive'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.category}</p>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'income'
                    ? 'text-success'
                    : 'text-destructive'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No hay transacciones recientes</p>
              <Button variant="link" asChild className="mt-2">
                <Link to="/add-expense">Agregar primera transacción</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Action */}
      <Button asChild className="w-full h-12 bg-gradient-primary hover:bg-primary-hover">
        <Link to="/add-expense" className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Agregar gasto o ingreso
        </Link>
      </Button>
    </div>
  );
}