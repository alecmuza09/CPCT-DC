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
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Eye,
  Edit,
  Trash2,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  FolderOpen,
  Archive,
  Star,
  Share2,
  History,
  Settings,
  Upload,
  FileCheck,
  FileX
} from "lucide-react";

const documentosData = [
  {
    id: "DOC-001",
    nombre: "Manual de Calidad",
    tipo: "Manual",
    categoria: "Calidad",
    version: "3.2",
    fecha: "2024-01-15",
    fechaVencimiento: "2025-01-15",
    estado: "Aprobado",
    autor: "María González",
    revisor: "Carlos López",
    aprobador: "Juan Martínez",
    tamaño: "2.5 MB",
    formato: "PDF",
    descargas: 45,
    ubicacion: "/documentos/calidad/manuales/",
    descripcion: "Manual principal del sistema de gestión de calidad ISO 9001:2015",
    etiquetas: ["ISO 9001", "Manual", "Calidad", "Principal"],
    confidencialidad: "Interno",
    idioma: "Español",
    relacionados: ["DOC-002", "DOC-015"]
  },
  {
    id: "DOC-002",
    nombre: "Procedimiento de Compras",
    tipo: "Procedimiento",
    categoria: "Compras",
    version: "2.1",
    fecha: "2024-01-12",
    fechaVencimiento: "2024-07-12",
    estado: "En Revisión",
    autor: "Ana López",
    revisor: "Pedro Sánchez",
    aprobador: "Pendiente",
    tamaño: "1.8 MB",
    formato: "PDF",
    descargas: 23,
    ubicacion: "/documentos/procedimientos/compras/",
    descripcion: "Procedimiento para gestión de compras y evaluación de proveedores",
    etiquetas: ["Compras", "Proveedores", "Procedimiento"],
    confidencialidad: "Restringido",
    idioma: "Español",
    relacionados: ["DOC-001", "DOC-008"]
  },
  {
    id: "DOC-003",
    nombre: "Instrucción de Limpieza",
    tipo: "Instrucción",
    categoria: "Operaciones",
    version: "1.5",
    fecha: "2024-01-10",
    fechaVencimiento: "2024-06-10",
    estado: "Obsoleto",
    autor: "Carlos Ruiz",
    revisor: "Ana López",
    aprobador: "María González",
    tamaño: "850 KB",
    formato: "PDF",
    descargas: 67,
    ubicacion: "/documentos/instrucciones/operaciones/",
    descripcion: "Instrucciones detalladas para procedimientos de limpieza y desinfección",
    etiquetas: ["Limpieza", "Operaciones", "Instrucción", "HACCP"],
    confidencialidad: "Público",
    idioma: "Español",
    relacionados: ["DOC-004", "DOC-012"]
  },
  {
    id: "DOC-004",
    nombre: "Política Ambiental",
    tipo: "Política",
    categoria: "Medio Ambiente",
    version: "1.0",
    fecha: "2024-01-08",
    fechaVencimiento: "2025-01-08",
    estado: "Borrador",
    autor: "Luis García",
    revisor: "Pendiente",
    aprobador: "Pendiente",
    tamaño: "1.2 MB",
    formato: "DOCX",
    descargas: 5,
    ubicacion: "/documentos/politicas/ambiente/",
    descripcion: "Política corporativa para gestión ambiental según ISO 14001",
    etiquetas: ["ISO 14001", "Ambiente", "Política"],
    confidencialidad: "Interno",
    idioma: "Español",
    relacionados: ["DOC-003"]
  }
];

const estadisticasDocumentales = {
  totalDocumentos: 156,
  documentosActivos: 142,
  documentosVencidos: 8,
  documentosBorrador: 6,
  revisionesHoy: 3,
  aprobacionesPendientes: 5,
  descargasEsteMes: 324,
  espacioUtilizado: "2.4 GB",
  porCategoria: [
    { categoria: "Calidad", cantidad: 45, porcentaje: 29 },
    { categoria: "Procedimientos", cantidad: 38, porcentaje: 24 },
    { categoria: "Instrucciones", cantidad: 32, porcentaje: 21 },
    { categoria: "Políticas", cantidad: 25, porcentaje: 16 },
    { categoria: "Otros", cantidad: 16, porcentaje: 10 }
  ]
};

