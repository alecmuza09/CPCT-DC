"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Settings, 
  Users, 
  Bell, 
  Database, 
  Shield, 
  Palette, 
  Mail, 
  Calendar, 
  FileText, 
  Globe,
  Save,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Link,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const usuariosData = [
  {
    id: 1,
    nombre: "Ana García",
    email: "ana.garcia@empresa.com",
    rol: "Administrador",
    departamento: "Recursos Humanos",
    activo: true,
    ultimoAcceso: "2024-01-15"
  },
  {
    id: 2,
    nombre: "Carlos López",
    email: "carlos.lopez@empresa.com",
    rol: "Instructor",
    departamento: "Calidad",
    activo: true,
    ultimoAcceso: "2024-01-14"
  },
  {
    id: 3,
    nombre: "María Rodríguez",
    email: "maria.rodriguez@empresa.com",
    rol: "Supervisor",
    departamento: "Producción",
    activo: false,
    ultimoAcceso: "2024-01-10"
  },
  {
    id: 4,
    nombre: "Juan Martínez",
    email: "juan.martinez@empresa.com",
    rol: "Empleado",
    departamento: "Mantenimiento",
    activo: true,
    ultimoAcceso: "2024-01-15"
  }
];

const integrationesData = [
  {
    id: 1,
    nombre: "Microsoft Teams",
    tipo: "Comunicación",
    estado: "conectado",
    descripcion: "Notificaciones y recordatorios automáticos",
    ultimaSync: "2024-01-15 10:30"
  },
  {
    id: 2,
    nombre: "SAP HR",
    tipo: "RRHH",
    estado: "conectado",
    descripcion: "Sincronización de empleados y departamentos",
    ultimaSync: "2024-01-15 09:15"
  },
  {
    id: 3,
    nombre: "Zoom",
    tipo: "Videoconferencia",
    estado: "desconectado",
    descripcion: "Clases virtuales y webinars",
    ultimaSync: "2024-01-12 14:20"
  },
  {
    id: 4,
    nombre: "Google Workspace",
    tipo: "Productividad",
    estado: "pendiente",
    descripcion: "Documentos y calendarios compartidos",
    ultimaSync: "N/A"
  }
];

