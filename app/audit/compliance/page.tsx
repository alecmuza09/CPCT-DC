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
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  FileText,
  Users,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Plus,
  Eye,
  Download,
  RefreshCw,
  Zap
} from "lucide-react";

const normasISO = [
  {
    id: 1,
    codigo: "ISO 9001:2015",
    nombre: "Sistemas de Gestión de Calidad",
    estado: "Certificado",
    cumplimiento: 95,
    fechaCertificacion: "2023-06-15",
    fechaVencimiento: "2026-06-15",
    organismo: "Bureau Veritas",
    proximaAuditoria: "2024-04-15",
    clausulasTotal: 10,
    clausulasCumplidas: 9,
    clausulasRiesgo: 1,
    responsable: "María González",
    tendencia: "positiva"
  },
  {
    id: 2,
    codigo: "ISO 14001:2015",
    nombre: "Sistemas de Gestión Ambiental",
    estado: "En Proceso",
    cumplimiento: 78,
    fechaCertificacion: null,
    fechaVencimiento: null,
    organismo: "SGS",
    proximaAuditoria: "2024-03-20",
    clausulasTotal: 10,
    clausulasCumplidas: 7,
    clausulasRiesgo: 2,
    responsable: "Carlos López",
    tendencia: "positiva"
  },
  {
    id: 3,
    codigo: "ISO 45001:2018",
    nombre: "Sistemas de Gestión de Seguridad y Salud",
    estado: "Certificado",
    cumplimiento: 92,
    fechaCertificacion: "2023-09-10",
    fechaVencimiento: "2026-09-10",
    organismo: "AENOR",
    proximaAuditoria: "2024-05-25",
    clausulasTotal: 10,
    clausulasCumplidas: 8,
    clausulasRiesgo: 1,
    responsable: "Ana López",
    tendencia: "estable"
  },
  {
    id: 4,
    codigo: "ISO 22000:2018",
    nombre: "Sistemas de Gestión de Seguridad Alimentaria",
    estado: "Riesgo",
    cumplimiento: 65,
    fechaCertificacion: "2022-12-05",
    fechaVencimiento: "2025-12-05",
    organismo: "TÜV SÜD",
    proximaAuditoria: "2024-02-28",
    clausulasTotal: 8,
    clausulasCumplidas: 5,
    clausulasRiesgo: 3,
    responsable: "Juan Martínez",
    tendencia: "negativa"
  }
];

const clausulasDetalladas = {
  "ISO 9001:2015": [
    { codigo: "4.1", nombre: "Comprensión de la organización", cumplimiento: 100, estado: "Completo", evidencias: 5, proximaRevision: "2024-03-15" },
    { codigo: "4.2", nombre: "Comprensión de partes interesadas", cumplimiento: 95, estado: "Completo", evidencias: 3, proximaRevision: "2024-03-20" },
    { codigo: "5.1", nombre: "Liderazgo y compromiso", cumplimiento: 90, estado: "Completo", evidencias: 4, proximaRevision: "2024-04-01" },
    { codigo: "6.1", nombre: "Acciones para riesgos y oportunidades", cumplimiento: 85, estado: "En Progreso", evidencias: 2, proximaRevision: "2024-02-28" },
    { codigo: "7.1", nombre: "Recursos", cumplimiento: 100, estado: "Completo", evidencias: 6, proximaRevision: "2024-03-30" },
    { codigo: "7.2", nombre: "Competencia", cumplimiento: 95, estado: "Completo", evidencias: 8, proximaRevision: "2024-04-10" },
    { codigo: "8.1", nombre: "Planificación operacional", cumplimiento: 92, estado: "Completo", evidencias: 4, proximaRevision: "2024-03-25" },
    { codigo: "8.4", nombre: "Control de procesos externos", cumplimiento: 88, estado: "En Progreso", evidencias: 3, proximaRevision: "2024-02-25" },
    { codigo: "9.1", nombre: "Seguimiento y medición", cumplimiento: 98, estado: "Completo", evidencias: 7, proximaRevision: "2024-04-05" },
    { codigo: "10.1", nombre: "Mejora continua", cumplimiento: 75, estado: "Requiere Atención", evidencias: 2, proximaRevision: "2024-02-20" }
  ]
};

const alertasCumplimiento = [
  {
    id: 1,
    tipo: "Vencimiento",
    prioridad: "Alta",
    norma: "ISO 22000:2018",
    mensaje: "Auditoría de seguimiento vence en 15 días",
    fecha: "2024-02-28",
    responsable: "Juan Martínez",
    estado: "Pendiente"
  },
  {
    id: 2,
    tipo: "Evidencia",
    prioridad: "Media",
    norma: "ISO 9001:2015",
    mensaje: "Faltan evidencias para cláusula 10.1",
    fecha: "2024-02-20",
    responsable: "María González",
    estado: "En Proceso"
  },
  {
    id: 3,
    tipo: "Capacitación",
    prioridad: "Alta",
    norma: "ISO 14001:2015",
    mensaje: "Personal requiere capacitación en gestión ambiental",
    fecha: "2024-03-01",
    responsable: "Carlos López",
    estado: "Pendiente"
  },
  {
    id: 4,
    tipo: "Documentación",
    prioridad: "Crítica",
    norma: "ISO 45001:2018",
    mensaje: "Procedimiento de emergencia desactualizado",
    fecha: "2024-02-15",
    responsable: "Ana López",
    estado: "Urgente"
  }
];

