"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock, User, FileText, Search, Plus, Eye, BarChart3, Star } from "lucide-react";

const evaluacionesData = [
  {
    id: 1,
    titulo: "Evaluación ISO 9001 - Módulo 1",
    curso: "Introducción a ISO 9001",
    empleado: "María González",
    fechaRealizacion: "2024-03-15",
    puntuacion: 85,
    estado: "Aprobado",
    intentos: 1,
    tiempoEmpleado: "45 min",
    respuestasCorrectas: 17,
    totalPreguntas: 20
  },
  {
    id: 2,
    titulo: "Evaluación de Riesgos",
    curso: "Gestión de Riesgos",
    empleado: "Carlos Ruiz",
    fechaRealizacion: "2024-03-10",
    puntuacion: 92,
    estado: "Aprobado",
    intentos: 1,
    tiempoEmpleado: "38 min",
    respuestasCorrectas: 23,
    totalPreguntas: 25
  },
  {
    id: 3,
    titulo: "Evaluación Procedimientos",
    curso: "Procedimientos de Limpieza",
    empleado: "Ana López",
    fechaRealizacion: "2024-03-08",
    puntuacion: 65,
    estado: "Reprobado",
    intentos: 2,
    tiempoEmpleado: "52 min",
    respuestasCorrectas: 13,
    totalPreguntas: 20
  },
  {
    id: 4,
    titulo: "Evaluación Liderazgo",
    curso: "Liderazgo y Calidad",
    empleado: "Juan Pérez",
    fechaRealizacion: "2024-03-05",
    puntuacion: 78,
    estado: "Aprobado",
    intentos: 1,
    tiempoEmpleado: "42 min",
    respuestasCorrectas: 19,
    totalPreguntas: 25
  }
];

const plantillasEvaluacion = [
  {
    id: 1,
    nombre: "Evaluación ISO 9001 Básica",
    preguntas: 20,
    tiempoLimite: "60 min",
    puntuacionMinima: 70,
    categoria: "ISO 9001",
    estado: "Activa"
  },
  {
    id: 2,
    nombre: "Evaluación de Seguridad",
    preguntas: 25,
    tiempoLimite: "45 min",
    puntuacionMinima: 80,
    categoria: "Seguridad",
    estado: "Activa"
  },
  {
    id: 3,
    nombre: "Evaluación de Liderazgo",
    preguntas: 15,
    tiempoLimite: "30 min",
    puntuacionMinima: 75,
    categoria: "Liderazgo",
    estado: "Borrador"
  }
];

