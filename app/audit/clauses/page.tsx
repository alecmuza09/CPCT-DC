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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Shield, 
  ChevronDown, 
  ChevronRight,
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Users, 
  Target, 
  BarChart3,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  Calendar,
  BookOpen,
  Settings,
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";

const normasISO = [
  {
    codigo: "ISO 9001:2015",
    nombre: "Sistemas de Gestión de Calidad",
    color: "bg-blue-100 text-blue-800",
    clausulas: 10,
    cumplidas: 8,
    enProgreso: 1,
    pendientes: 1
  },
  {
    codigo: "ISO 14001:2015",
    nombre: "Sistemas de Gestión Ambiental",
    color: "bg-green-100 text-green-800",
    clausulas: 10,
    cumplidas: 6,
    enProgreso: 3,
    pendientes: 1
  },
  {
    codigo: "ISO 45001:2018",
    nombre: "Sistemas de Gestión de Seguridad y Salud",
    color: "bg-orange-100 text-orange-800",
    clausulas: 10,
    cumplidas: 7,
    enProgreso: 2,
    pendientes: 1
  },
  {
    codigo: "ISO 22000:2018",
    nombre: "Sistemas de Gestión de Seguridad Alimentaria",
    color: "bg-purple-100 text-purple-800",
    clausulas: 8,
    cumplidas: 5,
    enProgreso: 2,
    pendientes: 1
  }
];

