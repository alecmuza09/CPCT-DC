"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  History, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar as CalendarIcon,
  Clock,
  User,
  FileText,
  Edit,
  Trash2,
  Plus,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
  BarChart3
} from "lucide-react";

const cambiosData = [
  {
    id: "CH-001",
    fecha: "2024-01-16",
    hora: "14:30",
    usuario: "María González",
    modulo: "Documentación",
    accion: "Modificación",
    elemento: "Manual de Calidad v3.2",
    descripcion: "Actualización de la política de calidad según nueva normativa ISO 9001",
    tipoElemento: "Documento",
    estadoAnterior: "Aprobado",
    estadoNuevo: "En Revisión",
    impacto: "Alto",
    razon: "Actualización normativa",
    detalles: {
      seccionModificada: "Sección 4.1 - Política de Calidad",
      cambiosEspecificos: ["Actualización de objetivos de calidad", "Inclusión de nuevos indicadores KPI", "Revisión de responsabilidades"],
      aprobadoPor: "Carlos López",
      proximaRevision: "2024-01-20"
    }
  },
  {
    id: "CH-002",
    fecha: "2024-01-16",
    hora: "11:15",
    usuario: "Ana López",
    modulo: "Auditorías",
    accion: "Creación",
    elemento: "Evidencia AUD-2024-001",
    descripcion: "Nueva evidencia para cláusula 8.4 de ISO 9001 - Control de procesos externos",
    tipoElemento: "Evidencia",
    estadoAnterior: "-",
    estadoNuevo: "Pendiente Validación",
    impacto: "Medio",
    razon: "Cumplimiento auditoría",
    detalles: {
      clausulaISO: "8.4",
      tipoEvidencia: "Documento",
      tamaño: "2.3 MB",
      formato: "PDF",
      validadoPor: "Pendiente"
    }
  },
  {
    id: "CH-003",
    fecha: "2024-01-15",
    hora: "16:45",
    usuario: "Carlos López",
    modulo: "Capacitación",
    accion: "Eliminación",
    elemento: "Curso: Procedimientos Obsoletos",
    descripcion: "Eliminación de curso obsoleto reemplazado por nueva versión actualizada",
    tipoElemento: "Curso",
    estadoAnterior: "Inactivo",
    estadoNuevo: "Eliminado",
    impacto: "Bajo",
    razon: "Actualización contenido",
    detalles: {
      participantesAfectados: 0,
      cursoReemplazo: "Procedimientos Actualizados v2.0",
      fechaEliminacion: "2024-01-15",
      respaldoCreado: true
    }
  },
  {
    id: "CH-004",
    fecha: "2024-01-15",
    hora: "09:20",
    usuario: "Juan Martínez",
    modulo: "Cumplimiento",
    accion: "Modificación",
    elemento: "Plan de Acción ISO 22000",
    descripcion: "Actualización de fechas límite para acciones correctivas pendientes",
    tipoElemento: "Plan",
    estadoAnterior: "En Progreso",
    estadoNuevo: "En Progreso",
    impacto: "Alto",
    razon: "Ajuste cronograma",
    detalles: {
      accionesModificadas: 5,
      extensionPromedio: "7 días",
      justificacion: "Retraso en proveedores externos",
      aprobacionRequerida: true
    }
  },
  {
    id: "CH-005",
    fecha: "2024-01-14",
    hora: "13:10",
    usuario: "Pedro Sánchez",
    modulo: "Gestión Documental",
    accion: "Creación",
    elemento: "Procedimiento POP-025",
    descripcion: "Nuevo procedimiento para gestión de residuos según ISO 14001",
    tipoElemento: "Procedimiento",
    estadoAnterior: "-",
    estadoNuevo: "Borrador",
    impacto: "Medio",
    razon: "Nueva normativa ambiental",
    detalles: {
      version: "1.0",
      paginasTotal: 12,
      anexos: 3,
      requiereCapacitacion: true,
      fechaImplementacion: "2024-02-01"
    }
  }
];

