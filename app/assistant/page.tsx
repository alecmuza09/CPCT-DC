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
  RefreshCw,
  Settings,
  Shield,
  BookOpen,
  Star,
  Activity,
  PieChart,
  Gauge
} from "lucide-react";

const mensajesIniciales = [
  {
    id: 1,
    tipo: "asistente",
    contenido: "¡Hola! Soy tu Asistente IA especializado en Sistemas de Gestión de Calidad. Puedo ayudarte con análisis de datos, optimización de procesos, cumplimiento normativo y mucho más. ¿En qué puedo asistirte hoy?",
    timestamp: new Date(Date.now() - 2000),
    herramientas: ["análisis", "reportes", "optimización"]
  }
];

const analisisInteligente = {
  estadoGeneral: {
    puntuacion: 85,
    tendencia: "positiva",
    cambio: "+7%",
    areas: {
      documentacion: 92,
      capacitacion: 78,
      auditorias: 88,
      cumplimiento: 85
    }
  },
  alertasCriticas: [
    {
      tipo: "Vencimiento",
      mensaje: "3 certificaciones vencen en los próximos 30 días",
      prioridad: "alta",
      accion: "Renovar certificaciones ISO 22000 y HACCP"
    },
    {
      tipo: "Cumplimiento", 
      mensaje: "Cláusula 10.1 de ISO 9001 requiere atención",
      prioridad: "media",
      accion: "Actualizar procedimientos de mejora continua"
    },
    {
      tipo: "Capacitación",
      mensaje: "15 empleados tienen capacitación pendiente",
      prioridad: "media",
      accion: "Programar sesiones de capacitación"
    }
  ],
  recomendacionesIA: [
    {
      id: 1,
      categoria: "Optimización",
      titulo: "Automatizar Reportes de Cumplimiento",
      descripcion: "Implementar generación automática de reportes puede ahorrar 12 horas semanales",
      impacto: "Alto",
      esfuerzo: "Medio",
      roi: "180%"
    },
    {
      id: 2,
      categoria: "Mejora",
      titulo: "Integración con ERP",
      descripcion: "Conectar el sistema QMS con el ERP mejorará la trazabilidad en un 45%",
      impacto: "Alto",
      esfuerzo: "Alto",
      roi: "250%"
    },
    {
      id: 3,
      categoria: "Eficiencia",
      titulo: "Digitalizar Auditorías Internas",
      descripcion: "Usar tablets para auditorías puede reducir el tiempo de documentación en 30%",
      impacto: "Medio",
      esfuerzo: "Bajo",
      roi: "120%"
    }
  ],
  predicciones: [
    "Probable incremento del 15% en demanda de auditorías Q2",
    "Riesgo de incumplimiento en ISO 22000 si no se actúa en 20 días",
    "Oportunidad de reducir costos 22% optimizando flujos de trabajo",
    "Tendencia positiva en satisfacción del cliente (+12% este trimestre)"
  ]
};

const herramientasIA = [
  {
    nombre: "Análisis de Cumplimiento",
    descripcion: "Evalúa el estado actual del cumplimiento normativo",
    icono: Shield,
    categoria: "Análisis",
    ultimoUso: "Hace 2 horas"
  },
  {
    nombre: "Optimizador de Procesos",
    descripcion: "Identifica oportunidades de mejora en procesos",
    icono: Target,
    categoria: "Optimización", 
    ultimoUso: "Hace 1 día"
  },
  {
    nombre: "Generador de Reportes",
    descripcion: "Crea reportes personalizados automáticamente",
    icono: FileText,
    categoria: "Reportes",
    ultimoUso: "Hace 3 horas"
  },
  {
    nombre: "Predictor de Riesgos",
    descripcion: "Predice posibles riesgos de cumplimiento",
    icono: AlertTriangle,
    categoria: "Predicción",
    ultimoUso: "Hace 5 horas"
  },
  {
    nombre: "Asistente de Capacitación",
    descripcion: "Recomienda planes de capacitación personalizados",
    icono: BookOpen,
    categoria: "Capacitación",
    ultimoUso: "Hace 1 día"
  },
  {
    nombre: "Monitor de KPIs",
    descripcion: "Supervisa indicadores clave de rendimiento",
    icono: Gauge,
    categoria: "Monitoreo",
    ultimoUso: "Hace 30 min"
  }
];

const preguntasRapidas = [
  "¿Cuál es el estado actual de cumplimiento?",
  "¿Qué certificaciones vencen pronto?",
  "¿Cómo puedo optimizar mis procesos?",
  "¿Cuáles son los riesgos principales?",
  "¿Qué capacitación necesita mi equipo?",
  "¿Cómo está el rendimiento general?"
];

