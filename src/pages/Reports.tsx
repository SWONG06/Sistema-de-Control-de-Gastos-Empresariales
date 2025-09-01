import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useState } from "react";

const monthlyTrends = [
  { month: "Ene", ingresos: 12000, gastos: 8400, beneficio: 3600 },
  { month: "Feb", ingresos: 11500, gastos: 7300, beneficio: 4200 },
  { month: "Mar", ingresos: 13200, gastos: 9200, beneficio: 4000 },
  { month: "Abr", ingresos: 12800, gastos: 8100, beneficio: 4700 },
  { month: "May", ingresos: 12300, gastos: 7800, beneficio: 4500 },
  { month: "Jun", ingresos: 13500, gastos: 8900, beneficio: 4600 },
];

const categoryBreakdown = [
  { name: "Transporte", value: 2840, color: "hsl(213 94% 68%)" },
  { name: "Alimentación", value: 2130, color: "hsl(142 76% 36%)" },
  { name: "Suministros", value: 1890, color: "hsl(38 92% 50%)" },
  { name: "Servicios", value: 1240, color: "hsl(0 84% 60%)" },
  { name: "Otros", value: 800, color: "hsl(215 20% 65%)" },
];

const weeklyComparison = [
  { week: "S1", actual: 2200, anterior: 1800 },
  { week: "S2", actual: 2800, anterior: 2400 },
  { week: "S3", actual: 2100, anterior: 2600 },
  { week: "S4", actual: 2900, anterior: 2200 },
];

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  
  const currentMonthTotal = 8900;
  const previousMonthTotal = 8100;
  const percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal * 100);
  
  const totalIncome = 13500;
  const profitMargin = ((totalIncome - currentMonthTotal) / totalIncome * 100);

  return (
    <div className="p-4 pb-20 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="p-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Reportes Financieros</h1>
          <p className="text-sm text-muted-foreground">Análisis y tendencias</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Period Selector */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Este trimestre</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                percentageChange >= 0 ? 'bg-red-50' : 'bg-success-light'
              }`}>
                {percentageChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-destructive" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-success" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Variación gastos</p>
                <p className={`text-lg font-semibold ${
                  percentageChange >= 0 ? 'text-destructive' : 'text-success'
                }`}>
                  {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-light p-2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Margen beneficio</p>
                <p className="text-lg font-semibold text-primary">
                  {profitMargin.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Tendencias mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="beneficio" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Beneficio"
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="gastos" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                name="Gastos"
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Distribución por categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={150}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={25}
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1 pl-4">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">${item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Comparison */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Comparación semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Legend />
              <Bar dataKey="anterior" fill="hsl(var(--muted))" name="Mes anterior" />
              <Bar dataKey="actual" fill="hsl(var(--primary))" name="Mes actual" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Resumen del período</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total gastos:</span>
            <span className="font-semibold text-destructive">${currentMonthTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total ingresos:</span>
            <span className="font-semibold text-success">${totalIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Beneficio neto:</span>
            <span className="font-semibold text-primary">${(totalIncome - currentMonthTotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Promedio diario:</span>
            <span className="font-semibold">${(currentMonthTotal / 30).toFixed(0)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;