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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Trash2, 
  Edit, 
  Plus,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  User,
  FolderOpen,
  Tag,
  Star,
  Archive,
  History
} from "lucide-react";

const evidenciasData = [
  {
    id: 1,
    nombre: "Registro de Capacitación ISO 9001",
    tipo: "Documento",
    categoria: "Capacitación",
    clausula: "7.2",
    norma: "ISO 9001:2015",
    estado: "Aprobado",
    fechaSubida: "2024-01-15",
    fechaVencimiento: "2024-12-15",
    responsable: "María González",
    tamaño: "2.4 MB",
    formato: "PDF",
    descripcion: "Registros de capacitación del personal en requisitos ISO 9001",
    validador: "Carlos Ruiz",
    fechaValidacion: "2024-01-16",
    version: "1.0",
    prioridad: "Alta"
  },
  {
    id: 2,
    nombre: "Auditoría Interna Q1 2024",
    tipo: "Informe",
    categoria: "Auditoría",
    clausula: "9.2",
    norma: "ISO 9001:2015",
    estado: "Pendiente",
    fechaSubida: "2024-01-20",
    fechaVencimiento: "2024-03-20",
    responsable: "Ana López",
    tamaño: "5.8 MB",
    formato: "PDF",
    descripcion: "Informe completo de auditoría interna del primer trimestre",
    validador: null,
    fechaValidacion: null,
    version: "2.1",
    prioridad: "Crítica"
  },
  {
    id: 3,
    nombre: "Matriz de Riesgos Actualizada",
    tipo: "Documento",
    categoria: "Gestión de Riesgos",
    clausula: "6.1",
    norma: "ISO 9001:2015",
    estado: "Rechazado",
    fechaSubida: "2024-01-10",
    fechaVencimiento: "2024-06-10",
    responsable: "Juan Martínez",
    tamaño: "1.2 MB",
    formato: "Excel",
    descripcion: "Matriz de identificación y evaluación de riesgos organizacionales",
    validador: "María González",
    fechaValidacion: "2024-01-12",
    version: "3.0",
    prioridad: "Media",
    motivoRechazo: "Faltan firmas de aprobación en la sección 4.2"
  },
  {
    id: 4,
    nombre: "Certificado de Calibración Báscula",
    tipo: "Certificado",
    categoria: "Calibración",
    clausula: "7.1.5",
    norma: "ISO 9001:2015",
    estado: "Aprobado",
    fechaSubida: "2024-01-08",
    fechaVencimiento: "2025-01-08",
    responsable: "Pedro Sánchez",
    tamaño: "0.8 MB",
    formato: "PDF",
    descripcion: "Certificado de calibración de báscula industrial modelo XYZ-100",
    validador: "Ana López",
    fechaValidacion: "2024-01-09",
    version: "1.0",
    prioridad: "Alta"
  },
  {
    id: 5,
    nombre: "Plan de Mantenimiento Preventivo",
    tipo: "Plan",
    categoria: "Mantenimiento",
    clausula: "7.1.3",
    norma: "ISO 9001:2015",
    estado: "En Revisión",
    fechaSubida: "2024-01-25",
    fechaVencimiento: "2024-07-25",
    responsable: "Luis García",
    tamaño: "3.1 MB",
    formato: "PDF",
    descripcion: "Plan anual de mantenimiento preventivo para equipos críticos",
    validador: "Carlos Ruiz",
    fechaValidacion: null,
    version: "1.5",
    prioridad: "Media"
  }
];

const categoriasEvidencia = [
  "Capacitación",
  "Auditoría",
  "Gestión de Riesgos",
  "Calibración",
  "Mantenimiento",
  "Compras",
  "Producción",
  "Control de Calidad",
  "Recursos Humanos",
  "Medio Ambiente"
];

const clausulasISO = [
  { codigo: "4.1", descripcion: "Comprensión de la organización y su contexto" },
  { codigo: "4.2", descripcion: "Comprensión de las necesidades y expectativas" },
  { codigo: "6.1", descripcion: "Acciones para abordar riesgos y oportunidades" },
  { codigo: "7.1.3", descripcion: "Infraestructura" },
  { codigo: "7.1.5", descripcion: "Recursos de seguimiento y medición" },
  { codigo: "7.2", descripcion: "Competencia" },
  { codigo: "8.4", descripcion: "Control de procesos, productos y servicios" },
  { codigo: "9.2", descripcion: "Auditoría interna" }
];

