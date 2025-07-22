"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  FileText, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Users,
  BarChart3,
  PieChart,
  TrendingUp,
  Target,
  Zap,
  Settings,
  Send,
  Archive,
  Star
} from "lucide-react";

const informesAuditoria = [
  {
    id: 1,
    titulo: "Auditoría Interna ISO 9001:2015 - Q1 2024",
    tipo: "Interna",
    norma: "ISO 9001:2015",
    auditor: "María González",
    fechaAuditoria: "2024-01-15",
    fechaInforme: "2024-01-22",
    estado: "Completado",
    hallazgosTotal: 8,
    noConformidadesMayores: 1,
    noConformidadesMenores: 3,
    observaciones: 4,
    accionesCorrectivas: 4,
    accionesCompletadas: 2,
    porcentajeCompletitud: 50,
    areas: ["Producción", "Calidad", "Recursos Humanos"],
    proximoSeguimiento: "2024-02-22",
    responsable: "Carlos López",
    prioridad: "Alta"
  },
  {
    id: 2,
    titulo: "Auditoría Externa ISO 45001:2018",
    tipo: "Externa",
    norma: "ISO 45001:2018",
    auditor: "AENOR - Juan Pérez",
    fechaAuditoria: "2024-01-08",
    fechaInforme: "2024-01-18",
    estado: "En Seguimiento",
    hallazgosTotal: 5,
    noConformidadesMayores: 0,
    noConformidadesMenores: 2,
    observaciones: 3,
    accionesCorrectivas: 2,
    accionesCompletadas: 1,
    porcentajeCompletitud: 50,
    areas: ["Seguridad", "Producción"],
    proximoSeguimiento: "2024-02-18",
    responsable: "Ana López",
    prioridad: "Media"
  },
  {
    id: 3,
    titulo: "Pre-auditoría ISO 14001:2015",
    tipo: "Pre-auditoría",
    norma: "ISO 14001:2015",
    auditor: "SGS - Luis Martín",
    fechaAuditoria: "2024-01-25",
    fechaInforme: "2024-01-30",
    estado: "Borrador",
    hallazgosTotal: 12,
    noConformidadesMayores: 2,
    noConformidadesMenores: 5,
    observaciones: 5,
    accionesCorrectivas: 7,
    accionesCompletadas: 0,
    porcentajeCompletitud: 0,
    areas: ["Medio Ambiente", "Producción", "Mantenimiento"],
    proximoSeguimiento: "2024-02-29",
    responsable: "Pedro Sánchez",
    prioridad: "Crítica"
  },
  {
    id: 4,
    titulo: "Auditoría de Seguimiento ISO 22000:2018",
    tipo: "Seguimiento",
    norma: "ISO 22000:2018",
    auditor: "TÜV SÜD - Carmen Ruiz",
    fechaAuditoria: "2024-01-12",
    fechaInforme: "2024-01-19",
    estado: "Completado",
    hallazgosTotal: 3,
    noConformidadesMayores: 0,
    noConformidadesMenores: 1,
    observaciones: 2,
    accionesCorrectivas: 1,
    accionesCompletadas: 1,
    porcentajeCompletitud: 100,
    areas: ["Producción", "Calidad"],
    proximoSeguimiento: null,
    responsable: "Juan Martínez",
    prioridad: "Baja"
  }
];

const hallazgosPorTipo = [
  { tipo: "No Conformidad Mayor", cantidad: 3, porcentaje: 12, color: "bg-red-500" },
  { tipo: "No Conformidad Menor", cantidad: 11, porcentaje: 44, color: "bg-orange-500" },
  { tipo: "Observaciones", cantidad: 14, porcentaje: 56, color: "bg-yellow-500" },
  { tipo: "Oportunidades de Mejora", cantidad: 8, porcentaje: 32, color: "bg-blue-500" }
];

const plantillasInforme = [
  {
    id: 1,
    nombre: "Informe Auditoría Interna ISO 9001",
    descripcion: "Plantilla estándar para auditorías internas de calidad",
    secciones: 8,
    ultimaActualizacion: "2024-01-10"
  },
  {
    id: 2,
    nombre: "Informe Auditoría Externa Certificación",
    descripcion: "Formato para auditorías de certificación externa",
    secciones: 12,
    ultimaActualizacion: "2024-01-05"
  },
  {
    id: 3,
    nombre: "Informe Pre-auditoría",
    descripcion: "Evaluación previa para preparación de auditorías",
    secciones: 6,
    ultimaActualizacion: "2023-12-20"
  },
  {
    id: 4,
    nombre: "Informe Seguimiento Acciones",
    descripcion: "Verificación de implementación de acciones correctivas",
    secciones: 5,
    ultimaActualizacion: "2024-01-08"
  }
];

