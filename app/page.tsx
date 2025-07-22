"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
  Search,
  Bell,
  Calendar,
  Download,
  Eye,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const complianceData = [
  { name: "ISO 9001:2015", progress: 95, status: "Excelente", color: "bg-green-500" },
  { name: "ISO 22000", progress: 78, status: "Bueno", color: "bg-yellow-500" },
  { name: "ISO 45001", progress: 92, status: "Excelente", color: "bg-green-500" },
  { name: "HACCP", progress: 65, status: "Requiere Atención", color: "bg-red-500" },
]

const recentActivities = [
  {
    type: "document",
    title: "Manual de Calidad v3.2 actualizado",
    user: "María González",
    time: "Hace 2 horas",
    icon: FileText,
  },
  {
    type: "training",
    title: "Capacitación ISO 45001 completada",
    user: "Carlos Ruiz",
    time: "Hace 4 horas",
    icon: GraduationCap,
  },
  {
    type: "audit",
    title: "Evidencia de cláusula 8.4 subida",
    user: "Ana López",
    time: "Hace 6 horas",
    icon: CheckCircle,
  },
  {
    type: "alert",
    title: "Documento POP-001 próximo a vencer",
    user: "Sistema",
    time: "Hace 1 día",
    icon: AlertTriangle,
  },
]

const pendingTasks = [
  { title: "Revisar procedimiento de compras", priority: "Alta", dueDate: "Hoy" },
  { title: "Completar capacitación HACCP", priority: "Media", dueDate: "Mañana" },
  { title: "Actualizar matriz de riesgos", priority: "Alta", dueDate: "Esta semana" },
  { title: "Preparar evidencias para auditoría", priority: "Crítica", dueDate: "Hoy" },
]

export default function Dashboard() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Sistema de Gestión</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center gap-2 px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar..." className="w-64 pl-10" />
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 pt-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Resumen del estado de tu sistema de gestión de calidad</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Reporte
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Programar Auditoría
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos Activos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personal Capacitado</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cumplimiento Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82.5%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-yellow-600">-2%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+3</span> nuevas hoy
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Compliance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Cumplimiento por Norma</CardTitle>
              <CardDescription>Progreso actual de implementación de cada certificación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.progress >= 90 ? "default" : item.progress >= 75 ? "secondary" : "destructive"}
                      >
                        {item.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.progress}%</span>
                    </div>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas actualizaciones en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pending Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tareas Pendientes</CardTitle>
              <CardDescription>Actividades que requieren tu atención</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Vence: {task.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <Badge
                        variant={
                          task.priority === "Crítica"
                            ? "destructive"
                            : task.priority === "Alta"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Funciones más utilizadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Subir Documento
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <GraduationCap className="mr-2 h-4 w-4" />
                Iniciar Capacitación
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <CheckCircle className="mr-2 h-4 w-4" />
                Registrar Evidencia
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Crear Ticket
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Consultar Base de Conocimiento
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
