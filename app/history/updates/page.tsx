"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  Search, 
  RefreshCw, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Info,
  Star,
  Bug,
  Zap,
  Shield,
  Sparkles,
  Calendar,
  Users,
  FileText,
  Settings,
  Rocket
} from "lucide-react";

const actualizacionesData = [
  {
    id: "v2.4.1",
    version: "2.4.1",
    fecha: "2024-01-15",
    tipo: "Patch",
    estado: "Instalado",
    tamaño: "45.2 MB",
    prioridad: "Media",
    categoria: "Corrección de Errores",
    descripcion: "Correcciones menores de seguridad y mejoras de rendimiento",
    novedades: [
      "Corrección de error en generación de reportes ISO 9001",
      "Mejora en la velocidad de carga de evidencias",
      "Actualización de bibliotecas de seguridad",
      "Optimización de consultas de base de datos"
    ],
    erroresCorregidos: [
      "Error en exportación de datos a Excel",
      "Problema de timeout en carga de archivos grandes",
      "Inconsistencia en fechas de vencimiento",
      "Error de validación en formularios de auditoría"
    ],
    compatibilidad: "Todas las versiones 2.x",
    requisitosSistema: {
      navegador: "Chrome 90+, Firefox 88+, Safari 14+",
      memoria: "4 GB RAM mínimo",
      espacio: "500 MB disponible",
      conexion: "Banda ancha recomendada"
    },
    instaladoEn: "2024-01-15 10:30",
    instaladoPor: "Administrador Sistema"
  },
  {
    id: "v2.4.0",
    version: "2.4.0",
    fecha: "2024-01-08",
    tipo: "Minor",
    estado: "Instalado",
    tamaño: "128.5 MB",
    prioridad: "Alta",
    categoria: "Nuevas Funcionalidades",
    descripcion: "Nueva funcionalidad de Asistente IA y mejoras en el módulo de auditorías",
    novedades: [
      "Nuevo Asistente IA para análisis inteligente",
      "Dashboard mejorado con métricas avanzadas",
      "Sistema de notificaciones push",
      "Integración mejorada con sistemas externos",
      "Nueva interfaz para gestión de evidencias"
    ],
    erroresCorregidos: [
      "Múltiples correcciones de estabilidad",
      "Mejoras en la sincronización de datos",
      "Optimización de memoria"
    ],
    compatibilidad: "Requiere migración desde 2.3.x",
    requisitosSistema: {
      navegador: "Chrome 90+, Firefox 88+, Safari 14+",
      memoria: "6 GB RAM mínimo",
      espacio: "1 GB disponible",
      conexion: "Banda ancha requerida"
    },
    instaladoEn: "2024-01-08 15:45",
    instaladoPor: "Carlos López"
  },
  {
    id: "v2.3.2",
    version: "2.3.2",
    fecha: "2023-12-20",
    tipo: "Patch",
    estado: "Instalado",
    tamaño: "32.1 MB",
    prioridad: "Crítica",
    categoria: "Seguridad",
    descripcion: "Actualización crítica de seguridad para vulnerabilidades identificadas",
    novedades: [
      "Parches de seguridad críticos",
      "Mejoras en autenticación de usuarios",
      "Actualización de certificados SSL",
      "Refuerzo en validación de entrada de datos"
    ],
    erroresCorregidos: [
      "Vulnerabilidad de inyección SQL",
      "Falla en validación de permisos",
      "Exposición de datos sensibles en logs"
    ],
    compatibilidad: "Todas las versiones 2.3.x",
    requisitosSistema: {
      navegador: "Chrome 88+, Firefox 85+, Safari 13+",
      memoria: "4 GB RAM mínimo",
      espacio: "300 MB disponible",
      conexion: "Conexión a internet requerida"
    },
    instaladoEn: "2023-12-20 09:15",
    instaladoPor: "Administrador Sistema"
  },
  {
    id: "v2.5.0",
    version: "2.5.0",
    fecha: "2024-02-01",
    tipo: "Minor",
    estado: "Disponible",
    tamaño: "156.3 MB",
    prioridad: "Alta",
    categoria: "Nuevas Funcionalidades",
    descripcion: "Integración completa con ERP y nuevas herramientas de análisis predictivo",
    novedades: [
      "Integración nativa con sistemas ERP",
      "Análisis predictivo avanzado con IA",
      "Nuevos dashboards ejecutivos",
      "Automatización de flujos de trabajo",
      "API REST mejorada para integraciones"
    ],
    erroresCorregidos: [
      "Optimización general de rendimiento",
      "Mejoras en la interfaz de usuario",
      "Correcciones en reportes personalizados"
    ],
    compatibilidad: "Requiere versión 2.4.x o superior",
    requisitosSistema: {
      navegador: "Chrome 95+, Firefox 92+, Safari 15+",
      memoria: "8 GB RAM recomendado",
      espacio: "1.5 GB disponible",
      conexion: "Banda ancha requerida"
    }
  }
];

const estadisticasActualizaciones = {
  versionActual: "v2.4.1",
  proximaActualizacion: "v2.5.0",
  actualizacionesPendientes: 1,
  actualizacionesInstaladas: 12,
  ultimaVerificacion: "2024-01-16 08:00",
  configuracionAutomatica: true
};

