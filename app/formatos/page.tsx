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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Eye,
  Edit,
  Copy,
  Star,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  Upload,
  Zap,
  Template,
  Folder,
  FileCheck,
  Sparkles,
  BarChart3,
  Users,
  Calendar
} from "lucide-react";

const formatosData = [
  {
    id: "FMT-001",
    nombre: "Formato de Solicitud de Compra",
    categoria: "Compras",
    subcategoria: "Requisiciones",
    descripcion: "Formato estándar para solicitudes de compra de materiales y servicios",
    fecha: "2024-01-15",
    fechaActualizacion: "2024-01-15",
    estado: "Vigente",
    version: "2.1",
    autor: "Ana López",
    revisor: "Carlos López",
    aprobador: "Juan Martínez",
    usos: 45,
    descargas: 89,
    campos: [
      { nombre: "Solicitante", tipo: "texto", requerido: true },
      { nombre: "Departamento", tipo: "select", requerido: true },
      { nombre: "Fecha Solicitud", tipo: "fecha", requerido: true },
      { nombre: "Descripción del Producto", tipo: "textarea", requerido: true },
      { nombre: "Cantidad", tipo: "numero", requerido: true },
      { nombre: "Proveedor Sugerido", tipo: "texto", requerido: false },
      { nombre: "Justificación", tipo: "textarea", requerido: true }
    ],
    etiquetas: ["compras", "requisicion", "materiales"],
    plantilla: "compras-basico",
    formato: "PDF",
    tamaño: "1.2 MB",
    idioma: "Español"
  },
  {
    id: "FMT-002",
    nombre: "Formato de Reporte de Incidente",
    categoria: "Seguridad",
    subcategoria: "Incidentes",
    descripcion: "Formato para reportar incidentes de seguridad y accidentes laborales",
    fecha: "2024-01-12",
    fechaActualizacion: "2024-01-14",
    estado: "Vigente",
    version: "1.8",
    autor: "Pedro Sánchez",
    revisor: "María González",
    aprobador: "Carlos López",
    usos: 23,
    descargas: 56,
    campos: [
      { nombre: "Fecha del Incidente", tipo: "fecha", requerido: true },
      { nombre: "Hora del Incidente", tipo: "hora", requerido: true },
      { nombre: "Ubicación", tipo: "texto", requerido: true },
      { nombre: "Persona Afectada", tipo: "texto", requerido: true },
      { nombre: "Tipo de Incidente", tipo: "select", requerido: true },
      { nombre: "Descripción Detallada", tipo: "textarea", requerido: true },
      { nombre: "Testigos", tipo: "textarea", requerido: false },
      { nombre: "Acciones Inmediatas", tipo: "textarea", requerido: true }
    ],
    etiquetas: ["seguridad", "incidente", "reporte"],
    plantilla: "seguridad-incidente",
    formato: "PDF",
    tamaño: "950 KB",
    idioma: "Español"
  },
  {
    id: "FMT-003",
    nombre: "Formato de Mantenimiento Preventivo",
    categoria: "Mantenimiento",
    subcategoria: "Preventivo",
    descripcion: "Lista de verificación para mantenimiento preventivo de equipos",
    fecha: "2024-01-10",
    fechaActualizacion: "2024-01-10",
    estado: "Obsoleto",
    version: "1.2",
    autor: "Luis García",
    revisor: "Ana López",
    aprobador: "Pedro Sánchez",
    usos: 67,
    descargas: 134,
    campos: [
      { nombre: "Equipo", tipo: "select", requerido: true },
      { nombre: "Técnico Responsable", tipo: "texto", requerido: true },
      { nombre: "Fecha de Mantenimiento", tipo: "fecha", requerido: true },
      { nombre: "Checklist de Verificación", tipo: "checkbox", requerido: true },
      { nombre: "Observaciones", tipo: "textarea", requerido: false },
      { nombre: "Próximo Mantenimiento", tipo: "fecha", requerido: true }
    ],
    etiquetas: ["mantenimiento", "preventivo", "equipos"],
    plantilla: "mantenimiento-checklist",
    formato: "PDF",
    tamaño: "780 KB",
    idioma: "Español"
  },
  {
    id: "FMT-004",
    nombre: "Formato de Evaluación de Desempeño",
    categoria: "Recursos Humanos",
    subcategoria: "Evaluaciones",
    descripcion: "Formato para evaluación anual de desempeño del personal",
    fecha: "2024-01-08",
    fechaActualizacion: "2024-01-08",
    estado: "Vigente",
    version: "3.0",
    autor: "Carmen Ruiz",
    revisor: "Juan Martínez",
    aprobador: "María González",
    usos: 34,
    descargas: 78,
    campos: [
      { nombre: "Nombre del Empleado", tipo: "texto", requerido: true },
      { nombre: "Puesto", tipo: "texto", requerido: true },
      { nombre: "Periodo de Evaluación", tipo: "texto", requerido: true },
      { nombre: "Objetivos Cumplidos", tipo: "textarea", requerido: true },
      { nombre: "Calificación General", tipo: "select", requerido: true },
      { nombre: "Fortalezas", tipo: "textarea", requerido: true },
      { nombre: "Áreas de Mejora", tipo: "textarea", requerido: true },
      { nombre: "Plan de Desarrollo", tipo: "textarea", requerido: false }
    ],
    etiquetas: ["rrhh", "evaluacion", "desempeño"],
    plantilla: "rrhh-evaluacion",
    formato: "PDF",
    tamaño: "1.5 MB",
    idioma: "Español"
  },
  {
    id: "FMT-005",
    nombre: "Formato de Auditoría Interna",
    categoria: "Calidad",
    subcategoria: "Auditorías",
    descripcion: "Formato estándar para realizar auditorías internas de calidad",
    fecha: "2024-01-05",
    fechaActualizacion: "2024-01-12",
    estado: "En Revisión",
    version: "2.3",
    autor: "María González",
    revisor: "Pendiente",
    aprobador: "Pendiente",
    usos: 12,
    descargas: 28,
    campos: [
      { nombre: "Área Auditada", tipo: "select", requerido: true },
      { nombre: "Auditor", tipo: "texto", requerido: true },
      { nombre: "Fecha de Auditoría", tipo: "fecha", requerido: true },
      { nombre: "Cláusulas Evaluadas", tipo: "checkbox", requerido: true },
      { nombre: "Hallazgos", tipo: "textarea", requerido: true },
      { nombre: "No Conformidades", tipo: "textarea", requerido: false },
      { nombre: "Oportunidades de Mejora", tipo: "textarea", requerido: false }
    ],
    etiquetas: ["auditoria", "calidad", "iso9001"],
    plantilla: "auditoria-interna",
    formato: "PDF",
    tamaño: "1.8 MB",
    idioma: "Español"
  }
];

