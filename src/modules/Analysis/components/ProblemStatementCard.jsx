"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
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

const categoryBgColors = {
  has: "rgba(13, 148, 136, 0.12)",
  seeks: "rgba(217, 119, 6, 0.12)",
  solves: "rgba(225, 29, 72, 0.12)",
  rules: "rgba(99, 102, 241, 0.12)",
};

const categoryBorderColors = {
  has: "rgba(13, 148, 136, 0.7)",
  seeks: "rgba(217, 119, 6, 0.7)",
  solves: "rgba(225, 29, 72, 0.7)",
  rules: "rgba(99, 102, 241, 0.7)",
};

const categoryTextColors = {
  has: "rgb(13, 148, 136)",
  seeks: "rgb(217, 119, 6)",
  solves: "rgb(225, 29, 72)",
  rules: "rgb(99, 102, 241)",
};

export function ProblemStatementCard() {
  const problemStatement = useAnalysisStore((state) => state.problemStatement);
  const tokens = useAnalysisStore((state) => state.tokens);
  const setProblemStatement = useAnalysisStore(
    (state) => state.setProblemStatement,
  );
  const selectedCategoryId = useAnalysisStore(
    (state) => state.selectedCategoryId,
  );
  const assignTokenToCategory = useAnalysisStore(
    (state) => state.assignTokenToCategory,
  );
  const mergeTokenRange = useAnalysisStore((state) => state.mergeTokenRange);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [selectionRange, setSelectionRange] = useState(null);

  const isDragging = useRef(false);
  const dragStartIndex = useRef(null);

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

  const handleTokenClick = useCallback(
    (tokenId) => {
      if (selectedCategoryId) {
        assignTokenToCategory(tokenId, selectedCategoryId);
      }
    },
    [selectedCategoryId, assignTokenToCategory],
  );

  const handlePointerDown = useCallback((index) => {
    isDragging.current = true;
    dragStartIndex.current = index;
    setSelectionRange({ start: index, end: index });
  }, []);

  const handlePointerEnter = useCallback((index) => {
    if (!isDragging.current) return;
    setSelectionRange({
      start: dragStartIndex.current,
      end: index,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const start = dragStartIndex.current;
    const end = selectionRange?.end ?? start;
    const lo = Math.min(start, end);
    const hi = Math.max(start, end);

    setSelectionRange(null);
    dragStartIndex.current = null;

    if (lo !== hi && selectedCategoryId) {
      mergeTokenRange(lo, hi, selectedCategoryId);
    }
  }, [selectionRange, selectedCategoryId, mergeTokenRange]);

  const isInRange = useCallback(
    (index) => {
      if (!selectionRange) return false;
      const lo = Math.min(selectionRange.start, selectionRange.end);
      const hi = Math.max(selectionRange.start, selectionRange.end);
      return index >= lo && index <= hi;
    },
    [selectionRange],
  );

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
          <div className="flex flex-wrap gap-y-1" onPointerUp={handlePointerUp}>
            {tokens.map((token, index) => {
              const selected = isInRange(index);
              return (
                <span
                  key={token.id}
                  onClick={() => handleTokenClick(token.id)}
                  onPointerDown={() => handlePointerDown(index)}
                  onPointerEnter={() => handlePointerEnter(index)}
                  className={cn(
                    "cursor-pointer rounded-sm px-2 py-1 text-sm font-semibold transition-colors select-none",
                    token.categoryId && !selected && "border",
                    selected && "bg-accent text-accent-foreground",
                    !token.categoryId &&
                      !selected &&
                      "text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                  style={
                    token.categoryId && !selected
                      ? {
                          backgroundColor: categoryBgColors[token.categoryId],
                          borderColor: categoryBorderColors[token.categoryId],
                          color: categoryTextColors[token.categoryId],
                        }
                      : undefined
                  }
                >
                  {token.text}
                </span>
              );
            })}
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
