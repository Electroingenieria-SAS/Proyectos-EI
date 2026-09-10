"use client";

import { useMemo } from "react";
import { Boton, Card, Input, Select } from "../../components/ui";
import {
  ASPECTOS_AMBIENTALES,
  BODEGAS,
  ETAPAS_ACTA,
  FORMATOS,
  RESPUESTAS,
  RESULTADOS_MANTENIMIENTO,
  TIPOS_MANTENIMIENTO,
  TIPOS_OBRA,
  TIPOS_PROYECTO,
  UBICACIONES,
  UNIDADES,
  activityRow,
  addRow,
  evaluate,
  liquidationTotals,
  materialControlRow,
  materialRequestRow,
  money,
  num,
  pct,
  removeNestedRow,
  removeRow,
} from "./formatos";

const inputClass = "w-full";
const textAreaClass = "w-full min-h-[92px] px-3 py-2.5 text-sm bg-white border border-[#d1d5db] rounded-lg outline-none transition focus:border-azul focus:ring-2 focus:ring-azul/25 placeholder:text-gray-400 resize-y";

function Field({ label, required, help, children, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {help && <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{help}</p>}
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return <textarea rows={rows} className={textAreaClass} value={value || ""} onChange={onChange} placeholder={placeholder} />;
}

function Section({ number, title, description, children, defaultOpen = true }) {
  return (
    <details open={defaultOpen} className="group bg-white border border-[#e5e7eb] rounded-xl overflow-hidden animate-slide-up print:border-0 print:rounded-none print:overflow-visible">
      <summary className="list-none cursor-pointer px-5 py-4 flex items-center gap-3 select-none print:cursor-default">
        <div className="h-8 w-8 rounded-lg bg-azul-soft text-azul grid place-items-center text-xs font-extrabold shrink-0">{number}</div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-[#1a1a1a] text-[15px]">{title}</h2>
          {description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>}
        </div>
        <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform print:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
      </summary>
      <div className="border-t border-[#eef0f2] p-5 print:border-0 print:px-0">{children}</div>
    </details>
  );
}

function StatusBadge({ status }) {
  const cls = status.includes("REVISAR")
    ? "bg-red-50 text-red-700 border-red-200"
    : status.includes("LISTO") || status === "CERRADO" || status === "RETIRADO"
      ? "bg-[#eaf3ee] text-[#0f6e56] border-[#cce5da]"
      : status.includes("PROCESO") || status.includes("TENENCIA") || status.includes("DILIGENCIAMIENTO")
        ? "bg-[#fdf6dd] text-[#7a5c00] border-[#f1df97]"
        : "bg-[#f0f1f2] text-[#5c6066] border-[#dfe2e5]";
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${cls}`}>{status}</span>;
}

function Metric({ label, value, accent = false }) {
  return (
    <div className={`rounded-lg border p-3 ${accent ? "border-amarillo bg-[#fffdf1]" : "border-[#e5e7eb] bg-white"}`}>
      <div className="text-[10px] uppercase tracking-wide font-semibold text-gray-400">{label}</div>
      <div className={`text-sm font-bold mt-1 ${accent ? "text-azul" : "text-[#1a1a1a]"}`}>{value}</div>
    </div>
  );
}

function ControlPanel({ result }) {
  const errors = result.alerts.filter((a) => a.level === "error");
  const warnings = result.alerts.filter((a) => a.level !== "error");
  const visible = [...errors, ...warnings].slice(0, 8);
  return (
    <Card className="p-4 sticky top-20 print:hidden">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Control automático</div>
          <div className="mt-1"><StatusBadge status={result.status} /></div>
        </div>
        <div className="text-right">
          <div className="text-xl font-extrabold text-azul">{Math.round(result.progress * 100)}%</div>
          <div className="text-[10px] text-gray-400">completitud</div>
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-azul transition-[width] duration-300" style={{ width: `${Math.round(result.progress * 100)}%` }} />
      </div>
      {visible.length ? (
        <div className="space-y-2">
          {visible.map((a, i) => (
            <div key={`${a.text}-${i}`} className={`text-[11px] leading-relaxed rounded-lg px-2.5 py-2 border ${a.level === "error" ? "bg-red-50 text-red-700 border-red-100" : "bg-amber-50 text-amber-800 border-amber-100"}`}>
              {a.text}
            </div>
          ))}
          {result.alerts.length > visible.length && <div className="text-[11px] text-gray-400 px-1">+ {result.alerts.length - visible.length} validaciones adicionales</div>}
        </div>
      ) : (
        <div className="text-[11px] leading-relaxed rounded-lg px-2.5 py-2 border bg-[#eaf3ee] text-[#0f6e56] border-[#cce5da]">
          Sin inconsistencias detectadas por el control automático.
        </div>
      )}
    </Card>
  );
}

function RowAction({ onClick, title = "Eliminar fila" }) {
  return (
    <button type="button" onClick={onClick} title={title} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition print:hidden">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
    </button>
  );
}

function UnitSelect({ value, onChange, className = "min-w-[90px]" }) {
  return (
    <Select value={value || ""} onChange={onChange} className={className}>
      <option value="">—</option>
      {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
    </Select>
  );
}

function SmallState({ state }) {
  const cls = state === "REVISAR" ? "text-red-700 bg-red-50" : ["OK", "CERRADO", "COMPLETO"].includes(state) ? "text-[#0f6e56] bg-[#eaf3ee]" : "text-[#7a5c00] bg-[#fdf6dd]";
  return <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap ${cls}`}>{state}</span>;
}

function EmptyHint({ children }) {
  return <p className="text-xs text-gray-400 leading-relaxed">{children}</p>;
}

function updateArray(data, key, id, field, value) {
  return { ...data, [key]: (data[key] || []).map((r) => r.id === id ? { ...r, [field]: value } : r) };
}

function updateNestedArray(data, key, id, field, value) {
  return {
    ...data,
    [key]: {
      ...data[key],
      herramientas: (data[key]?.herramientas || []).map((r) => r.id === id ? { ...r, [field]: value } : r),
    },
  };
}

function GeneralGrid({ data, set, fields }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((f) => (
        <Field key={f.key} label={f.label} required={f.required} help={f.help} className={f.span ? "md:col-span-2" : ""}>
          {f.type === "textarea" ? (
            <TextArea value={data[f.key]} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder} />
          ) : f.options ? (
            <Select value={data[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} className={inputClass}>
              <option value="">Selecciona...</option>
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </Select>
          ) : (
            <Input type={f.type || "text"} value={data[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} className={inputClass} placeholder={f.placeholder || ""} />
          )}
        </Field>
      ))}
    </div>
  );
}

