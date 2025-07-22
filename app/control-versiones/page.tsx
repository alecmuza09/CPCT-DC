"use client"

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  History, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle
} from "lucide-react";
import { DiffEditor } from "@monaco-editor/react";
import JSZip from "jszip";

// Datos de ejemplo para versiones de documentos
const documentVersions = [
  {
    id: 1,
    documentName: "Manual de Calidad",
    version: "3.2",
    status: "Activo",
    author: "María González",
    lastModified: "2024-01-15",
    changes: "Actualización de procedimientos de auditoría",
    fileSize: "2.4 MB",
    downloads: 45
  },
  {
    id: 2,
    documentName: "Manual de Calidad",
    version: "3.1",
    status: "Archivado",
    author: "María González",
    lastModified: "2024-01-10",
    changes: "Corrección de errores tipográficos",
    fileSize: "2.3 MB",
    downloads: 23
  },
  {
    id: 3,
    documentName: "Procedimiento de Compras",
    version: "2.0",
    status: "Activo",
    author: "Carlos Ruiz",
    lastModified: "2024-01-12",
    changes: "Nuevo procedimiento completo",
    fileSize: "1.8 MB",
    downloads: 67
  },
  {
    id: 4,
    documentName: "Procedimiento de Compras",
    version: "1.5",
    status: "Archivado",
    author: "Carlos Ruiz",
    lastModified: "2024-01-05",
    changes: "Actualización de proveedores",
    fileSize: "1.7 MB",
    downloads: 34
  },
  {
    id: 5,
    documentName: "Instrucción de Trabajo - Limpieza",
    version: "1.2",
    status: "Borrador",
    author: "Ana López",
    lastModified: "2024-01-14",
    changes: "En revisión por el supervisor",
    fileSize: "0.9 MB",
    downloads: 12
  }
];

// Simulación de usuario administrador
const isAdmin = true;

// Simulación de versiones pendientes de aprobación
const versionesPendientes = [
  {
    id: 101,
    documentName: "Manual de Calidad",
    version: "3.3",
    author: "María González",
    lastModified: "2024-06-10",
    changes: "Actualización de políticas de calidad.",
    estado: "pendiente",
    comentario: ""
  },
  {
    id: 102,
    documentName: "Procedimiento de Compras",
    version: "2.1",
    author: "Carlos Ruiz",
    lastModified: "2024-06-09",
    changes: "Nuevo flujo de aprobación de compras.",
    estado: "pendiente",
    comentario: ""
  }
];

