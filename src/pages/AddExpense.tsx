import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Car, Coffee, Briefcase, Home, Zap, Receipt, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTransactions } from "@/contexts/TransactionsContext";

const expenseCategories = [
  { value: "Transporte", label: "Transporte", icon: Car },
  { value: "Alimentación", label: "Alimentación", icon: Coffee },
  { value: "Suministros", label: "Suministros", icon: Briefcase },
  { value: "Servicios", label: "Servicios", icon: Zap },
  { value: "Alquiler", label: "Alquiler", icon: Home },
  { value: "Otros", label: "Otros", icon: Receipt },
];

const incomeCategories = [
  { value: "Ventas", label: "Ventas", icon: TrendingUp },
  { value: "Servicios", label: "Servicios", icon: Zap },
  { value: "Otros", label: "Otros", icon: Receipt },
];

const paymentMethods = [
  { value: "cash", label: "Efectivo" },
  { value: "credit", label: "Tarjeta de Crédito" },
  { value: "debit", label: "Tarjeta de Débito" },
  { value: "transfer", label: "Transferencia" },
];

const AddExpense = () => {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { addTransaction } = useTransactions();

  const categories = type === "expense" ? expenseCategories : incomeCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    const paymentMethodLabel = paymentMethods.find(m => m.value === paymentMethod)?.label;

    addTransaction({
      type,
      category,
      amount: type === "expense" ? -parseFloat(amount) : parseFloat(amount),
      description,
      date,
      paymentMethod: paymentMethodLabel,
    });

    toast({
      title: type === "expense" ? "Gasto registrado" : "Ingreso registrado",
      description: `${type === "expense" ? "Gasto" : "Ingreso"} de $${amount} registrado correctamente`,
    });

    navigate("/");
  };

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" asChild className="p-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Agregar Transacción</h1>
      </div>

      {/* Type Selector */}
      <div className="flex gap-2 mb-6">
        <Button
          type="button"
          variant={type === "expense" ? "default" : "outline"}
          onClick={() => setType("expense")}
          className="flex-1"
        >
          Gasto
        </Button>
        <Button
          type="button"
          variant={type === "income" ? "default" : "outline"}
          onClick={() => setType("income")}
          className="flex-1"
        >
          Ingreso
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">
            {type === "expense" ? "Registrar Gasto" : "Registrar Ingreso"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <cat.icon className="h-4 w-4" />
                        {cat.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {type === "expense" && (
              <div className="space-y-2">
                <Label htmlFor="payment">Método de Pago</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                placeholder="Descripción de la transacción..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-primary hover:bg-primary-hover">
              <Save className="h-4 w-4 mr-2" />
              {type === "expense" ? "Guardar Gasto" : "Guardar Ingreso"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpense;