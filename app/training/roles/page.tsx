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
import { GraduationCap, User, Clock, CheckCircle, AlertCircle, Search, Plus } from "lucide-react";

const cursosData = [
  {
    id: 1,
    nombre: "Introducción a ISO 9001",
    rol: "Auditor Interno",
    duracion: "8 horas",
    modalidad: "Online",
    estado: "Activo",
    empleadosAsignados: 12,
    empleadosCompletados: 8,
    fechaCreacion: "2024-01-15"
  },
  {
    id: 2,
    nombre: "Gestión de Riesgos",
    rol: "Supervisor",
    duracion: "12 horas",
    modalidad: "Presencial",
    estado: "Activo",
    empleadosAsignados: 8,
    empleadosCompletados: 5,
    fechaCreacion: "2024-02-01"
  },
  {
    id: 3,
    nombre: "Procedimientos de Limpieza",
    rol: "Operario",
    duracion: "4 horas",
    modalidad: "Híbrido",
    estado: "Activo",
    empleadosAsignados: 25,
    empleadosCompletados: 20,
    fechaCreacion: "2024-01-20"
  },
  {
    id: 4,
    nombre: "Liderazgo y Calidad",
    rol: "Gerente",
    duracion: "16 horas",
    modalidad: "Online",
    estado: "Borrador",
    empleadosAsignados: 3,
    empleadosCompletados: 0,
    fechaCreacion: "2024-03-01"
  }
];

const empleadosData = [
  { id: 1, nombre: "María González", rol: "Auditor Interno", cursosAsignados: 3, cursosCompletados: 2, progreso: 67 },
  { id: 2, nombre: "Carlos Ruiz", rol: "Supervisor", cursosAsignados: 2, cursosCompletados: 2, progreso: 100 },
  { id: 3, nombre: "Ana López", rol: "Operario", cursosAsignados: 1, cursosCompletados: 1, progreso: 100 },
  { id: 4, nombre: "Juan Pérez", rol: "Gerente", cursosAsignados: 1, cursosCompletados: 0, progreso: 0 }
];

export default function CursosPorRolPage() {
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const cursosFiltrados = cursosData.filter(curso => {
    const matchRol = filtroRol === "todos" || curso.rol === filtroRol;
    const matchEstado = filtroEstado === "todos" || curso.estado === filtroEstado;
    const matchBusqueda = curso.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return matchRol && matchEstado && matchBusqueda;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Activo":
        return <Badge variant="default" className="bg-green-500">Activo</Badge>;
      case "Borrador":
        return <Badge variant="outline">Borrador</Badge>;
      case "Inactivo":
        return <Badge variant="secondary">Inactivo</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Cursos por Rol</h1>
          <p className="text-muted-foreground">Gestiona la capacitación específica para cada rol organizacional.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Crear Curso
        </Button>
      </div>

      {/* Métricas generales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cursosData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empleados Capacitados</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cursosData.reduce((acc, curso) => acc + curso.empleadosCompletados, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cursosData.reduce((acc, curso) => acc + parseInt(curso.duracion), 0)}h</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Finalización</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cursos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cursos">Cursos por Rol</TabsTrigger>
          <TabsTrigger value="empleados">Progreso de Empleados</TabsTrigger>
          <TabsTrigger value="asignaciones">Asignaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="cursos" className="space-y-4">
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
                    placeholder="Buscar curso..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
                <Select value={filtroRol} onValueChange={setFiltroRol}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los roles</SelectItem>
                    <SelectItem value="Auditor Interno">Auditor Interno</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Operario">Operario</SelectItem>
                    <SelectItem value="Gerente">Gerente</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Borrador">Borrador</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de cursos */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Cursos</CardTitle>
              <CardDescription>Cursos organizados por rol con métricas de progreso</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Curso</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Modalidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cursosFiltrados.map((curso) => (
                    <TableRow key={curso.id}>
                      <TableCell className="font-medium">{curso.nombre}</TableCell>
                      <TableCell>{curso.rol}</TableCell>
                      <TableCell>{curso.duracion}</TableCell>
                      <TableCell>{curso.modalidad}</TableCell>
                      <TableCell>{getEstadoBadge(curso.estado)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{curso.empleadosCompletados}/{curso.empleadosAsignados}</span>
                            <span>{Math.round((curso.empleadosCompletados / curso.empleadosAsignados) * 100)}%</span>
                          </div>
                          <Progress value={(curso.empleadosCompletados / curso.empleadosAsignados) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Ver Detalles</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="empleados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progreso por Empleado</CardTitle>
              <CardDescription>Seguimiento del avance individual en capacitaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Cursos Asignados</TableHead>
                    <TableHead>Completados</TableHead>
                    <TableHead>Progreso General</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {empleadosData.map((empleado) => (
                    <TableRow key={empleado.id}>
                      <TableCell className="font-medium">{empleado.nombre}</TableCell>
                      <TableCell>{empleado.rol}</TableCell>
                      <TableCell>{empleado.cursosAsignados}</TableCell>
                      <TableCell>{empleado.cursosCompletados}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{empleado.progreso}%</span>
                          </div>
                          <Progress value={empleado.progreso} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        {empleado.progreso === 100 ? (
                          <Badge variant="default" className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" />Completo</Badge>
                        ) : empleado.progreso > 0 ? (
                          <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />En progreso</Badge>
                        ) : (
                          <Badge variant="secondary"><AlertCircle className="mr-1 h-3 w-3" />Pendiente</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="asignaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asignación de Cursos</CardTitle>
              <CardDescription>Asigna cursos específicos a empleados según su rol</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empleado" />
                    </SelectTrigger>
                    <SelectContent>
                      {empleadosData.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id.toString()}>{emp.nombre} - {emp.rol}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {cursosData.filter(c => c.estado === "Activo").map((curso) => (
                        <SelectItem key={curso.id} value={curso.id.toString()}>{curso.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button>Asignar Curso</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 