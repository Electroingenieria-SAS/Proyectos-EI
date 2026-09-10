"use client";

import { Card, PageHeader } from "../../components/ui";

export default function EjecucionPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        titulo="Ejecución"
        subtitulo="Módulo de ejecución de Proyectos EI"
      />

      <Card className="p-10 text-center animate-slide-up">
        <div className="h-12 w-12 rounded-xl bg-azul-soft text-azul grid place-items-center mx-auto mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16v16H4zM8 12l2.5 2.5L16 9" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-[#1a1a1a]">Ejecución</h2>
        <p className="text-sm text-gray-500 mt-1.5">
          Módulo listo para desarrollar el flujo de ejecución.
        </p>
      </Card>
    </div>
  );
}
