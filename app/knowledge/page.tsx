"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Star, 
  Heart, 
  MessageCircle,
  Filter,
  Tag,
  Calendar,
  User,
  FileText,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Download
} from "lucide-react";

const articulosData = [
  {
    id: 1,
    titulo: "Guía Completa de Implementación ISO 9001:2015",
    descripcion: "Paso a paso para implementar un sistema de gestión de calidad según ISO 9001:2015",
    categoria: "ISO 9001",
    autor: "María González",
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-01-20",
    vistas: 245,
    valoracion: 4.8,
    votos: 32,
    etiquetas: ["ISO 9001", "Implementación", "Calidad", "Guía"],
    contenido: "Este artículo proporciona una guía detallada para implementar ISO 9001:2015...",
    estado: "Publicado",
    tiempoLectura: "12 min"
  },
  {
    id: 2,
    titulo: "Cómo Realizar Auditorías Internas Efectivas",
    descripcion: "Metodología y mejores prácticas para auditorías internas de calidad",
    categoria: "Auditorías",
    autor: "Carlos López",
    fechaCreacion: "2024-01-10",
    fechaActualizacion: "2024-01-18",
    vistas: 189,
    valoracion: 4.6,
    votos: 28,
    etiquetas: ["Auditorías", "Metodología", "Mejores Prácticas"],
    contenido: "Las auditorías internas son fundamentales para mantener la eficacia...",
    estado: "Publicado",
    tiempoLectura: "8 min"
  },
  {
    id: 3,
    titulo: "Gestión de Riesgos en Sistemas de Calidad",
    descripcion: "Identificación, evaluación y tratamiento de riesgos según ISO 31000",
    categoria: "Gestión de Riesgos",
    autor: "Ana López",
    fechaCreacion: "2024-01-08",
    fechaActualizacion: "2024-01-15",
    vistas: 167,
    valoracion: 4.7,
    votos: 24,
    etiquetas: ["Riesgos", "ISO 31000", "Evaluación"],
    contenido: "La gestión de riesgos es un componente esencial...",
    estado: "Publicado",
    tiempoLectura: "10 min"
  },
  {
    id: 4,
    titulo: "Documentación y Control de Versiones",
    descripcion: "Mejores prácticas para el control de documentos en sistemas QMS",
    categoria: "Documentación",
    autor: "Juan Martínez",
    fechaCreacion: "2024-01-05",
    fechaActualizacion: "2024-01-12",
    vistas: 134,
    valoracion: 4.5,
    votos: 19,
    etiquetas: ["Documentación", "Control", "Versiones"],
    contenido: "El control de documentos es crítico para mantener...",
    estado: "Publicado",
    tiempoLectura: "6 min"
  },
  {
    id: 5,
    titulo: "Capacitación Efectiva del Personal",
    descripcion: "Estrategias para desarrollar programas de capacitación exitosos",
    categoria: "Capacitación",
    autor: "Pedro Sánchez",
    fechaCreacion: "2024-01-03",
    fechaActualizacion: "2024-01-10",
    vistas: 201,
    valoracion: 4.9,
    votos: 41,
    etiquetas: ["Capacitación", "Personal", "Desarrollo"],
    contenido: "La capacitación del personal es fundamental...",
    estado: "Publicado",
    tiempoLectura: "9 min"
  }
];

const faqData = [
  {
    id: 1,
    pregunta: "¿Cómo puedo obtener la certificación ISO 9001?",
    respuesta: "Para obtener la certificación ISO 9001, debe implementar un sistema de gestión de calidad que cumpla con los requisitos de la norma, realizar una auditoría interna, contratar un organismo certificador acreditado y pasar la auditoría de certificación.",
    categoria: "Certificación",
    valoracion: 4.8,
    votos: 45,
    fechaActualizacion: "2024-01-15"
  },
  {
    id: 2,
    pregunta: "¿Con qué frecuencia debo realizar auditorías internas?",
    respuesta: "Las auditorías internas deben realizarse al menos una vez al año, pero la frecuencia puede variar según el riesgo, la importancia del proceso y los cambios en la organización. Se recomienda un programa de auditoría planificado.",
    categoria: "Auditorías",
    valoracion: 4.6,
    votos: 32,
    fechaActualizacion: "2024-01-12"
  },
  {
    id: 3,
    pregunta: "¿Qué documentos son obligatorios en ISO 9001:2015?",
    respuesta: "ISO 9001:2015 requiere: política de calidad, objetivos de calidad, manual de calidad (opcional), procedimientos documentados para control de documentos y registros, y registros específicos como revisión por la dirección y auditorías internas.",
    categoria: "Documentación",
    valoracion: 4.7,
    votos: 38,
    fechaActualizacion: "2024-01-10"
  },
  {
    id: 4,
    pregunta: "¿Cómo identifico los procesos clave de mi organización?",
    respuesta: "Identifique los procesos que agregan valor al cliente, son críticos para el éxito de la organización, tienen alto impacto en la calidad del producto/servicio, o están sujetos a requisitos legales y reglamentarios.",
    categoria: "Procesos",
    valoracion: 4.5,
    votos: 29,
    fechaActualizacion: "2024-01-08"
  },
  {
    id: 5,
    pregunta: "¿Qué es la mejora continua y cómo implementarla?",
    respuesta: "La mejora continua es el proceso permanente de identificar oportunidades de mejora y implementar acciones para aumentar la eficacia del sistema. Use el ciclo PDCA, análisis de datos, acciones correctivas y preventivas.",
    categoria: "Mejora Continua",
    valoracion: 4.9,
    votos: 52,
    fechaActualizacion: "2024-01-05"
  }
];

