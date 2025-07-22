"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Tag,
  Send,
  Paperclip,
  Star,
  TrendingUp,
  Users,
  FileText,
  Zap,
  Target
} from "lucide-react";

const ticketsData = [
  {
    id: "TK-001",
    titulo: "Error en generación de reportes ISO 9001",
    descripcion: "El sistema no genera correctamente los reportes de cumplimiento ISO 9001, muestra datos incorrectos en la sección de cláusulas.",
    categoria: "Bug",
    prioridad: "Alta",
    estado: "Abierto",
    solicitante: "María González",
    asignado: "Carlos López",
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-01-16",
    fechaVencimiento: "2024-01-18",
    comentarios: 3,
    etiquetas: ["reportes", "iso9001", "bug"],
    departamento: "Calidad"
  },
  {
    id: "TK-002", 
    titulo: "Solicitud de nueva funcionalidad: Notificaciones push",
    descripcion: "Necesitamos implementar notificaciones push para alertar sobre vencimientos de certificaciones y auditorías próximas.",
    categoria: "Mejora",
    prioridad: "Media",
    estado: "En Progreso",
    solicitante: "Ana López",
    asignado: "Juan Martínez",
    fechaCreacion: "2024-01-12",
    fechaActualizacion: "2024-01-15",
    fechaVencimiento: "2024-01-25",
    comentarios: 5,
    etiquetas: ["notificaciones", "mejora", "certificaciones"],
    departamento: "Desarrollo"
  },
  {
    id: "TK-003",
    titulo: "Problema con carga de evidencias",
    descripcion: "No puedo cargar archivos de evidencia mayores a 5MB. El sistema muestra error de timeout.",
    categoria: "Soporte",
    prioridad: "Media",
    estado: "Resuelto",
    solicitante: "Pedro Sánchez",
    asignado: "Ana López",
    fechaCreacion: "2024-01-10",
    fechaActualizacion: "2024-01-14",
    fechaVencimiento: "2024-01-20",
    comentarios: 7,
    etiquetas: ["evidencias", "archivos", "timeout"],
    departamento: "Auditorías"
  },
  {
    id: "TK-004",
    titulo: "Capacitación sobre nuevo módulo de evaluaciones",
    descripcion: "El equipo de RRHH necesita capacitación sobre el uso del nuevo módulo de evaluaciones de personal.",
    categoria: "Capacitación",
    prioridad: "Baja",
    estado: "Pendiente",
    solicitante: "Carmen Ruiz",
    asignado: "María González",
    fechaCreacion: "2024-01-08",
    fechaActualizacion: "2024-01-10",
    fechaVencimiento: "2024-01-30",
    comentarios: 2,
    etiquetas: ["capacitacion", "evaluaciones", "rrhh"],
    departamento: "Recursos Humanos"
  },
  {
    id: "TK-005",
    titulo: "Integración con sistema ERP",
    descripcion: "Necesitamos integrar el sistema QMS con nuestro ERP para sincronizar datos de proveedores y compras.",
    categoria: "Integración",
    prioridad: "Alta",
    estado: "En Revisión",
    solicitante: "Luis García",
    asignado: "Carlos López",
    fechaCreacion: "2024-01-05",
    fechaActualizacion: "2024-01-14",
    fechaVencimiento: "2024-02-05",
    comentarios: 12,
    etiquetas: ["integracion", "erp", "proveedores"],
    departamento: "IT"
  }
];

const comentariosData = {
  "TK-001": [
    {
      id: 1,
      autor: "Carlos López",
      fecha: "2024-01-16 10:30",
      contenido: "He identificado el problema. Parece ser un error en la consulta SQL que obtiene los datos de las cláusulas. Trabajando en la corrección.",
      tipo: "comentario"
    },
    {
      id: 2,
      autor: "María González", 
      fecha: "2024-01-16 14:15",
      contenido: "Gracias Carlos. ¿Tienes una estimación de cuándo estará listo? Necesitamos el reporte para la auditoría del viernes.",
      tipo: "comentario"
    },
    {
      id: 3,
      autor: "Carlos López",
      fecha: "2024-01-16 16:45",
      contenido: "Debería estar resuelto mañana por la mañana. Te notificaré cuando esté listo para pruebas.",
      tipo: "comentario"
    }
  ]
};