export default function GestionDocumentalPage() {
  const [documentos, setDocumentos] = useState(documentosData);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);
  const [mostrarNuevoDocumento, setMostrarNuevoDocumento] = useState(false);
  const [vistaModo, setVistaModo] = useState("tabla");

  const documentosFiltrados = documentos.filter(documento => {
    const matchBusqueda = documento.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         documento.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                         documento.etiquetas.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()));
    const matchTipo = filtroTipo === "todos" || documento.tipo === filtroTipo;
    const matchEstado = filtroEstado === "todos" || documento.estado === filtroEstado;
    const matchCategoria = filtroCategoria === "todas" || documento.categoria === filtroCategoria;
    
    return matchBusqueda && matchTipo && matchEstado && matchCategoria;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Aprobado":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Aprobado</Badge>;
      case "En Revisión":
        return <Badge variant="secondary" className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />En Revisión</Badge>;
      case "Borrador":
        return <Badge variant="outline"><Edit className="w-3 h-3 mr-1" />Borrador</Badge>;
      case "Obsoleto":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Obsoleto</Badge>;
      case "Rechazado":
        return <Badge variant="destructive"><FileX className="w-3 h-3 mr-1" />Rechazado</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case "Manual": return <FileText className="h-4 w-4" />;
      case "Procedimiento": return <FileCheck className="h-4 w-4" />;
      case "Instrucción": return <FileText className="h-4 w-4" />;
      case "Política": return <Star className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getConfidencialidadColor = (confidencialidad) => {
    switch (confidencialidad) {
      case "Público": return "bg-green-100 text-green-800";
      case "Interno": return "bg-blue-100 text-blue-800";
      case "Restringido": return "bg-orange-100 text-orange-800";
      case "Confidencial": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const diasHastaVencimiento = (fechaVencimiento) => {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));
    return diferencia;
  };

  const exportarDocumentos = (formato) => {
    console.log(`Exportando documentos en formato ${formato}`);
    alert(`Lista de documentos exportada en formato ${formato}`);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            Gestión Documental
          </h1>
          <p className="text-muted-foreground">Sistema centralizado para la gestión, control y distribución de documentos del QMS.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportarDocumentos("Excel")}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog open={mostrarNuevoDocumento} onOpenChange={setMostrarNuevoDocumento}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Documento</DialogTitle>
                <DialogDescription>Sube y registra un nuevo documento en el sistema</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Nombre del Documento</label>
                  <Input placeholder="Ej: Procedimiento de Auditoría Interna" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Tipo</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="procedimiento">Procedimiento</SelectItem>
                        <SelectItem value="instruccion">Instrucción</SelectItem>
                        <SelectItem value="politica">Política</SelectItem>
                        <SelectItem value="formato">Formato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Categoría</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calidad">Calidad</SelectItem>
                        <SelectItem value="compras">Compras</SelectItem>
                        <SelectItem value="operaciones">Operaciones</SelectItem>
                        <SelectItem value="ambiente">Medio Ambiente</SelectItem>
                        <SelectItem value="seguridad">Seguridad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Confidencialidad</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="publico">Público</SelectItem>
                        <SelectItem value="interno">Interno</SelectItem>
                        <SelectItem value="restringido">Restringido</SelectItem>
                        <SelectItem value="confidencial">Confidencial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Descripción</label>
                  <Input placeholder="Breve descripción del documento" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Archivo</label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Arrastra y suelta tu archivo aquí, o <button className="text-blue-600 hover:underline">busca en tu equipo</button>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Formatos soportados: PDF, DOC, DOCX, XLS, XLSX (máx. 10MB)
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarNuevoDocumento(false)}>Cancelar</Button>
                <Button onClick={() => setMostrarNuevoDocumento(false)}>Crear Documento</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasDocumentales.totalDocumentos}</div>
            <p className="text-xs text-muted-foreground">documentos registrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Activos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estadisticasDocumentales.documentosActivos}</div>
            <p className="text-xs text-muted-foreground">aprobados y vigentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{estadisticasDocumentales.aprobacionesPendientes}</div>
            <p className="text-xs text-muted-foreground">esperando aprobación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{estadisticasDocumentales.documentosVencidos}</div>
            <p className="text-xs text-muted-foreground">requieren actualización</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas importantes */}
      {estadisticasDocumentales.documentosVencidos > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Tienes {estadisticasDocumentales.documentosVencidos} documentos vencidos que requieren actualización inmediata.
            <Button variant="link" className="p-0 h-auto ml-2">Ver documentos vencidos</Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Búsqueda y Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-2 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
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
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Procedimiento">Procedimiento</SelectItem>
                <SelectItem value="Instrucción">Instrucción</SelectItem>
                <SelectItem value="Política">Política</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="Aprobado">Aprobado</SelectItem>
                <SelectItem value="En Revisión">En Revisión</SelectItem>
                <SelectItem value="Borrador">Borrador</SelectItem>
                <SelectItem value="Obsoleto">Obsoleto</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                <SelectItem value="Calidad">Calidad</SelectItem>
                <SelectItem value="Compras">Compras</SelectItem>
                <SelectItem value="Operaciones">Operaciones</SelectItem>
                <SelectItem value="Medio Ambiente">Medio Ambiente</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button 
                variant={vistaModo === "tabla" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setVistaModo("tabla")}
              >
                Tabla
              </Button>
              <Button 
                variant={vistaModo === "tarjetas" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setVistaModo("tarjetas")}
              >
                Tarjetas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documentos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documentos">Documentos ({documentosFiltrados.length})</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="flujos">Flujos de Aprobación</TabsTrigger>
          <TabsTrigger value="archivo">Archivo</TabsTrigger>
        </TabsList>

        <TabsContent value="documentos" className="space-y-4">
          {vistaModo === "tabla" ? (
            <Card>
              <CardHeader>
                <CardTitle>Lista de Documentos</CardTitle>
                <CardDescription>{documentosFiltrados.length} documentos encontrados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Documento</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Versión</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentosFiltrados.map((documento) => (
                      <TableRow key={documento.id}>
                        <TableCell>
                          <div className="flex items-start gap-3">
                            {getTipoIcon(documento.tipo)}
                            <div className="flex-1">
                              <div className="font-medium hover:text-blue-600 cursor-pointer" 
                                   onClick={() => setDocumentoSeleccionado(documento)}>
                                {documento.nombre}
                              </div>
                              <div className="text-sm text-muted-foreground">{documento.id}</div>
                              <div className="flex gap-1 mt-1">
                                <Badge className={getConfidencialidadColor(documento.confidencialidad)} variant="outline">
                                  {documento.confidencialidad}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{documento.tipo}</Badge>
                        </TableCell>
                        <TableCell>{getEstadoBadge(documento.estado)}</TableCell>
                        <TableCell className="font-mono">{documento.version}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {documento.fechaVencimiento}
                            <div className={`text-xs ${
                              diasHastaVencimiento(documento.fechaVencimiento) < 0 ? 'text-red-600' : 
                              diasHastaVencimiento(documento.fechaVencimiento) <= 30 ? 'text-orange-600' : 
                              'text-muted-foreground'
                            }`}>
                              {diasHastaVencimiento(documento.fechaVencimiento) < 0 
                                ? `Vencido hace ${Math.abs(diasHastaVencimiento(documento.fechaVencimiento))} días`
                                : `${diasHastaVencimiento(documento.fechaVencimiento)} días restantes`}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Autor: {documento.autor}</div>
                            {documento.revisor && <div className="text-muted-foreground">Rev: {documento.revisor}</div>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => setDocumentoSeleccionado(documento)}>
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
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documentosFiltrados.map((documento) => (
                <Card key={documento.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2">
                        {getTipoIcon(documento.tipo)}
                        <div className="flex-1">
                          <CardTitle className="text-lg hover:text-blue-600 cursor-pointer" 
                                     onClick={() => setDocumentoSeleccionado(documento)}>
                            {documento.nombre}
                          </CardTitle>
                          <CardDescription className="mt-1">{documento.descripcion}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        {getEstadoBadge(documento.estado)}
                        <Badge variant="outline">v{documento.version}</Badge>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Categoría:</span>
                          <span>{documento.categoria}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Autor:</span>
                          <span>{documento.autor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Vence:</span>
                          <span className={diasHastaVencimiento(documento.fechaVencimiento) <= 30 ? 'text-orange-600' : ''}>
                            {documento.fechaVencimiento}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {documento.etiquetas.slice(0, 3).map((etiqueta, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {etiqueta}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2 border-t">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {estadisticasDocumentales.porCategoria.map((item) => (
                    <div key={item.categoria} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.categoria}</span>
                        <span>{item.cantidad} documentos ({item.porcentaje}%)</span>
                      </div>
                      <Progress value={item.porcentaje} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Uso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 grid-cols-2">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{estadisticasDocumentales.descargasEsteMes}</div>
                      <div className="text-sm text-muted-foreground">Descargas este mes</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{estadisticasDocumentales.espacioUtilizado}</div>
                      <div className="text-sm text-muted-foreground">Espacio utilizado</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Documentos más descargados</h4>
                    <div className="space-y-2">
                      {documentos.sort((a, b) => b.descargas - a.descargas).slice(0, 3).map((doc, idx) => (
                        <div key={doc.id} className="flex justify-between items-center p-2 bg-muted rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                              {idx + 1}
                            </div>
                            <span className="text-sm">{doc.nombre}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{doc.descargas} descargas</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="flujos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flujos de Aprobación Activos</CardTitle>
              <CardDescription>Documentos en proceso de revisión y aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentos
                  .filter(doc => doc.estado === "En Revisión" || doc.estado === "Borrador")
                  .map((documento) => (
                    <div key={documento.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{documento.nombre}</h4>
                          <p className="text-sm text-muted-foreground">{documento.id} - v{documento.version}</p>
                        </div>
                        {getEstadoBadge(documento.estado)}
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-sm">
                          <div className="font-medium mb-1">Autor</div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{documento.autor}</span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium mb-1">Revisor</div>
                          <div className="flex items-center gap-2">
                            {documento.revisor === "Pendiente" ? (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <span>{documento.revisor}</span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium mb-1">Aprobador</div>
                          <div className="flex items-center gap-2">
                            {documento.aprobador === "Pendiente" ? (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <span>{documento.aprobador}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button size="sm" variant="outline">Ver Documento</Button>
                        <Button size="sm" variant="outline">Comentarios</Button>
                        <Button size="sm">Aprobar</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archivo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Documentos Archivados
              </CardTitle>
              <CardDescription>Documentos obsoletos y versiones anteriores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Archive className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Archivo de Documentos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Los documentos obsoletos y versiones anteriores se almacenan aquí para referencia histórica.
                </p>
                <Button variant="outline">
                  <History className="mr-2 h-4 w-4" />
                  Ver Historial Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de detalles del documento */}
      {documentoSeleccionado && (
        <Dialog open={!!documentoSeleccionado} onOpenChange={() => setDocumentoSeleccionado(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                {getTipoIcon(documentoSeleccionado.tipo)}
                <Badge variant="outline">{documentoSeleccionado.tipo}</Badge>
                {getEstadoBadge(documentoSeleccionado.estado)}
                <Badge className={getConfidencialidadColor(documentoSeleccionado.confidencialidad)}>
                  {documentoSeleccionado.confidencialidad}
                </Badge>
              </div>
              <DialogTitle className="text-2xl">{documentoSeleccionado.nombre}</DialogTitle>
              <DialogDescription>
                {documentoSeleccionado.descripcion}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-3">Información del Documento</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono">{documentoSeleccionado.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Versión:</span>
                      <span className="font-mono">{documentoSeleccionado.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoría:</span>
                      <span>{documentoSeleccionado.categoria}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tamaño:</span>
                      <span>{documentoSeleccionado.tamaño}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Formato:</span>
                      <span>{documentoSeleccionado.formato}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Descargas:</span>
                      <span>{documentoSeleccionado.descargas}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Control de Versión</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Autor:</span>
                      <span>{documentoSeleccionado.autor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revisor:</span>
                      <span>{documentoSeleccionado.revisor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Aprobador:</span>
                      <span>{documentoSeleccionado.aprobador}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha:</span>
                      <span>{documentoSeleccionado.fecha}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vencimiento:</span>
                      <span className={diasHastaVencimiento(documentoSeleccionado.fechaVencimiento) <= 30 ? 'text-orange-600' : ''}>
                        {documentoSeleccionado.fechaVencimiento}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Etiquetas</h3>
                <div className="flex flex-wrap gap-1">
                  {documentoSeleccionado.etiquetas.map((etiqueta, idx) => (
                    <Badge key={idx} variant="outline">
                      {etiqueta}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Ubicación</h3>
                <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                  {documentoSeleccionado.ubicacion}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setDocumentoSeleccionado(null)}>
                Cerrar
              </Button>
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" />
                Ver Historial
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
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