function BitacoraForm({ data, setData }) {
  const set = (k, v) => setData({ ...data, [k]: v });
  const upd = (id, k, v) => setData(updateArray(data, "cantidades", id, k, v));
  return (
    <div className="space-y-5">
      <Section number="01" title="Identificación de la jornada" description="Datos mínimos para ubicar la bitácora en proyecto, fecha y equipo ejecutor.">
        <GeneralGrid data={data} set={set} fields={[
          { key: "fecha", label: "Fecha", type: "date", required: true },
          { key: "proyecto", label: "Nombre del proyecto", required: true, placeholder: "Proyecto / obra" },
          { key: "integrantes", label: "Integrantes de la cuadrilla", required: true, type: "textarea", span: true, placeholder: "Nombres y/o cargos de quienes participaron" },
          { key: "responsable", label: "Responsable de obra", placeholder: "Opcional" },
          { key: "tercero", label: "Interventoría / tercero", placeholder: "Opcional" },
        ]} />
      </Section>
      <Section number="02" title="Registro diario" description="Deje evidencia de lo ocurrido, lo ejecutado y lo que queda pendiente.">
        <div className="grid grid-cols-1 gap-4">
          <Field label="Novedades relevantes" required help="Si no hubo novedades, registre “Sin novedades”."><TextArea value={data.novedades} onChange={(e) => set("novedades", e.target.value)} placeholder="Novedades de seguridad, calidad, acceso, clima, suministro, cambios, interferencias..." /></Field>
          <Field label="Procedimiento / actividades ejecutadas" required><TextArea value={data.procedimiento} onChange={(e) => set("procedimiento", e.target.value)} placeholder="Describa qué se ejecutó durante la jornada y cómo se realizó." /></Field>
          <Field label="Actividades pendientes" required help="Si no quedan pendientes, registre “Sin pendientes”."><TextArea value={data.pendientes} onChange={(e) => set("pendientes", e.target.value)} placeholder="Pendientes, restricciones, compromisos o siguiente frente de trabajo." /></Field>
        </div>
      </Section>
      <Section number="03" title="Cantidades ejecutadas" description="Registre cantidades instaladas o ejecutadas con su unidad de medida.">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[760px]">
            <thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]"><th className="py-2 pr-2">Descripción / material</th><th className="py-2 px-2 w-32">Cantidad</th><th className="py-2 px-2 w-28">U/M</th><th className="py-2 px-2">Observaciones</th><th className="w-10"></th></tr></thead>
            <tbody>{data.cantidades.map((r) => <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0">
              <td className="py-2 pr-2"><Input value={r.descripcion} onChange={(e) => upd(r.id, "descripcion", e.target.value)} className="w-full" /></td>
              <td className="py-2 px-2"><Input type="number" min="0" value={r.cantidad} onChange={(e) => upd(r.id, "cantidad", e.target.value)} className="w-full" /></td>
              <td className="py-2 px-2"><UnitSelect value={r.unidad} onChange={(e) => upd(r.id, "unidad", e.target.value)} className="w-full" /></td>
              <td className="py-2 px-2"><Input value={r.observaciones} onChange={(e) => upd(r.id, "observaciones", e.target.value)} className="w-full" /></td>
              <td><RowAction onClick={() => setData(removeRow(data, "cantidades", r.id))} /></td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className="mt-3 print:hidden"><Boton variant="secondary" size="sm" onClick={() => setData(addRow("bitacora", data))}>+ Agregar cantidad</Boton></div>
      </Section>
    </div>
  );
}

function SolicitudMaterialesForm({ data, setData }) {
  const set = (k, v) => setData({ ...data, [k]: v });
  const upd = (id, k, v) => setData(updateArray(data, "filas", id, k, v));
  return (
    <div className="space-y-5">
      <Section number="01" title="Contexto de la solicitud" description="Identificación operativa añadida para que cada solicitud quede asociada a una obra y solicitante.">
        <GeneralGrid data={data} set={set} fields={[
          { key: "proyecto", label: "Proyecto", placeholder: "Proyecto / obra" },
          { key: "centroCosto", label: "Centro de costo" },
          { key: "solicitante", label: "Solicitante" },
          { key: "fechaSolicitud", label: "Fecha de solicitud", type: "date" },
        ]} />
      </Section>
      <Section number="02" title="Materiales" description="El saldo y el estado se calculan automáticamente; no deben digitarse manualmente.">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[1250px]">
            <thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]">
              <th className="py-2 pr-2 min-w-[220px]">Descripción</th><th className="py-2 px-2 w-28">U/M</th><th className="py-2 px-2">Solicitada</th><th className="py-2 px-2">Facturada</th><th className="py-2 px-2">Utilizada</th><th className="py-2 px-2">Devuelta</th><th className="py-2 px-2 min-w-[130px]">No. factura</th><th className="py-2 px-2 min-w-[130px]">No. devolución</th><th className="py-2 px-2 min-w-[180px]">Observaciones</th><th className="py-2 px-2">Saldo</th><th className="py-2 px-2">Estado</th><th className="w-10"></th>
            </tr></thead>
            <tbody>{data.filas.map((r) => { const c = materialRequestRow(r); return <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0 align-top">
              <td className="py-2 pr-2"><Input value={r.descripcion} onChange={(e) => upd(r.id, "descripcion", e.target.value)} className="w-full" /></td>
              <td className="py-2 px-2"><UnitSelect value={r.unidad} onChange={(e) => upd(r.id, "unidad", e.target.value)} className="w-full" /></td>
              {["solicitada", "facturada", "utilizada", "devuelta"].map((k) => <td key={k} className="py-2 px-2"><Input type="number" min="0" value={r[k]} onChange={(e) => upd(r.id, k, e.target.value)} className="w-24" /></td>)}
              <td className="py-2 px-2"><Input value={r.factura} onChange={(e) => upd(r.id, "factura", e.target.value)} className="w-full" /></td>
              <td className="py-2 px-2"><Input value={r.devolucion} onChange={(e) => upd(r.id, "devolucion", e.target.value)} className="w-full" /></td>
              <td className="py-2 px-2"><Input value={r.observaciones} onChange={(e) => upd(r.id, "observaciones", e.target.value)} className="w-full" /></td>
              <td className="py-3 px-2 font-bold text-azul whitespace-nowrap">{c.saldo.toLocaleString("es-CO")}</td>
              <td className="py-2 px-2"><SmallState state={c.estado} />{c.alerta && <div className="text-[10px] text-gray-400 mt-1 max-w-[150px]">{c.alerta}</div>}</td>
              <td className="py-2"><RowAction onClick={() => setData(removeRow(data, "filas", r.id))} /></td>
            </tr>; })}</tbody>
          </table>
        </div>
        <div className="mt-3 print:hidden"><Boton variant="secondary" size="sm" onClick={() => setData(addRow("solicitud-materiales", data))}>+ Agregar material</Boton></div>
      </Section>
    </div>
  );
}