const plantillasDisponibles = [
  {
    id: "compras-basico",
    nombre: "Plantilla Básica de Compras",
    categoria: "Compras",
    descripcion: "Plantilla estándar para formatos relacionados con compras y adquisiciones",
    campos: ["encabezado", "solicitante", "items", "aprobaciones", "pie"],
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "seguridad-incidente",
    nombre: "Plantilla de Seguridad",
    categoria: "Seguridad",
    descripcion: "Plantilla especializada para reportes de incidentes y seguridad",
    campos: ["encabezado", "datos-incidente", "descripcion", "acciones", "firmas"],
    color: "bg-red-100 text-red-800"
  },
  {
    id: "rrhh-evaluacion",
    nombre: "Plantilla de RRHH",
    categoria: "Recursos Humanos",
    descripcion: "Plantilla para evaluaciones y procesos de recursos humanos",
    campos: ["encabezado", "datos-empleado", "evaluacion", "desarrollo", "firmas"],
    color: "bg-green-100 text-green-800"
  },
  {
    id: "auditoria-interna",
    nombre: "Plantilla de Auditoría",
    categoria: "Calidad",
    descripcion: "Plantilla para auditorías internas y evaluaciones de calidad",
    campos: ["encabezado", "alcance", "hallazgos", "conclusiones", "firmas"],
    color: "bg-purple-100 text-purple-800"
  }
];