const clausulasDetalladas = {
  "ISO 9001:2015": [
    {
      codigo: "4.1",
      titulo: "Comprensión de la organización y su contexto",
      descripcion: "La organización debe determinar las cuestiones externas e internas que son pertinentes para su propósito y su dirección estratégica.",
      cumplimiento: 100,
      estado: "Cumplida",
      evidenciasRequeridas: 5,
      evidenciasDisponibles: 5,
      responsable: "Dirección General",
      fechaRevision: "2024-03-15",
      proximaEvaluacion: "2024-06-15",
      procesos: ["Planificación Estratégica", "Análisis de Contexto"],
      riesgos: [],
      observaciones: "Análisis de contexto actualizado trimestralmente"
    },
    {
      codigo: "4.2",
      titulo: "Comprensión de las necesidades y expectativas de las partes interesadas",
      descripcion: "La organización debe determinar las partes interesadas que son pertinentes al sistema de gestión de la calidad.",
      cumplimiento: 95,
      estado: "Cumplida",
      evidenciasRequeridas: 4,
      evidenciasDisponibles: 4,
      responsable: "Gerencia de Calidad",
      fechaRevision: "2024-03-20",
      proximaEvaluacion: "2024-06-20",
      procesos: ["Gestión de Partes Interesadas", "Comunicación"],
      riesgos: [],
      observaciones: "Matriz de partes interesadas completa"
    },
    {
      codigo: "5.1",
      titulo: "Liderazgo y compromiso",
      descripcion: "La alta dirección debe demostrar liderazgo y compromiso con respecto al sistema de gestión de la calidad.",
      cumplimiento: 90,
      estado: "Cumplida",
      evidenciasRequeridas: 6,
      evidenciasDisponibles: 5,
      responsable: "CEO",
      fechaRevision: "2024-04-01",
      proximaEvaluacion: "2024-07-01",
      procesos: ["Liderazgo", "Revisión por la Dirección"],
      riesgos: ["Falta evidencia de comunicación de política"],
      observaciones: "Revisar comunicación de política de calidad"
    },
    {
      codigo: "6.1",
      titulo: "Acciones para abordar riesgos y oportunidades",
      descripcion: "Al planificar el sistema de gestión de la calidad, la organización debe considerar las cuestiones referidas en 4.1 y los requisitos referidos en 4.2.",
      cumplimiento: 85,
      estado: "En Progreso",
      evidenciasRequeridas: 8,
      evidenciasDisponibles: 6,
      responsable: "Gerencia de Riesgos",
      fechaRevision: "2024-02-28",
      proximaEvaluacion: "2024-05-28",
      procesos: ["Gestión de Riesgos", "Planificación"],
      riesgos: ["Matriz de riesgos incompleta", "Faltan planes de contingencia"],
      observaciones: "Actualizar matriz de riesgos y definir acciones"
    },
    {
      codigo: "7.1",
      titulo: "Recursos",
      descripcion: "La organización debe determinar y proporcionar los recursos necesarios para el establecimiento, implementación, mantenimiento y mejora continua del sistema de gestión de la calidad.",
      cumplimiento: 100,
      estado: "Cumplida",
      evidenciasRequeridas: 7,
      evidenciasDisponibles: 7,
      responsable: "Recursos Humanos",
      fechaRevision: "2024-03-30",
      proximaEvaluacion: "2024-06-30",
      procesos: ["Gestión de Recursos", "Infraestructura", "Ambiente de Trabajo"],
      riesgos: [],
      observaciones: "Recursos adecuados y documentados"
    },
    {
      codigo: "7.2",
      titulo: "Competencia",
      descripcion: "La organización debe determinar la competencia necesaria de las personas que realizan, bajo su control, un trabajo que afecta al desempeño y eficacia del sistema de gestión de la calidad.",
      cumplimiento: 95,
      estado: "Cumplida",
      evidenciasRequeridas: 10,
      evidenciasDisponibles: 9,
      responsable: "Recursos Humanos",
      fechaRevision: "2024-04-10",
      proximaEvaluacion: "2024-07-10",
      procesos: ["Capacitación", "Evaluación de Competencias"],
      riesgos: [],
      observaciones: "Programa de capacitación actualizado"
    },
    {
      codigo: "8.1",
      titulo: "Planificación y control operacional",
      descripcion: "La organización debe planificar, implementar y controlar los procesos necesarios para cumplir los requisitos para la provisión de productos y servicios.",
      cumplimiento: 92,
      estado: "Cumplida",
      evidenciasRequeridas: 12,
      evidenciasDisponibles: 11,
      responsable: "Gerencia de Operaciones",
      fechaRevision: "2024-03-25",
      proximaEvaluacion: "2024-06-25",
      procesos: ["Planificación Operacional", "Control de Procesos"],
      riesgos: [],
      observaciones: "Controles operacionales implementados"
    },
    {
      codigo: "8.4",
      titulo: "Control de los procesos, productos y servicios suministrados externamente",
      descripcion: "La organización debe asegurarse de que los procesos, productos y servicios suministrados externamente son conformes a los requisitos.",
      cumplimiento: 88,
      estado: "En Progreso",
      evidenciasRequeridas: 9,
      evidenciasDisponibles: 7,
      responsable: "Compras",
      fechaRevision: "2024-02-25",
      proximaEvaluacion: "2024-05-25",
      procesos: ["Gestión de Proveedores", "Control de Compras"],
      riesgos: ["Evaluación de proveedores pendiente", "Contratos sin cláusulas de calidad"],
      observaciones: "Actualizar evaluación de proveedores críticos"
    },
    {
      codigo: "9.1",
      titulo: "Seguimiento, medición, análisis y evaluación",
      descripcion: "La organización debe determinar qué necesita seguimiento y medición, los métodos de seguimiento, medición, análisis y evaluación necesarios para asegurar resultados válidos.",
      cumplimiento: 98,
      estado: "Cumplida",
      evidenciasRequeridas: 11,
      evidenciasDisponibles: 11,
      responsable: "Gerencia de Calidad",
      fechaRevision: "2024-04-05",
      proximaEvaluacion: "2024-07-05",
      procesos: ["Monitoreo y Medición", "Análisis de Datos"],
      riesgos: [],
      observaciones: "Sistema de indicadores implementado"
    },
    {
      codigo: "10.1",
      titulo: "Mejora",
      descripcion: "La organización debe determinar y seleccionar las oportunidades de mejora e implementar cualquier acción necesaria para cumplir los requisitos del cliente y aumentar la satisfacción del cliente.",
      cumplimiento: 75,
      estado: "Requiere Atención",
      evidenciasRequeridas: 6,
      evidenciasDisponibles: 4,
      responsable: "Gerencia de Calidad",
      fechaRevision: "2024-02-20",
      proximaEvaluacion: "2024-05-20",
      procesos: ["Mejora Continua", "Acciones Correctivas"],
      riesgos: ["Falta seguimiento de mejoras", "Acciones correctivas sin cerrar"],
      observaciones: "Implementar sistema de seguimiento de mejoras"
    }
  ]
};

const evaluacionesProgramadas = [
  {
    id: 1,
    norma: "ISO 9001:2015",
    clausula: "6.1",
    titulo: "Revisión de Gestión de Riesgos",
    fecha: "2024-02-28",
    responsable: "Gerencia de Riesgos",
    tipo: "Interna",
    estado: "Programada"
  },
  {
    id: 2,
    norma: "ISO 9001:2015",
    clausula: "8.4",
    titulo: "Evaluación de Proveedores",
    fecha: "2024-02-25",
    responsable: "Compras",
    tipo: "Interna",
    estado: "Programada"
  },
  {
    id: 3,
    norma: "ISO 9001:2015",
    clausula: "10.1",
    titulo: "Revisión de Mejora Continua",
    fecha: "2024-02-20",
    responsable: "Gerencia de Calidad",
    tipo: "Interna",
    estado: "Vencida"
  }
];

