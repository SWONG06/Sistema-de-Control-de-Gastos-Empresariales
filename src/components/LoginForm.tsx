import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    // Simulate authentication
    toast({
      title: isLogin ? "Bienvenido" : "Cuenta creada",
      description: isLogin ? "Has iniciado sesión correctamente" : "Tu cuenta ha sido creada exitosamente",
    });
    
    // Redirect to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto bg-gradient-primary p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">ExpenseFlow</CardTitle>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Inicia sesión en tu cuenta" : "Crea tu cuenta empresarial"}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="company">Nombre de la empresa</Label>
                <Input
                  id="company"
                  placeholder="Nombre de tu empresa"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full bg-gradient-primary hover:bg-primary-hover">
              {isLogin ? "Iniciar sesión" : "Crear cuenta"}
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-primary hover:text-primary-hover"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}