"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/Card";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
} from "@/components/Modal";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import { useAnalysisStore } from "@/modules/Analysis/store";

export function ProblemStatementCard() {
  const problemStatement = useAnalysisStore((state) => state.problemStatement);
  const tokens = useAnalysisStore((state) => state.tokens);
  const setProblemStatement = useAnalysisStore(
    (state) => state.setProblemStatement,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState("");

  const handleOpenChange = useCallback(
    (open) => {
      if (open) setEditText(problemStatement);
      setIsModalOpen(open);
    },
    [problemStatement],
  );

  const handleAccept = useCallback(() => {
    setProblemStatement(editText);
    setIsModalOpen(false);
  }, [editText, setProblemStatement]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="text-lg font-semibold">Enunciado del problema</span>
        <Modal
          trigger="Editar"
          variant="outline"
          size="sm"
          isOpen={isModalOpen}
          onOpenChange={handleOpenChange}
        >
          <ModalHeader>Editar Enunciado</ModalHeader>
          <ModalContent className="flex flex-col gap-4 p-4">
            <TextArea
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              placeholder="Escribe aquí el enunciado del problema..."
              className="min-h-50"
            />
          </ModalContent>
          <ModalActions>
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAccept}>
              Aceptar
            </Button>
          </ModalActions>
        </Modal>
      </div>
      <CardContent>
        {tokens.length > 0 ? (
          <div className="flex flex-wrap">
            {tokens.map((token) => (
              <span
                key={token.id}
                className="cursor-pointer rounded-sm px-2 py-1 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {token.text}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aún no has definido el enunciado del problema.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
