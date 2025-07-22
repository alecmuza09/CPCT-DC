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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { BarChart3, Download, Calendar as CalendarIcon, Users, TrendingUp, Clock, FileText, Filter, Eye } from "lucide-react";

const reportesData = {
  resumenGeneral: {
    totalEmpleados: 45,
    empleadosCapacitados: 38,
    horasTotalesCapacitacion: 1250,
    cursosCompletados: 156,
    tasaCompletitud: 84,
    promedioCalificaciones: 82
  },
  reportesPorPeriodo: [
    {
      periodo: "Enero 2024",
      empleadosCapacitados: 12,
      horasCapacitacion: 320,
      cursosCompletados: 45,
      promedioCalificacion: 85,
      costoTotal: 15000
    },
    {
      periodo: "Febrero 2024",
      empleadosCapacitados: 15,
      horasCapacitacion: 380,
      cursosCompletados: 52,
      promedioCalificacion: 78,
      costoTotal: 18500
    },
    {
      periodo: "Marzo 2024",
      empleadosCapacitados: 18,
      horasCapacitacion: 450,
      cursosCompletados: 59,
      promedioCalificacion: 88,
      costoTotal: 22000
    }
  ],
  reportesPorDepartamento: [
    {
      departamento: "Producción",
      empleados: 20,
      capacitados: 18,
      horasPromedio: 32,
      cumplimiento: 90,
      presupuesto: 25000,
      gastado: 22500
    },
    {
      departamento: "Calidad",
      empleados: 8,
      capacitados: 8,
      horasPromedio: 45,
      cumplimiento: 100,
      presupuesto: 15000,
      gastado: 14200
    },
    {
      departamento: "Administración",
      empleados: 12,
      capacitados: 9,
      horasPromedio: 28,
      cumplimiento: 75,
      presupuesto: 18000,
      gastado: 16800
    },
    {
      departamento: "Mantenimiento",
      empleados: 5,
      capacitados: 3,
      horasPromedio: 38,
      cumplimiento: 60,
      presupuesto: 12000,
      gastado: 8900
    }
  ],
  cursosPopulares: [
    { curso: "ISO 9001 Básico", participantes: 28, calificacionPromedio: 85, completados: 25 },
    { curso: "Seguridad Industrial", participantes: 22, calificacionPromedio: 79, completados: 20 },
    { curso: "Liderazgo", participantes: 15, calificacionPromedio: 88, completados: 13 },
    { curso: "Gestión de Riesgos", participantes: 18, calificacionPromedio: 82, completados: 16 }
  ]
};

