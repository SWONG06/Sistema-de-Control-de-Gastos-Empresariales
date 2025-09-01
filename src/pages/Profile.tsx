import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  User, 
  Building, 
  Bell, 
  Shield, 
  FileText, 
  LogOut,
  Edit2,
  Save,
  Camera
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ana García",
    email: "ana.garcia@empresa.com",
    company: "Tecnología Avanzada S.L.",
    position: "Gerente Financiero",
    phone: "+34 666 123 456",
    imageSrc: "",
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData(parsedProfile);
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
      }
    }
  }, []);
  
  const [notifications, setNotifications] = useState({
    expenseAlerts: true,
    budgetWarnings: true,
    monthlyReports: true,
    emailNotifications: false,
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    setIsEditing(false);

    // Save profile data to localStorage
    try {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      toast({
        title: "Perfil actualizado",
        description: "Los cambios han sido guardados correctamente",
      });
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
      toast({
        title: "Error al guardar",
        description: "No se pudo guardar el perfil. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  return (
    <div className="p-4 pb-20 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="p-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Perfil</h1>
        <div className="ml-auto">
          {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleSaveProfile}>
              <Save className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profileData.imageSrc || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-primary text-white text-xl">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-image-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setProfileData(prev => ({
                            ...prev,
                            imageSrc: reader.result as string,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 cursor-pointer bg-secondary flex items-center justify-center"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                </>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.position}</p>
              <p className="text-sm text-muted-foreground">{profileData.company}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({...prev, name: e.target.value}))}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Información Empresarial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              value={profileData.company}
              onChange={(e) => setProfileData(prev => ({...prev, company: e.target.value}))}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Cargo</Label>
            <Input
              id="position"
              value={profileData.position}
              onChange={(e) => setProfileData(prev => ({...prev, position: e.target.value}))}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de gastos</p>
              <p className="text-sm text-muted-foreground">Cuando superes límites establecidos</p>
            </div>
            <Switch 
              checked={notifications.expenseAlerts}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({...prev, expenseAlerts: checked}))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Advertencias de presupuesto</p>
              <p className="text-sm text-muted-foreground">Al alcanzar 80% del presupuesto</p>
            </div>
            <Switch 
              checked={notifications.budgetWarnings}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({...prev, budgetWarnings: checked}))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reportes mensuales</p>
              <p className="text-sm text-muted-foreground">Resumen automático cada mes</p>
            </div>
            <Switch 
              checked={notifications.monthlyReports}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({...prev, monthlyReports: checked}))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones por email</p>
              <p className="text-sm text-muted-foreground">Recibir alertas en tu correo</p>
            </div>
            <Switch 
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({...prev, emailNotifications: checked}))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Other Options */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start h-12">
          <Shield className="h-4 w-4 mr-3" />
          Seguridad y privacidad
        </Button>
        
        <Button variant="outline" className="w-full justify-start h-12">
          <FileText className="h-4 w-4 mr-3" />
          Términos y condiciones
        </Button>
        
        <Separator className="my-4" />
        
        <Button 
          variant="destructive" 
          className="w-full justify-start h-12" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default Profile;