const estadisticasCambios = {
  totalCambios: 45,
  cambiosHoy: 3,
  cambiosSemana: 12,
  cambiosMes: 45,
  porModulo: [
    { modulo: "Documentación", cantidad: 15, porcentaje: 33 },
    { modulo: "Auditorías", cantidad: 12, porcentaje: 27 },
    { modulo: "Capacitación", cantidad: 8, porcentaje: 18 },
    { modulo: "Cumplimiento", cantidad: 6, porcentaje: 13 },
    { modulo: "Gestión Documental", cantidad: 4, porcentaje: 9 }
  ],
  usuariosMasActivos: [
    { usuario: "María González", cambios: 12 },
    { usuario: "Carlos López", cambios: 9 },
    { usuario: "Ana López", cambios: 8 },
    { usuario: "Juan Martínez", cambios: 7 }
  ]
};

export default function CambiosPage() {
  const [cambios, setCambios] = useState(cambiosData);
  const [busqueda, setBusqueda] = useState("");
  const [filtroModulo, setFiltroModulo] = useState("todos");
  const [filtroAccion, setFiltroAccion] = useState("todas");
  const [filtroUsuario, setFiltroUsuario] = useState("todos");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [cambioSeleccionado, setCambioSeleccionado] = useState(null);

  const cambiosFiltrados = cambios.filter(cambio => {
    const matchBusqueda = cambio.elemento.toLowerCase().includes(busqueda.toLowerCase()) ||
                         cambio.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                         cambio.id.toLowerCase().includes(busqueda.toLowerCase());
    const matchModulo = filtroModulo === "todos" || cambio.modulo === filtroModulo;
    const matchAccion = filtroAccion === "todas" || cambio.accion === filtroAccion;
    const matchUsuario = filtroUsuario === "todos" || cambio.usuario === filtroUsuario;
    
    return matchBusqueda && matchModulo && matchAccion && matchUsuario;
  });

  const getAccionBadge = (accion) => {
    switch (accion) {
      case "Creación":
        return <Badge variant="default" className="bg-green-500"><Plus className="w-3 h-3 mr-1" />Creación</Badge>;
      case "Modificación":
        return <Badge variant="secondary" className="bg-blue-500"><Edit className="w-3 h-3 mr-1" />Modificación</Badge>;
      case "Eliminación":
        return <Badge variant="destructive"><Trash2 className="w-3 h-3 mr-1" />Eliminación</Badge>;
      default:
        return <Badge variant="outline">{accion}</Badge>;
    }
  };

  const getImpactoColor = (impacto) => {
    switch (impacto) {
      case "Alto": return "text-red-600";
      case "Medio": return "text-yellow-600";
      case "Bajo": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const exportarCambios = (formato) => {
    // Simulación de exportación
    console.log(`Exportando cambios en formato ${formato}`);
    alert(`Historial de cambios exportado en formato ${formato}`);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <History className="h-8 w-8 text-blue-600" />
            Historial de Cambios
          </h1>
          <p className="text-muted-foreground">Seguimiento detallado de todas las modificaciones realizadas en el sistema QMS.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportarCambios("PDF")}>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={() => exportarCambios("Excel")}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cambios</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasCambios.totalCambios}</div>
            <p className="text-xs text-muted-foreground">este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cambios Hoy</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estadisticasCambios.cambiosHoy}</div>
            <p className="text-xs text-muted-foreground">actividad actual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estadisticasCambios.cambiosSemana}</div>
            <p className="text-xs text-muted-foreground">últimos 7 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Más Activo</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{estadisticasCambios.usuariosMasActivos[0].usuario}</div>
            <p className="text-xs text-muted-foreground">{estadisticasCambios.usuariosMasActivos[0].cambios} cambios</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cambios..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <Select value={filtroModulo} onValueChange={setFiltroModulo}>
              <SelectTrigger>
                <SelectValue placeholder="Módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los módulos</SelectItem>
                <SelectItem value="Documentación">Documentación</SelectItem>
                <SelectItem value="Auditorías">Auditorías</SelectItem>
                <SelectItem value="Capacitación">Capacitación</SelectItem>
                <SelectItem value="Cumplimiento">Cumplimiento</SelectItem>
                <SelectItem value="Gestión Documental">Gestión Documental</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroAccion} onValueChange={setFiltroAccion}>
              <SelectTrigger>
                <SelectValue placeholder="Acción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las acciones</SelectItem>
                <SelectItem value="Creación">Creación</SelectItem>
                <SelectItem value="Modificación">Modificación</SelectItem>
                <SelectItem value="Eliminación">Eliminación</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroUsuario} onValueChange={setFiltroUsuario}>
              <SelectTrigger>
                <SelectValue placeholder="Usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los usuarios</SelectItem>
                {estadisticasCambios.usuariosMasActivos.map((usuario) => (
                  <SelectItem key={usuario.usuario} value={usuario.usuario}>
                    {usuario.usuario}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Fecha inicio
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fechaInicio}
                  onSelect={setFechaInicio}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Fecha fin
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fechaFin}
                  onSelect={setFechaFin}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lista" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lista">Lista de Cambios</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="timeline">Línea de Tiempo</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Cambios</CardTitle>
              <CardDescription>{cambiosFiltrados.length} cambios encontrados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Elemento</TableHead>
                    <TableHead>Impacto</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cambiosFiltrados.map((cambio) => (
                    <TableRow key={cambio.id}>
                      <TableCell className="font-medium">{cambio.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{cambio.fecha}</div>
                          <div className="text-muted-foreground">{cambio.hora}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {cambio.usuario.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{cambio.usuario}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{cambio.modulo}</Badge>
                      </TableCell>
                      <TableCell>{getAccionBadge(cambio.accion)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{cambio.elemento}</div>
                          <div className="text-xs text-muted-foreground">{cambio.tipoElemento}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getImpactoColor(cambio.impacto)}`}>
                          {cambio.impacto}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => setCambioSeleccionado(cambio)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Cambios por Módulo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {estadisticasCambios.porModulo.map((item) => (
                    <div key={item.modulo} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm">{item.modulo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.cantidad}</span>
                        <span className="text-xs text-muted-foreground">({item.porcentaje}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Usuarios Más Activos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {estadisticasCambios.usuariosMasActivos.map((usuario, index) => (
                    <div key={usuario.usuario} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {usuario.usuario.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{usuario.usuario}</span>
                      </div>
                      <Badge variant="secondary">{usuario.cambios} cambios</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Línea de Tiempo de Cambios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cambiosFiltrados.slice(0, 10).map((cambio, index) => (
                  <div key={cambio.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        cambio.accion === 'Creación' ? 'bg-green-500' :
                        cambio.accion === 'Modificación' ? 'bg-blue-500' : 'bg-red-500'
                      }`}></div>
                      {index < cambiosFiltrados.slice(0, 10).length - 1 && (
                        <div className="w-px h-16 bg-muted mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{cambio.elemento}</h4>
                          <p className="text-xs text-muted-foreground">{cambio.descripcion}</p>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <div>{cambio.fecha}</div>
                          <div>{cambio.hora}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getAccionBadge(cambio.accion)}
                        <Badge variant="outline">{cambio.modulo}</Badge>
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            {cambio.usuario.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{cambio.usuario}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de detalles */}
      {cambioSeleccionado && (
        <Dialog open={!!cambioSeleccionado} onOpenChange={() => setCambioSeleccionado(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                {getAccionBadge(cambioSeleccionado.accion)}
                <Badge variant="outline">{cambioSeleccionado.modulo}</Badge>
                <span className={`text-sm font-medium ${getImpactoColor(cambioSeleccionado.impacto)}`}>
                  Impacto {cambioSeleccionado.impacto}
                </span>
              </div>
              <DialogTitle>{cambioSeleccionado.id} - {cambioSeleccionado.elemento}</DialogTitle>
              <DialogDescription>
                {cambioSeleccionado.descripcion}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Información General</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Usuario:</span>
                      <span>{cambioSeleccionado.usuario}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha:</span>
                      <span>{cambioSeleccionado.fecha} {cambioSeleccionado.hora}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span>{cambioSeleccionado.tipoElemento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Razón:</span>
                      <span>{cambioSeleccionado.razon}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Estados</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado anterior:</span>
                      <span>{cambioSeleccionado.estadoAnterior || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado nuevo:</span>
                      <span>{cambioSeleccionado.estadoNuevo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {cambioSeleccionado.detalles && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Detalles Específicos</h4>
                  <div className="bg-muted p-3 rounded-lg text-sm">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(cambioSeleccionado.detalles, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCambioSeleccionado(null)}>
                Cerrar
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar Detalles
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 