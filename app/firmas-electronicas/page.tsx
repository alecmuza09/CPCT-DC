import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, CheckCircle, Clock, Download, PenLine } from "lucide-react";

const firmas = [
  { documento: "Contrato de Proveedor", responsable: "María González", estado: "Pendiente", fecha: "2024-06-01" },
  { documento: "Acta de Comité", responsable: "Carlos Ruiz", estado: "Firmado", fecha: "2024-05-28" },
  { documento: "Acuerdo de Confidencialidad", responsable: "Ana López", estado: "Pendiente", fecha: "2024-05-20" },
  { documento: "Política de Seguridad", responsable: "Juan Pérez", estado: "Firmado", fecha: "2024-05-15" },
];

export default function FirmasElectronicasPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Firmas Electrónicas</h1>
          <p className="text-muted-foreground">Gestiona y realiza firmas electrónicas de documentos importantes.</p>
        </div>
        <Button>
          <PenLine className="mr-2 h-4 w-4" /> Nueva Firma
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Documentos</CardTitle>
            <CardDescription>Documentos que requieren firma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{firmas.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Firmados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{firmas.filter(f => f.estado === "Firmado").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{firmas.filter(f => f.estado === "Pendiente").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentos Pendientes de Firma</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {firmas.map((firma, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" /> {firma.documento}
                  </TableCell>
                  <TableCell>{firma.responsable}</TableCell>
                  <TableCell>
                    {firma.estado === "Firmado" ? (
                      <span className="flex items-center gap-1 text-green-600"><CheckCircle className="h-4 w-4" /> Firmado</span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600"><Clock className="h-4 w-4" /> Pendiente</span>
                    )}
                  </TableCell>
                  <TableCell>{firma.fecha}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" title="Descargar">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 