export default function ConfiguracionCapacitacionPage() {
  const [configuracion, setConfiguracion] = useState({
    general: {
      nombreOrganizacion: "Empresa QMS",
      idioma: "es",
      zonaHoraria: "America/Mexico_City",
      formatoFecha: "DD/MM/YYYY"
    },
    notificaciones: {
      emailRecordatorios: true,
      emailVencimientos: true,
      emailEvaluaciones: true,
      pushNotificaciones: false,
      frecuenciaRecordatorios: "semanal"
    },
    evaluaciones: {
      puntuacionMinima: 70,
      intentosMaximos: 3,
      tiempoLimite: 60,
      mostrarResultados: true,
      permitirReintento: true
    },
    certificaciones: {
      validezPorDefecto: 365,
      recordatorioVencimiento: 30,
      renovacionAutomatica: false,
      plantillaPersonalizada: false
    }
  });

  const [mostrarDialogoUsuario, setMostrarDialogoUsuario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleConfigChange = (seccion, campo, valor) => {
    setConfiguracion(prev => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: valor
      }
    }));
  };

  const guardarConfiguracion = () => {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      alert("Configuración guardada exitosamente");
    }, 1500);
  };

  const exportarConfiguracion = () => {
    const dataStr = JSON.stringify(configuracion, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'configuracion-qms.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getRolColor = (rol) => {
    switch (rol) {
      case "Administrador": return "bg-red-500";
      case "Instructor": return "bg-blue-500";
      case "Supervisor": return "bg-yellow-500";
      case "Empleado": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getEstadoIntegracion = (estado) => {
    switch (estado) {
      case "conectado": return <Badge variant="default" className="bg-green-500">Conectado</Badge>;
      case "desconectado": return <Badge variant="destructive">Desconectado</Badge>;
      case "pendiente": return <Badge variant="outline">Pendiente</Badge>;
      default: return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-gray-600" />
            Configuración
          </h1>
          <p className="text-muted-foreground">Administra usuarios, configuraciones del sistema y integraciones para optimizar tu plataforma QMS.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportarConfiguracion}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Config
          </Button>
          <Button onClick={guardarConfiguracion} disabled={guardando}>
            {guardando ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="evaluaciones">Evaluaciones</TabsTrigger>
          <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Configuración General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="organizacion">Nombre de la Organización</Label>
                  <Input
                    id="organizacion"
                    value={configuracion.general.nombreOrganizacion}
                    onChange={(e) => handleConfigChange('general', 'nombreOrganizacion', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <Select 
                    value={configuracion.general.idioma} 
                    onValueChange={(value) => handleConfigChange('general', 'idioma', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zona-horaria">Zona Horaria</Label>
                  <Select 
                    value={configuracion.general.zonaHoraria} 
                    onValueChange={(value) => handleConfigChange('general', 'zonaHoraria', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Mexico_City">México (GMT-6)</SelectItem>
                      <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="formato-fecha">Formato de Fecha</Label>
                  <Select 
                    value={configuracion.general.formatoFecha} 
                    onValueChange={(value) => handleConfigChange('general', 'formatoFecha', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Personalización
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Tema</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="auto">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Color Primario</Label>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer border-2 border-blue-600"></div>
                    <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-red-500 rounded cursor-pointer"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="logo-personalizado">Logo Personalizado</Label>
                  <Switch id="logo-personalizado" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marca-agua">Marca de Agua</Label>
                  <Switch id="marca-agua" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestión de Usuarios
                  </CardTitle>
                  <CardDescription>Administra permisos, roles y accesos al sistema</CardDescription>
                </div>
                <Dialog open={mostrarDialogoUsuario} onOpenChange={setMostrarDialogoUsuario}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                      <DialogDescription>Completa la información del nuevo usuario</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Nombre Completo</Label>
                        <Input placeholder="Ej: Juan Pérez" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="juan.perez@empresa.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Rol</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="instructor">Instructor</SelectItem>
                            <SelectItem value="supervisor">Supervisor</SelectItem>
                            <SelectItem value="empleado">Empleado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Departamento</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                            <SelectItem value="calidad">Calidad</SelectItem>
                            <SelectItem value="produccion">Producción</SelectItem>
                            <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setMostrarDialogoUsuario(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setMostrarDialogoUsuario(false)}>
                        Crear Usuario
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosData.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {usuario.nombre.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{usuario.nombre}</div>
                            <div className="text-sm text-muted-foreground">{usuario.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRolColor(usuario.rol)}>
                          {usuario.rol}
                        </Badge>
                      </TableCell>
                      <TableCell>{usuario.departamento}</TableCell>
                      <TableCell>
                        {usuario.activo ? (
                          <Badge variant="default" className="bg-green-500">Activo</Badge>
                        ) : (
                          <Badge variant="secondary">Inactivo</Badge>
                        )}
                      </TableCell>
                      <TableCell>{usuario.ultimoAcceso}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            {usuario.activo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Configuración de Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-recordatorios">Recordatorios por Email</Label>
                    <p className="text-sm text-muted-foreground">Enviar recordatorios de cursos pendientes</p>
                  </div>
                  <Switch 
                    id="email-recordatorios"
                    checked={configuracion.notificaciones.emailRecordatorios}
                    onCheckedChange={(checked) => handleConfigChange('notificaciones', 'emailRecordatorios', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-vencimientos">Alertas de Vencimiento</Label>
                    <p className="text-sm text-muted-foreground">Notificar certificaciones próximas a vencer</p>
                  </div>
                  <Switch 
                    id="email-vencimientos"
                    checked={configuracion.notificaciones.emailVencimientos}
                    onCheckedChange={(checked) => handleConfigChange('notificaciones', 'emailVencimientos', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-evaluaciones">Resultados de Evaluaciones</Label>
                    <p className="text-sm text-muted-foreground">Enviar resultados automáticamente</p>
                  </div>
                  <Switch 
                    id="email-evaluaciones"
                    checked={configuracion.notificaciones.emailEvaluaciones}
                    onCheckedChange={(checked) => handleConfigChange('notificaciones', 'emailEvaluaciones', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Notificaciones Push</Label>
                    <p className="text-sm text-muted-foreground">Alertas en tiempo real en el navegador</p>
                  </div>
                  <Switch 
                    id="push-notifications"
                    checked={configuracion.notificaciones.pushNotificaciones}
                    onCheckedChange={(checked) => handleConfigChange('notificaciones', 'pushNotificaciones', checked)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Frecuencia de Recordatorios</Label>
                  <Select 
                    value={configuracion.notificaciones.frecuenciaRecordatorios}
                    onValueChange={(value) => handleConfigChange('notificaciones', 'frecuenciaRecordatorios', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diario</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Plantillas de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Asunto Recordatorio</Label>
                  <Input placeholder="Recordatorio: Curso pendiente" />
                </div>
                <div className="grid gap-2">
                  <Label>Plantilla Recordatorio</Label>
                  <Textarea 
                    placeholder="Estimado/a {nombre}, tienes un curso pendiente: {curso}..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Firma Email</Label>
                  <Textarea 
                    placeholder="Saludos,&#10;Equipo QMS"
                    className="min-h-[60px]"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Vista Previa
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="evaluaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Configuración de Evaluaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="puntuacion-minima">Puntuación Mínima (%)</Label>
                    <Input 
                      id="puntuacion-minima"
                      type="number"
                      value={configuracion.evaluaciones.puntuacionMinima}
                      onChange={(e) => handleConfigChange('evaluaciones', 'puntuacionMinima', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="intentos-maximos">Intentos Máximos</Label>
                    <Input 
                      id="intentos-maximos"
                      type="number"
                      value={configuracion.evaluaciones.intentosMaximos}
                      onChange={(e) => handleConfigChange('evaluaciones', 'intentosMaximos', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tiempo-limite">Tiempo Límite (minutos)</Label>
                    <Input 
                      id="tiempo-limite"
                      type="number"
                      value={configuracion.evaluaciones.tiempoLimite}
                      onChange={(e) => handleConfigChange('evaluaciones', 'tiempoLimite', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mostrar-resultados">Mostrar Resultados Inmediatos</Label>
                      <p className="text-sm text-muted-foreground">Mostrar puntuación al finalizar</p>
                    </div>
                    <Switch 
                      id="mostrar-resultados"
                      checked={configuracion.evaluaciones.mostrarResultados}
                      onCheckedChange={(checked) => handleConfigChange('evaluaciones', 'mostrarResultados', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="permitir-reintento">Permitir Reintentos</Label>
                      <p className="text-sm text-muted-foreground">Habilitar múltiples intentos</p>
                    </div>
                    <Switch 
                      id="permitir-reintento"
                      checked={configuracion.evaluaciones.permitirReintento}
                      onCheckedChange={(checked) => handleConfigChange('evaluaciones', 'permitirReintento', checked)}
                    />
                  </div>
                  
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Los cambios en la configuración de evaluaciones solo afectarán a las nuevas evaluaciones creadas.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integraciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Integraciones Disponibles
              </CardTitle>
              <CardDescription>Conecta tu sistema QMS con herramientas externas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {integrationesData.map((integracion) => (
                  <div key={integracion.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Database className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">{integracion.nombre}</h4>
                        <p className="text-sm text-muted-foreground">{integracion.descripcion}</p>
                        <p className="text-xs text-muted-foreground">
                          Última sync: {integracion.ultimaSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getEstadoIntegracion(integracion.estado)}
                      <Button variant="outline" size="sm">
                        {integracion.estado === "conectado" ? "Configurar" : "Conectar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Seguridad y Acceso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auth-2fa">Autenticación de Dos Factores</Label>
                    <p className="text-sm text-muted-foreground">Requerir 2FA para todos los usuarios</p>
                  </div>
                  <Switch id="auth-2fa" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout">Timeout de Sesión</Label>
                    <p className="text-sm text-muted-foreground">Cerrar sesión automáticamente</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                
                <div className="grid gap-2">
                  <Label>Duración de Sesión (minutos)</Label>
                  <Input type="number" defaultValue="480" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-log">Registro de Auditoría</Label>
                    <p className="text-sm text-muted-foreground">Registrar todas las acciones</p>
                  </div>
                  <Switch id="audit-log" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Políticas de Contraseña
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Longitud Mínima</Label>
                  <Input type="number" defaultValue="8" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-uppercase">Requerir Mayúsculas</Label>
                  <Switch id="require-uppercase" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-numbers">Requerir Números</Label>
                  <Switch id="require-numbers" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-symbols">Requerir Símbolos</Label>
                  <Switch id="require-symbols" />
                </div>
                
                <div className="grid gap-2">
                  <Label>Expiración (días)</Label>
                  <Input type="number" defaultValue="90" />
                </div>
                
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Las políticas se aplicarán en el próximo cambio de contraseña.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 