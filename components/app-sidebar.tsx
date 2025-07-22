"use client"
import {
  BookOpen,
  Bot,
  Building2,
  FileText,
  GraduationCap,
  History,
  Home,
  Settings,
  Shield,
  MessageSquare,
  ChevronDown,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Gestión Documental",
    icon: FileText,
    items: [
      { title: "Gestión Documental", url: "/gestion-documental" },
      { title: "Documentos", url: "/documentos" },
      { title: "Formatos", url: "/formatos" },
      { title: "Control de Versiones", url: "/control-versiones" },
      { title: "Firmas Electrónicas", url: "/firmas-electronicas" },
    ],
  },
  {
    title: "Capacitación",
    icon: GraduationCap,
    items: [
      { title: "Cursos por Rol", url: "/training/roles" },
      { title: "Procesos ISO", url: "/training/iso" },
      { title: "Evaluaciones", url: "/training/evaluations" },
      { title: "Reportes", url: "/training/reports" },
    ],
  },
  {
    title: "Asistente IA",
    url: "/assistant",
    icon: Bot,
    badge: "Nuevo",
  },
  {
    title: "Centro de Auditoría",
    icon: Shield,
    items: [
      { title: "Evidencias", url: "/audit/evidence" },
      { title: "Cumplimiento", url: "/audit/compliance" },
      { title: "Informes", url: "/audit/reports" },
      { title: "Cláusulas ISO", url: "/audit/clauses" },
    ],
  },
  {
    title: "Historial",
    icon: History,
    items: [
      { title: "Cambios", url: "/history/changes" },
      { title: "Actualizaciones", url: "/history/updates" },
      { title: "Bitácora", url: "/history/log" },
    ],
  },
  {
    title: "Base de Conocimiento",
    url: "/knowledge",
    icon: BookOpen,
  },
  {
    title: "Tickets",
    url: "/tickets",
    icon: MessageSquare,
    badge: "3",
  },
]

const certifications = [
  { name: "ISO 9001:2015", status: "compliant" },
  { name: "ISO 22000", status: "warning" },
  { name: "ISO 45001", status: "compliant" },
  { name: "HACCP", status: "critical" },
]

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Capacit.io</h2>
            <p className="text-xs text-muted-foreground">Sistema de Gestión de Calidad</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>{subItem.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Estado de Certificaciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-medium">{cert.name}</span>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      cert.status === "compliant"
                        ? "bg-green-500"
                        : cert.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 px-4 py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left text-sm">
            <div className="font-medium">Juan Pérez</div>
            <div className="text-muted-foreground">Auditor Interno</div>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