export default function AsistenteIAPage() {
  const [mensajes, setMensajes] = useState(mensajesIniciales);
  const [mensajeActual, setMensajeActual] = useState("");
  const [cargando, setCargando] = useState(false);
  const [analizandoDatos, setAnalizandoDatos] = useState(false);
  const [herramientaActiva, setHerramientaActiva] = useState(null);
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
        contenido: respuestaIA.texto,
        timestamp: new Date(),
        herramientas: respuestaIA.herramientas || [],
        datos: respuestaIA.datos || null
      };
      
      setMensajes(prev => [...prev, mensajeRespuesta]);
      setCargando(false);
    }, 1500);
  };

  const generarRespuestaIA = (mensaje) => {
    const mensajeLower = mensaje.toLowerCase();
    
    if (mensajeLower.includes("cumplimiento") || mensajeLower.includes("estado")) {
      return {
        texto: `📊 **Análisis de Cumplimiento Actual**

**Estado General:** 85% (Tendencia: +7%)
- ISO 9001:2015: 95% ✅
- ISO 14001:2015: 78% ⚠️
- ISO 45001:2018: 92% ✅
- ISO 22000:2018: 65% ⚠️

**Alertas Críticas:**
• 3 certificaciones vencen en 30 días
• Cláusula 10.1 requiere atención
• 15 empleados con capacitación pendiente

¿Te gustaría que genere un plan de acción específico?`,
        herramientas: ["análisis", "reportes"],
        datos: analisisInteligente.estadoGeneral
      };
    }
    
    if (mensajeLower.includes("optimizar") || mensajeLower.includes("mejorar")) {
      return {
        texto: `🚀 **Recomendaciones de Optimización**

**Oportunidades Identificadas:**
1. **Automatizar Reportes** - ROI: 180%
   - Ahorro: 12 horas/semana
   - Esfuerzo: Medio

2. **Integración ERP** - ROI: 250%
   - Mejora trazabilidad: +45%
   - Esfuerzo: Alto

3. **Auditorías Digitales** - ROI: 120%
   - Reducción tiempo: -30%
   - Esfuerzo: Bajo

¿Quieres que desarrolle alguna de estas recomendaciones?`,
        herramientas: ["optimización", "análisis"]
      };
    }
    
    if (mensajeLower.includes("riesgo") || mensajeLower.includes("problema")) {
      return {
        texto: `⚠️ **Análisis de Riesgos Detectados**

**Riesgos Críticos:**
• **ISO 22000:** Riesgo de incumplimiento en 20 días
• **Capacitación:** 15 empleados sin actualizar
• **Documentación:** 3 procedimientos obsoletos

**Predicciones IA:**
• Incremento 15% demanda auditorías Q2
• Oportunidad reducir costos 22%
• Tendencia positiva satisfacción cliente (+12%)

**Acciones Recomendadas:**
1. Renovar certificación ISO 22000 inmediatamente
2. Programar capacitación urgente
3. Actualizar procedimientos críticos

¿Implemento un plan de mitigación automático?`,
        herramientas: ["predicción", "análisis"]
      };
    }
    
    if (mensajeLower.includes("capacitación") || mensajeLower.includes("entrenamiento")) {
      return {
        texto: `🎓 **Plan de Capacitación Inteligente**

**Estado Actual:**
- 78% cumplimiento general
- 15 empleados pendientes
- 5 cursos próximos a vencer

**Recomendaciones Personalizadas:**
• **Producción:** Seguridad Industrial (Urgente)
• **Calidad:** ISO 9001 Actualización
• **RRHH:** Liderazgo y Gestión
• **Mantenimiento:** Procedimientos Técnicos

**Plan Sugerido:**
- Semana 1-2: Capacitación seguridad (20 personas)
- Semana 3-4: Actualización ISO (12 personas)
- Mes 2: Programa liderazgo (8 personas)

¿Programo estas capacitaciones automáticamente?`,
        herramientas: ["capacitación", "planificación"]
      };
    }
    
    return {
      texto: `🤖 Entiendo tu consulta. Como tu Asistente IA especializado en QMS, puedo ayudarte con:

**Análisis Avanzado:**
• Estado de cumplimiento normativo
• Identificación de riesgos y oportunidades
• Predicciones basadas en IA

**Optimización Inteligente:**
• Automatización de procesos
• Mejora de eficiencia operativa
• Reducción de costos

**Gestión Proactiva:**
• Monitoreo continuo de KPIs
• Alertas tempranas
• Planes de acción automatizados

¿En qué área específica te gustaría que me enfoque?`,
      herramientas: ["análisis", "optimización", "monitoreo"]
    };
  };

  const usarPreguntaRapida = (pregunta) => {
    setMensajeActual(pregunta);
  };

  const ejecutarHerramienta = (herramienta) => {
    setHerramientaActiva(herramienta);
    setAnalizandoDatos(true);
    
    setTimeout(() => {
      const mensajeHerramienta = {
        id: Date.now(),
        tipo: "asistente",
        contenido: `🔧 **${herramienta.nombre} Ejecutado**\n\n${herramienta.descripcion}\n\nAnálisis completado exitosamente. Los resultados han sido procesados y están disponibles en el dashboard.`,
        timestamp: new Date(),
        herramientas: [herramienta.categoria.toLowerCase()]
      };
      
      setMensajes(prev => [...prev, mensajeHerramienta]);
      setAnalizandoDatos(false);
      setHerramientaActiva(null);
    }, 2000);
  };

  const realizarAnalisisCompleto = () => {
    setAnalizandoDatos(true);
    setTimeout(() => {
      const mensajeAnalisis = {
        id: Date.now(),
        tipo: "asistente",
        contenido: `🔍 **Análisis Completo del Sistema QMS**

**Puntuación General: 85/100** (+7% vs mes anterior)

**Áreas Evaluadas:**
• **Documentación:** 92% ✅ Excelente
• **Capacitación:** 78% ⚠️ Requiere mejora
• **Auditorías:** 88% ✅ Muy bueno
• **Cumplimiento:** 85% ✅ Bueno

**Hallazgos Clave:**
• 3 certificaciones próximas a vencer
• Oportunidad de automatización (ROI 180%)
• Tendencia positiva en satisfacción cliente

**Recomendaciones Prioritarias:**
1. Renovar certificaciones urgentemente
2. Implementar automatización de reportes
3. Reforzar capacitación en áreas críticas

**Predicciones IA:**
• Incremento 15% demanda Q2
• Posible ahorro 22% optimizando procesos
• Riesgo medio en ISO 22000

¿Quieres que implemente alguna recomendación automáticamente?`,
        timestamp: new Date(),
        herramientas: ["análisis-completo", "predicción", "optimización"]
      };
      
      setMensajes(prev => [...prev, mensajeAnalisis]);
      setAnalizandoDatos(false);
    }, 3000);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-indigo-600" />
            Asistente IA Capacit.io
          </h1>
          <p className="text-muted-foreground">Tu asistente inteligente especializado en Sistemas de Gestión de Calidad con capacidades avanzadas de análisis y optimización.</p>
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
            Exportar Sesión
          </Button>
        </div>
      </div>

      {/* Estado del sistema */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado General</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analisisInteligente.estadoGeneral.puntuacion}%</div>
            <Progress value={analisisInteligente.estadoGeneral.puntuacion} className="h-2 mt-2" />
            <p className="text-xs text-green-600 mt-1">
              {analisisInteligente.estadoGeneral.cambio} vs mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{analisisInteligente.alertasCriticas.length}</div>
            <p className="text-xs text-muted-foreground">requieren atención</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recomendaciones</CardTitle>
            <Lightbulb className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{analisisInteligente.recomendacionesIA.length}</div>
            <p className="text-xs text-muted-foreground">oportunidades de mejora</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">183%</div>
            <p className="text-xs text-muted-foreground">de las recomendaciones</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Principal */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversación con IA
              </CardTitle>
              <CardDescription>
                Pregunta sobre análisis, optimización, cumplimiento y más
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                <div className="space-y-4">
                  {mensajes.map((mensaje) => (
                    <div key={mensaje.id} className={`flex ${mensaje.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[85%] ${mensaje.tipo === 'usuario' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {mensaje.tipo === 'usuario' ? 'TU' : <Bot className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${
                          mensaje.tipo === 'usuario' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{mensaje.contenido}</p>
                          {mensaje.herramientas && mensaje.herramientas.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {mensaje.herramientas.map((herramienta, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {herramienta}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <p className="text-xs mt-2 opacity-70">
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
                            <span className="text-sm">Analizando con IA...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="mt-4 space-y-3">
                {/* Preguntas rápidas */}
                <div className="flex flex-wrap gap-2">
                  {preguntasRapidas.slice(0, 3).map((pregunta, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => usarPreguntaRapida(pregunta)}
                      className="text-xs"
                    >
                      {pregunta}
                    </Button>
                  ))}
                </div>
                
                {/* Input de mensaje */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Pregunta sobre análisis, cumplimiento, optimización..."
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
          {/* Herramientas IA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Herramientas IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {herramientasIA.slice(0, 4).map((herramienta) => (
                  <div 
                    key={herramienta.nombre}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => ejecutarHerramienta(herramienta)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <herramienta.icono className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{herramienta.nombre}</div>
                        <div className="text-xs text-muted-foreground">{herramienta.descripcion}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">{herramienta.categoria}</Badge>
                      <span>{herramienta.ultimoUso}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alertas Críticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alertas Críticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analisisInteligente.alertasCriticas.map((alerta, idx) => (
                  <Alert key={idx}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <div className="font-medium">{alerta.mensaje}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alerta.accion}</div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recomendaciones IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Recomendaciones Inteligentes
          </CardTitle>
          <CardDescription>
            Sugerencias basadas en análisis de IA para optimizar tu sistema QMS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {analisisInteligente.recomendacionesIA.map((recomendacion) => (
              <Card key={recomendacion.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline">{recomendacion.categoria}</Badge>
                      <CardTitle className="text-lg mt-2">{recomendacion.titulo}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">ROI: {recomendacion.roi}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{recomendacion.descripcion}</p>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex gap-2">
                      <Badge variant="secondary">Impacto: {recomendacion.impacto}</Badge>
                      <Badge variant="outline">Esfuerzo: {recomendacion.esfuerzo}</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      Implementar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predicciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Predicciones y Tendencias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
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
    </div>
  );
} 