const categoriasConocimiento = [
  { nombre: "ISO 9001", articulos: 12, color: "bg-blue-100 text-blue-800" },
  { nombre: "Auditorías", articulos: 8, color: "bg-green-100 text-green-800" },
  { nombre: "Gestión de Riesgos", articulos: 6, color: "bg-orange-100 text-orange-800" },
  { nombre: "Documentación", articulos: 10, color: "bg-purple-100 text-purple-800" },
  { nombre: "Capacitación", articulos: 7, color: "bg-pink-100 text-pink-800" },
  { nombre: "Mejora Continua", articulos: 5, color: "bg-indigo-100 text-indigo-800" }
];

export default function BaseConocimientoPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
  const [mostrarNuevoArticulo, setMostrarNuevoArticulo] = useState(false);
  const [vistaActual, setVistaActual] = useState("articulos");

  const articulosFiltrados = articulosData.filter(articulo => {
    const matchBusqueda = articulo.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                         articulo.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                         articulo.etiquetas.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()));
    const matchCategoria = filtroCategoria === "todas" || articulo.categoria === filtroCategoria;
    return matchBusqueda && matchCategoria;
  });

  const faqFiltradas = faqData.filter(faq => {
    const matchBusqueda = faq.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
                         faq.respuesta.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = filtroCategoria === "todas" || faq.categoria === filtroCategoria;
    return matchBusqueda && matchCategoria;
  });

  const getEstrellas = (valoracion) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(valoracion) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            Base de Conocimiento
          </h1>
          <p className="text-muted-foreground">Centro de recursos, guías y documentación para el sistema QMS.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Recursos
          </Button>
          <Dialog open={mostrarNuevoArticulo} onOpenChange={setMostrarNuevoArticulo}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Artículo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Artículo</DialogTitle>
                <DialogDescription>Agrega un nuevo artículo a la base de conocimiento</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Título del Artículo</Label>
                  <Input placeholder="Ej: Guía de Implementación ISO 14001" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriasConocimiento.map((cat) => (
                          <SelectItem key={cat.nombre} value={cat.nombre}>{cat.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Tiempo de Lectura (min)</Label>
                    <Input type="number" placeholder="10" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Breve descripción del contenido del artículo..." />
                </div>
                <div className="grid gap-2">
                  <Label>Etiquetas</Label>
                  <Input placeholder="ISO, Implementación, Calidad (separadas por comas)" />
                </div>
                <div className="grid gap-2">
                  <Label>Contenido</Label>
                  <Textarea className="min-h-[200px]" placeholder="Contenido completo del artículo..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setMostrarNuevoArticulo(false)}>Cancelar</Button>
                <Button onClick={() => setMostrarNuevoArticulo(false)}>Crear Artículo</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Búsqueda y filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar en la Base de Conocimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar artículos, preguntas frecuentes..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                {categoriasConocimiento.map((cat) => (
                  <SelectItem key={cat.nombre} value={cat.nombre}>{cat.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Categorías */}
      <Card>
        <CardHeader>
          <CardTitle>Categorías de Conocimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categoriasConocimiento.map((categoria) => (
              <Card
                key={categoria.nombre}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setFiltroCategoria(categoria.nombre)}
              >
                <CardContent className="p-4 text-center">
                  <Badge className={categoria.color}>{categoria.nombre}</Badge>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{categoria.articulos}</div>
                    <div className="text-xs text-muted-foreground">artículos</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articulos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articulos">Artículos</TabsTrigger>
          <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="populares">Más Populares</TabsTrigger>
          <TabsTrigger value="recientes">Recientes</TabsTrigger>
        </TabsList>

        <TabsContent value="articulos" className="space-y-4">
          <div className="grid gap-6">
            {articulosFiltrados.map((articulo) => (
              <Card key={articulo.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-800">{articulo.categoria}</Badge>
                        <span className="text-sm text-muted-foreground">{articulo.tiempoLectura}</span>
                      </div>
                      <CardTitle className="text-xl hover:text-blue-600 cursor-pointer" 
                                 onClick={() => setArticuloSeleccionado(articulo)}>
                        {articulo.titulo}
                      </CardTitle>
                      <CardDescription className="mt-2">{articulo.descripcion}</CardDescription>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-1">
                        {getEstrellas(articulo.valoracion)}
                        <span className="text-sm text-muted-foreground ml-1">({articulo.votos})</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{articulo.vistas} vistas</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {articulo.autor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{articulo.autor}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Actualizado: {articulo.fechaActualizacion}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setArticuloSeleccionado(articulo)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Leer
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {articulo.etiquetas.map((etiqueta, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {etiqueta}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <div className="space-y-4">
            {faqFiltradas.map((faq) => (
              <Card key={faq.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="h-5 w-5 text-blue-600" />
                        <Badge variant="outline">{faq.categoria}</Badge>
                      </div>
                      <CardTitle className="text-lg">{faq.pregunta}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      {getEstrellas(faq.valoracion)}
                      <span className="text-sm text-muted-foreground ml-1">({faq.votos})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{faq.respuesta}</p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Actualizado: {faq.fechaActualizacion}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="populares" className="space-y-4">
          <div className="grid gap-6">
            {articulosData
              .sort((a, b) => b.vistas - a.vistas)
              .slice(0, 5)
              .map((articulo, index) => (
                <Card key={articulo.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">{articulo.categoria}</Badge>
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">{articulo.vistas} vistas</span>
                        </div>
                        <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">
                          {articulo.titulo}
                        </CardTitle>
                        <CardDescription className="mt-1">{articulo.descripcion}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {getEstrellas(articulo.valoracion)}
                        </div>
                        <div className="text-sm text-muted-foreground">{articulo.valoracion}/5</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recientes" className="space-y-4">
          <div className="grid gap-6">
            {articulosData
              .sort((a, b) => new Date(b.fechaActualizacion).getTime() - new Date(a.fechaActualizacion).getTime())
              .slice(0, 5)
              .map((articulo) => (
                <Card key={articulo.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-800 rounded-full">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">{articulo.categoria}</Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Reciente</Badge>
                        </div>
                        <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">
                          {articulo.titulo}
                        </CardTitle>
                        <CardDescription className="mt-1">{articulo.descripcion}</CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Por {articulo.autor}</span>
                          <span>Actualizado: {articulo.fechaActualizacion}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de artículo */}
      {articuloSeleccionado && (
        <Dialog open={!!articuloSeleccionado} onOpenChange={() => setArticuloSeleccionado(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800">{articuloSeleccionado.categoria}</Badge>
                <span className="text-sm text-muted-foreground">{articuloSeleccionado.tiempoLectura}</span>
              </div>
              <DialogTitle className="text-2xl">{articuloSeleccionado.titulo}</DialogTitle>
              <DialogDescription className="text-base">
                {articuloSeleccionado.descripcion}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-y">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {articuloSeleccionado.autor.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{articuloSeleccionado.autor}</div>
                    <div className="text-sm text-muted-foreground">
                      Creado: {articuloSeleccionado.fechaCreacion} • Actualizado: {articuloSeleccionado.fechaActualizacion}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {getEstrellas(articuloSeleccionado.valoracion)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({articuloSeleccionado.votos} votos)
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{articuloSeleccionado.vistas} vistas</div>
                </div>
              </div>
              <div className="prose max-w-none">
                <p>{articuloSeleccionado.contenido}</p>
                <p>Este es el contenido completo del artículo. En una implementación real, aquí se mostraría el contenido completo en formato markdown o HTML.</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-4 border-t">
                {articuloSeleccionado.etiquetas.map((etiqueta, idx) => (
                  <Badge key={idx} variant="outline">
                    {etiqueta}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setArticuloSeleccionado(null)}>
                Cerrar
              </Button>
              <Button>
                <Heart className="mr-2 h-4 w-4" />
                Me Gusta
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 