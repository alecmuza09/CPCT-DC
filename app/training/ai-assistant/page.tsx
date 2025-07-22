"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Bot, 
  Send, 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText, 
  BarChart3,
  Zap,
  Brain,
  Target,
  MessageSquare,
  Sparkles,
  Download,
  RefreshCw
} from "lucide-react";

const mensajesIniciales = [
  {
    id: 1,
    tipo: "asistente",
    contenido: "¡Hola! Soy tu Asistente IA para el Sistema QMS. Estoy aquí para ayudarte con análisis, recomendaciones y respuestas sobre capacitación y calidad. ¿En qué puedo asistirte hoy?",
    timestamp: new Date(Date.now() - 2000)
  }
];

const recomendacionesInteligentes = [
  {
    id: 1,
    categoria: "Capacitación Urgente",
    titulo: "Refuerzo en Seguridad Industrial",
    descripcion: "Se detectó una disminución del 15% en las calificaciones de seguridad en el último mes.",
    prioridad: "alta",
    departamento: "Producción",
    accion: "Programar sesión de refuerzo",
    impacto: "Reducir incidentes en 30%"
  },
  {
    id: 2,
    categoria: "Optimización",
    titulo: "Automatizar Evaluaciones ISO 9001",
    descripcion: "El proceso manual actual consume 12 horas semanales que podrían optimizarse.",
    prioridad: "media",
    departamento: "Calidad",
    accion: "Implementar evaluaciones automáticas",
    impacto: "Ahorrar 48 horas/mes"
  },
  {
    id: 3,
    categoria: "Cumplimiento",
    titulo: "Actualización de Certificaciones",
    descripcion: "5 empleados tienen certificaciones próximas a vencer en los próximos 30 días.",
    prioridad: "alta",
    departamento: "Recursos Humanos",
    accion: "Programar renovaciones",
    impacto: "Mantener 100% cumplimiento"
  },
  {
    id: 4,
    categoria: "Tendencia",
    titulo: "Incremento en Demanda de Liderazgo",
    descripcion: "Las consultas sobre cursos de liderazgo aumentaron 40% este trimestre.",
    prioridad: "baja",
    departamento: "Desarrollo",
    accion: "Expandir oferta de cursos",
    impacto: "Mejorar satisfacción 25%"
  }
];

const analisisInteligente = {
  rendimientoGeneral: {
    puntuacion: 78,
    tendencia: "positiva",
    cambio: "+5%"
  },
  areasCriticas: [
    { area: "Seguridad Industrial", riesgo: 85, tendencia: "negativa" },
    { area: "ISO 14001", riesgo: 45, tendencia: "estable" },
    { area: "Capacitación Digital", riesgo: 60, tendencia: "positiva" }
  ],
  predicciones: [
    "Probable incremento del 12% en demanda de capacitación Q4",
    "Riesgo de incumplimiento en auditoría ISO si no se actúa en 15 días",
    "Oportunidad de reducir costos 18% optimizando horarios"
  ]
};

const preguntasFrecuentes = [
  "¿Cómo mejorar las calificaciones de mi equipo?",
  "¿Qué cursos son obligatorios para mi departamento?",
  "¿Cuándo es la próxima auditoría ISO?",
  "¿Cómo generar un reporte de cumplimiento?",
  "¿Qué certificaciones están por vencer?",
  "¿Cuál es el presupuesto disponible para capacitación?"
];

