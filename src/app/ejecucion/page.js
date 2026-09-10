"use client";

import { useEffect, useMemo, useState } from "react";
import { Boton, Card, PageHeader } from "../../components/ui";
import FormatoEditor from "./Editor";
import { FORMATOS, evaluate, formatTitle, newDocument } from "./formatos";

const STORAGE_KEY = "proyectos-ei-ejecucion-v1";

const ICONS = {
  clipboard: "M9 5h6M9 3h6a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v12H3V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2ZM8 12h8M8 16h5",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13ZM4 6.5A2.5 2.5 0 0 1 6.5 9H20",
  box: "M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v9",
  layers: "m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5",
  wrench: "M14.5 5.5a4 4 0 0 1-5 5L4 16l4 4 5.5-5.5a4 4 0 0 1 5-5l-2.5-2.5 2-2-2-2-2 2-2.5-2.5Z",
  calculator: "M5 3h14v18H5zM8 7h8M8 12h1M12 12h1M16 12h1M8 16h1M12 16h1M16 16h1",
  check: "M20 6 9 17l-5-5M4 4h16v16H4z",
};

function Icon({ name, size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>;
}

function StatusBadge({ status }) {
  const cls = status.includes("REVISAR")
    ? "bg-red-50 text-red-700"
    : status.includes("LISTO") || status === "CERRADO" || status === "RETIRADO"
      ? "bg-[#eaf3ee] text-[#0f6e56]"
      : status.includes("PROCESO") || status.includes("TENENCIA") || status.includes("DILIGENCIAMIENTO")
        ? "bg-[#fdf6dd] text-[#7a5c00]"
        : "bg-[#f0f1f2] text-[#5c6066]";
  return <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold ${cls}`}>{status}</span>;
}

function Kpi({ label, value, description, accent }) {
  return <Card className={`p-4 ${accent ? "border-amarillo" : ""}`}><div className="text-xs text-gray-500">{label}</div><div className="text-2xl font-extrabold text-azul mt-1">{value}</div><div className="text-[11px] text-gray-400 mt-1">{description}</div></Card>;
}

function fecha(s) {
  if (!s) return "—";
  return new Date(s).toLocaleString("es-CO", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function EjecucionPage() {
  const [docs, setDocs] = useState([]);
  const [ready, setReady] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setDocs(Array.isArray(parsed) ? parsed : []);
    } catch {
      setDocs([]);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(docs)); } catch { /* almacenamiento no disponible */ }
  }, [docs, ready]);

  const editing = useMemo(() => docs.find((d) => d.id === editingId) || null, [docs, editingId]);
  const evaluations = useMemo(() => docs.map((d) => ({ id: d.id, result: evaluate(d.formatId, d.data) })), [docs]);
  const readyCount = evaluations.filter((x) => x.result.status.includes("LISTO") || x.result.status === "CERRADO").length;
  const reviewCount = evaluations.filter((x) => x.result.status.includes("REVISAR")).length;
  const avgProgress = evaluations.length ? Math.round(evaluations.reduce((s, x) => s + x.result.progress, 0) / evaluations.length * 100) : 0;

  function create(formatId) {
    const doc = newDocument(formatId);
    setDocs((prev) => [doc, ...prev]);
    setEditingId(doc.id);
  }

  function update(doc) {
    setDocs((prev) => prev.map((d) => d.id === doc.id ? doc : d));
  }

  function remove(id) {
    if (!window.confirm("¿Eliminar este registro de ejecución? Esta acción no se puede deshacer en este navegador.")) return;
    setDocs((prev) => prev.filter((d) => d.id !== id));
    if (editingId === id) setEditingId(null);
  }

  if (editing) {
    return <FormatoEditor document={editing} onChange={update} onBack={() => setEditingId(null)} onDelete={() => remove(editing.id)} />;
  }

  const selected = FORMATOS.find((f) => f.id === selectedFormat);
  if (selected) {
    const records = docs.filter((d) => d.formatId === selected.id).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return (
      <div className="max-w-6xl mx-auto">
        <button onClick={() => setSelectedFormat(null)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-azul hover:underline mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Volver a Ejecución
        </button>
        <PageHeader titulo={selected.nombre} subtitulo={`${selected.codigo} · ${selected.descripcion}`} acciones={<Boton onClick={() => create(selected.id)}>+ Nuevo registro</Boton>} />

        {!ready ? <div className="skeleton h-40 rounded-xl" /> : records.length === 0 ? (
          <Card className="p-10 text-center animate-slide-up">
            <div className="h-12 w-12 rounded-xl bg-azul-soft text-azul grid place-items-center mx-auto mb-4"><Icon name={selected.icono} /></div>
            <h2 className="font-bold text-[#1a1a1a]">Aún no hay registros</h2>
            <p className="text-sm text-gray-500 mt-1 mb-5">Crea el primero y el control automático te guiará durante el diligenciamiento.</p>
            <Boton onClick={() => create(selected.id)}>Crear registro</Boton>
          </Card>
        ) : (
          <div className="space-y-3">
            {records.map((d) => {
              const r = evaluate(d.formatId, d.data);
              return <Card key={d.id} className="p-4 animate-slide-up card-hover">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="h-10 w-10 rounded-xl bg-azul-soft text-azul grid place-items-center shrink-0"><Icon name={selected.icono} size={19} /></div>
                  <div className="flex-1 min-w-[220px]"><div className="font-semibold text-[14px] text-[#1a1a1a]">{formatTitle(d.formatId, d.data)}</div><div className="text-[11px] text-gray-400 mt-0.5">Actualizado {fecha(d.updatedAt)}</div></div>
                  <div className="w-36"><div className="flex justify-between text-[10px] text-gray-400 mb-1"><span>Completitud</span><span>{Math.round(r.progress * 100)}%</span></div><div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-azul" style={{ width: `${Math.round(r.progress * 100)}%` }} /></div></div>
                  <StatusBadge status={r.status} />
                  <div className="flex gap-2"><Boton size="sm" onClick={() => setEditingId(d.id)}>Abrir</Boton><Boton size="sm" variant="ghost" onClick={() => remove(d.id)}>Eliminar</Boton></div>
                </div>
              </Card>;
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader titulo="Ejecución" subtitulo="Control operativo, trazabilidad y cierre documental de los proyectos" />

      <Card className="p-4 mb-6 border-l-4 border-l-amarillo animate-fade-in">
        <div className="flex gap-3 items-start">
          <div className="h-9 w-9 rounded-lg bg-[#fff8cf] text-[#8a7400] grid place-items-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h.01M10.3 4.6 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0Z" /></svg>
          </div>
          <div><div className="text-sm font-bold text-[#1a1a1a]">Formatos digitalizados con control automático</div><p className="text-xs text-gray-500 mt-1 leading-relaxed">Los siete formatos de ejecución conservan la lógica de los Excel originales y añaden validación en línea, estados, cálculos y preparación para impresión/PDF. Los borradores de esta primera versión se guardan únicamente en el navegador actual.</p></div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <Kpi label="Registros" value={docs.length} description="Formatos creados" />
        <Kpi label="Listos" value={readyCount} description="Sin bloqueos de control" accent />
        <Kpi label="Por revisar" value={reviewCount} description="Con inconsistencias" />
        <Kpi label="Avance promedio" value={`${avgProgress}%`} description="Completitud documental" />
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-bold text-[#1a1a1a]">Biblioteca de formatos</h2>
        <p className="text-xs text-gray-500 mt-1">Organizados según el ciclo de ejecución: inicio, seguimiento, abastecimiento, activos y cierre.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {FORMATOS.map((f, i) => {
          const records = docs.filter((d) => d.formatId === f.id);
          const latest = [...records].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
          const latestState = latest ? evaluate(latest.formatId, latest.data).status : null;
          return <button type="button" key={f.id} onClick={() => setSelectedFormat(f.id)} className="text-left group bg-white border border-[#e5e7eb] rounded-xl p-5 hover:border-azul hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 animate-slide-up" style={{ animationDelay: `${i * 0.045}s` }}>
            <div className="flex items-start justify-between gap-3 mb-4"><div className="h-11 w-11 rounded-xl bg-azul-soft text-azul grid place-items-center group-hover:bg-azul group-hover:text-white transition-colors"><Icon name={f.icono} /></div><span className="text-[10px] font-bold text-gray-500 bg-[#f4f5f7] rounded-full px-2.5 py-1">{f.codigo}</span></div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-azul/70 mb-1">{f.etapa}</div><h3 className="text-[15px] font-bold text-[#1a1a1a]">{f.nombre}</h3><p className="text-xs text-gray-500 mt-1.5 leading-relaxed min-h-[48px]">{f.descripcion}</p>
            <div className="border-t border-[#eef0f2] mt-4 pt-3 flex items-center justify-between gap-2"><span className="text-[11px] text-gray-400">{records.length} {records.length === 1 ? "registro" : "registros"}</span>{latestState ? <StatusBadge status={latestState} /> : <span className="text-[11px] font-semibold text-azul">Abrir →</span>}</div>
          </button>;
        })}
      </div>

      <Card className="mt-7 p-5 animate-slide-up">
        <div className="grid md:grid-cols-[auto_1fr] gap-4 items-start">
          <div className="h-10 w-10 rounded-xl bg-[#eaf3ee] text-[#0f6e56] grid place-items-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4ZM9 12l2 2 4-4" /></svg></div>
          <div><h3 className="text-sm font-bold text-[#1a1a1a]">Lógica de control incorporada</h3><p className="text-xs text-gray-500 mt-1 leading-relaxed">El sistema evita sobreconsumos, fechas incoherentes, devoluciones sin trazabilidad, adicionales sin aprobación y cierres incompletos. En la orden de trabajo también exige evaluar los requisitos SST, los peligros y los aspectos ambientales antes de considerar el registro listo para cierre.</p></div>
        </div>
      </Card>
    </div>
  );
}
