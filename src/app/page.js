"use client";

import { Card, CardHeader, CardContent } from "@/components/Card";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
} from "@/components/Modal";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <Card className="w-full max-w-md">
        <CardHeader>Card Header</CardHeader>
        <CardContent>
          Este es el contenido de la card. Aquí va la información o los
          elementos de la fase de Análisis.
        </CardContent>
      </Card>

      <Modal trigger="Abrir Modal">
        <ModalHeader>Título del Modal</ModalHeader>
        <ModalContent>
          Contenido del modal. Aquí puede ir cualquier cosa — textos, inputs,
          opciones, etc.
        </ModalContent>
        <ModalActions>
          <button className="cursor-pointer px-4 py-2 text-sm font-semibold rounded-md hover:bg-muted transition-colors">
            Cancelar
          </button>
          <button className="cursor-pointer px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
            Confirmar
          </button>
        </ModalActions>
      </Modal>
    </div>
  );
}