export default function ReportesCapacitacionPage() {
  const [filtroFecha, setFiltroFecha] = useState("ultimo-trimestre");
  const [filtroDepartamento, setFiltroDepartamento] = useState("todos");
  const [filtroTipoReporte, setFiltroTipoReporte] = useState("general");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const exportarReporte = (formato) => {
    // Simulación de exportación
    console.log(`Exportando reporte en formato ${formato}`);
    alert(`Reporte exportado en formato ${formato}`);
  };

  const getCumplimientoColor = (cumplimiento) => {
    if (cumplimiento >= 90) return "bg-green-500";
    if (cumplimiento >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getCumplimientoBadge = (cumplimiento) => {
    if (cumplimiento >= 90) return <Badge variant="default" className="bg-green-500">Excelente</Badge>;
    if (cumplimiento >= 75) return <Badge variant="outline">Bueno</Badge>;
    return <Badge variant="destructive">Requiere Atención</Badge>;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reportes de Capacitación</h1>
          <p className="text-muted-foreground">Analiza el desempeño y progreso de la capacitación organizacional.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportarReporte('PDF')}>
            <Download className="mr-2 h-4 w-4" /> Exportar PDF
          </Button>
          <Button variant="outline" onClick={() => exportarReporte('Excel')}>
            <Download className="mr-2 h-4 w-4" /> Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filtros avanzados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label>Período</Label>
              <Select value={filtroFecha} onValueChange={setFiltroFecha}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultimo-mes">Último mes</SelectItem>
                  <SelectItem value="ultimo-trimestre">Último trimestre</SelectItem>
                  <SelectItem value="ultimo-semestre">Último semestre</SelectItem>
                  <SelectItem value="ultimo-año">Último año</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Departamento</Label>
              <Select value={filtroDepartamento} onValueChange={setFiltroDepartamento}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="produccion">Producción</SelectItem>
                  <SelectItem value="calidad">Calidad</SelectItem>
                  <SelectItem value="administracion">Administración</SelectItem>
                  <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tipo de Reporte</Label>
              <Select value={filtroTipoReporte} onValueChange={setFiltroTipoReporte}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="detallado">Detallado</SelectItem>
                  <SelectItem value="comparativo">Comparativo</SelectItem>
                  <SelectItem value="financiero">Financiero</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button className="w-full mt-6">
                <Eye className="mr-2 h-4 w-4" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empleados Capacitados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportesData.resumenGeneral.empleadosCapacitados}</div>
            <p className="text-xs text-muted-foreground">
              de {reportesData.resumenGeneral.totalEmpleados} total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportesData.resumenGeneral.horasTotalesCapacitacion}</div>
            <p className="text-xs text-muted-foreground">
              horas de capacitación
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Completados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportesData.resumenGeneral.cursosCompletados}</div>
            <p className="text-xs text-muted-foreground">
              cursos finalizados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Completitud</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportesData.resumenGeneral.tasaCompletitud}%</div>
            <p className="text-xs text-muted-foreground">
              tasa de finalización
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Calificaciones</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportesData.resumenGeneral.promedioCalificaciones}%</div>
            <p className="text-xs text-muted-foreground">
              calificación promedio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobertura</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((reportesData.resumenGeneral.empleadosCapacitados / reportesData.resumenGeneral.totalEmpleados) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              cobertura total
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departamentos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="departamentos">Por Departamento</TabsTrigger>
          <TabsTrigger value="periodo">Por Período</TabsTrigger>
          <TabsTrigger value="cursos">Cursos Populares</TabsTrigger>
          <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
        </TabsList>

        <TabsContent value="departamentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte por Departamento</CardTitle>
              <CardDescription>Análisis detallado del progreso de capacitación por área organizacional</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Empleados</TableHead>
                    <TableHead>Capacitados</TableHead>
                    <TableHead>Horas Promedio</TableHead>
                    <TableHead>Cumplimiento</TableHead>
                    <TableHead>Presupuesto</TableHead>
                    <TableHead>Gastado</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportesData.reportesPorDepartamento.map((dept, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{dept.departamento}</TableCell>
                      <TableCell>{dept.empleados}</TableCell>
                      <TableCell>{dept.capacitados}</TableCell>
                      <TableCell>{dept.horasPromedio}h</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{dept.cumplimiento}%</span>
                          </div>
                          <Progress value={dept.cumplimiento} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>${dept.presupuesto.toLocaleString()}</TableCell>
                      <TableCell>${dept.gastado.toLocaleString()}</TableCell>
                      <TableCell>{getCumplimientoBadge(dept.cumplimiento)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="periodo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolución por Período</CardTitle>
              <CardDescription>Tendencias de capacitación a lo largo del tiempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reportesData.reportesPorPeriodo.map((periodo, idx) => (
                  <div key={idx} className="grid gap-4 md:grid-cols-5 p-4 border rounded-lg">
                    <div className="md:col-span-1">
                      <h4 className="font-medium">{periodo.periodo}</h4>
                      <p className="text-sm text-muted-foreground">Período de reporte</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{periodo.empleadosCapacitados}</div>
                      <p className="text-xs text-muted-foreground">Empleados</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{periodo.horasCapacitacion}</div>
                      <p className="text-xs text-muted-foreground">Horas</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{periodo.cursosCompletados}</div>
                      <p className="text-xs text-muted-foreground">Cursos</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{periodo.promedioCalificacion}%</div>
                      <p className="text-xs text-muted-foreground">Promedio</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cursos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Más Populares</CardTitle>
              <CardDescription>Análisis de participación y desempeño por curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {reportesData.cursosPopulares.map((curso, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-lg">{curso.curso}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Participantes:</span>
                          <span className="font-medium">{curso.participantes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completados:</span>
                          <span className="font-medium">{curso.completados}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tasa de finalización:</span>
                          <span className="font-medium">{Math.round((curso.completados / curso.participantes) * 100)}%</span>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Calificación promedio:</span>
                            <span>{curso.calificacionPromedio}%</span>
                          </div>
                          <Progress value={curso.calificacionPromedio} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendencias" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Participación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Gráfico de tendencias de participación</p>
                    <p className="text-sm text-muted-foreground">(Simulación - se integraría con biblioteca de gráficos)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Proyecciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Meta Anual</h4>
                    <div className="flex justify-between text-sm">
                      <span>Progreso actual:</span>
                      <span>75% del objetivo</span>
                    </div>
                    <Progress value={75} className="h-2 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-medium">Proyección de Finalización</h4>
                    <p className="text-sm text-muted-foreground">Basado en tendencias actuales: Diciembre 2024</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Recomendaciones</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Incrementar capacitación en Mantenimiento</li>
                      <li>• Reforzar cursos de seguridad</li>
                      <li>• Optimizar presupuesto de Administración</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 