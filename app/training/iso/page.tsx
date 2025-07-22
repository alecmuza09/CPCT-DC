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
import { Shield, FileText, CheckCircle, AlertCircle, Clock, Search, Plus, Eye, Download } from "lucide-react";

const procesosISO = [
  {
    id: 1,
    codigo: "ISO-9001-4.1",
    nombre: "Contexto de la Organización",
    norma: "ISO 9001:2015",
    categoria: "Contexto",
    estado: "Implementado",
    cumplimiento: 95,
    responsable: "María González",
    fechaRevision: "2024-03-15",
    documentos: ["Manual de Calidad", "Análisis de Contexto"],
    descripcion: "Determinar las cuestiones externas e internas pertinentes para el propósito y dirección estratégica de la organización."
  },
  {
    id: 2,
    codigo: "ISO-9001-5.1",
    nombre: "Liderazgo y Compromiso",
    norma: "ISO 9001:2015",
    categoria: "Liderazgo",
    estado: "En Implementación",
    cumplimiento: 78,
    responsable: "Carlos Ruiz",
    fechaRevision: "2024-02-20",
    documentos: ["Política de Calidad", "Objetivos de Calidad"],
    descripcion: "La alta dirección debe demostrar liderazgo y compromiso con respecto al sistema de gestión de la calidad."
  },
  {
    id: 3,
    codigo: "ISO-9001-6.1",
    nombre: "Acciones para Abordar Riesgos",
    norma: "ISO 9001:2015",
    categoria: "Planificación",
    estado: "Pendiente",
    cumplimiento: 45,
    responsable: "Ana López",
    fechaRevision: "2024-01-10",
    documentos: ["Matriz de Riesgos", "Plan de Contingencia"],
    descripcion: "Determinar los riesgos y oportunidades que es necesario abordar para asegurar que el SGC pueda lograr sus resultados previstos."
  },
  {
    id: 4,
    codigo: "ISO-45001-6.1",
    nombre: "Identificación de Peligros",
    norma: "ISO 45001:2018",
    categoria: "Seguridad",
    estado: "Implementado",
    cumplimiento: 88,
    responsable: "Juan Pérez",
    fechaRevision: "2024-03-01",
    documentos: ["IPER", "Procedimiento de Identificación"],
    descripcion: "Establecer, implementar y mantener un proceso para la identificación continua y proactiva de los peligros."
  }
];

const normasISO = [
  { codigo: "ISO 9001:2015", nombre: "Sistemas de Gestión de la Calidad", procesos: 12, implementados: 8 },
  { codigo: "ISO 14001:2015", nombre: "Sistemas de Gestión Ambiental", procesos: 8, implementados: 5 },
  { codigo: "ISO 45001:2018", nombre: "Sistemas de Gestión de SST", procesos: 10, implementados: 7 },
  { codigo: "ISO 22000:2018", nombre: "Sistemas de Gestión de Inocuidad", procesos: 6, implementados: 4 }
];

