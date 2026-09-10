"use client";

import { Card, Input, Select } from "../../components/ui";

const ICONS = {
  clipboard: "M9 5h6M9 9h6M9 13h4M7 3h10a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2Z",
  tool: "M14.5 5.5a4 4 0 0 1-5 5L4 16l4 4 5.5-5.5a4 4 0 0 1 5-5",
  book: "M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4V4Zm16 0h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6V4Z",
  box: "M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v9",
  truck: "M1 5h13v10H1V5Zm13 4h4l3 3v3h-7V9ZM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  check: "M4 4h16v16H4V4Zm4 8 2.5 2.5L16 9",
  cash: "M2 7h20v10H2V7Zm10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  back: "M19 12H5m7 7-7-7 7-7",
  plus: "M12 5v14M5 12h14",
  trash: "M4 7h16M9 7V4h6v3m-9 0 1 14h10l1-14M10 11v6m4-6v6",
  print: "M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6v-7Z",
  help: "M9.1 9a3 3 0 1 1 5.8 1c-.8 1.2-2.4 1.5-2.9 2.5V14m0 4h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  warn: "M12 3 2.5 20h19L12 3Zm0 6v5m0 3h.01",
  eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
};

export function Icon({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name] || "M4 12h16"} /></svg>;
}

export function Badge({ children, tone = "gray" }) {
  const tones = { gray: "bg-gray-100 text-gray-600", blue: "bg-azul-soft text-azul", green: "bg-[#eaf3ee] text-[#0f6e56]", yellow: "bg-[#fdf6dd] text-[#7a5c00]", red: "bg-red-50 text-red-700" };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${tones[tone]}`}>{children}</span>;
}

export function toneForStatus(status = "") {
  if (["LISTO", "LISTO PARA REVISIÓN", "LISTO PARA FIRMA", "CERRADO", "CONCILIADO", "COMPLETO", "DEVUELTO", "RETIRADO", "OK"].includes(status)) return "green";
  if (["REVISAR", "INCOMPLETO"].includes(status)) return "red";
  if (["EN PROCESO", "EN OBRA", "ENTREGADO", "PENDIENTE", "SOLICITADO", "EN DILIGENCIAMIENTO", "EN TENENCIA"].includes(status)) return "yellow";
  return "gray";
}

export function Section({ number, title, help, children }) {
  return <Card className="overflow-hidden mb-5 animate-slide-up print:border-gray-300"><div className="px-5 py-3 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-start gap-3 print:bg-white"><div className="h-7 w-7 rounded-lg bg-azul text-white grid place-items-center text-xs font-bold shrink-0 print:border print:border-gray-400 print:text-black print:bg-white">{number}</div><div><h3 className="text-sm font-bold text-[#1a1a1a]">{title}</h3>{help && <p className="text-xs text-gray-500 mt-0.5">{help}</p>}</div></div><div className="p-5">{children}</div></Card>;
}

export function Field({ label, value, onChange, required, type = "text", options, textarea, placeholder, readOnly = false, className = "" }) {
  return <div className={className}><label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}{required && <span className="text-red-500"> *</span>}</label>{options ? <Select className="w-full" value={value ?? ""} onChange={(e) => onChange(e.target.value)} disabled={readOnly}><option value="">Selecciona...</option>{options.map((x) => <option key={x} value={x}>{x}</option>)}</Select> : textarea ? <textarea rows={3} className="w-full px-3 py-2.5 text-sm bg-white border border-[#d1d5db] rounded-lg outline-none transition focus:border-azul focus:ring-2 focus:ring-azul/25 resize-y" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} readOnly={readOnly} /> : <Input className="w-full" type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} readOnly={readOnly} />}</div>;
}

export function Grid({ children, cols = 2 }) { const cls = cols === 4 ? "md:grid-cols-4" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"; return <div className={`grid grid-cols-1 ${cls} gap-4`}>{children}</div>; }
export function Stat({ label, value, accent = false }) { return <div className={`bg-white border rounded-xl p-4 ${accent ? "border-amarillo" : "border-[#e5e7eb]"}`}><div className="text-xs text-gray-500">{label}</div><div className="text-xl font-bold text-azul mt-1 break-words">{value}</div></div>; }
export function AddRow({ onClick, label = "Agregar fila", disabled = false }) { return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex items-center gap-1.5 text-xs font-semibold text-azul hover:underline mt-3 disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"><Icon name="plus" size={15} />{label}</button>; }
export function Remove({ onClick }) { return <button type="button" onClick={onClick} title="Eliminar fila" className="p-1.5 text-gray-400 hover:text-red-600 no-print"><Icon name="trash" size={15} /></button>; }
export function MiniInput({ value, onChange, type = "text", placeholder = "", className = "" }) { return <input type={type} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={`w-full min-w-[76px] px-2 py-2 text-xs border border-[#d1d5db] rounded-lg outline-none focus:border-azul focus:ring-2 focus:ring-azul/20 ${className}`} />; }
export function MiniSelect({ value, onChange, options }) { return <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className="w-full min-w-[90px] px-2 py-2 text-xs border border-[#d1d5db] rounded-lg outline-none bg-white focus:border-azul"><option value="">—</option>{options.map((x) => <option key={x} value={x}>{x}</option>)}</select>; }
export function TableWrap({ children }) { return <div className="overflow-x-auto border border-[#e5e7eb] rounded-xl"><table className="w-full text-xs bg-white border-collapse">{children}</table></div>; }
export function Th({ children }) { return <th className="px-2.5 py-2.5 text-left bg-azul text-white font-semibold whitespace-nowrap print:bg-white print:text-black print:border-b print:border-gray-400">{children}</th>; }
export function Td({ children, className = "" }) { return <td className={`px-2 py-2 border-b border-[#eef0f2] align-top ${className}`}>{children}</td>; }

export function GuidePanel({ formato }) {
  return <Card className="overflow-hidden"><div className="px-4 py-3 bg-[#f9fafb] border-b border-[#e5e7eb] flex items-center gap-2"><Icon name="help" size={17} /><div className="font-semibold text-sm text-[#1a1a1a]">Cómo diligenciar</div></div><div className="p-4 space-y-3">{formato.guia.map((item, i) => <div key={item} className="flex gap-2.5 text-xs text-gray-600 leading-relaxed"><span className="h-5 w-5 rounded-full bg-azul-soft text-azul grid place-items-center font-bold shrink-0">{i + 1}</span><span>{item}</span></div>)}</div></Card>;
}