export default function ClausulasISOPage() {
  const [normaSeleccionada, setNormaSeleccionada] = useState("ISO 9001:2015");
  const [clausulaExpandida, setClausulaExpandida] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [mostrarNuevaEvaluacion, setMostrarNuevaEvaluacion] = useState(false);

  const clausulas = clausulasDetalladas[normaSeleccionada] || [];
  const clausulasFiltradas = clausulas.filter(clausula => {
    const matchBusqueda = clausula.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                         clausula.codigo.includes(busqueda);
    const matchEstado = filtroEstado === "todos" || clausula.estado === filtroEstado;
    return matchBusqueda && matchEstado;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Cumplida":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Cumplida</Badge>;
      case "En Progreso":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />En Progreso</Badge>;
      case "Requiere Atención":
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Requiere Atención</Badge>;
      case "Pendiente":
        return <Badge variant="outline"><XCircle className="w-3 h-3 mr-1" />Pendiente</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getCumplimientoColor = (cumplimiento) => {
    if (cumplimiento >= 95) return "text-green-600";
    if (cumplimiento >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getEvaluacionEstado = (estado) => {
    switch (estado) {
      case "Programada":
        return <Badge variant="outline"><Calendar className="w-3 h-3 mr-1" />Programada</Badge>;
      case "Vencida":
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Vencida</Badge>;
      case "Completada":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Completada</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  // Cálculos para métricas
  const normaActual = normasISO.find(n => n.codigo === normaSeleccionada);
  const cumplimientoPromedio = clausulas.reduce((acc, c) => acc + c.cumplimiento, 0) / clausulas.length;
  const evidenciasTotal = clausulas.reduce((acc, c) => acc + c.evidenciasRequeridas, 0);
  const evidenciasDisponibles = clausulas.reduce((acc, c) => acc + c.evidenciasDisponibles, 0);
  const clausulasConRiesgo = clausulas.filter(c => c.riesgos.length > 0).length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            Cláusulas ISO
          </h1>
          <p className="text-muted-foreground">Seguimiento detallado del cumplimiento de cláusulas por norma ISO con evidencias y evaluaciones.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Reporte de Cláusulas
          </Button>
          <Dialog open={mostrarNuevaEvaluacion} onOpenChange={setMostrarNuevaEvaluacion}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Evaluación
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Programar Evaluación</DialogTitle>
                <DialogDescription>Programa una nueva evaluación de cláusula</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Norma</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar norma" />
                    </SelectTrigger>
                    <SelectContent>
                      {normasISO.map((norma) => (
                        <SelectItem key={norma.codigo} value={norma.codigo}>{norma.codigo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Cláusula</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cláusula" />
                    </SelectTrigger>
                    <SelectContent>
                      {clausulas.map((clausula) => (
                        <SelectItem key={clausula.codigo} value={clausula.codigo}>
                          {clausula.codigo} - {clausula.titulo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Fecha de Evaluación</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>Responsable</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Asignar responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maria">María González</SelectItem>
                      <SelectItem value="carlos">Carlos López</SelectItem>
                      <SelectItem value="ana">Ana López</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarNuevaEvaluacion(false)}>Cancelar</Button>
                <Button onClick={() => setMostrarNuevaEvaluacion(false)}>Programar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Selector de norma */}
      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Norma ISO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {normasISO.map((norma) => (
              <Card 
                key={norma.codigo} 
                className={`cursor-pointer transition-colors ${norma.codigo === normaSeleccionada ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setNormaSeleccionada(norma.codigo)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className={norma.color}>{norma.codigo}</Badge>
                    <div className="text-right">
                      <div className="text-sm font-medium">{Math.round((norma.cumplidas / norma.clausulas) * 100)}%</div>
                      <Progress value={(norma.cumplidas / norma.clausulas) * 100} className="h-1 w-12" />
                    </div>
                  </div>
                  <CardTitle className="text-sm">{norma.nombre}</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-green-600">{norma.cumplidas}</div>
                      <div className="text-muted-foreground">Cumplidas</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-yellow-600">{norma.enProgreso}</div>
                      <div className="text-muted-foreground">En Progreso</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-red-600">{norma.pendientes}</div>
                      <div className="text-muted-foreground">Pendientes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas de la norma seleccionada */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumplimiento Promedio</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(cumplimientoPromedio)}%</div>
            <Progress value={cumplimientoPromedio} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">de todas las cláusulas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evidencias</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evidenciasDisponibles}/{evidenciasTotal}</div>
            <Progress value={(evidenciasDisponibles / evidenciasTotal) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">documentos disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cláusulas con Riesgo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{clausulasConRiesgo}</div>
            <p className="text-xs text-muted-foreground">requieren atención</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas Evaluaciones</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evaluacionesProgramadas.filter((evaluacion)=>evaluacion.norma === normaSeleccion).length}</div>
            <p className="text-xs text-muted-foreground">programadas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clausulas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clausulas">Cláusulas Detalladas</TabsTrigger>
          <TabsTrigger value="evaluaciones">Evaluaciones Programadas</TabsTrigger>
          <TabsTrigger value="matriz">Matriz de Cumplimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="clausulas" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros de Cláusulas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cláusula..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="Cumplida">Cumplida</SelectItem>
                    <SelectItem value="En Progreso">En Progreso</SelectItem>
                    <SelectItem value="Requiere Atención">Requiere Atención</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Plan de Mejora
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de cláusulas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cláusulas de {normaSeleccionada}</span>
                <Badge variant="outline">{clausulasFiltradas.length} cláusulas</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clausulasFiltradas.map((clausula) => (
                  <Collapsible 
                    key={clausula.codigo}
                    open={clausulaExpandida === clausula.codigo}
                    onOpenChange={(open) => setClausulaExpandida(open ? clausula.codigo : null)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-4 flex-1">
                          {clausulaExpandida === clausula.codigo ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className="font-mono">{clausula.codigo}</Badge>
                              {getEstadoBadge(clausula.estado)}
                              <span className={`text-sm font-medium ${getCumplimientoColor(clausula.cumplimiento)}`}>
                                {clausula.cumplimiento}%
                              </span>
                            </div>
                            <h4 className="font-medium">{clausula.titulo}</h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {clausula.descripcion}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm">
                            <Badge variant="outline">
                              {clausula.evidenciasDisponibles}/{clausula.evidenciasRequeridas} evidencias
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Responsable: {clausula.responsable}
                          </div>
                          {clausula.riesgos.length > 0 && (
                            <div className="flex items-center gap-1 text-red-600">
                              <AlertTriangle className="h-3 w-3" />
                              <span className="text-xs">{clausula.riesgos.length} riesgos</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h5 className="font-medium mb-2">Información Detallada</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Última revisión:</span>
                                <span>{clausula.fechaRevision}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Próxima evaluación:</span>
                                <span>{clausula.proximaEvaluacion}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Cumplimiento:</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={clausula.cumplimiento} className="h-2 w-20" />
                                  <span className={getCumplimientoColor(clausula.cumplimiento)}>
                                    {clausula.cumplimiento}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Procesos Relacionados</h5>
                            <div className="flex flex-wrap gap-1">
                              {clausula.procesos.map((proceso, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {proceso}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {clausula.riesgos.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2 text-red-600">Riesgos Identificados</h5>
                            <div className="space-y-1">
                              {clausula.riesgos.map((riesgo, idx) => (
                                <Alert key={idx}>
                                  <AlertTriangle className="h-4 w-4" />
                                  <AlertDescription className="text-sm">{riesgo}</AlertDescription>
                                </Alert>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {clausula.observaciones && (
                          <div>
                            <h5 className="font-medium mb-2">Observaciones</h5>
                            <p className="text-sm text-muted-foreground">{clausula.observaciones}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-end gap-2 pt-2 border-t">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Evidencias
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Actualizar
                          </Button>
                          <Button size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            Programar Evaluación
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Evaluaciones Programadas
              </CardTitle>
              <CardDescription>Próximas evaluaciones de cláusulas programadas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cláusula</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluacionesProgramadas
                    .filter(eval => eval.norma === normaSeleccionada)
                    .map((evaluacion) => (
                    <TableRow key={evaluacion.id}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">{evaluacion.clausula}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{evaluacion.titulo}</TableCell>
                      <TableCell>{evaluacion.fecha}</TableCell>
                      <TableCell>{evaluacion.responsable}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{evaluacion.tipo}</Badge>
                      </TableCell>
                      <TableCell>{getEvaluacionEstado(evaluacion.estado)}</TableCell>
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

        <TabsContent value="matriz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Matriz de Cumplimiento
              </CardTitle>
              <CardDescription>Vista general del cumplimiento por cláusula</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {clausulas.map((clausula) => (
                  <div key={clausula.codigo} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono w-12 justify-center">
                        {clausula.codigo}
                      </Badge>
                      <div className="flex-1">
                        <div className="font-medium">{clausula.titulo}</div>
                        <div className="text-sm text-muted-foreground">
                          Responsable: {clausula.responsable}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {clausula.evidenciasDisponibles}/{clausula.evidenciasRequeridas} evidencias
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Próxima evaluación: {clausula.proximaEvaluacion}
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{clausula.cumplimiento}%</span>
                        </div>
                        <Progress value={clausula.cumplimiento} className="h-2" />
                      </div>
                      {getEstadoBadge(clausula.estado)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