function ControlMaterialForm({ data, setData }) {
  const set = (k, v) => setData({ ...data, [k]: v });
  const upd = (id, k, v) => setData(updateArray(data, "filas", id, k, v));
  return (
    <div className="space-y-5">
      <Section number="01" title="Datos de obra" description="Campos obligatorios del formato P-F-7 para identificar el destino del material.">
        <GeneralGrid data={data} set={set} fields={[
          { key: "proyecto", label: "Proyecto", required: true },
          { key: "fechaInicio", label: "Fecha de inicio de obra", type: "date", required: true },
          { key: "destino", label: "Destino", required: true },
          { key: "sucursal", label: "Sucursal", required: true },
        ]} />
      </Section>
      <Section number="02" title="Trazabilidad del material" description="El aplicativo valida cronología, responsables y conciliación. Saldo = cantidad − utilizada − devuelta.">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[1850px]">
            <thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]">
              {['Factura','Bodega','Requisición','Código','Descripción','U/M','Cant.','Fecha req.','Fecha ent.','Entregado por','Recibido por','Utilizada','Devuelta','Fecha dev.','Saldo','Estado'].map((h) => <th key={h} className="py-2 px-2 first:pl-0">{h}</th>)}<th className="w-10"></th>
            </tr></thead>
            <tbody>{data.filas.map((r) => { const c = materialControlRow(r); return <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0 align-top">
              <td className="py-2 pr-2"><Input value={r.factura} onChange={(e) => upd(r.id, "factura", e.target.value)} className="w-28" /></td>
              <td className="py-2 px-2"><Select value={r.bodega} onChange={(e) => upd(r.id, "bodega", e.target.value)} className="w-28"><option value="">—</option>{BODEGAS.map((b) => <option key={b}>{b}</option>)}</Select></td>
              <td className="py-2 px-2"><Input value={r.requisicion} onChange={(e) => upd(r.id, "requisicion", e.target.value)} className="w-28" /></td>
              <td className="py-2 px-2"><Input value={r.codigo} onChange={(e) => upd(r.id, "codigo", e.target.value)} className="w-28" /></td>
              <td className="py-2 px-2"><Input value={r.descripcion} onChange={(e) => upd(r.id, "descripcion", e.target.value)} className="w-56" /></td>
              <td className="py-2 px-2"><UnitSelect value={r.unidad} onChange={(e) => upd(r.id, "unidad", e.target.value)} className="w-24" /></td>
              <td className="py-2 px-2"><Input type="number" min="0" value={r.cantidad} onChange={(e) => upd(r.id, "cantidad", e.target.value)} className="w-24" /></td>
              {["fechaReq", "fechaEnt"].map((k) => <td key={k} className="py-2 px-2"><Input type="date" value={r[k]} onChange={(e) => upd(r.id, k, e.target.value)} className="w-36" /></td>)}
              <td className="py-2 px-2"><Input value={r.entregadoPor} onChange={(e) => upd(r.id, "entregadoPor", e.target.value)} className="w-40" /></td>
              <td className="py-2 px-2"><Input value={r.recibidoPor} onChange={(e) => upd(r.id, "recibidoPor", e.target.value)} className="w-40" /></td>
              {["utilizada", "devuelta"].map((k) => <td key={k} className="py-2 px-2"><Input type="number" min="0" value={r[k]} onChange={(e) => upd(r.id, k, e.target.value)} className="w-24" /></td>)}
              <td className="py-2 px-2"><Input type="date" value={r.fechaDev} onChange={(e) => upd(r.id, "fechaDev", e.target.value)} className="w-36" /></td>
              <td className="py-3 px-2 font-bold text-azul whitespace-nowrap">{c.saldo.toLocaleString("es-CO")}</td>
              <td className="py-2 px-2"><SmallState state={c.estado} />{c.alerta && <div className="text-[10px] text-gray-400 mt-1 max-w-[150px]">{c.alerta}</div>}</td>
              <td className="py-2"><RowAction onClick={() => setData(removeRow(data, "filas", r.id))} /></td>
            </tr>; })}</tbody>
          </table>
        </div>
        <div className="mt-3 print:hidden"><Boton variant="secondary" size="sm" onClick={() => setData(addRow("control-material", data))}>+ Agregar línea</Boton></div>
      </Section>
    </div>
  );
}