const estadisticasTickets = {
  total: 15,
  abiertos: 4,
  enProgreso: 3,
  resueltos: 6,
  pendientes: 2,
  vencidos: 1,
  tiempoPromedioResolucion: "3.2 días",
  satisfaccionCliente: 4.6
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState(ticketsData);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState("todas");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  const [mostrarNuevoTicket, setMostrarNuevoTicket] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState("");

  // Formulario nuevo ticket
  const [nuevoTicket, setNuevoTicket] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    prioridad: "Media",
    departamento: "",
    etiquetas: ""
  });

  const ticketsFiltrados = tickets.filter(ticket => {
    const matchBusqueda = ticket.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                         ticket.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === "todos" || ticket.estado === filtroEstado;
    const matchPrioridad = filtroPrioridad === "todas" || ticket.prioridad === filtroPrioridad;
    const matchCategoria = filtroCategoria === "todas" || ticket.categoria === filtroCategoria;
    
    return matchBusqueda && matchEstado && matchPrioridad && matchCategoria;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Abierto":
        return <Badge variant="default" className="bg-blue-500"><Clock className="w-3 h-3 mr-1" />Abierto</Badge>;
      case "En Progreso":
        return <Badge variant="secondary" className="bg-yellow-500"><Target className="w-3 h-3 mr-1" />En Progreso</Badge>;
      case "Resuelto":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Resuelto</Badge>;
      case "Pendiente":
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>;
      case "En Revisión":
        return <Badge variant="secondary"><Eye className="w-3 h-3 mr-1" />En Revisión</Badge>;
      case "Cerrado":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Cerrado</Badge>;
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

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case "Bug": return "bg-red-100 text-red-800";
      case "Mejora": return "bg-blue-100 text-blue-800";
      case "Soporte": return "bg-green-100 text-green-800";
      case "Capacitación": return "bg-purple-100 text-purple-800";
      case "Integración": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const crearTicket = () => {
    const nuevo = {
      ...nuevoTicket,
      id: `TK-${String(tickets.length + 1).padStart(3, '0')}`,
      estado: "Abierto",
      solicitante: "Usuario Actual",
      asignado: "Por asignar",
      fechaCreacion: new Date().toISOString().split('T')[0],
      fechaActualizacion: new Date().toISOString().split('T')[0],
      fechaVencimiento: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
      comentarios: 0,
      etiquetas: nuevoTicket.etiquetas.split(',').map(t => t.trim()).filter(t => t)
    };
    
    setTickets([nuevo, ...tickets]);
    setNuevoTicket({
      titulo: "",
      descripcion: "",
      categoria: "",
      prioridad: "Media",
      departamento: "",
      etiquetas: ""
    });
    setMostrarNuevoTicket(false);
  };

  const agregarComentario = () => {
    if (!nuevoComentario.trim()) return;
    
    // Aquí se agregaría el comentario al ticket
    setNuevoComentario("");
    alert("Comentario agregado exitosamente");
  };

  const diasVencimiento = (fechaVencimiento) => {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));
    return diferencia;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            Sistema de Tickets
          </h1>
          <p className="text-muted-foreground">Gestiona solicitudes de soporte, bugs, mejoras y capacitación del sistema QMS.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Exportar Tickets
          </Button>
          <Dialog open={mostrarNuevoTicket} onOpenChange={setMostrarNuevoTicket}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Ticket</DialogTitle>
                <DialogDescription>Describe tu solicitud o problema para recibir asistencia</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Título del Ticket</Label>
                  <Input
                    value={nuevoTicket.titulo}
                    onChange={(e) => setNuevoTicket({...nuevoTicket, titulo: e.target.value})}
                    placeholder="Resumen breve del problema o solicitud"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label>Categoría</Label>
                    <Select value={nuevoTicket.categoria} onValueChange={(value) => setNuevoTicket({...nuevoTicket, categoria: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bug">Bug</SelectItem>
                        <SelectItem value="Mejora">Mejora</SelectItem>
                        <SelectItem value="Soporte">Soporte</SelectItem>
                        <SelectItem value="Capacitación">Capacitación</SelectItem>
                        <SelectItem value="Integración">Integración</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Prioridad</Label>
                    <Select value={nuevoTicket.prioridad} onValueChange={(value) => setNuevoTicket({...nuevoTicket, prioridad: value})}>
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
                  <div className="grid gap-2">
                    <Label>Departamento</Label>
                    <Select value={nuevoTicket.departamento} onValueChange={(value) => setNuevoTicket({...nuevoTicket, departamento: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Calidad">Calidad</SelectItem>
                        <SelectItem value="Auditorías">Auditorías</SelectItem>
                        <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Descripción Detallada</Label>
                  <Textarea
                    value={nuevoTicket.descripcion}
                    onChange={(e) => setNuevoTicket({...nuevoTicket, descripcion: e.target.value})}
                    placeholder="Describe el problema o solicitud con el mayor detalle posible..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Etiquetas</Label>
                  <Input
                    value={nuevoTicket.etiquetas}
                    onChange={(e) => setNuevoTicket({...nuevoTicket, etiquetas: e.target.value})}
                    placeholder="etiqueta1, etiqueta2, etiqueta3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarNuevoTicket(false)}>Cancelar</Button>
                <Button onClick={crearTicket}>Crear Ticket</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasTickets.total}</div>
            <p className="text-xs text-muted-foreground">tickets registrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abiertos</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estadisticasTickets.abiertos}</div>
            <p className="text-xs text-muted-foreground">requieren atención</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Target className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{estadisticasTickets.enProgreso}</div>
            <p className="text-xs text-muted-foreground">siendo trabajados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasTickets.tiempoPromedioResolucion}</div>
            <p className="text-xs text-muted-foreground">resolución</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tickets..."
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
                <SelectItem value="Abierto">Abierto</SelectItem>
                <SelectItem value="En Progreso">En Progreso</SelectItem>
                <SelectItem value="Resuelto">Resuelto</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Revisión">En Revisión</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroPrioridad} onValueChange={setFiltroPrioridad}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las prioridades</SelectItem>
                <SelectItem value="Crítica">Crítica</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Baja">Baja</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                <SelectItem value="Bug">Bug</SelectItem>
                <SelectItem value="Mejora">Mejora</SelectItem>
                <SelectItem value="Soporte">Soporte</SelectItem>
                <SelectItem value="Capacitación">Capacitación</SelectItem>
                <SelectItem value="Integración">Integración</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <Zap className="mr-2 h-4 w-4" />
              Mis Tickets
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Tickets</CardTitle>
          <CardDescription>{ticketsFiltrados.length} tickets encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Asignado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Comentarios</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ticketsFiltrados.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.id}</div>
                      <div className="text-sm font-medium hover:text-blue-600 cursor-pointer" 
                           onClick={() => setTicketSeleccionado(ticket)}>
                        {ticket.titulo}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Por {ticket.solicitante} • {ticket.departamento}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoriaColor(ticket.categoria)}>
                      {ticket.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>{getEstadoBadge(ticket.estado)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getPrioridadColor(ticket.prioridad)}`}>
                      {ticket.prioridad}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {ticket.asignado.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{ticket.asignado}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {ticket.fechaVencimiento}
                      <div className={`text-xs ${diasVencimiento(ticket.fechaVencimiento) < 0 ? 'text-red-600' : 
                        diasVencimiento(ticket.fechaVencimiento) <= 2 ? 'text-orange-600' : 'text-muted-foreground'}`}>
                        {diasVencimiento(ticket.fechaVencimiento) < 0 
                          ? `Vencido hace ${Math.abs(diasVencimiento(ticket.fechaVencimiento))} días`
                          : `${diasVencimiento(ticket.fechaVencimiento)} días restantes`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {ticket.comentarios}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setTicketSeleccionado(ticket)}>
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

      {/* Modal de detalles del ticket */}
      {ticketSeleccionado && (
        <Dialog open={!!ticketSeleccionado} onOpenChange={() => setTicketSeleccionado(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getCategoriaColor(ticketSeleccionado.categoria)}>
                  {ticketSeleccionado.categoria}
                </Badge>
                {getEstadoBadge(ticketSeleccionado.estado)}
                <span className={`font-medium ${getPrioridadColor(ticketSeleccionado.prioridad)}`}>
                  {ticketSeleccionado.prioridad}
                </span>
              </div>
              <DialogTitle className="text-xl">{ticketSeleccionado.id} - {ticketSeleccionado.titulo}</DialogTitle>
              <DialogDescription>
                Creado por {ticketSeleccionado.solicitante} el {ticketSeleccionado.fechaCreacion}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Información del Ticket</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Asignado a:</span>
                      <span>{ticketSeleccionado.asignado}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departamento:</span>
                      <span>{ticketSeleccionado.departamento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha vencimiento:</span>
                      <span>{ticketSeleccionado.fechaVencimiento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última actualización:</span>
                      <span>{ticketSeleccionado.fechaActualizacion}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Etiquetas</h4>
                  <div className="flex flex-wrap gap-1">
                    {ticketSeleccionado.etiquetas.map((etiqueta, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {etiqueta}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Descripción</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  {ticketSeleccionado.descripcion}
                </p>
              </div>

              {/* Comentarios */}
              <div>
                <h4 className="font-medium mb-4">Comentarios ({ticketSeleccionado.comentarios})</h4>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {comentariosData[ticketSeleccionado.id]?.map((comentario) => (
                    <div key={comentario.id} className="flex gap-3 p-3 bg-muted rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {comentario.autor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comentario.autor}</span>
                          <span className="text-xs text-muted-foreground">{comentario.fecha}</span>
                        </div>
                        <p className="text-sm">{comentario.contenido}</p>
                      </div>
                    </div>
                  )) || (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No hay comentarios aún
                    </p>
                  )}
                </div>

                {/* Agregar comentario */}
                <div className="mt-4 space-y-3">
                  <Textarea
                    placeholder="Agregar un comentario..."
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Adjuntar archivo
                    </Button>
                    <Button size="sm" onClick={agregarComentario}>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar comentario
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setTicketSeleccionado(null)}>
                Cerrar
              </Button>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button>
                Cambiar Estado
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 