const accionesCorrectivas = [
  {
    id: 1,
    informe: "Auditoría Interna ISO 9001:2015 - Q1 2024",
    hallazgo: "Falta documentación en proceso de compras",
    accion: "Actualizar y documentar procedimiento PRC-001",
    responsable: "María González",
    fechaVencimiento: "2024-02-15",
    estado: "En Progreso",
    progreso: 75,
    prioridad: "Alta",
    clausula: "8.4"
  },
  {
    id: 2,
    informe: "Auditoría Externa ISO 45001:2018",
    hallazgo: "Capacitación insuficiente en uso de EPP",
    accion: "Implementar programa de capacitación mensual",
    responsable: "Ana López",
    fechaVencimiento: "2024-02-20",
    estado: "Completado",
    progreso: 100,
    prioridad: "Media",
    clausula: "7.2"
  },
  {
    id: 3,
    informe: "Pre-auditoría ISO 14001:2015",
    hallazgo: "Gestión inadecuada de residuos peligrosos",
    accion: "Contratar empresa certificada para manejo de residuos",
    responsable: "Pedro Sánchez",
    fechaVencimiento: "2024-02-28",
    estado: "Pendiente",
    progreso: 0,
    prioridad: "Crítica",
    clausula: "8.1"
  }
];

export default function InformesAuditoriaPage() {
  const [informes, setInformes] = useState(informesAuditoria);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroNorma, setFiltroNorma] = useState("todos");
  const [mostrarNuevoInforme, setMostrarNuevoInforme] = useState(false);
  const [informeSeleccionado, setInformeSeleccionado] = useState(null);
  const [vistaActual, setVistaActual] = useState("lista");

  // Formulario nuevo informe
  const [nuevoInforme, setNuevoInforme] = useState({
    titulo: "",
    tipo: "",
    norma: "",
    auditor: "",
    fechaAuditoria: "",
    areas: [],
    responsable: ""
  });

  const informesFiltrados = informes.filter(informe => {
    const matchBusqueda = informe.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const matchTipo = filtroTipo === "todos" || informe.tipo === filtroTipo;
    const matchEstado = filtroEstado === "todos" || informe.estado === filtroEstado;
    const matchNorma = filtroNorma === "todos" || informe.norma === filtroNorma;
    
    return matchBusqueda && matchTipo && matchEstado && matchNorma;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Completado":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Completado</Badge>;
      case "En Seguimiento":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />En Seguimiento</Badge>;
      case "Borrador":
        return <Badge variant="outline"><Edit className="w-3 h-3 mr-1" />Borrador</Badge>;
      case "Pendiente":
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Pendiente</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
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

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Interna": return "bg-blue-100 text-blue-800";
      case "Externa": return "bg-purple-100 text-purple-800";
      case "Pre-auditoría": return "bg-orange-100 text-orange-800";
      case "Seguimiento": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const generarInforme = () => {
    const nuevo = {
      ...nuevoInforme,
      id: informes.length + 1,
      fechaInforme: new Date().toISOString().split('T')[0],
      estado: "Borrador",
      hallazgosTotal: 0,
      noConformidadesMayores: 0,
      noConformidadesMenores: 0,
      observaciones: 0,
      accionesCorrectivas: 0,
      accionesCompletadas: 0,
      porcentajeCompletitud: 0,
      prioridad: "Media"
    };
    
    setInformes([nuevo, ...informes]);
    setNuevoInforme({
      titulo: "",
      tipo: "",
      norma: "",
      auditor: "",
      fechaAuditoria: "",
      areas: [],
      responsable: ""
    });
    setMostrarNuevoInforme(false);
  };

  // Métricas calculadas
  const totalInformes = informes.length;
  const informesCompletados = informes.filter(i => i.estado === "Completado").length;
  const accionesPendientes = accionesCorrectivas.filter(a => a.estado !== "Completado").length;
  const hallazgosTotales = informes.reduce((acc, inf) => acc + inf.hallazgosTotal, 0);

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            Informes de Auditoría
          </h1>
          <p className="text-muted-foreground">Genera, gestiona y analiza informes de auditoría con seguimiento automático de acciones correctivas.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Informes
          </Button>
          <Dialog open={mostrarNuevoInforme} onOpenChange={setMostrarNuevoInforme}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Informe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Generar Nuevo Informe</DialogTitle>
                <DialogDescription>Crea un nuevo informe de auditoría basado en plantillas predefinidas</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Título del Informe</Label>
                  <Input
                    value={nuevoInforme.titulo}
                    onChange={(e) => setNuevoInforme({...nuevoInforme, titulo: e.target.value})}
                    placeholder="Ej: Auditoría Interna ISO 9001 - Q2 2024"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Tipo de Auditoría</Label>
                    <Select value={nuevoInforme.tipo} onValueChange={(value) => setNuevoInforme({...nuevoInforme, tipo: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Interna">Interna</SelectItem>
                        <SelectItem value="Externa">Externa</SelectItem>
                        <SelectItem value="Pre-auditoría">Pre-auditoría</SelectItem>
                        <SelectItem value="Seguimiento">Seguimiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Norma</Label>
                    <Select value={nuevoInforme.norma} onValueChange={(value) => setNuevoInforme({...nuevoInforme, norma: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar norma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ISO 9001:2015">ISO 9001:2015</SelectItem>
                        <SelectItem value="ISO 14001:2015">ISO 14001:2015</SelectItem>
                        <SelectItem value="ISO 45001:2018">ISO 45001:2018</SelectItem>
                        <SelectItem value="ISO 22000:2018">ISO 22000:2018</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Auditor</Label>
                    <Input
                      value={nuevoInforme.auditor}
                      onChange={(e) => setNuevoInforme({...nuevoInforme, auditor: e.target.value})}
                      placeholder="Nombre del auditor"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Fecha de Auditoría</Label>
                    <Input
                      type="date"
                      value={nuevoInforme.fechaAuditoria}
                      onChange={(e) => setNuevoInforme({...nuevoInforme, fechaAuditoria: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Responsable del Seguimiento</Label>
                  <Select value={nuevoInforme.responsable} onValueChange={(value) => setNuevoInforme({...nuevoInforme, responsable: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Asignar responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="María González">María González</SelectItem>
                      <SelectItem value="Carlos López">Carlos López</SelectItem>
                      <SelectItem value="Ana López">Ana López</SelectItem>
                      <SelectItem value="Pedro Sánchez">Pedro Sánchez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Plantilla Base</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plantilla" />
                    </SelectTrigger>
                    <SelectContent>
                      {plantillasInforme.map((plantilla) => (
                        <SelectItem key={plantilla.id} value={plantilla.id.toString()}>
                          {plantilla.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarNuevoInforme(false)}>Cancelar</Button>
                <Button onClick={generarInforme}>Generar Informe</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Informes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInformes}</div>
            <p className="text-xs text-muted-foreground">informes generados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{informesCompletados}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((informesCompletados / totalInformes) * 100)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acciones Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{accionesPendientes}</div>
            <p className="text-xs text-muted-foreground">requieren seguimiento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hallazgos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hallazgosTotales}</div>
            <p className="text-xs text-muted-foreground">identificados este período</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="informes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="informes">Lista de Informes</TabsTrigger>
          <TabsTrigger value="acciones">Acciones Correctivas</TabsTrigger>
          <TabsTrigger value="analisis">Análisis de Hallazgos</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="informes" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros de Búsqueda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar informe..."
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
                    <SelectItem value="Interna">Interna</SelectItem>
                    <SelectItem value="Externa">Externa</SelectItem>
                    <SelectItem value="Pre-auditoría">Pre-auditoría</SelectItem>
                    <SelectItem value="Seguimiento">Seguimiento</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="En Seguimiento">En Seguimiento</SelectItem>
                    <SelectItem value="Borrador">Borrador</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroNorma} onValueChange={setFiltroNorma}>
                  <SelectTrigger>
                    <SelectValue placeholder="Norma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas las normas</SelectItem>
                    <SelectItem value="ISO 9001:2015">ISO 9001:2015</SelectItem>
                    <SelectItem value="ISO 14001:2015">ISO 14001:2015</SelectItem>
                    <SelectItem value="ISO 45001:2018">ISO 45001:2018</SelectItem>
                    <SelectItem value="ISO 22000:2018">ISO 22000:2018</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Análisis
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de informes */}
          <Card>
            <CardHeader>
              <CardTitle>Informes de Auditoría</CardTitle>
              <CardDescription>{informesFiltrados.length} informes encontrados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Informe</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Hallazgos</TableHead>
                    <TableHead>Acciones</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {informesFiltrados.map((informe) => (
                    <TableRow key={informe.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{informe.titulo}</div>
                          <div className="text-sm text-muted-foreground">
                            {informe.norma} • {informe.fechaAuditoria}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Auditor: {informe.auditor}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTipoColor(informe.tipo)}>
                          {informe.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>{getEstadoBadge(informe.estado)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-red-600">NC Mayor: {informe.noConformidadesMayores}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-orange-600">NC Menor: {informe.noConformidadesMenores}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-yellow-600">Observ: {informe.observaciones}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {informe.accionesCompletadas}/{informe.accionesCorrectivas}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{informe.porcentajeCompletitud}%</span>
                          </div>
                          <Progress value={informe.porcentajeCompletitud} className="h-2 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{informe.responsable}</div>
                        {informe.proximoSeguimiento && (
                          <div className="text-xs text-muted-foreground">
                            Seguimiento: {informe.proximoSeguimiento}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setInformeSeleccionado(informe)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="acciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Acciones Correctivas y Preventivas
              </CardTitle>
              <CardDescription>Seguimiento del progreso de las acciones derivadas de auditorías</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hallazgo y Acción</TableHead>
                    <TableHead>Informe Origen</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accionesCorrectivas.map((accion) => (
                    <TableRow key={accion.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{accion.hallazgo}</div>
                          <div className="text-sm text-muted-foreground">{accion.accion}</div>
                          <Badge variant="outline" className="text-xs">
                            Cláusula {accion.clausula}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{accion.informe}</TableCell>
                      <TableCell className="text-sm">{accion.responsable}</TableCell>
                      <TableCell className="text-sm">{accion.fechaVencimiento}</TableCell>
                      <TableCell>
                        {accion.estado === "Completado" && <Badge variant="default" className="bg-green-500">Completado</Badge>}
                        {accion.estado === "En Progreso" && <Badge variant="secondary">En Progreso</Badge>}
                        {accion.estado === "Pendiente" && <Badge variant="destructive">Pendiente</Badge>}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{accion.progreso}%</span>
                          </div>
                          <Progress value={accion.progreso} className="h-2 w-20" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="analisis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribución de Hallazgos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hallazgosPorTipo.map((tipo, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded ${tipo.color}`}></div>
                        <span className="text-sm">{tipo.tipo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{tipo.cantidad}</span>
                        <div className="w-20">
                          <Progress value={tipo.porcentaje} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tendencias de Mejora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Gráfico de tendencias de hallazgos</p>
                    <p className="text-sm text-muted-foreground">(Se integraría con biblioteca de gráficos)</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Reducción de NC Mayores:</span>
                      <span className="text-green-600">-25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo promedio de resolución:</span>
                      <span>18 días</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efectividad de acciones:</span>
                      <span className="text-green-600">92%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análisis por Área</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Producción</h4>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-muted-foreground">Hallazgos: 12</div>
                    <div className="text-sm text-muted-foreground">Acciones completadas: 8</div>
                    <Progress value={67} className="h-2 mt-2" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Calidad</h4>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-muted-foreground">Hallazgos: 8</div>
                    <div className="text-sm text-muted-foreground">Acciones completadas: 7</div>
                    <Progress value={88} className="h-2 mt-2" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Recursos Humanos</h4>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-muted-foreground">Hallazgos: 5</div>
                    <div className="text-sm text-muted-foreground">Acciones completadas: 3</div>
                    <Progress value={60} className="h-2 mt-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plantillas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Plantillas de Informe
                  </CardTitle>
                  <CardDescription>Gestiona las plantillas para diferentes tipos de auditoría</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Plantilla
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {plantillasInforme.map((plantilla) => (
                  <Card key={plantilla.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{plantilla.nombre}</CardTitle>
                      <CardDescription>{plantilla.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Secciones:</span>
                          <span>{plantilla.secciones}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Última actualización:</span>
                          <span>{plantilla.ultimaActualizacion}</span>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Vista Previa
                        </Button>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de detalles del informe */}
      {informeSeleccionado && (
        <Dialog open={!!informeSeleccionado} onOpenChange={() => setInformeSeleccionado(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{informeSeleccionado.titulo}</DialogTitle>
              <DialogDescription>Detalles completos del informe de auditoría</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Información General</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <Badge className={getTipoColor(informeSeleccionado.tipo)}>
                        {informeSeleccionado.tipo}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Norma:</span>
                      <span>{informeSeleccionado.norma}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Auditor:</span>
                      <span>{informeSeleccionado.auditor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha auditoría:</span>
                      <span>{informeSeleccionado.fechaAuditoria}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      {getEstadoBadge(informeSeleccionado.estado)}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Resultados</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total hallazgos:</span>
                      <span>{informeSeleccionado.hallazgosTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NC Mayores:</span>
                      <span className="text-red-600">{informeSeleccionado.noConformidadesMayores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NC Menores:</span>
                      <span className="text-orange-600">{informeSeleccionado.noConformidadesMenores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Observaciones:</span>
                      <span className="text-yellow-600">{informeSeleccionado.observaciones}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Acciones correctivas:</span>
                      <span>{informeSeleccionado.accionesCorrectivas}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Áreas Auditadas</h4>
                <div className="flex gap-2">
                  {informeSeleccionado.areas.map((area, idx) => (
                    <Badge key={idx} variant="outline">{area}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Progreso de Acciones</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completitud: {informeSeleccionado.porcentajeCompletitud}%</span>
                    <span>{informeSeleccionado.accionesCompletadas} de {informeSeleccionado.accionesCorrectivas} acciones</span>
                  </div>
                  <Progress value={informeSeleccionado.porcentajeCompletitud} className="h-2" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setInformeSeleccionado(null)}>Cerrar</Button>
              <Button><Download className="mr-2 h-4 w-4" />Descargar PDF</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 