const planesAccion = [
  {
    id: 1,
    titulo: "Mejora del Sistema de Gestión Ambiental",
    norma: "ISO 14001:2015",
    responsable: "Carlos López",
    fechaInicio: "2024-02-01",
    fechaFin: "2024-04-30",
    progreso: 45,
    estado: "En Progreso",
    acciones: 8,
    completadas: 3,
    descripcion: "Plan integral para alcanzar la certificación ISO 14001"
  },
  {
    id: 2,
    titulo: "Actualización Procedimientos HACCP",
    norma: "ISO 22000:2018",
    responsable: "Juan Martínez",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-03-15",
    progreso: 70,
    estado: "En Progreso",
    acciones: 12,
    completadas: 8,
    descripcion: "Revisión y actualización de todos los procedimientos HACCP"
  },
  {
    id: 3,
    titulo: "Capacitación en Seguridad Ocupacional",
    norma: "ISO 45001:2018",
    responsable: "Ana López",
    fechaInicio: "2024-02-10",
    fechaFin: "2024-03-10",
    progreso: 25,
    estado: "Iniciado",
    acciones: 6,
    completadas: 1,
    descripcion: "Programa de capacitación para todo el personal en temas de seguridad"
  }
];

export default function CumplimientoPage() {
  const [normaSeleccionada, setNormaSeleccionada] = useState("ISO 9001:2015");
  const [vistaActual, setVistaActual] = useState("resumen");
  const [mostrarPlanAccion, setMostrarPlanAccion] = useState(false);

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Certificado":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Certificado</Badge>;
      case "En Proceso":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />En Proceso</Badge>;
      case "Riesgo":
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Riesgo</Badge>;
      case "Vencido":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Vencido</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getTendenciaIcon = (tendencia) => {
    switch (tendencia) {
      case "positiva":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "negativa":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "Crítica": return "border-l-red-500 bg-red-50";
      case "Alta": return "border-l-orange-500 bg-orange-50";
      case "Media": return "border-l-yellow-500 bg-yellow-50";
      case "Baja": return "border-l-green-500 bg-green-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  const cumplimientoPromedio = normasISO.reduce((acc, norma) => acc + norma.cumplimiento, 0) / normasISO.length;
  const normasCertificadas = normasISO.filter(n => n.estado === "Certificado").length;
  const normasEnRiesgo = normasISO.filter(n => n.estado === "Riesgo").length;
  const alertasPendientes = alertasCumplimiento.filter(a => a.estado === "Pendiente" || a.estado === "Urgente").length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-600" />
            Cumplimiento Normativo
          </h1>
          <p className="text-muted-foreground">Monitorea el estado de cumplimiento de todas las normas ISO y estándares de calidad.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Reporte de Cumplimiento
          </Button>
          <Dialog open={mostrarPlanAccion} onOpenChange={setMostrarPlanAccion}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Plan de Acción
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Plan de Acción</DialogTitle>
                <DialogDescription>Define un nuevo plan para mejorar el cumplimiento normativo</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Título del Plan</Label>
                  <Input placeholder="Ej: Mejora del Sistema de Calidad" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Norma</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar norma" />
                      </SelectTrigger>
                      <SelectContent>
                        {normasISO.map((norma) => (
                          <SelectItem key={norma.id} value={norma.codigo}>{norma.codigo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="juan">Juan Martínez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Fecha Inicio</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Fecha Fin</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Describe los objetivos y alcance del plan..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarPlanAccion(false)}>Cancelar</Button>
                <Button onClick={() => setMostrarPlanAccion(false)}>Crear Plan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumplimiento Promedio</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(cumplimientoPromedio)}%</div>
            <Progress value={cumplimientoPromedio} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Promedio de todas las normas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Normas Certificadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{normasCertificadas}</div>
            <p className="text-xs text-muted-foreground">
              de {normasISO.length} normas totales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Normas en Riesgo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{normasEnRiesgo}</div>
            <p className="text-xs text-muted-foreground">
              requieren atención inmediata
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Pendientes</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{alertasPendientes}</div>
            <p className="text-xs text-muted-foreground">
              acciones requeridas
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen General</TabsTrigger>
          <TabsTrigger value="clausulas">Cláusulas Detalladas</TabsTrigger>
          <TabsTrigger value="alertas">Alertas y Acciones</TabsTrigger>
          <TabsTrigger value="planes">Planes de Acción</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-6">
            {/* Estado de normas */}
            <Card>
              <CardHeader>
                <CardTitle>Estado de Normas ISO</CardTitle>
                <CardDescription>Vista general del cumplimiento por norma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {normasISO.map((norma) => (
                    <div key={norma.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{norma.codigo}</h4>
                          <p className="text-sm text-muted-foreground">{norma.nombre}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Responsable:</span>
                            <span className="text-xs">{norma.responsable}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          {getEstadoBadge(norma.estado)}
                          {getTendenciaIcon(norma.tendencia)}
                        </div>
                        <div className="w-32">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Cumplimiento</span>
                            <span>{norma.cumplimiento}%</span>
                          </div>
                          <Progress value={norma.cumplimiento} className="h-2" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Próxima auditoría: {norma.proximaAuditoria}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Próximas auditorías */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Próximas Auditorías
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {normasISO
                      .sort((a, b) => new Date(a.proximaAuditoria).getTime() - new Date(b.proximaAuditoria).getTime())
                      .slice(0, 3)
                      .map((norma) => (
                        <div key={norma.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">{norma.codigo}</div>
                            <div className="text-sm text-muted-foreground">{norma.organismo}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{norma.proximaAuditoria}</div>
                            <div className="text-xs text-muted-foreground">
                              {Math.ceil((new Date(norma.proximaAuditoria).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días
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
                    <Target className="h-5 w-5" />
                    Objetivos de Cumplimiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Meta Anual: 95%</span>
                        <span>Actual: {Math.round(cumplimientoPromedio)}%</span>
                      </div>
                      <Progress value={cumplimientoPromedio} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>• Certificar ISO 14001 antes de Q2</p>
                      <p>• Renovar ISO 22000 en Q4</p>
                      <p>• Mantener todas las certificaciones activas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clausulas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Análisis Detallado por Cláusulas</CardTitle>
                  <CardDescription>Estado de cumplimiento específico por cláusula</CardDescription>
                </div>
                <Select value={normaSeleccionada} onValueChange={setNormaSeleccionada}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {normasISO.map((norma) => (
                      <SelectItem key={norma.id} value={norma.codigo}>{norma.codigo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {clausulasDetalladas[normaSeleccionada] && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cláusula</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cumplimiento</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Evidencias</TableHead>
                      <TableHead>Próxima Revisión</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clausulasDetalladas[normaSeleccionada].map((clausula) => (
                      <TableRow key={clausula.codigo}>
                        <TableCell className="font-medium">{clausula.codigo}</TableCell>
                        <TableCell>{clausula.nombre}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16">
                              <Progress value={clausula.cumplimiento} className="h-2" />
                            </div>
                            <span className="text-sm">{clausula.cumplimiento}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {clausula.estado === "Completo" && <Badge variant="default" className="bg-green-500">Completo</Badge>}
                          {clausula.estado === "En Progreso" && <Badge variant="secondary">En Progreso</Badge>}
                          {clausula.estado === "Requiere Atención" && <Badge variant="destructive">Requiere Atención</Badge>}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{clausula.evidencias} docs</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{clausula.proximaRevision}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alertas y Acciones Requeridas
              </CardTitle>
              <CardDescription>Elementos que requieren atención inmediata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertasCumplimiento.map((alerta) => (
                  <div key={alerta.id} className={`p-4 border-l-4 rounded-lg ${getPrioridadColor(alerta.prioridad)}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{alerta.tipo}</Badge>
                          <Badge variant={alerta.prioridad === "Crítica" ? "destructive" : alerta.prioridad === "Alta" ? "destructive" : "secondary"}>
                            {alerta.prioridad}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{alerta.norma}</span>
                        </div>
                        <p className="font-medium">{alerta.mensaje}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Responsable: {alerta.responsable}</span>
                          <span>Fecha límite: {alerta.fecha}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          Resolver
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Planes de Acción Activos
              </CardTitle>
              <CardDescription>Iniciativas en curso para mejorar el cumplimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {planesAccion.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{plan.titulo}</CardTitle>
                          <CardDescription>{plan.descripcion}</CardDescription>
                        </div>
                        <Badge variant="secondary">{plan.estado}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progreso</span>
                            <span>{plan.progreso}%</span>
                          </div>
                          <Progress value={plan.progreso} className="h-2" />
                          <div className="text-sm text-muted-foreground">
                            {plan.completadas} de {plan.acciones} acciones completadas
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Norma:</span>
                            <span>{plan.norma}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Responsable:</span>
                            <span>{plan.responsable}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Período:</span>
                            <span>{plan.fechaInicio} - {plan.fechaFin}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </Button>
                        <Button size="sm">
                          Actualizar Progreso
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
    </div>
  );
} 