export default function EvidenciasPage() {
  const [evidencias, setEvidencias] = useState(evidenciasData);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroNorma, setFiltroNorma] = useState("todos");
  const [mostrarDialogoSubir, setMostrarDialogoSubir] = useState(false);
  const [mostrarDetalles, setMostrarDetalles] = useState(null);
  const [evidenciaEditando, setEvidenciaEditando] = useState(null);

  // Datos del formulario de nueva evidencia
  const [nuevaEvidencia, setNuevaEvidencia] = useState({
    nombre: "",
    categoria: "",
    clausula: "",
    norma: "ISO 9001:2015",
    descripcion: "",
    prioridad: "Media"
  });

  const evidenciasFiltradas = evidencias.filter(evidencia => {
    const matchBusqueda = evidencia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         evidencia.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === "todos" || evidencia.estado === filtroEstado;
    const matchCategoria = filtroCategoria === "todos" || evidencia.categoria === filtroCategoria;
    const matchNorma = filtroNorma === "todos" || evidencia.norma === filtroNorma;
    
    return matchBusqueda && matchEstado && matchCategoria && matchNorma;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Aprobado":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Aprobado</Badge>;
      case "Pendiente":
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>;
      case "En Revisión":
        return <Badge variant="secondary"><Eye className="w-3 h-3 mr-1" />En Revisión</Badge>;
      case "Rechazado":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rechazado</Badge>;
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

  const handleSubirEvidencia = () => {
    // Simulación de subida de evidencia
    const nuevaEv = {
      ...nuevaEvidencia,
      id: evidencias.length + 1,
      estado: "Pendiente",
      fechaSubida: new Date().toISOString().split('T')[0],
      fechaVencimiento: new Date(Date.now() + 180*24*60*60*1000).toISOString().split('T')[0],
      responsable: "Usuario Actual",
      tamaño: "1.5 MB",
      formato: "PDF",
      validador: null,
      fechaValidacion: null,
      version: "1.0"
    };
    
    setEvidencias([nuevaEv, ...evidencias]);
    setNuevaEvidencia({
      nombre: "",
      categoria: "",
      clausula: "",
      norma: "ISO 9001:2015",
      descripcion: "",
      prioridad: "Media"
    });
    setMostrarDialogoSubir(false);
  };

  const validarEvidencia = (id, accion) => {
    setEvidencias(evidencias.map(ev => 
      ev.id === id 
        ? { 
            ...ev, 
            estado: accion === 'aprobar' ? 'Aprobado' : 'Rechazado',
            validador: 'Usuario Actual',
            fechaValidacion: new Date().toISOString().split('T')[0]
          }
        : ev
    ));
  };

  const eliminarEvidencia = (id) => {
    setEvidencias(evidencias.filter(ev => ev.id !== id));
  };

  const contadorEstados = {
    total: evidencias.length,
    aprobado: evidencias.filter(e => e.estado === "Aprobado").length,
    pendiente: evidencias.filter(e => e.estado === "Pendiente").length,
    revision: evidencias.filter(e => e.estado === "En Revisión").length,
    rechazado: evidencias.filter(e => e.estado === "Rechazado").length
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            Evidencias de Auditoría
          </h1>
          <p className="text-muted-foreground">Gestiona y organiza todas las evidencias para auditorías y cumplimiento normativo.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Evidencias
          </Button>
          <Dialog open={mostrarDialogoSubir} onOpenChange={setMostrarDialogoSubir}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Evidencia
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Subir Nueva Evidencia</DialogTitle>
                <DialogDescription>
                  Completa la información de la evidencia que deseas subir al sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre de la Evidencia</Label>
                  <Input
                    id="nombre"
                    value={nuevaEvidencia.nombre}
                    onChange={(e) => setNuevaEvidencia({...nuevaEvidencia, nombre: e.target.value})}
                    placeholder="Ej: Certificado de Calibración"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Categoría</Label>
                    <Select value={nuevaEvidencia.categoria} onValueChange={(value) => setNuevaEvidencia({...nuevaEvidencia, categoria: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriasEvidencia.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Cláusula ISO</Label>
                    <Select value={nuevaEvidencia.clausula} onValueChange={(value) => setNuevaEvidencia({...nuevaEvidencia, clausula: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cláusula" />
                      </SelectTrigger>
                      <SelectContent>
                        {clausulasISO.map((clausula) => (
                          <SelectItem key={clausula.codigo} value={clausula.codigo}>
                            {clausula.codigo} - {clausula.descripcion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Norma</Label>
                    <Select value={nuevaEvidencia.norma} onValueChange={(value) => setNuevaEvidencia({...nuevaEvidencia, norma: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ISO 9001:2015">ISO 9001:2015</SelectItem>
                        <SelectItem value="ISO 14001:2015">ISO 14001:2015</SelectItem>
                        <SelectItem value="ISO 45001:2018">ISO 45001:2018</SelectItem>
                        <SelectItem value="ISO 22000:2018">ISO 22000:2018</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Prioridad</Label>
                    <Select value={nuevaEvidencia.prioridad} onValueChange={(value) => setNuevaEvidencia({...nuevaEvidencia, prioridad: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Crítica">Crítica</SelectItem>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={nuevaEvidencia.descripcion}
                    onChange={(e) => setNuevaEvidencia({...nuevaEvidencia, descripcion: e.target.value})}
                    placeholder="Describe el contenido y propósito de esta evidencia..."
                    className="min-h-[80px]"
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">Arrastra el archivo aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-gray-400 mt-2">PDF, Word, Excel - Máximo 10MB</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarDialogoSubir(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubirEvidencia}>
                  Subir Evidencia
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evidencias</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contadorEstados.total}</div>
            <p className="text-xs text-muted-foreground">documentos registrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{contadorEstados.aprobado}</div>
            <p className="text-xs text-muted-foreground">listas para auditoría</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{contadorEstados.pendiente}</div>
            <p className="text-xs text-muted-foreground">requieren validación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{contadorEstados.revision}</div>
            <p className="text-xs text-muted-foreground">siendo evaluadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{contadorEstados.rechazado}</div>
            <p className="text-xs text-muted-foreground">requieren corrección</p>
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
          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar evidencia..."
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
                <SelectItem value="Aprobado">Aprobado</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Revisión">En Revisión</SelectItem>
                <SelectItem value="Rechazado">Rechazado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las categorías</SelectItem>
                {categoriasEvidencia.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
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
              <Download className="mr-2 h-4 w-4" />
              Exportar Filtradas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de evidencias */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Evidencias</CardTitle>
          <CardDescription>
            {evidenciasFiltradas.length} evidencias encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evidencia</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Cláusula</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evidenciasFiltradas.map((evidencia) => (
                <TableRow key={evidencia.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{evidencia.nombre}</div>
                        <div className="text-sm text-muted-foreground">
                          {evidencia.formato} • {evidencia.tamaño}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{evidencia.categoria}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{evidencia.clausula}</Badge>
                  </TableCell>
                  <TableCell>{getEstadoBadge(evidencia.estado)}</TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${getPrioridadColor(evidencia.prioridad)}`}>
                      {evidencia.prioridad}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {evidencia.responsable.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{evidencia.responsable}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{evidencia.fechaSubida}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setMostrarDetalles(evidencia)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      {evidencia.estado === "Pendiente" && (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => validarEvidencia(evidencia.id, 'aprobar')} className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => validarEvidencia(evidencia.id, 'rechazar')} className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => eliminarEvidencia(evidencia.id)} className="text-red-600">
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

      {/* Dialog de detalles */}
      {mostrarDetalles && (
        <Dialog open={!!mostrarDetalles} onOpenChange={() => setMostrarDetalles(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {mostrarDetalles.nombre}
              </DialogTitle>
              <DialogDescription>
                Detalles completos de la evidencia
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">Información General</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span>{mostrarDetalles.tipo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoría:</span>
                      <Badge variant="outline">{mostrarDetalles.categoria}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Norma:</span>
                      <span>{mostrarDetalles.norma}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cláusula:</span>
                      <Badge variant="secondary">{mostrarDetalles.clausula}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      {getEstadoBadge(mostrarDetalles.estado)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prioridad:</span>
                      <span className={getPrioridadColor(mostrarDetalles.prioridad)}>
                        {mostrarDetalles.prioridad}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Información del Archivo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Formato:</span>
                      <span>{mostrarDetalles.formato}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tamaño:</span>
                      <span>{mostrarDetalles.tamaño}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Versión:</span>
                      <span>{mostrarDetalles.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha subida:</span>
                      <span>{mostrarDetalles.fechaSubida}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vencimiento:</span>
                      <span>{mostrarDetalles.fechaVencimiento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Responsable:</span>
                      <span>{mostrarDetalles.responsable}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Descripción</h4>
                <p className="text-sm text-muted-foreground">{mostrarDetalles.descripcion}</p>
              </div>

              {mostrarDetalles.validador && (
                <div>
                  <h4 className="font-medium mb-3">Información de Validación</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Validado por:</span>
                      <span>{mostrarDetalles.validador}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha validación:</span>
                      <span>{mostrarDetalles.fechaValidacion}</span>
                    </div>
                  </div>
                </div>
              )}

              {mostrarDetalles.motivoRechazo && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Motivo de rechazo:</strong> {mostrarDetalles.motivoRechazo}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setMostrarDetalles(null)}>
                Cerrar
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 