export default function ControlVersionesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedDocument, setSelectedDocument] = useState<string>("todos");
  const [selectedDocumentForHistory, setSelectedDocumentForHistory] = useState<string | null>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [diffContent, setDiffContent] = useState<{oldVersion: any, newVersion: any} | null>(null);
  const [showDownload, setShowDownload] = useState(false);
  const [downloadContent, setDownloadContent] = useState<string>("");
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [historyVersion, setHistoryVersion] = useState<any>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editVersion, setEditVersion] = useState<any>(null);
  const [pendientes, setPendientes] = useState(versionesPendientes);
  const [modalPendiente, setModalPendiente] = useState(null);
  const [comentario, setComentario] = useState("");
  const [diffContentPendiente, setDiffContentPendiente] = useState<{oldVersion: string, newVersion: string} | null>(null);

  // Simulación de contenido de documento por versión (en la vida real, esto vendría de la base de datos)
  const documentContents: Record<string, Record<string, string>> = {
    "Manual de Calidad": {
      "3.2": "Sección 1: Nueva política de calidad\nSección 2: Procedimientos actualizados\nSección 3: Auditoría interna\n",
      "3.1": "Sección 1: Política de calidad\nSección 2: Procedimientos\nSección 3: Auditoría interna\n"
    },
    "Procedimiento de Compras": {
      "2.0": "Paso 1: Solicitud de compra\nPaso 2: Evaluación de proveedores\nPaso 3: Aprobación\n",
      "1.5": "Paso 1: Solicitud de compra\nPaso 2: Evaluación de proveedores\n"
    },
    "Instrucción de Trabajo - Limpieza": {
      "1.2": "1. Barrer\n2. Trapear\n3. Desinfectar\n",
      "1.1": "1. Barrer\n2. Trapear\n"
    }
  };

  const handleShowDiff = () => {
    if (!selectedDocumentForHistory) return;
    const history = getDocumentHistory(selectedDocumentForHistory);
    if (history.length < 2) return;
    const newVersion = history[0];
    const oldVersion = history[1];
    const docName = newVersion.documentName;
    const newContent = documentContents[docName]?.[newVersion.version] || "Sin contenido disponible";
    const oldContent = documentContents[docName]?.[oldVersion.version] || "Sin contenido disponible";
    setDiffContent({ oldVersion: oldContent, newVersion: newContent });
    setShowDiff(true);
  };

  const handleDownload = (version: any) => {
    const docName = version.documentName;
    const content = documentContents[docName]?.[version.version] || "Sin contenido disponible";
    setDownloadContent(content);
    setShowDownload(true);
  };

  const handleShowVersionHistory = (version: any) => {
    setHistoryVersion(version);
    setShowVersionHistory(true);
  };

  const handleEdit = (version: any) => {
    setEditVersion(version);
    setShowEdit(true);
  };

  // Abrir modal de diff y comentario
  const handleVerCambiosPendiente = (pendiente) => {
    const docName = pendiente.documentName;
    const newContent = documentContents[docName]?.[pendiente.version] || "Sin contenido disponible";
    // Buscar la versión anterior
    const versiones = Object.keys(documentContents[docName] || {}).sort().reverse();
    const idx = versiones.indexOf(pendiente.version);
    const prevVersion = versiones[idx + 1] || versiones[1];
    const oldContent = documentContents[docName]?.[prevVersion] || "Sin contenido disponible";
    setDiffContentPendiente({ oldVersion: oldContent, newVersion: newContent });
    setComentario("");
    setModalPendiente(pendiente);
  };

  // Aprobar o rechazar versión (simulado)
  const handleAprobar = () => {
    setPendientes(pendientes.map(p => p.id === modalPendiente.id ? { ...p, estado: "aprobado", comentario } : p));
    setModalPendiente(null);
  };
  const handleRechazar = () => {
    setPendientes(pendientes.map(p => p.id === modalPendiente.id ? { ...p, estado: "rechazado", comentario } : p));
    setModalPendiente(null);
  };

  const filteredVersions = documentVersions.filter(version => {
    const matchesSearch = version.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || version.status.toLowerCase() === statusFilter;
    const matchesDocument = selectedDocument === "todos" || 
                           version.documentName.toLowerCase().includes(selectedDocument.toLowerCase());
    return matchesSearch && matchesStatus && matchesDocument;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Activo":
        return <Badge variant="default" className="bg-green-500">Activo</Badge>;
      case "Archivado":
        return <Badge variant="secondary">Archivado</Badge>;
      case "Borrador":
        return <Badge variant="outline">Borrador</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDocumentHistory = (documentName: string) => {
    return documentVersions
      .filter(version => version.documentName === documentName)
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
  };

  const openHistoryDialog = (documentName: string) => {
    setSelectedDocumentForHistory(documentName);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      {isAdmin && (
        <Card className="mb-6 border-2 border-blue-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Cambios pendientes de aprobación <Badge variant="outline">{pendientes.filter(p => p.estado === "pendiente").length}</Badge></CardTitle>
            <CardDescription>Como administrador, puedes aprobar o rechazar los cambios propuestos antes de que entren en vigor.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Versión</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">No hay cambios pendientes.</TableCell>
                  </TableRow>
                ) : (
                  pendientes.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.documentName}</TableCell>
                      <TableCell>{p.version}</TableCell>
                      <TableCell>{p.author}</TableCell>
                      <TableCell>{p.lastModified}</TableCell>
                      <TableCell>
                        {p.estado === "pendiente" && <Badge variant="secondary">Pendiente</Badge>}
                        {p.estado === "aprobado" && <Badge variant="default" className="bg-green-500">Aprobado</Badge>}
                        {p.estado === "rechazado" && <Badge variant="destructive">Rechazado</Badge>}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleVerCambiosPendiente(p)} disabled={p.estado !== "pendiente"}>Ver cambios</Button>
                        <Button variant="success" size="sm" className="ml-2" onClick={() => { setModalPendiente(p); setComentario(""); }} disabled={p.estado !== "pendiente"}>Aprobar</Button>
                        <Button variant="destructive" size="sm" className="ml-2" onClick={() => { setModalPendiente(p); setComentario(""); }} disabled={p.estado !== "pendiente"}>Rechazar</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Modal para ver cambios y aprobar/rechazar con comentario */}
      <Dialog open={!!modalPendiente} onOpenChange={v => { if (!v) setModalPendiente(null); }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Revisión de Cambios</DialogTitle>
            <DialogDescription>
              Comparación de la versión propuesta con la anterior. Escribe un comentario antes de aprobar o rechazar.
            </DialogDescription>
          </DialogHeader>
          {modalPendiente && diffContentPendiente && (
            <>
              <div className="mb-4">
                <DiffEditor
                  height="250px"
                  language="markdown"
                  original={diffContentPendiente.oldVersion}
                  modified={diffContentPendiente.newVersion}
                  theme="vs-dark"
                  options={{ readOnly: true }}
                />
              </div>
              <Input
                placeholder="Comentario (opcional)"
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                className="mb-2"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="success" onClick={handleAprobar}>Aprobar</Button>
                <Button variant="destructive" onClick={handleRechazar}>Rechazar</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Control de Versiones</h1>
          <p className="text-muted-foreground">
            Gestiona y controla las versiones de todos los documentos del sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Subir Nueva Versión
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Documento
          </Button>
        </div>
      </div>

      <Tabs defaultValue="versiones" className="space-y-4">
        <TabsList>
          <TabsTrigger value="versiones">Versiones de Documentos</TabsTrigger>
          <TabsTrigger value="historial">Historial de Cambios</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="versiones" className="space-y-4">
          {/* Filtros y búsqueda */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros y Búsqueda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar documento o autor</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="archivado">Archivado</SelectItem>
                      <SelectItem value="borrador">Borrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document">Documento específico</Label>
                  <Select value={selectedDocument || "todos"} onValueChange={setSelectedDocument}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los documentos</SelectItem>
                      <SelectItem value="manual-calidad">Manual de Calidad</SelectItem>
                      <SelectItem value="procedimiento-compras">Procedimiento de Compras</SelectItem>
                      <SelectItem value="instruccion-limpieza">Instrucción de Trabajo - Limpieza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de versiones */}
          <Card>
            <CardHeader>
              <CardTitle>Versiones de Documentos</CardTitle>
              <CardDescription>
                Lista de todas las versiones de documentos con su historial de cambios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Versión</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Última Modificación</TableHead>
                    <TableHead>Cambios</TableHead>
                    <TableHead>Tamaño</TableHead>
                    <TableHead>Descargas</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVersions.map((version) => (
                    <TableRow key={version.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {version.documentName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{version.version}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(version.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {version.author}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {version.lastModified}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {version.changes}
                      </TableCell>
                      <TableCell>{version.fileSize}</TableCell>
                      <TableCell>{version.downloads}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openHistoryDialog(version.documentName)}
                            title="Ver historial de versiones"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Descargar" onClick={() => handleDownload(version)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Ver historial de cambios" onClick={() => handleShowVersionHistory(version)}>
                            <History className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Editar" onClick={() => handleEdit(version)}>
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

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Cambios</CardTitle>
              <CardDescription>
                Registro detallado de todos los cambios realizados en los documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentVersions.slice(0, 10).map((version) => (
                  <div key={version.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{version.documentName} v{version.version}</p>
                        {getStatusBadge(version.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{version.changes}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Por: {version.author}</span>
                        <span>•</span>
                        <span>{version.lastModified}</span>
                        <span>•</span>
                        <span>{version.downloads} descargas</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Versiones</CardTitle>
                <CardDescription>
                  Configura cómo se manejan las versiones de documentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="versioning">Sistema de versionado</Label>
                  <Select defaultValue="semantic">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semantic">Versionado semántico (1.0, 1.1, 2.0)</SelectItem>
                      <SelectItem value="numeric">Versionado numérico (1, 2, 3)</SelectItem>
                      <SelectItem value="date">Versionado por fecha (2024-01-15)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention">Retención de versiones</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Mantener 5 versiones</SelectItem>
                      <SelectItem value="10">Mantener 10 versiones</SelectItem>
                      <SelectItem value="20">Mantener 20 versiones</SelectItem>
                      <SelectItem value="all">Mantener todas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approval">Aprobación requerida</Label>
                  <Select defaultValue="major">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin aprobación</SelectItem>
                      <SelectItem value="minor">Solo cambios menores</SelectItem>
                      <SelectItem value="major">Cambios mayores y menores</SelectItem>
                      <SelectItem value="all">Todos los cambios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Guardar Configuración</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>
                  Configura las notificaciones relacionadas con versiones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="new-version" defaultChecked />
                  <Label htmlFor="new-version">Notificar nueva versión</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="version-approval" defaultChecked />
                  <Label htmlFor="version-approval">Solicitar aprobación</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="version-archive" />
                  <Label htmlFor="version-archive">Archivar versiones antiguas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="version-backup" defaultChecked />
                  <Label htmlFor="version-backup">Crear respaldo automático</Label>
                </div>
                <Button className="w-full">Guardar Notificaciones</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para mostrar historial de versiones */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Historial de Versiones: {selectedDocumentForHistory}
            </DialogTitle>
            <DialogDescription>
              Todas las versiones del documento ordenadas cronológicamente
            </DialogDescription>
          </DialogHeader>
          
          {selectedDocumentForHistory && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {getDocumentHistory(selectedDocumentForHistory).length} versiones
                  </Badge>
                  <Badge variant="default" className="bg-green-500">
                    Versión actual: {getDocumentHistory(selectedDocumentForHistory)[0]?.version}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar todas las versiones
                </Button>
              </div>

              <div className="space-y-3">
                {getDocumentHistory(selectedDocumentForHistory).map((version, index) => (
                  <Card key={version.id} className={`transition-all hover:shadow-md ${
                    index === 0 ? 'ring-2 ring-green-500' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono">
                                v{version.version}
                              </Badge>
                              {index === 0 && (
                                <Badge variant="default" className="bg-green-500">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Actual
                                </Badge>
                              )}
                              {getStatusBadge(version.status)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {version.fileSize} • {version.downloads} descargas
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Cambios realizados:</p>
                            <p className="text-sm text-muted-foreground">{version.changes}</p>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {version.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {version.lastModified}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="ghost" size="sm" title="Ver documento">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Descargar">
                            <Download className="h-4 w-4" />
                          </Button>
                          {index !== 0 && (
                            <Button variant="ghost" size="sm" title="Restaurar esta versión">
                              <ArrowLeft className="h-4 w-4" />
                            </Button>
                          )}
                          {index === 0 && (
                            <Button variant="ghost" size="sm" title="Comparar con versión anterior">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Mostrando {getDocumentHistory(selectedDocumentForHistory).length} versiones
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShowDiff} disabled={getDocumentHistory(selectedDocumentForHistory).length < 2}>
                    <History className="mr-2 h-4 w-4" />
                    Ver diferencias
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar historial
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para mostrar diferencias entre versiones */}
      <Dialog open={showDiff} onOpenChange={setShowDiff}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Diferencias entre versiones
            </DialogTitle>
            <DialogDescription>
              Comparación estructurada entre la versión actual y la anterior
            </DialogDescription>
          </DialogHeader>
          {diffContent ? (
            <div className="h-96">
              <DiffEditor
                height="100%"
                language="markdown"
                original={diffContent.oldVersion}
                modified={diffContent.newVersion}
                theme="vs-dark"
                options={{ readOnly: true }}
              />
            </div>
          ) : (
            <p>No hay diferencias para mostrar.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de descarga */}
      <Dialog open={showDownload} onOpenChange={setShowDownload}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Descargar versión</DialogTitle>
            <DialogDescription>Simulación de descarga del archivo de la versión seleccionada.</DialogDescription>
          </DialogHeader>
          <pre className="bg-muted p-4 rounded text-xs overflow-x-auto max-h-60">{downloadContent}</pre>
          <Button onClick={() => {
            const blob = new Blob([downloadContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'documento.txt';
            a.click();
            URL.revokeObjectURL(url);
          }}>Descargar archivo</Button>
        </DialogContent>
      </Dialog>

      {/* Modal de historial de cambios de la versión */}
      <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Historial de cambios de la versión</DialogTitle>
            <DialogDescription>Detalles de los cambios realizados en esta versión.</DialogDescription>
          </DialogHeader>
          {historyVersion && (
            <div className="space-y-2">
              <div><b>Documento:</b> {historyVersion.documentName}</div>
              <div><b>Versión:</b> {historyVersion.version}</div>
              <div><b>Autor:</b> {historyVersion.author}</div>
              <div><b>Fecha:</b> {historyVersion.lastModified}</div>
              <div><b>Estado:</b> {getStatusBadge(historyVersion.status)}</div>
              <div><b>Cambios:</b> <span className="text-muted-foreground">{historyVersion.changes}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de edición de metadatos */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar metadatos de la versión</DialogTitle>
            <DialogDescription>Edita el nombre, cambios y estado de la versión (simulado).</DialogDescription>
          </DialogHeader>
          {editVersion && (
            <form className="space-y-4">
              <div>
                <Label>Documento</Label>
                <Input value={editVersion.documentName} readOnly />
              </div>
              <div>
                <Label>Versión</Label>
                <Input value={editVersion.version} readOnly />
              </div>
              <div>
                <Label>Autor</Label>
                <Input value={editVersion.author} readOnly />
              </div>
              <div>
                <Label>Cambios</Label>
                <Input defaultValue={editVersion.changes} />
              </div>
              <div>
                <Label>Estado</Label>
                <Select defaultValue={editVersion.status.toLowerCase()}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="archivado">Archivado</SelectItem>
                    <SelectItem value="borrador">Borrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled>Guardar cambios (simulado)</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 