export default function ProcesosISOPage() {
  const [filtroNorma, setFiltroNorma] = useState("todas");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);

  const procesosFiltrados = procesosISO.filter(proceso => {
    const matchNorma = filtroNorma === "todas" || proceso.norma === filtroNorma;
    const matchEstado = filtroEstado === "todos" || proceso.estado === filtroEstado;
    const matchBusqueda = proceso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         proceso.codigo.toLowerCase().includes(busqueda.toLowerCase());
    return matchNorma && matchEstado && matchBusqueda;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Implementado":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" />Implementado</Badge>;
      case "En Implementación":
        return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />En Implementación</Badge>;
      case "Pendiente":
        return <Badge variant="secondary"><AlertCircle className="mr-1 h-3 w-3" />Pendiente</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  const getCumplimientoColor = (cumplimiento) => {
    if (cumplimiento >= 90) return "bg-green-500";
    if (cumplimiento >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Procesos ISO</h1>
          <p className="text-muted-foreground">Gestiona y monitorea la implementación de procesos según normas ISO.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Proceso
        </Button>
      </div>

      {/* Métricas generales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Procesos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{procesosISO.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implementados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{procesosISO.filter(p => p.estado === "Implementado").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{procesosISO.filter(p => p.estado === "En Implementación").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumplimiento Promedio</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(procesosISO.reduce((acc, p) => acc + p.cumplimiento, 0) / procesosISO.length)}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="procesos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="procesos">Procesos ISO</TabsTrigger>
          <TabsTrigger value="normas">Por Norma</TabsTrigger>
          <TabsTrigger value="cumplimiento">Cumplimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="procesos" className="space-y-4">
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
                    placeholder="Buscar proceso..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
                <Select value={filtroNorma} onValueChange={setFiltroNorma}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por norma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las normas</SelectItem>
                    <SelectItem value="ISO 9001:2015">ISO 9001:2015</SelectItem>
                    <SelectItem value="ISO 14001:2015">ISO 14001:2015</SelectItem>
                    <SelectItem value="ISO 45001:2018">ISO 45001:2018</SelectItem>
                    <SelectItem value="ISO 22000:2018">ISO 22000:2018</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="Implementado">Implementado</SelectItem>
                    <SelectItem value="En Implementación">En Implementación</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de procesos */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Procesos ISO</CardTitle>
              <CardDescription>Procesos organizados por norma con seguimiento de cumplimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Proceso</TableHead>
                    <TableHead>Norma</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Cumplimiento</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {procesosFiltrados.map((proceso) => (
                    <TableRow key={proceso.id}>
                      <TableCell className="font-mono text-sm">{proceso.codigo}</TableCell>
                      <TableCell className="font-medium">{proceso.nombre}</TableCell>
                      <TableCell>{proceso.norma}</TableCell>
                      <TableCell>{proceso.responsable}</TableCell>
                      <TableCell>{getEstadoBadge(proceso.estado)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{proceso.cumplimiento}%</span>
                          </div>
                          <Progress value={proceso.cumplimiento} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setProcesoSeleccionado(proceso)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{proceso?.nombre}</DialogTitle>
                                <DialogDescription>
                                  Código: {proceso?.codigo} | Norma: {proceso?.norma}
                                </DialogDescription>
                              </DialogHeader>
                              {proceso && (
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium">Descripción:</h4>
                                    <p className="text-sm text-muted-foreground">{proceso.descripcion}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Documentos asociados:</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                                      {proceso.documentos.map((doc, idx) => (
                                        <li key={idx}>{doc}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                      <h4 className="font-medium">Responsable:</h4>
                                      <p className="text-sm text-muted-foreground">{proceso.responsable}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium">Última revisión:</h4>
                                      <p className="text-sm text-muted-foreground">{proceso.fechaRevision}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="normas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {normasISO.map((norma, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {norma.codigo}
                  </CardTitle>
                  <CardDescription>{norma.nombre}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Procesos implementados:</span>
                      <span>{norma.implementados}/{norma.procesos}</span>
                    </div>
                    <Progress value={(norma.implementados / norma.procesos) * 100} className="h-2" />
                    <div className="flex justify-between">
                      <Badge variant="outline">{norma.procesos} procesos</Badge>
                      <Badge variant="default" className="bg-green-500">{Math.round((norma.implementados / norma.procesos) * 100)}% completo</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cumplimiento" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Cumplimiento</CardTitle>
              <CardDescription>Estado de cumplimiento por categoría y proceso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {procesosISO.map((proceso) => (
                  <div key={proceso.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{proceso.nombre}</h4>
                      <p className="text-sm text-muted-foreground">{proceso.codigo} - {proceso.categoria}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{proceso.cumplimiento}%</div>
                        <div className="text-sm text-muted-foreground">{proceso.responsable}</div>
                      </div>
                      <div className="w-24">
                        <Progress value={proceso.cumplimiento} className="h-2" />
                      </div>
                      {getEstadoBadge(proceso.estado)}
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