const estadisticasFormatos = {
  totalFormatos: 24,
  formatosVigentes: 18,
  formatosEnRevision: 3,
  formatosObsoletos: 3,
  usosEsteMes: 234,
  descargasEsteMes: 456,
  formatosMasUsados: [
    { nombre: "Solicitud de Compra", usos: 45 },
    { nombre: "Reporte de Incidente", usos: 23 },
    { nombre: "Evaluación de Desempeño", usos: 34 }
  ]
};

export default function FormatosPage() {
  const [formatos, setFormatos] = useState(formatosData);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [formatoSeleccionado, setFormatoSeleccionado] = useState(null);
  const [mostrarNuevoFormato, setMostrarNuevoFormato] = useState(false);
  const [mostrarGenerador, setMostrarGenerador] = useState(false);

  const formatosFiltrados = formatos.filter(formato => {
    const matchBusqueda = formato.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         formato.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                         formato.etiquetas.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()));
    const matchCategoria = filtroCategoria === "todas" || formato.categoria === filtroCategoria;
    const matchEstado = filtroEstado === "todos" || formato.estado === filtroEstado;
    
    return matchBusqueda && matchCategoria && matchEstado;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Vigente":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Vigente</Badge>;
      case "En Revisión":
        return <Badge variant="secondary" className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />En Revisión</Badge>;
      case "Obsoleto":
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Obsoleto</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case "Compras": return "bg-blue-100 text-blue-800";
      case "Seguridad": return "bg-red-100 text-red-800";
      case "Recursos Humanos": return "bg-green-100 text-green-800";
      case "Mantenimiento": return "bg-orange-100 text-orange-800";
      case "Calidad": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const exportarFormatos = (formato) => {
    console.log(`Exportando formatos en formato ${formato}`);
    alert(`Lista de formatos exportada en formato ${formato}`);
  };

  const duplicarFormato = (formato) => {
    const nuevoFormato = {
      ...formato,
      id: `FMT-${String(formatos.length + 1).padStart(3, '0')}`,
      nombre: `${formato.nombre} (Copia)`,
      estado: "Borrador",
      fecha: new Date().toISOString().split('T')[0],
      fechaActualizacion: new Date().toISOString().split('T')[0],
      usos: 0,
      descargas: 0
    };
    
    setFormatos([...formatos, nuevoFormato]);
    alert("Formato duplicado exitosamente");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Template className="h-8 w-8 text-purple-600" />
            Gestión de Formatos
          </h1>
          <p className="text-muted-foreground">Biblioteca de formatos, plantillas y generador automático para documentos QMS.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportarFormatos("Excel")}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog open={mostrarGenerador} onOpenChange={setMostrarGenerador}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                Generador IA
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generador Automático de Formatos
                </DialogTitle>
                <DialogDescription>
                  Crea formatos personalizados usando inteligencia artificial
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Describe el formato que necesitas</Label>
                  <Textarea 
                    placeholder="Ej: Necesito un formato para registrar capacitaciones del personal que incluya fecha, tema, instructor, participantes y evaluación..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compras">Compras</SelectItem>
                        <SelectItem value="seguridad">Seguridad</SelectItem>
                        <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                        <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                        <SelectItem value="calidad">Calidad</SelectItem>
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
                        {plantillasDisponibles.map((plantilla) => (
                          <SelectItem key={plantilla.id} value={plantilla.id}>
                            {plantilla.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Campos requeridos (opcional)</Label>
                  <Input placeholder="nombre, fecha, departamento, observaciones..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarGenerador(false)}>Cancelar</Button>
                <Button onClick={() => setMostrarGenerador(false)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Formato
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={mostrarNuevoFormato} onOpenChange={setMostrarNuevoFormato}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Formato
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Formato</DialogTitle>
                <DialogDescription>Diseña un formato personalizado desde cero</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nombre del Formato</Label>
                  <Input placeholder="Ej: Formato de Control de Inventario" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compras">Compras</SelectItem>
                        <SelectItem value="seguridad">Seguridad</SelectItem>
                        <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                        <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                        <SelectItem value="calidad">Calidad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Subcategoría</Label>
                    <Input placeholder="Ej: Inventarios" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Describe el propósito y uso del formato..." />
                </div>
                <div className="grid gap-2">
                  <Label>Plantilla Base</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plantilla" />
                    </SelectTrigger>
                    <SelectContent>
                      {plantillasDisponibles.map((plantilla) => (
                        <SelectItem key={plantilla.id} value={plantilla.id}>
                          {plantilla.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Etiquetas</Label>
                  <Input placeholder="inventario, control, almacen (separadas por comas)" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarNuevoFormato(false)}>Cancelar</Button>
                <Button onClick={() => setMostrarNuevoFormato(false)}>Crear Formato</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Formatos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasFormatos.totalFormatos}</div>
            <p className="text-xs text-muted-foreground">en biblioteca</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formatos Vigentes</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estadisticasFormatos.formatosVigentes}</div>
            <p className="text-xs text-muted-foreground">activos y disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usos Este Mes</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estadisticasFormatos.usosEsteMes}</div>
            <p className="text-xs text-muted-foreground">formatos utilizados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Descargas</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasFormatos.descargasEsteMes}</div>
            <p className="text-xs text-muted-foreground">este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Buscar Formatos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar formatos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                <SelectItem value="Compras">Compras</SelectItem>
                <SelectItem value="Seguridad">Seguridad</SelectItem>
                <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                <SelectItem value="Calidad">Calidad</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="Vigente">Vigente</SelectItem>
                <SelectItem value="En Revisión">En Revisión</SelectItem>
                <SelectItem value="Obsoleto">Obsoleto</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Filtros Avanzados
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="formatos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="formatos">Biblioteca ({formatosFiltrados.length})</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="formatos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Biblioteca de Formatos</CardTitle>
              <CardDescription>{formatosFiltrados.length} formatos encontrados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Formato</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Versión</TableHead>
                    <TableHead>Usos</TableHead>
                    <TableHead>Última Actualización</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formatosFiltrados.map((formato) => (
                    <TableRow key={formato.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="font-medium hover:text-blue-600 cursor-pointer" 
                                 onClick={() => setFormatoSeleccionado(formato)}>
                              {formato.nombre}
                            </div>
                            <div className="text-sm text-muted-foreground">{formato.id}</div>
                            <div className="text-xs text-muted-foreground mt-1">{formato.descripcion}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge className={getCategoriaColor(formato.categoria)} variant="outline">
                            {formato.categoria}
                          </Badge>
                          {formato.subcategoria && (
                            <div className="text-xs text-muted-foreground mt-1">{formato.subcategoria}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(formato.estado)}</TableCell>
                      <TableCell className="font-mono">{formato.version}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{formato.usos} usos</div>
                          <div className="text-muted-foreground">{formato.descargas} descargas</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formato.fechaActualizacion}
                          <div className="text-muted-foreground">por {formato.autor}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setFormatoSeleccionado(formato)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => duplicarFormato(formato)}>
                            <Copy className="h-4 w-4" />
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

        <TabsContent value="plantillas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {plantillasDisponibles.map((plantilla) => (
              <Card key={plantilla.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Template className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{plantilla.nombre}</CardTitle>
                        <CardDescription className="mt-1">{plantilla.descripcion}</CardDescription>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Badge className={plantilla.color}>{plantilla.categoria}</Badge>
                      <span className="text-sm text-muted-foreground">{plantilla.campos.length} secciones</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Secciones incluidas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plantilla.campos.map((campo, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {campo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Vista Previa
                      </Button>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Usar Plantilla
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Crear Nueva Plantilla
              </CardTitle>
              <CardDescription>
                Diseña una plantilla personalizada para reutilizar en múltiples formatos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Template className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Diseñador de Plantillas</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Crea plantillas personalizadas con elementos reutilizables
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Plantilla
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Formatos Más Utilizados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {estadisticasFormatos.formatosMasUsados.map((formato, index) => (
                    <div key={formato.nombre} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{formato.nombre}</span>
                      </div>
                      <Badge variant="secondary">{formato.usos} usos</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  Distribución por Categoría
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Compras", "Seguridad", "Recursos Humanos", "Mantenimiento", "Calidad"].map((categoria) => {
                    const cantidad = formatos.filter(f => f.categoria === categoria).length;
                    const porcentaje = Math.round((cantidad / formatos.length) * 100);
                    
                    return (
                      <div key={categoria} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{categoria}</span>
                          <span>{cantidad} formatos ({porcentaje}%)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${porcentaje}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Plus className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Nuevo formato creado</div>
                    <div className="text-xs text-muted-foreground">Formato de Auditoría Interna - hace 2 días</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Formato actualizado</div>
                    <div className="text-xs text-muted-foreground">Solicitud de Compra v2.1 - hace 3 días</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Template className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Nueva plantilla agregada</div>
                    <div className="text-xs text-muted-foreground">Plantilla de Auditoría - hace 1 semana</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Formatos</CardTitle>
              <CardDescription>
                Personaliza el comportamiento y las opciones de los formatos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Generación Automática</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Numeración automática de formatos</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Versionado automático</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Aprobación automática para formatos simples</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Validaciones</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Validar campos requeridos</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Verificar formato de fechas</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Validación de firmas digitales</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Configuración de Exportación</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Formato por defecto</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="docx">Word (DOCX)</SelectItem>
                        <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Calidad de imagen</Label>
                    <Select defaultValue="alta">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja (rápido)</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="alta">Alta (calidad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Marca de agua</Label>
                    <Select defaultValue="ninguna">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ninguna">Ninguna</SelectItem>
                        <SelectItem value="borrador">Solo borradores</SelectItem>
                        <SelectItem value="todos">Todos los formatos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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

      {/* Modal de detalles del formato */}
      {formatoSeleccionado && (
        <Dialog open={!!formatoSeleccionado} onOpenChange={() => setFormatoSeleccionado(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5" />
                <Badge className={getCategoriaColor(formatoSeleccionado.categoria)}>
                  {formatoSeleccionado.categoria}
                </Badge>
                {getEstadoBadge(formatoSeleccionado.estado)}
                <Badge variant="outline">v{formatoSeleccionado.version}</Badge>
              </div>
              <DialogTitle className="text-2xl">{formatoSeleccionado.nombre}</DialogTitle>
              <DialogDescription>
                {formatoSeleccionado.descripcion}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-3">Información General</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono">{formatoSeleccionado.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subcategoría:</span>
                      <span>{formatoSeleccionado.subcategoria}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plantilla:</span>
                      <span>{formatoSeleccionado.plantilla}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Formato:</span>
                      <span>{formatoSeleccionado.formato}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tamaño:</span>
                      <span>{formatoSeleccionado.tamaño}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Estadísticas de Uso</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Usos totales:</span>
                      <span className="font-medium">{formatoSeleccionado.usos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Descargas:</span>
                      <span className="font-medium">{formatoSeleccionado.descargas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Autor:</span>
                      <span>{formatoSeleccionado.autor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última actualización:</span>
                      <span>{formatoSeleccionado.fechaActualizacion}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Campos del Formato</h3>
                <div className="grid gap-2">
                  {formatoSeleccionado.campos.map((campo, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{campo.nombre}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{campo.tipo}</Badge>
                        {campo.requerido && (
                          <Badge variant="destructive" className="text-xs">Requerido</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Etiquetas</h3>
                <div className="flex flex-wrap gap-1">
                  {formatoSeleccionado.etiquetas.map((etiqueta, idx) => (
                    <Badge key={idx} variant="outline">
                      {etiqueta}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setFormatoSeleccionado(null)}>
                Cerrar
              </Button>
              <Button variant="outline" onClick={() => duplicarFormato(formatoSeleccionado)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </Button>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Editar
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