export default function EvaluacionesPage() {
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroCurso, setFiltroCurso] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const evaluacionesFiltradas = evaluacionesData.filter(evaluacion => {
    const matchEstado = filtroEstado === "todos" || evaluacion.estado === filtroEstado;
    const matchCurso = filtroCurso === "todos" || evaluacion.curso === filtroCurso;
    const matchBusqueda = evaluacion.empleado.toLowerCase().includes(busqueda.toLowerCase()) ||
                         evaluacion.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchCurso && matchBusqueda;
  });

  const getEstadoBadge = (estado, puntuacion) => {
    switch (estado) {
      case "Aprobado":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" />Aprobado</Badge>;
      case "Reprobado":
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Reprobado</Badge>;
      case "En Progreso":
        return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />En Progreso</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  const getPuntuacionColor = (puntuacion) => {
    if (puntuacion >= 80) return "text-green-600";
    if (puntuacion >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const promedioGeneral = Math.round(evaluacionesData.reduce((acc, evaluacion) => acc + evaluacion.puntuacion, 0) / evaluacionesData.length);

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Evaluaciones</h1>
          <p className="text-muted-foreground">Gestiona evaluaciones de capacitación y monitorea el desempeño.</p>
        </div>
        <Button onClick={() => setMostrarFormulario(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Evaluación
        </Button>
      </div>

      {/* Métricas generales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evaluaciones</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evaluacionesData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evaluacionesData.filter(e => e.estado === "Aprobado").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promedioGeneral}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Aprobación</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((evaluacionesData.filter(e => e.estado === "Aprobado").length / evaluacionesData.length) * 100)}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="resultados" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resultados">Resultados</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="resultados" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar evaluación..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="Aprobado">Aprobado</SelectItem>
                    <SelectItem value="Reprobado">Reprobado</SelectItem>
                    <SelectItem value="En Progreso">En Progreso</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroCurso} onValueChange={setFiltroCurso}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los cursos</SelectItem>
                    <SelectItem value="Introducción a ISO 9001">Introducción a ISO 9001</SelectItem>
                    <SelectItem value="Gestión de Riesgos">Gestión de Riesgos</SelectItem>
                    <SelectItem value="Procedimientos de Limpieza">Procedimientos de Limpieza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de evaluaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados de Evaluaciones</CardTitle>
              <CardDescription>Historial de evaluaciones realizadas con puntuaciones y estados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evaluación</TableHead>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Puntuación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Intentos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluacionesFiltradas.map((evaluacion) => (
                    <TableRow key={evaluacion.id}>
                      <TableCell className="font-medium">{evaluacion.titulo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {evaluacion.empleado}
                        </div>
                      </TableCell>
                      <TableCell>{evaluacion.curso}</TableCell>
                      <TableCell>{evaluacion.fechaRealizacion}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getPuntuacionColor(evaluacion.puntuacion)}`}>
                            {evaluacion.puntuacion}%
                          </span>
                          <div className="w-16">
                            <Progress value={evaluacion.puntuacion} className="h-2" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(evaluacion.estado, evaluacion.puntuacion)}</TableCell>
                      <TableCell>{evaluacion.intentos}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEvaluacionSeleccionada(evaluacion)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalles de Evaluación</DialogTitle>
                              <DialogDescription>
                                {evaluacion?.titulo} - {evaluacion?.empleado}
                              </DialogDescription>
                            </DialogHeader>
                            {evaluacion && (
                              <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <Label className="font-medium">Curso:</Label>
                                    <p className="text-sm text-muted-foreground">{evaluacion.curso}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">Fecha:</Label>
                                    <p className="text-sm text-muted-foreground">{evaluacion.fechaRealizacion}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">Tiempo empleado:</Label>
                                    <p className="text-sm text-muted-foreground">{evaluacion.tiempoEmpleado}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">Intentos:</Label>
                                    <p className="text-sm text-muted-foreground">{evaluacion.intentos}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="font-medium">Resultados:</Label>
                                  <div className="mt-2 p-4 bg-muted rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                      <span>Respuestas correctas:</span>
                                      <span className="font-bold">{evaluacion.respuestasCorrectas}/{evaluacion.totalPreguntas}</span>
                                    </div>
                                    <Progress value={(evaluacion.respuestasCorrectas / evaluacion.totalPreguntas) * 100} className="h-2 mb-2" />
                                    <div className="flex justify-between items-center">
                                      <span>Puntuación final:</span>
                                      <span className={`font-bold text-lg ${getPuntuacionColor(evaluacion.puntuacion)}`}>
                                        {evaluacion.puntuacion}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plantillas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Evaluación</CardTitle>
              <CardDescription>Gestiona las plantillas disponibles para crear evaluaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {plantillasEvaluacion.map((plantilla) => (
                  <Card key={plantilla.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{plantilla.nombre}</CardTitle>
                      <CardDescription>Categoría: {plantilla.categoria}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Preguntas:</span>
                          <span className="font-medium">{plantilla.preguntas}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tiempo límite:</span>
                          <span className="font-medium">{plantilla.tiempoLimite}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Puntuación mínima:</span>
                          <span className="font-medium">{plantilla.puntuacionMinima}%</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <Badge variant={plantilla.estado === "Activa" ? "default" : "outline"}>
                            {plantilla.estado}
                          </Badge>
                          <Button variant="outline" size="sm">Usar Plantilla</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Introducción a ISO 9001", "Gestión de Riesgos", "Procedimientos de Limpieza"].map((curso) => {
                    const evaluacionesCurso = evaluacionesData.filter(e => e.curso === curso);
                    const promedio = evaluacionesCurso.length > 0 
                      ? Math.round(evaluacionesCurso.reduce((acc, e) => acc + e.puntuacion, 0) / evaluacionesCurso.length)
                      : 0;
                    return (
                      <div key={curso} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{curso}</span>
                          <span>{promedio}%</span>
                        </div>
                        <Progress value={promedio} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Calificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>90-100% (Excelente)</span>
                    <Badge variant="default" className="bg-green-500">
                      {evaluacionesData.filter(e => e.puntuacion >= 90).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>80-89% (Bueno)</span>
                    <Badge variant="default" className="bg-blue-500">
                      {evaluacionesData.filter(e => e.puntuacion >= 80 && e.puntuacion < 90).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>70-79% (Regular)</span>
                    <Badge variant="outline">
                      {evaluacionesData.filter(e => e.puntuacion >= 70 && e.puntuacion < 80).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>< 70% (Deficiente)</span>
                    <Badge variant="destructive">
                      {evaluacionesData.filter(e => e.puntuacion < 70).length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal para nueva evaluación */}
      <Dialog open={mostrarFormulario} onOpenChange={setMostrarFormulario}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nueva Evaluación</DialogTitle>
            <DialogDescription>
              Crea una nueva evaluación para un curso específico
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="titulo">Título de la evaluación</Label>
              <Input id="titulo" placeholder="Ej: Evaluación ISO 9001 - Módulo 2" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="curso">Curso</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iso9001">Introducción a ISO 9001</SelectItem>
                    <SelectItem value="riesgos">Gestión de Riesgos</SelectItem>
                    <SelectItem value="limpieza">Procedimientos de Limpieza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="plantilla">Plantilla</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    {plantillasEvaluacion.map((plantilla) => (
                      <SelectItem key={plantilla.id} value={plantilla.id.toString()}>
                        {plantilla.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" placeholder="Descripción de la evaluación..." />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setMostrarFormulario(false)}>Cancelar</Button>
              <Button onClick={() => setMostrarFormulario(false)}>Crear Evaluación</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 