export default function AsistenteIAPage() {
  const [mensajes, setMensajes] = useState(mensajesIniciales);
  const [mensajeActual, setMensajeActual] = useState("");
  const [cargando, setCargando] = useState(false);
  const [analizandoDatos, setAnalizandoDatos] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = async () => {
    if (!mensajeActual.trim()) return;

    const nuevoMensajeUsuario = {
      id: Date.now(),
      tipo: "usuario",
      contenido: mensajeActual,
      timestamp: new Date()
    };

    setMensajes(prev => [...prev, nuevoMensajeUsuario]);
    setMensajeActual("");
    setCargando(true);

    // Simular respuesta del asistente IA
    setTimeout(() => {
      const respuestaIA = generarRespuestaIA(mensajeActual);
      const mensajeRespuesta = {
        id: Date.now() + 1,
        tipo: "asistente",
        contenido: respuestaIA,
        timestamp: new Date()
      };
      
      setMensajes(prev => [...prev, mensajeRespuesta]);
      setCargando(false);
    }, 1500);
  };

  const generarRespuestaIA = (mensaje) => {
    const mensajeLower = mensaje.toLowerCase();
    
    if (mensajeLower.includes("calificacion") || mensajeLower.includes("nota")) {
      return "Para mejorar las calificaciones de tu equipo, te recomiendo: 1) Identificar áreas específicas de debilidad a través de nuestros reportes detallados, 2) Programar sesiones de refuerzo personalizadas, 3) Implementar evaluaciones de seguimiento cada 2 semanas. ¿Te gustaría que genere un plan específico para algún departamento?";
    }
    
    if (mensajeLower.includes("curso") || mensajeLower.includes("capacitacion")) {
      return "Basándome en el análisis de tu organización, los cursos prioritarios son: ISO 9001 Básico (pendiente para 5 empleados), Seguridad Industrial (requiere refuerzo), y Liderazgo (alta demanda). ¿Quieres que programe alguno de estos cursos automáticamente?";
    }
    
    if (mensajeLower.includes("auditoria") || mensajeLower.includes("iso")) {
      return "La próxima auditoría ISO está programada para el 15 de noviembre. Detecté que necesitas completar: 3 evaluaciones pendientes, actualizar 2 procedimientos, y certificar 5 empleados. Te he preparado un plan de acción. ¿Quieres verlo?";
    }
    
    if (mensajeLower.includes("reporte") || mensajeLower.includes("informe")) {
      return "Puedo generar varios tipos de reportes: Cumplimiento por departamento, Progreso individual, Análisis de costos, Predicciones de rendimiento. ¿Qué tipo específico necesitas? También puedo programar reportes automáticos.";
    }
    
    if (mensajeLower.includes("presupuesto") || mensajeLower.includes("costo")) {
      return "Tu presupuesto actual de capacitación: $70,000 asignados, $52,300 utilizados (75%). Proyección para Q4: $15,200 adicionales necesarios. Te recomiendo optimizar costos combinando cursos virtuales (ahorro del 30%). ¿Quieres un análisis detallado?";
    }
    
    return "Entiendo tu consulta. Basándome en los datos de tu organización, puedo ayudarte con análisis específicos, recomendaciones personalizadas y automatización de procesos. ¿Podrías ser más específico sobre qué aspecto del sistema QMS te interesa?";
  };

  const usarPreguntaFrecuente = (pregunta) => {
    setMensajeActual(pregunta);
  };

  const realizarAnalisisCompleto = () => {
    setAnalizandoDatos(true);
    setTimeout(() => {
      const mensajeAnalisis = {
        id: Date.now(),
        tipo: "asistente",
        contenido: "📊 **Análisis Completo Finalizado**\n\n**Hallazgos Clave:**\n• Rendimiento general: 78% (+5% vs mes anterior)\n• Área crítica: Seguridad Industrial requiere atención inmediata\n• Oportunidad: 40% incremento en demanda de liderazgo\n• Predicción: Posible incumplimiento ISO en 15 días sin acción\n\n**Recomendaciones Prioritarias:**\n1. Programar capacitación de seguridad urgente\n2. Renovar 5 certificaciones próximas a vencer\n3. Expandir oferta de cursos de liderazgo\n\n¿Quieres que implemente alguna de estas recomendaciones automáticamente?",
        timestamp: new Date()
      };
      
      setMensajes(prev => [...prev, mensajeAnalisis]);
      setAnalizandoDatos(false);
    }, 3000);
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "alta": return "bg-red-500";
      case "media": return "bg-yellow-500";
      case "baja": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPrioridadBadge = (prioridad) => {
    switch (prioridad) {
      case "alta": return <Badge variant="destructive">Alta</Badge>;
      case "media": return <Badge variant="outline">Media</Badge>;
      case "baja": return <Badge variant="secondary">Baja</Badge>;
      default: return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-blue-500" />
            Asistente IA
          </h1>
          <p className="text-muted-foreground">Tu asistente inteligente para optimizar el sistema QMS con análisis automático y recomendaciones personalizadas.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={realizarAnalisisCompleto}
            disabled={analizandoDatos}
          >
            {analizandoDatos ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Brain className="mr-2 h-4 w-4" />
            )}
            Análisis Completo
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Conversación
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Principal */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat con Asistente IA
              </CardTitle>
              <CardDescription>
                Haz preguntas sobre capacitación, cumplimiento, reportes y más
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                <div className="space-y-4">
                  {mensajes.map((mensaje) => (
                    <div key={mensaje.id} className={`flex ${mensaje.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[80%] ${mensaje.tipo === 'usuario' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {mensaje.tipo === 'usuario' ? 'TU' : <Bot className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${
                          mensaje.tipo === 'usuario' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{mensaje.contenido}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {mensaje.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {cargando && (
                    <div className="flex justify-start">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Analizando...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="mt-4 space-y-3">
                {/* Preguntas frecuentes */}
                <div className="flex flex-wrap gap-2">
                  {preguntasFrecuentes.slice(0, 3).map((pregunta, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => usarPreguntaFrecuente(pregunta)}
                      className="text-xs"
                    >
                      {pregunta}
                    </Button>
                  ))}
                </div>
                
                {/* Input de mensaje */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Escribe tu pregunta sobre QMS, capacitación, ISO..."
                    value={mensajeActual}
                    onChange={(e) => setMensajeActual(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                    disabled={cargando}
                  />
                  <Button 
                    onClick={enviarMensaje} 
                    disabled={cargando || !mensajeActual.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Análisis Inteligente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Análisis Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Rendimiento General</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {analisisInteligente.rendimientoGeneral.cambio}
                  </Badge>
                </div>
                <Progress value={analisisInteligente.rendimientoGeneral.puntuacion} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {analisisInteligente.rendimientoGeneral.puntuacion}% de rendimiento
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-3">Áreas Críticas</h4>
                <div className="space-y-2">
                  {analisisInteligente.areasCriticas.map((area, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span>{area.area}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          area.riesgo > 70 ? 'bg-red-500' : 
                          area.riesgo > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <span className="text-xs">{area.riesgo}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recomendacionesInteligentes.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium">{rec.titulo}</h4>
                      {getPrioridadBadge(rec.prioridad)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{rec.descripcion}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-600">{rec.departamento}</span>
                      <Button size="sm" variant="ghost" className="h-6 text-xs">
                        Aplicar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Predicciones y Tendencias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Predicciones Inteligentes
          </CardTitle>
          <CardDescription>
            Análisis predictivo basado en tendencias históricas y patrones actuales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {analisisInteligente.predicciones.map((prediccion, idx) => (
              <Alert key={idx}>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {prediccion}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Herramientas Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Herramientas Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-xs">Generar Reporte</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-xs">Asignar Cursos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CheckCircle className="h-6 w-6 mb-2" />
              <span className="text-xs">Verificar Cumplimiento</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span className="text-xs">Análisis Predictivo</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 