export default function ActualizacionesPage() {
  const [actualizaciones, setActualizaciones] = useState(actualizacionesData);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [actualizacionSeleccionada, setActualizacionSeleccionada] = useState(null);
  const [verificandoActualizaciones, setVerificandoActualizaciones] = useState(false);
  const [instalandoActualizacion, setInstalandoActualizacion] = useState(false);
  const [progresoInstalacion, setProgresoInstalacion] = useState(0);

  const actualizacionesFiltradas = actualizaciones.filter(actualizacion => {
    const matchBusqueda = actualizacion.version.toLowerCase().includes(busqueda.toLowerCase()) ||
                         actualizacion.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchTipo = filtroTipo === "todos" || actualizacion.tipo === filtroTipo;
    const matchEstado = filtroEstado === "todos" || actualizacion.estado === filtroEstado;
    
    return matchBusqueda && matchTipo && matchEstado;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Instalado":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Instalado</Badge>;
      case "Disponible":
        return <Badge variant="secondary" className="bg-blue-500"><Download className="w-3 h-3 mr-1" />Disponible</Badge>;
      case "Instalando":
        return <Badge variant="outline"><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Instalando</Badge>;
      case "Error":
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getTipoBadge = (tipo) => {
    switch (tipo) {
      case "Major":
        return <Badge variant="default" className="bg-purple-500"><Rocket className="w-3 h-3 mr-1" />Major</Badge>;
      case "Minor":
        return <Badge variant="secondary" className="bg-blue-500"><Sparkles className="w-3 h-3 mr-1" />Minor</Badge>;
      case "Patch":
        return <Badge variant="outline"><Bug className="w-3 h-3 mr-1" />Patch</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "Crítica": return "text-red-600";
      case "Alta": return "text-orange-600";
      case "Media": return "text-yellow-600";
      case "Baja": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getCategoriaIcon = (categoria) => {
    switch (categoria) {
      case "Seguridad": return <Shield className="h-4 w-4" />;
      case "Nuevas Funcionalidades": return <Sparkles className="h-4 w-4" />;
      case "Corrección de Errores": return <Bug className="h-4 w-4" />;
      case "Rendimiento": return <Zap className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const verificarActualizaciones = () => {
    setVerificandoActualizaciones(true);
    setTimeout(() => {
      setVerificandoActualizaciones(false);
      alert("Verificación completada. 1 actualización disponible.");
    }, 2000);
  };

  const instalarActualizacion = (actualizacion) => {
    setInstalandoActualizacion(true);
    setProgresoInstalacion(0);
    
    const intervalo = setInterval(() => {
      setProgresoInstalacion(prev => {
        if (prev >= 100) {
          clearInterval(intervalo);
          setInstalandoActualizacion(false);
          alert(`Actualización ${actualizacion.version} instalada exitosamente`);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <RefreshCw className="h-8 w-8 text-green-600" />
            Actualizaciones del Sistema
          </h1>
          <p className="text-muted-foreground">Gestión de versiones, instalación de actualizaciones y seguimiento de cambios del sistema QMS.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={verificarActualizaciones}
            disabled={verificandoActualizaciones}
          >
            {verificandoActualizaciones ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Verificar Actualizaciones
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Estado actual */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Versión Actual</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estadisticasActualizaciones.versionActual}</div>
            <p className="text-xs text-muted-foreground">instalada y activa</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Versión</CardTitle>
            <Download className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estadisticasActualizaciones.proximaActualizacion}</div>
            <p className="text-xs text-muted-foreground">disponible para instalar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{estadisticasActualizaciones.actualizacionesPendientes}</div>
            <p className="text-xs text-muted-foreground">actualizaciones disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instaladas</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasActualizaciones.actualizacionesInstaladas}</div>
            <p className="text-xs text-muted-foreground">este año</p>
          </CardContent>
        </Card>
      </div>

      {/* Progreso de instalación */}
      {instalandoActualizacion && (
        <Alert>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertDescription>
            <div className="space-y-2">
              <div>Instalando actualización... {progresoInstalacion}%</div>
              <Progress value={progresoInstalacion} className="w-full" />
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Actualizaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar versiones..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="Major">Major</SelectItem>
                <SelectItem value="Minor">Minor</SelectItem>
                <SelectItem value="Patch">Patch</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="Instalado">Instalado</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Última verificación: {estadisticasActualizaciones.ultimaVerificacion}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="disponibles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="disponibles">Disponibles</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="disponibles" className="space-y-4">
          <div className="grid gap-4">
            {actualizacionesFiltradas
              .filter(act => act.estado === "Disponible")
              .map((actualizacion) => (
                <Card key={actualizacion.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTipoBadge(actualizacion.tipo)}
                          {getEstadoBadge(actualizacion.estado)}
                          <span className={`text-sm font-medium ${getPrioridadColor(actualizacion.prioridad)}`}>
                            {actualizacion.prioridad}
                          </span>
                        </div>
                        <CardTitle className="text-xl">Versión {actualizacion.version}</CardTitle>
                        <CardDescription className="mt-1">{actualizacion.descripcion}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{actualizacion.tamaño}</div>
                        <div className="text-xs text-muted-foreground">{actualizacion.fecha}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getCategoriaIcon(actualizacion.categoria)}
                        <Badge variant="outline">{actualizacion.categoria}</Badge>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Novedades principales:</h4>
                          <ul className="text-sm space-y-1">
                            {actualizacion.novedades.slice(0, 3).map((novedad, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {novedad}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Requisitos del sistema:</h4>
                          <div className="text-sm space-y-1">
                            <div><span className="text-muted-foreground">Navegador:</span> {actualizacion.requisitosSistema.navegador}</div>
                            <div><span className="text-muted-foreground">Memoria:</span> {actualizacion.requisitosSistema.memoria}</div>
                            <div><span className="text-muted-foreground">Espacio:</span> {actualizacion.requisitosSistema.espacio}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={() => setActualizacionSeleccionada(actualizacion)}
                        >
                          <Info className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </Button>
                        <Button 
                          onClick={() => instalarActualizacion(actualizacion)}
                          disabled={instalandoActualizacion}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Instalar Ahora
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="historial" className="space-y-4">
          <div className="grid gap-4">
            {actualizacionesFiltradas
              .filter(act => act.estado === "Instalado")
              .map((actualizacion) => (
                <Card key={actualizacion.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTipoBadge(actualizacion.tipo)}
                          {getEstadoBadge(actualizacion.estado)}
                          <Badge variant="outline">{actualizacion.categoria}</Badge>
                        </div>
                        <CardTitle className="text-lg">Versión {actualizacion.version}</CardTitle>
                        <CardDescription className="mt-1">{actualizacion.descripcion}</CardDescription>
                      </div>
                      <div className="text-right text-sm">
                        <div>Instalado: {actualizacion.instaladoEn}</div>
                        <div className="text-muted-foreground">Por: {actualizacion.instaladoPor}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Mejoras incluidas:</h4>
                        <ul className="text-sm space-y-1">
                          {actualizacion.novedades.slice(0, 2).map((novedad, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {novedad}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Errores corregidos:</h4>
                        <ul className="text-sm space-y-1">
                          {actualizacion.erroresCorregidos.slice(0, 2).map((error, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Bug className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActualizacionSeleccionada(actualizacion)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Notas Completas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Actualizaciones</CardTitle>
              <CardDescription>
                Configura cómo y cuándo se verifican e instalan las actualizaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Verificación Automática</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Verificar actualizaciones automáticamente</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Notificar cuando haya actualizaciones disponibles</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Instalar actualizaciones críticas automáticamente</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Frecuencia</h3>
                  <Select defaultValue="diario">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiempo-real">Tiempo real</SelectItem>
                      <SelectItem value="diario">Diario</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="manual">Solo manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Canales de Actualización</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" name="canal" value="estable" defaultChecked />
                      <h4 className="font-medium">Estable</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Versiones probadas y estables para producción
                    </p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" name="canal" value="beta" />
                      <h4 className="font-medium">Beta</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Versiones previas con nuevas funcionalidades
                    </p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" name="canal" value="desarrollo" />
                      <h4 className="font-medium">Desarrollo</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Últimas características en desarrollo
                    </p>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Restaurar Configuración</Button>
                <Button>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de detalles */}
      {actualizacionSeleccionada && (
        <Dialog open={!!actualizacionSeleccionada} onOpenChange={() => setActualizacionSeleccionada(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                {getTipoBadge(actualizacionSeleccionada.tipo)}
                {getEstadoBadge(actualizacionSeleccionada.estado)}
                <Badge variant="outline">{actualizacionSeleccionada.categoria}</Badge>
              </div>
              <DialogTitle className="text-2xl">
                Versión {actualizacionSeleccionada.version}
              </DialogTitle>
              <DialogDescription>
                {actualizacionSeleccionada.descripcion}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-3">Información General</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha de lanzamiento:</span>
                      <span>{actualizacionSeleccionada.fecha}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tamaño:</span>
                      <span>{actualizacionSeleccionada.tamaño}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prioridad:</span>
                      <span className={getPrioridadColor(actualizacionSeleccionada.prioridad)}>
                        {actualizacionSeleccionada.prioridad}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compatibilidad:</span>
                      <span>{actualizacionSeleccionada.compatibilidad}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Requisitos del Sistema</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(actualizacionSeleccionada.requisitosSistema).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Novedades y Mejoras</h3>
                <ul className="space-y-2">
                  {actualizacionSeleccionada.novedades.map((novedad, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {novedad}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-3">Errores Corregidos</h3>
                <ul className="space-y-2">
                  {actualizacionSeleccionada.erroresCorregidos.map((error, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Bug className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setActualizacionSeleccionada(null)}>
                Cerrar
              </Button>
              {actualizacionSeleccionada.estado === "Disponible" && (
                <Button onClick={() => instalarActualizacion(actualizacionSeleccionada)}>
                  <Download className="mr-2 h-4 w-4" />
                  Instalar Actualización
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 