function ToggleTypes({ selected = [], onChange }) {
  const toggle = (t) => onChange(selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t]);
  return <div className="flex flex-wrap gap-2">{TIPOS_PROYECTO.map((t) => <button type="button" key={t} onClick={() => toggle(t)} className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${selected.includes(t) ? "bg-azul text-white border-azul" : "bg-white text-gray-600 border-[#d1d5db] hover:border-azul"}`}>{t}</button>)}</div>;
}

function OrdenTrabajoForm({ data, setData }) {
  const set = (k, v) => setData({ ...data, [k]: v });
  const updAct = (id, k, v) => setData(updateArray(data, "actividades", id, k, v));
  const updReq = (id, k, v) => setData(updateArray(data, "requisitosLugar", id, k, v));
  const updPeligro = (id, k, v) => setData(updateArray(data, "peligros", id, k, v));
  const updAspecto = (id, k, v) => setData(updateArray(data, "aspectos", id, k, v));
  const peligrosEvaluados = data.peligros.filter((r) => r.presente).length;
  const aspectosEvaluados = data.aspectos.filter((r) => r.aplica).length;
  return (
    <div className="space-y-5">
      <Section number="01" title="Orden de trabajo" description="Defina qué se ejecutará, para quién, en qué periodo y bajo responsabilidad de quién.">
        <GeneralGrid data={data} set={set} fields={[
          { key: "proyecto", label: "Proyecto", required: true },
          { key: "centroCosto", label: "Centro de costo", required: true },
          { key: "objetivo", label: "Objetivo / alcance general", required: true, type: "textarea", span: true },
          { key: "cliente", label: "Cliente", required: true },
          { key: "visitaTecnica", label: "Visita técnica / referencia" },
          { key: "fechaInicio", label: "Fecha inicio", type: "date", required: true },
          { key: "fechaFin", label: "Fecha finalización", type: "date", required: true },
          { key: "responsable", label: "Responsable", required: true },
          { key: "autoriza", label: "Autoriza", required: true },
        ]} />
        <div className="mt-5">
          <Field label="Tipo(s) de proyecto" required><ToggleTypes selected={data.tiposProyecto} onChange={(v) => set("tiposProyecto", v)} /></Field>
          {data.tiposProyecto.includes("Otro") && <div className="mt-3"><Input value={data.otroTipo} onChange={(e) => set("otroTipo", e.target.value)} placeholder="Especifique otro tipo" className="w-full" /></div>}
        </div>
      </Section>
      <Section number="02" title="Actividades y cantidades" description="Compare cantidad autorizada vs. ejecutada. Los adicionales deben quedar asociados a una aprobación.">
        <div className="overflow-x-auto"><table className="w-full text-xs min-w-[1200px]">
          <thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]"><th className="py-2 pr-2 min-w-[260px]">Actividad</th><th className="py-2 px-2">U/M</th><th className="py-2 px-2">Planeada</th><th className="py-2 px-2">Ejecutada</th><th className="py-2 px-2">Adicional</th><th className="py-2 px-2 min-w-[160px]">Aprobación adicional</th><th className="py-2 px-2 min-w-[180px]">Observaciones</th><th className="py-2 px-2">Saldo</th><th className="py-2 px-2">Avance</th><th className="py-2 px-2">Estado</th><th></th></tr></thead>
          <tbody>{data.actividades.map((r) => { const c = activityRow(r); return <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0 align-top">
            <td className="py-2 pr-2"><Input value={r.descripcion} onChange={(e) => updAct(r.id, "descripcion", e.target.value)} className="w-full" /></td>
            <td className="py-2 px-2"><UnitSelect value={r.unidad} onChange={(e) => updAct(r.id, "unidad", e.target.value)} className="w-24" /></td>
            {["cantidad","ejecutada","adicional"].map((k) => <td key={k} className="py-2 px-2"><Input type="number" min="0" value={r[k]} onChange={(e) => updAct(r.id, k, e.target.value)} className="w-24" /></td>)}
            <td className="py-2 px-2"><Input value={r.aprobacionAdicional} onChange={(e) => updAct(r.id, "aprobacionAdicional", e.target.value)} className="w-full" placeholder="Acta/correo/OC" /></td>
            <td className="py-2 px-2"><Input value={r.observaciones} onChange={(e) => updAct(r.id, "observaciones", e.target.value)} className="w-full" /></td>
            <td className="py-3 px-2 font-bold text-azul">{c.saldo.toLocaleString("es-CO")}</td><td className="py-3 px-2 font-semibold">{pct(c.porcentaje)}</td><td className="py-2 px-2"><SmallState state={c.estado} /></td>
            <td className="py-2"><RowAction onClick={() => setData(removeRow(data, "actividades", r.id))} /></td>
          </tr>; })}</tbody>
        </table></div>
        <div className="mt-3 print:hidden"><Boton variant="secondary" size="sm" onClick={() => setData(addRow("orden-trabajo", data))}>+ Agregar actividad</Boton></div>
        <div className="mt-4"><Field label="Riesgos / controles de calidad"><TextArea value={data.riesgosCalidad} onChange={(e) => set("riesgosCalidad", e.target.value)} placeholder="Riesgos técnicos o de calidad, controles, inspecciones y criterios de aceptación." /></Field></div>
      </Section>
      <Section number="03" title="Requisitos de ingreso / SST" description="Antes de iniciar, confirme condiciones de ingreso al lugar de trabajo y documente cualquier incumplimiento.">
        <div className="space-y-3">{data.requisitosLugar.map((r) => <div key={r.id} className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_180px_1.4fr] gap-3 items-center border-b border-[#f0f1f3] pb-3 last:border-0 last:pb-0">
          <div className="text-sm font-medium">{r.requisito}</div>
          <Select value={r.respuesta} onChange={(e) => updReq(r.id, "respuesta", e.target.value)} className="w-full"><option value="">Evaluar...</option>{RESPUESTAS.map((x) => <option key={x}>{x}</option>)}</Select>
          <Input value={r.observaciones} onChange={(e) => updReq(r.id, "observaciones", e.target.value)} className="w-full" placeholder="Observación / control" />
        </div>)}</div>
      </Section>
      <Section number="04" title={`Identificación de peligros (${peligrosEvaluados}/${data.peligros.length})`} description="Evalúe cada peligro. Cuando marque “Sí”, documente el control aplicado." defaultOpen={false}>
        <div className="overflow-x-auto"><table className="w-full text-xs min-w-[850px]"><thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]"><th className="py-2 pr-2 w-44">Categoría</th><th className="py-2 px-2">Peligro</th><th className="py-2 px-2 w-36">¿Presente?</th><th className="py-2 px-2 min-w-[260px]">Control / observación</th></tr></thead><tbody>
          {data.peligros.map((r) => <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0"><td className="py-2 pr-2 font-semibold text-gray-500">{r.categoria}</td><td className="py-2 px-2">{r.peligro}</td><td className="py-2 px-2"><Select value={r.presente} onChange={(e) => updPeligro(r.id, "presente", e.target.value)} className="w-full"><option value="">Evaluar...</option>{RESPUESTAS.map((x) => <option key={x}>{x}</option>)}</Select></td><td className="py-2 px-2"><Input value={r.observaciones} onChange={(e) => updPeligro(r.id, "observaciones", e.target.value)} className="w-full" placeholder={r.presente === "Sí" ? "Control obligatorio" : "Observación opcional"} /></td></tr>)}
        </tbody></table></div>
      </Section>
      <Section number="05" title={`Aspectos ambientales (${aspectosEvaluados}/${ASPECTOS_AMBIENTALES.length})`} description="Evalúe cada aspecto y defina manejo cuando aplique." defaultOpen={false}>
        <div className="overflow-x-auto"><table className="w-full text-xs min-w-[780px]"><thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]"><th className="py-2 pr-2">Aspecto</th><th className="py-2 px-2 w-36">¿Aplica?</th><th className="py-2 px-2 min-w-[300px]">Manejo / control</th></tr></thead><tbody>
          {data.aspectos.map((r) => <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0"><td className="py-2 pr-2">{r.aspecto}</td><td className="py-2 px-2"><Select value={r.aplica} onChange={(e) => updAspecto(r.id, "aplica", e.target.value)} className="w-full"><option value="">Evaluar...</option>{RESPUESTAS.map((x) => <option key={x}>{x}</option>)}</Select></td><td className="py-2 px-2"><Input value={r.observaciones} onChange={(e) => updAspecto(r.id, "observaciones", e.target.value)} className="w-full" placeholder={r.aplica === "Sí" ? "Manejo obligatorio" : "Observación opcional"} /></td></tr>)}
        </tbody></table></div>
        <div className="mt-4"><Field label="Observaciones SST / ambientales generales"><TextArea value={data.observacionesSst} onChange={(e) => set("observacionesSst", e.target.value)} /></Field></div>
      </Section>
      <Section number="06" title="Entrega / recibo" description="Identifique responsables del cierre físico de la obra.">
        <div className="grid md:grid-cols-2 gap-4"><Field label="Responsable de obra"><Input value={data.responsableObra} onChange={(e) => set("responsableObra", e.target.value)} className="w-full" /></Field><Field label="Recibe obra"><Input value={data.recibeObra} onChange={(e) => set("recibeObra", e.target.value)} className="w-full" /></Field></div>
      </Section>
    </div>
  );
}

function MaintenanceTable({ data, setData }) {
  const upd = (id, k, v) => setData(updateArray(data, "mantenimientos", id, k, v));
  return <><div className="overflow-x-auto"><table className="w-full text-xs min-w-[760px]"><thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]"><th className="py-2 pr-2 w-40">Fecha</th><th className="py-2 px-2 w-44">Tipo</th><th className="py-2 px-2">Actividades desarrolladas</th><th className="py-2 px-2 w-52">Resultado</th><th></th></tr></thead><tbody>{data.mantenimientos.map((r) => <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0"><td className="py-2 pr-2"><Input type="date" value={r.fecha} onChange={(e) => upd(r.id, "fecha", e.target.value)} className="w-full" /></td><td className="py-2 px-2"><Select value={r.tipo} onChange={(e) => upd(r.id, "tipo", e.target.value)} className="w-full"><option value="">Selecciona...</option>{TIPOS_MANTENIMIENTO.map((x) => <option key={x}>{x}</option>)}</Select></td><td className="py-2 px-2"><Input value={r.actividades} onChange={(e) => upd(r.id, "actividades", e.target.value)} className="w-full" /></td><td className="py-2 px-2"><Select value={r.resultado} onChange={(e) => upd(r.id, "resultado", e.target.value)} className="w-full"><option value="">Selecciona...</option>{RESULTADOS_MANTENIMIENTO.map((x) => <option key={x}>{x}</option>)}</Select></td><td><RowAction onClick={() => setData(removeRow(data, "mantenimientos", r.id))} /></td></tr>)}</tbody></table></div><div className="mt-3 print:hidden"><Boton variant="secondary" size="sm" onClick={() => setData(addRow("herramientas", data, "mantenimientos"))}>+ Agregar mantenimiento</Boton></div></>;
}

function ToolMovement({ number, name, movement, data, setData }) {
  const setMov = (k, v) => setData({ ...data, [name]: { ...movement, [k]: v } });
  const upd = (id, k, v) => setData(updateNestedArray(data, name, id, k, v));
  return <Section number={number} title={`Movimiento ${number === "01" ? "1" : "2"}`} description="Registre herramientas, responsables y devolución del movimiento." defaultOpen={number === "01"}>
    <div className="overflow-x-auto"><table className="w-full text-xs min-w-[900px]"><thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]"><th className="py-2 pr-2">Nombre</th><th className="py-2 px-2">Descripción</th><th className="py-2 px-2">Marca</th><th className="py-2 px-2">Referencia</th><th className="py-2 px-2">Serie</th><th className="py-2 px-2 w-24">Cantidad</th><th></th></tr></thead><tbody>{movement.herramientas.map((r) => <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0">{["nombre","descripcion","marca","referencia","serie"].map((k) => <td key={k} className="py-2 px-2 first:pl-0"><Input value={r[k]} onChange={(e) => upd(r.id, k, e.target.value)} className="w-full min-w-[130px]" /></td>)}<td className="py-2 px-2"><Input type="number" min="1" value={r.cantidad} onChange={(e) => upd(r.id, "cantidad", e.target.value)} className="w-20" /></td><td><RowAction onClick={() => setData(removeNestedRow(data, name, r.id))} /></td></tr>)}</tbody></table></div>
    <div className="mt-3 print:hidden"><Boton variant="secondary" size="sm" onClick={() => setData(addRow("herramientas", data, name))}>+ Agregar herramienta</Boton></div>
    <div className="grid md:grid-cols-2 gap-4 mt-5">
      <Field label="Fecha entrega"><Input type="date" value={movement.fechaEntrega} onChange={(e) => setMov("fechaEntrega", e.target.value)} className="w-full" /></Field><Field label="Entrega por"><Input value={movement.entregaPor} onChange={(e) => setMov("entregaPor", e.target.value)} className="w-full" /></Field><Field label="Recibe"><Input value={movement.recibePor} onChange={(e) => setMov("recibePor", e.target.value)} className="w-full" /></Field><Field label="Observación entrega"><Input value={movement.observacionEntrega} onChange={(e) => setMov("observacionEntrega", e.target.value)} className="w-full" /></Field>
      <Field label="Fecha devolución"><Input type="date" value={movement.fechaDevolucion} onChange={(e) => setMov("fechaDevolucion", e.target.value)} className="w-full" /></Field><Field label="Devuelve"><Input value={movement.devuelvePor} onChange={(e) => setMov("devuelvePor", e.target.value)} className="w-full" /></Field><Field label="Recibe devolución"><Input value={movement.recibeDevolucion} onChange={(e) => setMov("recibeDevolucion", e.target.value)} className="w-full" /></Field><Field label="Observación devolución"><Input value={movement.observacionDevolucion} onChange={(e) => setMov("observacionDevolucion", e.target.value)} className="w-full" /></Field>
    </div>
  </Section>;
}

function HerramientasForm({ data, setData }) {
  const set = (k, v) => setData({ ...data, [k]: v });
  return <div className="space-y-5">
    <Section number="00" title="Tipo de formato" description="Seleccione la lógica correspondiente al formato original.">
      <div className="grid sm:grid-cols-3 gap-3 print:hidden">{[
        ["H1", "Hoja de vida H1", "Activo individual con mantenimiento y retiro."], ["H2", "Entrega H2", "Movimientos de entrega y devolución de varias herramientas."], ["AP", "Activo en préstamo", "Hoja de vida + tenencia, mantenimiento y devolución."],
      ].map(([id,t,d]) => <button key={id} type="button" onClick={() => set("modalidad", id)} className={`text-left p-4 rounded-xl border transition ${data.modalidad === id ? "border-azul bg-azul-soft" : "border-[#e5e7eb] bg-white hover:border-azul"}`}><div className="font-bold text-sm text-azul">{t}</div><div className="text-xs text-gray-500 mt-1 leading-relaxed">{d}</div></button>)}</div>
      <div className="hidden print:block text-sm"><b>Modalidad:</b> {data.modalidad}</div>
    </Section>
    {data.modalidad === "H2" ? <>
      <ToolMovement number="01" name="movimiento1" movement={data.movimiento1} data={data} setData={setData} />
      <ToolMovement number="02" name="movimiento2" movement={data.movimiento2} data={data} setData={setData} />
    </> : <>
      <Section number="01" title="Identificación del activo" description="Datos maestros de la herramienta/equipo.">
        <GeneralGrid data={data} set={set} fields={[
          { key: "nombre", label: "Nombre", required: true }, { key: "descripcion", label: "Descripción", required: true }, { key: "marca", label: "Marca", required: true }, { key: "referencia", label: "Referencia", required: true }, { key: "serie", label: "No. serie", required: true }, { key: "fechaAdquisicion", label: "Fecha de adquisición", type: "date", required: true },
        ]} />
      </Section>
      {data.modalidad === "AP" && <Section number="02" title="Tenencia / devolución" description="Registra la cadena de custodia del activo.">
        <div className="grid md:grid-cols-2 gap-4"><Field label="Fecha entrega"><Input type="date" value={data.fechaEntrega} onChange={(e) => set("fechaEntrega", e.target.value)} className="w-full" /></Field><Field label="Entrega por"><Input value={data.entregaPor} onChange={(e) => set("entregaPor", e.target.value)} className="w-full" /></Field><Field label="Recibe"><Input value={data.recibePor} onChange={(e) => set("recibePor", e.target.value)} className="w-full" /></Field><Field label="Observación entrega"><Input value={data.observacionEntrega} onChange={(e) => set("observacionEntrega", e.target.value)} className="w-full" /></Field><Field label="Fecha devolución"><Input type="date" value={data.fechaDevolucion} onChange={(e) => set("fechaDevolucion", e.target.value)} className="w-full" /></Field><Field label="Devuelve"><Input value={data.devuelvePor} onChange={(e) => set("devuelvePor", e.target.value)} className="w-full" /></Field><Field label="Recibe devolución"><Input value={data.recibeDevolucion} onChange={(e) => set("recibeDevolucion", e.target.value)} className="w-full" /></Field><Field label="Observación devolución"><Input value={data.observacionDevolucion} onChange={(e) => set("observacionDevolucion", e.target.value)} className="w-full" /></Field></div>
      </Section>}
      <Section number={data.modalidad === "AP" ? "03" : "02"} title="Mantenimiento" description="Historial de intervenciones y resultado operacional."><MaintenanceTable data={data} setData={setData} /></Section>
      <Section number={data.modalidad === "AP" ? "04" : "03"} title="Observaciones y retiro definitivo" description="Documente novedades del activo y, cuando aplique, su baja definitiva.">
        <Field label="Observaciones"><TextArea value={data.observaciones} onChange={(e) => set("observaciones", e.target.value)} /></Field>
        <div className="grid md:grid-cols-2 gap-4 mt-4"><Field label="Fecha retiro"><Input type="date" value={data.fechaRetiro} onChange={(e) => set("fechaRetiro", e.target.value)} className="w-full" /></Field><Field label="Aprueba retiro"><Input value={data.apruebaRetiro} onChange={(e) => set("apruebaRetiro", e.target.value)} className="w-full" /></Field><Field label="Motivo retiro" className="md:col-span-2"><TextArea value={data.motivoRetiro} onChange={(e) => set("motivoRetiro", e.target.value)} /></Field><Field label="Firma / referencia de aprobación"><Input value={data.firmaRetiro} onChange={(e) => set("firmaRetiro", e.target.value)} className="w-full" /></Field></div>
      </Section>
    </>}
  </div>;
}

function LiquidacionForm({ data, setData }) {
  const set = (k, v) => setData({ ...data, [k]: v });
  const upd = (id, k, v) => setData(updateArray(data, "filas", id, k, v));
  const totals = liquidationTotals(data);
  return <div className="space-y-5">
    <Section number="01" title="Identificación contractual" description="Datos de referencia del contrato, proyecto, acta e interventoría.">
      <GeneralGrid data={data} set={set} fields={[
        { key:"proceso",label:"Proceso",required:true },{ key:"objetoContrato",label:"Objeto del contrato",required:true,type:"textarea",span:true },{ key:"numeroContrato",label:"Número de contrato",required:true },{ key:"consecutivoActa",label:"Consecutivo del acta",required:true },{ key:"interventoria",label:"Interventoría",required:true },{ key:"proyecto",label:"Nombre del proyecto",required:true },{ key:"consecutivoPresupuesto",label:"Consecutivo presupuesto",required:true },{ key:"concesion",label:"Concesión" },{ key:"visitaTecnica",label:"Visita técnica / referencia" },{ key:"tipoObra",label:"Tipo de obra",required:true,options:TIPOS_OBRA },{ key:"ubicacion",label:"Ubicación",options:UBICACIONES },
      ]} />
    </Section>
    <Section number="02" title="Valores y fechas" description="El anticipo, totales y validaciones contractuales se calculan en línea.">
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Valor inicial contrato" required><Input type="number" min="0" value={data.valorInicial} onChange={(e) => set("valorInicial", e.target.value)} className="w-full" /></Field><Field label="Valor adicional"><Input type="number" min="0" value={data.valorAdicional} onChange={(e) => set("valorAdicional", e.target.value)} className="w-full" /></Field><Field label="Anticipo %"><Input type="number" min="0" max="100" value={data.anticipoPct} onChange={(e) => set("anticipoPct", e.target.value)} className="w-full" /></Field>
        <Field label="Fecha inicio" required><Input type="date" value={data.fechaInicio} onChange={(e) => set("fechaInicio", e.target.value)} className="w-full" /></Field><Field label="Fecha terminación" required><Input type="date" value={data.fechaTerminacion} onChange={(e) => set("fechaTerminacion", e.target.value)} className="w-full" /></Field><Field label="Fecha acta" required><Input type="date" value={data.fechaActa} onChange={(e) => set("fechaActa", e.target.value)} className="w-full" /></Field>
        <Field label="Fecha anticipo"><Input type="date" value={data.fechaAnticipo} onChange={(e) => set("fechaAnticipo", e.target.value)} className="w-full" /></Field><Field label="Valor acumulado anterior"><Input type="number" min="0" value={data.valorAcumuladoAnterior} onChange={(e) => set("valorAcumuladoAnterior", e.target.value)} className="w-full" /></Field><Metric label="Anticipo calculado" value={money(num(data.valorInicial) * num(data.anticipoPct) / 100)} accent />
      </div>
    </Section>
    <Section number="03" title="Detalle económico" description="Un mismo valor unitario se aplica a presupuesto inicial, presente acta y acumulado para asegurar conciliación.">
      <div className="overflow-x-auto"><table className="w-full text-xs min-w-[1200px]"><thead><tr className="text-left text-gray-500 border-b border-[#e5e7eb]"><th className="py-2 pr-2">Código</th><th className="py-2 px-2 min-w-[220px]">Descripción</th><th className="py-2 px-2">U/M</th><th className="py-2 px-2">Cant. inicial</th><th className="py-2 px-2">Vr. unitario</th><th className="py-2 px-2">Total inicial</th><th className="py-2 px-2">Cant. presente</th><th className="py-2 px-2">Total presente</th><th className="py-2 px-2">Cant. acumulada</th><th className="py-2 px-2">Total acumulado</th><th></th></tr></thead><tbody>{data.filas.map((r) => <tr key={r.id} className="border-b border-[#f0f1f3] last:border-0"><td className="py-2 pr-2"><Input value={r.codigo} onChange={(e) => upd(r.id,"codigo",e.target.value)} className="w-28" /></td><td className="py-2 px-2"><Input value={r.descripcion} onChange={(e) => upd(r.id,"descripcion",e.target.value)} className="w-full" /></td><td className="py-2 px-2"><UnitSelect value={r.unidad} onChange={(e) => upd(r.id,"unidad",e.target.value)} className="w-24" /></td>{["cantInicial","valorUnitario"].map((k)=><td key={k} className="py-2 px-2"><Input type="number" min="0" value={r[k]} onChange={(e)=>upd(r.id,k,e.target.value)} className="w-28" /></td>)}<td className="py-3 px-2 font-semibold whitespace-nowrap">{money(num(r.cantInicial)*num(r.valorUnitario))}</td><td className="py-2 px-2"><Input type="number" min="0" value={r.cantPresente} onChange={(e)=>upd(r.id,"cantPresente",e.target.value)} className="w-28" /></td><td className="py-3 px-2 font-semibold whitespace-nowrap">{money(num(r.cantPresente)*num(r.valorUnitario))}</td><td className="py-2 px-2"><Input type="number" min="0" value={r.cantAcumulada} onChange={(e)=>upd(r.id,"cantAcumulada",e.target.value)} className="w-28" /></td><td className="py-3 px-2 font-semibold whitespace-nowrap">{money(num(r.cantAcumulada)*num(r.valorUnitario))}</td><td><RowAction onClick={()=>setData(removeRow(data,"filas",r.id))}/></td></tr>)}</tbody></table></div>
      <div className="mt-3 print:hidden"><Boton variant="secondary" size="sm" onClick={()=>setData(addRow("liquidacion",data))}>+ Agregar ítem</Boton></div>
      <div className="grid md:grid-cols-3 gap-3 mt-5"><Field label="Incremento distancia · inicial"><Input type="number" value={data.distanciaInicial} onChange={(e)=>set("distanciaInicial",e.target.value)} className="w-full" /></Field><Field label="Incremento distancia · presente"><Input type="number" value={data.distanciaPresente} onChange={(e)=>set("distanciaPresente",e.target.value)} className="w-full" /></Field><Field label="Incremento distancia · acumulado"><Input type="number" value={data.distanciaAcumulada} onChange={(e)=>set("distanciaAcumulada",e.target.value)} className="w-full" /></Field><Field label="AIU % · inicial"><Input type="number" value={data.aiuInicial} onChange={(e)=>set("aiuInicial",e.target.value)} className="w-full" /></Field><Field label="AIU % · presente"><Input type="number" value={data.aiuPresente} onChange={(e)=>set("aiuPresente",e.target.value)} className="w-full" /></Field><Field label="AIU % · acumulado"><Input type="number" value={data.aiuAcumulada} onChange={(e)=>set("aiuAcumulada",e.target.value)} className="w-full" /></Field></div>
      <div className="grid md:grid-cols-3 gap-3 mt-4"><Metric label="Total inicial" value={money(totals.inicial)} /><Metric label="Presente acta" value={money(totals.presente)} accent /><Metric label="Total acumulado" value={money(totals.acumulado)} /></div>
    </Section>
    <Section number="04" title="Formalización" description="Campos requeridos para preparar el acta para revisión y firma.">
      <div className="space-y-4"><Field label="Valor de la presente acta en letras" required><TextArea value={data.valorLetras} onChange={(e)=>set("valorLetras",e.target.value)} placeholder="Escriba el valor en letras" /></Field><div className="grid md:grid-cols-2 gap-4"><Field label="Representante Electroingeniería"><Input value={data.representanteEi} onChange={(e)=>set("representanteEi",e.target.value)} className="w-full" /></Field><Field label="Representante interventoría / contratante"><Input value={data.representanteInterventoria} onChange={(e)=>set("representanteInterventoria",e.target.value)} className="w-full" /></Field></div></div>
    </Section>
  </div>;
}

function FinalizacionForm({ data, setData }) {
  const set = (k, v) => setData({ ...data, [k]: v });
  const yesNo = ["Sí", "No"];
  return <div className="space-y-5">
    <Section number="01" title="Acta y proyecto" description="Identificación del cierre y etapa documental."><GeneralGrid data={data} set={set} fields={[
      {key:"fechaActa",label:"Fecha del acta",type:"date",required:true},{key:"codigoProyecto",label:"Código / Proyecto",required:true},{key:"ciudad",label:"Ciudad",required:true},{key:"etapa",label:"Etapa del acta",required:true,options:ETAPAS_ACTA},{key:"objeto",label:"Obra / objeto contractual",required:true,type:"textarea",span:true},{key:"codigoDocumento",label:"Código del documento"},{key:"version",label:"Versión"},
    ]}/></Section>
    <Section number="02" title="Información contractual" description="Fechas y valores con control automático de coherencia."><GeneralGrid data={data} set={set} fields={[
      {key:"contratista",label:"Contratista",required:true},{key:"nit",label:"NIT",required:true},{key:"ciudadContratista",label:"Ciudad contratista"},{key:"contratoNo",label:"Contrato No.",required:true},{key:"fechaContrato",label:"Fecha contrato",type:"date",required:true},{key:"valorContrato",label:"Valor contrato",type:"number",required:true},{key:"fechaFinalizacion",label:"Fecha finalización",type:"date",required:true},{key:"valorFinal",label:"Valor final contrato",type:"number",required:true},
    ]}/></Section>
    <Section number="03" title="Recibo y cumplimiento" description="El documento solo debe quedar listo para firma cuando el cierre técnico esté conforme.">
      <div className="grid md:grid-cols-3 gap-4"><Field label="Recibo a satisfacción" required><Select value={data.reciboSatisfaccion} onChange={(e)=>set("reciboSatisfaccion",e.target.value)} className="w-full"><option value="">Selecciona...</option>{yesNo.map(x=><option key={x}>{x}</option>)}</Select></Field><Field label="Cumple especificaciones" required><Select value={data.cumpleEspecificaciones} onChange={(e)=>set("cumpleEspecificaciones",e.target.value)} className="w-full"><option value="">Selecciona...</option>{yesNo.map(x=><option key={x}>{x}</option>)}</Select></Field><Field label="Pendientes abiertos" required><Select value={data.pendientesAbiertos} onChange={(e)=>set("pendientesAbiertos",e.target.value)} className="w-full"><option value="">Selecciona...</option>{yesNo.map(x=><option key={x}>{x}</option>)}</Select></Field></div>
      <div className="mt-4"><Field label="Observaciones"><TextArea value={data.observaciones} onChange={(e)=>set("observaciones",e.target.value)} placeholder="Pendientes tratados, salvedades, garantías, compromisos o aclaraciones del cierre." /></Field></div>
    </Section>
    <Section number="04" title="Firmantes" description="Identifique las partes responsables del cierre."><GeneralGrid data={data} set={set} fields={[
      {key:"repContratista",label:"Representante contratista",required:true},{key:"cargoRepContratista",label:"Cargo representante contratista"},{key:"contratante",label:"Contratante",required:true},{key:"repContratante1",label:"Representante contratante 1",required:true},{key:"repContratante2",label:"Representante contratante 2",required:true},{key:"interventor",label:"Interventor",required:true},{key:"empresaInterventoria",label:"Empresa interventoría"},{key:"ciudadContratante",label:"Ciudad contratante"},
    ]}/></Section>
  </div>;
}

function SummaryMetrics({ formatId, result }) {
  const m = result.metrics || {};
  const rows = [];
  if (formatId === "bitacora") rows.push(["Ítems ejecutados", m.items ?? 0], ["Cantidad reportada", (m.cantidad ?? 0).toLocaleString("es-CO")]);
  if (formatId === "solicitud-materiales") rows.push(["Ítems", m.items ?? 0], ["Solicitado", (m.solicitado ?? 0).toLocaleString("es-CO")], ["Facturado", (m.facturado ?? 0).toLocaleString("es-CO")], ["Saldo", (m.saldo ?? 0).toLocaleString("es-CO")]);
  if (formatId === "control-material") rows.push(["Líneas", m.lineas ?? 0], ["Cerradas", m.cerradas ?? 0], ["Saldo", (m.saldo ?? 0).toLocaleString("es-CO")]);
  if (formatId === "orden-trabajo") rows.push(["Actividades", m.actividades ?? 0], ["Completas", m.completas ?? 0], ["Peligros presentes", m.peligrosSi ?? 0], ["Aspectos ambientales", m.ambientalesSi ?? 0]);
  if (formatId === "herramientas") rows.push(["Herramientas", m.herramientas ?? "—"], ["Mantenimientos", m.mantenimientos ?? "—"], ["Estado activo", m.estadoActivo ?? m.movimiento1 ?? "—"]);
  if (formatId === "liquidacion") rows.push(["Ítems", m.items ?? 0], ["Presente", money(m.presente)], ["Acumulado", money(m.acumulado)], ["Disponible", money(m.disponible)]);
  if (formatId === "finalizacion") rows.push(["Días cierre → acta", m.diasCierreActa ?? "—"], ["Variación", m.variacion == null ? "—" : money(m.variacion)], ["Variación %", m.variacionPct == null ? "—" : `${(m.variacionPct * 100).toFixed(1)}%`]);
  if (!rows.length) return null;
  return <Card className="p-4 print:hidden"><div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">Resumen</div><div className="grid grid-cols-2 lg:grid-cols-1 gap-2">{rows.map(([l,v])=><Metric key={l} label={l} value={v} />)}</div></Card>;
}

export default function FormatoEditor({ document, onChange, onBack, onDelete }) {
  const format = FORMATOS.find((f) => f.id === document.formatId);
  const result = useMemo(() => evaluate(document.formatId, document.data), [document.formatId, document.data]);
  const setData = (next) => onChange({ ...document, data: next, updatedAt: new Date().toISOString() });

  let form = null;
  if (document.formatId === "bitacora") form = <BitacoraForm data={document.data} setData={setData} />;
  if (document.formatId === "solicitud-materiales") form = <SolicitudMaterialesForm data={document.data} setData={setData} />;
  if (document.formatId === "control-material") form = <ControlMaterialForm data={document.data} setData={setData} />;
  if (document.formatId === "orden-trabajo") form = <OrdenTrabajoForm data={document.data} setData={setData} />;
  if (document.formatId === "herramientas") form = <HerramientasForm data={document.data} setData={setData} />;
  if (document.formatId === "liquidacion") form = <LiquidacionForm data={document.data} setData={setData} />;
  if (document.formatId === "finalizacion") form = <FinalizacionForm data={document.data} setData={setData} />;

  return (
    <div className="max-w-[1500px] mx-auto pb-16 execution-print-root">
      <div className="print:hidden mb-5">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-semibold text-azul hover:underline mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Volver a {format?.corto || "formatos"}
        </button>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1"><span className="text-[11px] font-bold px-2 py-1 rounded-md bg-azul-soft text-azul">{format?.codigo}</span><StatusBadge status={result.status} /></div>
            <h1 className="text-2xl font-bold text-azul">{format?.nombre}</h1>
            <p className="text-sm text-gray-500 mt-1 max-w-3xl">{format?.descripcion}</p>
          </div>
          <div className="flex gap-2">
            <Boton variant="secondary" onClick={() => window.print()}>Imprimir / PDF</Boton>
            <Boton variant="danger" onClick={onDelete}>Eliminar</Boton>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-gray-400"><span className="h-1.5 w-1.5 rounded-full bg-[#1D9E75]" />Guardado automático en este navegador</div>
      </div>

      <div className="hidden print:block mb-5 border-b border-black pb-3">
        <div className="text-xs font-bold">ELECTROINGENIERÍA S.A.S. · PROYECTOS EI · EJECUCIÓN</div>
        <h1 className="text-xl font-bold mt-1">{format?.nombre}</h1>
        <div className="text-xs mt-1">Código: {format?.codigo} · Estado: {result.status}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_290px] gap-6 items-start">
        <div>{form || <EmptyHint>Formato no disponible.</EmptyHint>}</div>
        <aside className="space-y-4"><ControlPanel result={result} /><SummaryMetrics formatId={document.formatId} result={result} /></aside>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: A4 landscape; margin: 12mm; }
          body { background: #fff !important; }
          header, aside, nav { display: none !important; }
          main { padding: 0 !important; background: #fff !important; }
          .execution-print-root input,
          .execution-print-root select,
          .execution-print-root textarea {
            border: 0 !important;
            box-shadow: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            background: transparent !important;
            color: #000 !important;
          }
          .execution-print-root details { break-inside: avoid; }
          .execution-print-root summary { pointer-events: none; }
        }
      `}</style>
    </div>
  );
}
