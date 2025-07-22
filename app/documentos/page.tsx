"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Search, Plus } from "lucide-react";

const documentosSimulados = [
  { nombre: "Manual de Calidad", tipo: "Manual", fecha: "2024-06-01", estado: "Aprobado" },
  { nombre: "Procedimiento de Compras", tipo: "Procedimiento", fecha: "2024-05-28", estado: "En revisión" },
  { nombre: "Instrucción de Limpieza", tipo: "Instrucción", fecha: "2024-05-20", estado: "Aprobado" },
  { nombre: "Política Ambiental", tipo: "Política", fecha: "2024-05-15", estado: "Obsoleto" },
  { nombre: "Reglamento Interno", tipo: "Reglamento", fecha: "2024-05-10", estado: "Aprobado" },
];

export default function DocumentosPage() {
  const [busqueda, setBusqueda] = useState("");
  const documentosFiltrados = documentosSimulados.filter(doc =>
    doc.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documentos</h1>
          <p className="text-muted-foreground">Consulta, filtra y descarga los documentos disponibles.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Documento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">No se encontraron documentos.</TableCell>
                </TableRow>
              ) : (
                documentosFiltrados.map((doc, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" /> {doc.nombre}
                    </TableCell>
                    <TableCell>{doc.tipo}</TableCell>
                    <TableCell>{doc.fecha}</TableCell>
                    <TableCell>{doc.estado}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" title="Descargar">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 