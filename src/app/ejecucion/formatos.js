export const UNIDADES = [
  "UND", "UN", "M", "MTR", "ML", "M²", "M³", "KG", "G", "TON", "L", "GAL",
  "ROLLO", "CAJA", "JUEGO", "KIT", "PAR", "HORA", "DÍA", "SERVICIO", "GLOBAL", "OTRO",
];

export const BODEGAS = ["BOD-10", "BOD-21", "OTRA"];
export const RESPUESTAS = ["Sí", "No", "No aplica"];
export const ETAPAS_ACTA = ["Borrador", "En revisión", "Listo para firma", "Firmado"];
export const TIPOS_OBRA = ["Construcción", "Montaje", "Mantenimiento", "Expansión", "Reposición", "Mejoramiento", "Otro"];
export const TIPOS_PROYECTO = ["Construcción", "Diseño", "Entrega de obra", "PQR", "Ejecución", "Montaje", "Mantenimiento", "Visita", "Otro"];
export const UBICACIONES = ["Urbano", "Rural", "Mixto"];
export const TIPOS_MANTENIMIENTO = ["Preventivo", "Correctivo", "Predictivo", "Calibración", "Inspección", "Otro"];
export const RESULTADOS_MANTENIMIENTO = ["Conforme", "Requiere seguimiento", "Pendiente", "Fuera de servicio", "No aplica"];

export const PELIGROS = [
  ["Biológicos", "Residuo, desechos orgánicos o residuo animal (virus, bacterias)"],
  ["Biológicos", "Picaduras o mordeduras de insectos o animales"],
  ["Físicos", "Ruido"],
  ["Físicos", "Iluminación"],
  ["Físicos", "Vibración"],
  ["Físicos", "Temperaturas bajas o extremas"],
  ["Físicos", "Radiaciones"],
  ["Químicos", "Gases y vapores"],
  ["Químicos", "Polvo (material particulado)"],
  ["Químicos", "Materias o sustancias combustibles, irritantes o tóxicas"],
  ["Biomecánico", "Manipulación de cargas"],
  ["Biomecánico", "Posturas prolongadas, mantenidas, forzadas o antigravitacionales"],
  ["Biomecánico", "Movimientos repetitivos"],
  ["Condiciones de seguridad", "Mecánico: equipos y herramientas en movimiento"],
  ["Condiciones de seguridad", "Accidente de tránsito"],
  ["Condiciones de seguridad", "Público: atracos, orden público, atentados, secuestros o extorsiones"],
  ["Condiciones de seguridad", "Trabajo en alturas o espacio confinado"],
  ["Condiciones de seguridad", "Locativo: pisos, escaleras, barandas, plataformas o andamios defectuosos"],
  ["Condiciones de seguridad", "Locativo: techos defectuosos o en mal estado"],
  ["Condiciones de seguridad", "Locativo: superficie del piso deslizante o en mal estado"],
  ["Condiciones de seguridad", "Locativo: falta de orden y aseo"],
  ["Condiciones de seguridad", "Locativo: señalización o demarcación deficiente/inexistente"],
  ["Condiciones de seguridad", "Eléctrico: conexiones eléctricas"],
  ["Condiciones de seguridad", "Eléctrico: tableros de distribución"],
  ["Condiciones de seguridad", "Eléctrico: redes de media y baja tensión"],
  ["Otro", "Otro peligro / ¿Cuál?"],
];

export const ASPECTOS_AMBIENTALES = [
  "Tala y/o poda de árboles",
  "Desplazamiento de fauna",
  "Afectación de cobertura vegetal del suelo / excavaciones",
  "Generación de RCD (residuos de construcción y demolición)",
  "Posible generación de derrames (combustibles, aceites, sustancias químicas)",
  "Emisiones contaminantes (humos y vapores de equipos y vehículos)",
  "Generación de residuos sólidos peligrosos",
  "Generación de residuos reciclables (empaques, cartón, plástico, etc.)",
];

export const FORMATOS = [
  {
    id: "orden-trabajo",
    codigo: "P-F-2",
    nombre: "Orden de trabajo y entrega de obra",
    corto: "Orden de trabajo",
    etapa: "Inicio y control técnico",
    descripcion: "Define alcance, responsables, cantidades, condiciones SST/ambientales y criterios de cierre.",
    icono: "clipboard",
  },
  {
    id: "bitacora",
    codigo: "BITÁCORA",
    nombre: "Bitácora diaria de obra",
    corto: "Bitácora diaria",
    etapa: "Seguimiento diario",
    descripcion: "Registra jornada, cuadrilla, novedades, procedimiento ejecutado, pendientes y cantidades instaladas.",
    icono: "book",
  },
  {
    id: "solicitud-materiales",
    codigo: "MATERIALES",
    nombre: "Solicitud de materiales",
    corto: "Solicitud de materiales",
    etapa: "Abastecimiento",
    descripcion: "Controla solicitado, facturado, utilizado, devuelto y saldo por cada material.",
    icono: "box",
  },
  {
    id: "control-material",
    codigo: "P-F-7",
    nombre: "Control de material",
    corto: "Control de material",
    etapa: "Trazabilidad de materiales",
    descripcion: "Concilia requisición, entrega, uso, devolución y responsables desde bodega hasta obra.",
    icono: "layers",
  },
  {
    id: "herramientas",
    codigo: "HERRAMIENTAS",
    nombre: "Entrega y control de herramientas",
    corto: "Herramientas",
    etapa: "Activos y tenencia",
    descripcion: "Gestiona entrega, devolución, mantenimiento, tenencia y retiro definitivo de herramientas/equipos.",
    icono: "wrench",
  },
  {
    id: "liquidacion",
    codigo: "P-F-3",
    nombre: "Acta de liquidación",
    corto: "Acta de liquidación",
    etapa: "Cierre económico",
    descripcion: "Concilia presupuesto inicial, ejecución presente/acumulada, adicionales, AIU y valor contractual.",
    icono: "calculator",
  },
  {
    id: "finalizacion",
    codigo: "ACTA",
    nombre: "Acta de finalización",
    corto: "Acta de finalización",
    etapa: "Cierre y recibo",
    descripcion: "Formaliza finalización, recibo a satisfacción, cumplimiento técnico, valores y firmantes.",
    icono: "check",
  },
];

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
const fila = (extra = {}) => ({ id: uid(), ...extra });

const blankActivity = () => fila({ descripcion: "", unidad: "", cantidad: "", ejecutada: "", adicional: "", aprobacionAdicional: "", observaciones: "" });
const blankQuantity = () => fila({ descripcion: "", cantidad: "", unidad: "", observaciones: "" });
const blankMaterialRequest = () => fila({ descripcion: "", unidad: "", solicitada: "", facturada: "", utilizada: "", devuelta: "", factura: "", devolucion: "", observaciones: "" });
const blankMaterialControl = () => fila({ factura: "", bodega: "", requisicion: "", codigo: "", descripcion: "", unidad: "", cantidad: "", fechaReq: "", fechaEnt: "", entregadoPor: "", recibidoPor: "", utilizada: "", devuelta: "", fechaDev: "" });
const blankMaintenance = () => fila({ fecha: "", tipo: "", actividades: "", resultado: "" });
const blankTool = () => fila({ nombre: "", descripcion: "", marca: "", referencia: "", serie: "", cantidad: "" });
const blankEconomic = () => fila({ codigo: "", descripcion: "", unidad: "", cantInicial: "", valorUnitario: "", cantPresente: "", cantAcumulada: "" });

export function initialData(formatId) {
  switch (formatId) {
    case "bitacora":
      return { fecha: "", proyecto: "", integrantes: "", novedades: "", procedimiento: "", pendientes: "", cantidades: [blankQuantity()], responsable: "", tercero: "" };
    case "solicitud-materiales":
      return { proyecto: "", centroCosto: "", solicitante: "", fechaSolicitud: "", filas: [blankMaterialRequest()] };
    case "control-material":
      return { proyecto: "", fechaInicio: "", destino: "", sucursal: "", filas: [blankMaterialControl()] };
    case "orden-trabajo":
      return {
        proyecto: "", centroCosto: "", objetivo: "", visitaTecnica: "", cliente: "", fechaInicio: "", fechaFin: "", responsable: "", autoriza: "",
        tiposProyecto: [], otroTipo: "", actividades: [blankActivity()], riesgosCalidad: "", responsableObra: "", recibeObra: "",
        requisitosLugar: [
          { id: uid(), requisito: "Inducción", respuesta: "", observaciones: "" },
          { id: uid(), requisito: "Registro de material, herramienta u otro", respuesta: "", observaciones: "" },
          { id: uid(), requisito: "Envío previo de seguridad social", respuesta: "", observaciones: "" },
          { id: uid(), requisito: "Otros requisitos", respuesta: "", observaciones: "" },
        ],
        peligros: PELIGROS.map(([categoria, peligro]) => ({ id: uid(), categoria, peligro, presente: "", observaciones: "" })),
        aspectos: ASPECTOS_AMBIENTALES.map((aspecto) => ({ id: uid(), aspecto, aplica: "", observaciones: "" })),
        observacionesSst: "",
      };
    case "herramientas":
      return {
        modalidad: "H1", nombre: "", descripcion: "", marca: "", referencia: "", serie: "", fechaAdquisicion: "",
        mantenimientos: [blankMaintenance()], observaciones: "", fechaRetiro: "", apruebaRetiro: "", motivoRetiro: "", firmaRetiro: "",
        fechaEntrega: "", entregaPor: "", recibePor: "", observacionEntrega: "", fechaDevolucion: "", devuelvePor: "", recibeDevolucion: "", observacionDevolucion: "",
        movimiento1: { herramientas: [blankTool()], fechaEntrega: "", entregaPor: "", recibePor: "", observacionEntrega: "", fechaDevolucion: "", devuelvePor: "", recibeDevolucion: "", observacionDevolucion: "" },
        movimiento2: { herramientas: [blankTool()], fechaEntrega: "", entregaPor: "", recibePor: "", observacionEntrega: "", fechaDevolucion: "", devuelvePor: "", recibeDevolucion: "", observacionDevolucion: "" },
      };
    case "liquidacion":
      return {
        proceso: "", objetoContrato: "", numeroContrato: "", consecutivoActa: "", interventoria: "", valorInicial: "", tipoObra: "", fechaInicio: "", fechaTerminacion: "",
        fechaActa: "", valorAdicional: "", anticipoPct: "", fechaAnticipo: "", valorAcumuladoAnterior: "", concesion: "", proyecto: "", visitaTecnica: "", ubicacion: "", consecutivoPresupuesto: "",
        filas: [blankEconomic()], distanciaInicial: "", distanciaPresente: "", distanciaAcumulada: "", aiuInicial: "", aiuPresente: "", aiuAcumulada: "", valorLetras: "", representanteEi: "", representanteInterventoria: "",
      };
    case "finalizacion":
      return {
        fechaActa: "", codigoProyecto: "", ciudad: "", etapa: "Borrador", objeto: "", codigoDocumento: "", version: "",
        contratista: "ELECTRO INGENIERIA S.A.S.", nit: "891.903.664-9", ciudadContratista: "TULUÁ", contratoNo: "", fechaContrato: "", valorContrato: "", fechaFinalizacion: "", valorFinal: "", reciboSatisfaccion: "",
        repContratista: "", cargoRepContratista: "", contratante: "", repContratante1: "", repContratante2: "", interventor: "", empresaInterventoria: "", ciudadContratante: "",
        cumpleEspecificaciones: "", pendientesAbiertos: "", observaciones: "",
      };
    default:
      return {};
  }
}

export function addRow(formatId, data, target) {
  if (formatId === "bitacora") return { ...data, cantidades: [...data.cantidades, blankQuantity()] };
  if (formatId === "solicitud-materiales") return { ...data, filas: [...data.filas, blankMaterialRequest()] };
  if (formatId === "control-material") return { ...data, filas: [...data.filas, blankMaterialControl()] };
  if (formatId === "orden-trabajo") return { ...data, actividades: [...data.actividades, blankActivity()] };
  if (formatId === "liquidacion") return { ...data, filas: [...data.filas, blankEconomic()] };
  if (formatId === "herramientas" && target === "mantenimientos") return { ...data, mantenimientos: [...data.mantenimientos, blankMaintenance()] };
  if (formatId === "herramientas" && (target === "movimiento1" || target === "movimiento2")) {
    return { ...data, [target]: { ...data[target], herramientas: [...data[target].herramientas, blankTool()] } };
  }
  return data;
}

export function removeRow(data, key, id) {
  const rows = data[key] || [];
  return { ...data, [key]: rows.length <= 1 ? rows : rows.filter((r) => r.id !== id) };
}

export function removeNestedRow(data, key, id) {
  const rows = data[key]?.herramientas || [];
  if (rows.length <= 1) return data;
  return { ...data, [key]: { ...data[key], herramientas: rows.filter((r) => r.id !== id) } };
}

export const num = (v) => {
  if (v === "" || v == null) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const money = (v) => num(v).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
export const pct = (v) => `${Math.round((Number(v) || 0) * 100)}%`;

function isFilled(v) { return v !== undefined && v !== null && String(v).trim() !== ""; }
function countFilled(values) { return values.filter(isFilled).length; }
function dateMs(v) { const t = v ? new Date(`${v}T00:00:00`).getTime() : NaN; return Number.isFinite(t) ? t : null; }
function activeRow(row, keys) { return keys.some((k) => isFilled(row[k]) && row[k] !== "0"); }

export function materialRequestRow(row) {
  const active = activeRow(row, ["descripcion", "unidad", "solicitada", "facturada", "utilizada", "devuelta", "factura", "devolucion", "observaciones"]);
  if (!active) return { estado: "SIN DILIGENCIAR", saldo: 0, alerta: "" };
  const sol = num(row.solicitada), fac = num(row.facturada), usa = num(row.utilizada), dev = num(row.devuelta);
  const saldo = fac - usa - dev;
  let alerta = "";
  if (!isFilled(row.descripcion)) alerta = "Falta descripción";
  else if (!isFilled(row.unidad)) alerta = "Falta unidad de medida";
  else if (!isFilled(row.solicitada) || sol <= 0) alerta = "Falta cantidad solicitada";
  else if (fac > sol) alerta = "Facturado supera lo solicitado";
  else if (usa + dev > fac) alerta = "Utilizado + devuelto supera lo facturado";
  else if (fac > 0 && !isFilled(row.factura)) alerta = "Falta número de factura";
  else if (dev > 0 && !isFilled(row.devolucion)) alerta = "Falta número de devolución";
  if (alerta) return { estado: "REVISAR", saldo, alerta };
  if (!isFilled(row.facturada) || fac < sol) return { estado: "SOLICITADO", saldo, alerta: "Pendiente de facturación completa" };
  if (Math.abs(saldo) > 0.000001) return { estado: "EN PROCESO", saldo, alerta: "Pendiente por conciliar uso/devolución" };
  return { estado: "OK", saldo: 0, alerta: "" };
}

export function materialControlRow(row) {
  const active = activeRow(row, ["factura", "bodega", "requisicion", "codigo", "descripcion", "unidad", "cantidad", "fechaReq", "fechaEnt", "entregadoPor", "recibidoPor", "utilizada", "devuelta", "fechaDev"]);
  if (!active) return { estado: "VACÍA", saldo: 0, alerta: "" };
  const cant = num(row.cantidad), usa = num(row.utilizada), dev = num(row.devuelta);
  const saldo = cant - usa - dev;
  const req = dateMs(row.fechaReq), ent = dateMs(row.fechaEnt), fdev = dateMs(row.fechaDev);
  let alerta = "";
  if (!isFilled(row.descripcion)) alerta = "Falta descripción";
  else if (!isFilled(row.bodega)) alerta = "Falta bodega";
  else if (!isFilled(row.unidad)) alerta = "Falta unidad de medida";
  else if (!isFilled(row.cantidad) || cant <= 0) alerta = "Falta cantidad requerida";
  else if (!isFilled(row.fechaReq)) alerta = "Falta fecha de requerimiento";
  else if (ent && req && ent < req) alerta = "La entrega no puede ser anterior al requerimiento";
  else if (usa + dev > cant) alerta = "Utilizado + devuelto supera la cantidad";
  else if (!ent && (usa > 0 || dev > 0)) alerta = "No puede registrar uso/devolución sin fecha de entrega";
  else if (ent && (!isFilled(row.entregadoPor) || !isFilled(row.recibidoPor))) alerta = "Faltan responsables de entrega/recibo";
  else if (dev > 0 && !isFilled(row.fechaDev)) alerta = "La fecha de devolución es obligatoria";
  else if (isFilled(row.fechaDev) && dev <= 0) alerta = "Hay fecha de devolución sin cantidad devuelta";
  else if (fdev && ent && fdev < ent) alerta = "La devolución no puede ser anterior a la entrega";
  if (alerta) return { estado: "REVISAR", saldo, alerta };
  if (!ent) return { estado: "REQUERIDO", saldo, alerta: "Pendiente de entrega" };
  if (Math.abs(usa + dev - cant) < 0.000001) return { estado: "CERRADO", saldo: 0, alerta: "" };
  if (usa + dev === 0) return { estado: "ENTREGADO", saldo, alerta: "Pendiente de conciliación" };
  return { estado: "EN OBRA", saldo, alerta: "Saldo pendiente por utilizar o devolver" };
}

export function activityRow(row) {
  const active = activeRow(row, ["descripcion", "unidad", "cantidad", "ejecutada", "adicional", "aprobacionAdicional", "observaciones"]);
  if (!active) return { estado: "SIN DILIGENCIAR", saldo: 0, porcentaje: 0, alerta: "" };
  const base = num(row.cantidad), eje = num(row.ejecutada), ad = num(row.adicional), total = base + ad;
  const saldo = total - eje;
  const porcentaje = total > 0 ? eje / total : 0;
  let alerta = "";
  if (!isFilled(row.descripcion)) alerta = "Falta descripción";
  else if (!isFilled(row.unidad)) alerta = "Falta unidad";
  else if (!isFilled(row.cantidad) || base < 0) alerta = "Falta cantidad base";
  else if (eje > total) alerta = "Ejecutado supera cantidad autorizada";
  else if (ad > 0 && !isFilled(row.aprobacionAdicional)) alerta = "El adicional requiere aprobación";
  if (alerta) return { estado: "REVISAR", saldo, porcentaje, alerta };
  if (total > 0 && Math.abs(eje - total) < 0.000001) return { estado: "COMPLETO", saldo: 0, porcentaje: 1, alerta: "" };
  return { estado: "PENDIENTE", saldo, porcentaje, alerta: "Actividad pendiente de ejecución" };
}

function baseResult(progress, alerts, metrics = {}) {
  let status = "EN DILIGENCIAMIENTO";
  if (alerts.some((a) => a.level === "error")) status = "REVISAR";
  else if (progress >= 1 && alerts.length === 0) status = "LISTO PARA FIRMA";
  else if (progress >= 1) status = "REVISAR";
  return { progress: Math.max(0, Math.min(1, progress)), alerts, metrics, status };
}

export function evaluate(formatId, data = {}) {
  const alerts = [];

  if (formatId === "bitacora") {
    const required = [data.fecha, data.proyecto, data.integrantes, data.novedades, data.procedimiento, data.pendientes];
    const progress = countFilled(required) / required.length;
    required.forEach((v, i) => { if (!isFilled(v)) alerts.push({ level: "error", text: ["Diligencie la fecha", "Diligencie el proyecto", "Registre integrantes de la cuadrilla", "Registre novedades o indique “Sin novedades”", "Describa el procedimiento ejecutado", "Registre pendientes o indique “Sin pendientes”"][i] }); });
    const rows = (data.cantidades || []).filter((r) => activeRow(r, ["descripcion", "cantidad", "unidad", "observaciones"]));
    rows.forEach((r, i) => {
      if (num(r.cantidad) > 0 && !isFilled(r.descripcion)) alerts.push({ level: "error", text: `Cantidad instalada ${i + 1}: falta descripción` });
      if (num(r.cantidad) > 0 && !isFilled(r.unidad)) alerts.push({ level: "error", text: `Cantidad instalada ${i + 1}: falta unidad de medida` });
    });
    return baseResult(progress, alerts, { items: rows.length, cantidad: rows.reduce((s, r) => s + num(r.cantidad), 0) });
  }

  if (formatId === "solicitud-materiales") {
    const rows = (data.filas || []).filter((r) => activeRow(r, ["descripcion", "unidad", "solicitada", "facturada", "utilizada", "devuelta", "factura", "devolucion", "observaciones"]));
    const results = rows.map(materialRequestRow);
    results.forEach((r, i) => { if (r.estado === "REVISAR") alerts.push({ level: "error", text: `Ítem ${i + 1}: ${r.alerta}` }); });
    const progress = rows.length ? results.filter((r) => r.estado === "OK").length / rows.length : 0;
    const solicitado = rows.reduce((s, r) => s + num(r.solicitada), 0), facturado = rows.reduce((s, r) => s + num(r.facturada), 0);
    const saldo = results.reduce((s, r) => s + r.saldo, 0);
    const base = baseResult(progress, alerts, { items: rows.length, solicitado, facturado, saldo });
    if (!rows.length) base.status = "SIN REGISTROS";
    else if (!alerts.length && results.every((r) => r.estado === "OK")) base.status = "LISTO";
    else if (!alerts.length) base.status = "EN PROCESO";
    return base;
  }

  if (formatId === "control-material") {
    const required = [data.proyecto, data.fechaInicio, data.destino, data.sucursal];
    required.forEach((v, i) => { if (!isFilled(v)) alerts.push({ level: "error", text: ["Diligencie el proyecto", "Diligencie la fecha de inicio de obra", "Diligencie el destino", "Diligencie la sucursal"][i] }); });
    const rows = (data.filas || []).filter((r) => activeRow(r, ["factura", "bodega", "requisicion", "codigo", "descripcion", "unidad", "cantidad", "fechaReq", "fechaEnt", "entregadoPor", "recibidoPor", "utilizada", "devuelta", "fechaDev"]));
    const results = rows.map(materialControlRow);
    results.forEach((r, i) => { if (r.estado === "REVISAR") alerts.push({ level: "error", text: `Línea ${i + 1}: ${r.alerta}` }); });
    const rowProgress = rows.length ? results.filter((r) => r.estado === "CERRADO").length / rows.length : 0;
    const progress = (countFilled(required) / required.length) * 0.35 + rowProgress * 0.65;
    const base = baseResult(progress, alerts, { lineas: rows.length, cerradas: results.filter((r) => r.estado === "CERRADO").length, saldo: results.reduce((s, r) => s + r.saldo, 0) });
    if (rows.length && !alerts.length && results.every((r) => r.estado === "CERRADO") && countFilled(required) === required.length) base.status = "LISTO";
    else if (!alerts.length && rows.length) base.status = "EN PROCESO";
    return base;
  }

  if (formatId === "orden-trabajo") {
    const required = [data.proyecto, data.centroCosto, data.objetivo, data.cliente, data.fechaInicio, data.fechaFin, data.responsable, data.autoriza];
    required.forEach((v, i) => { if (!isFilled(v)) alerts.push({ level: "error", text: ["Falta proyecto", "Falta centro de costo", "Falta objetivo", "Falta cliente", "Falta fecha de inicio", "Falta fecha de finalización", "Falta responsable", "Falta quien autoriza"][i] }); });
    const ini = dateMs(data.fechaInicio), fin = dateMs(data.fechaFin);
    if (ini && fin && fin < ini) alerts.push({ level: "error", text: "La fecha de finalización no puede ser anterior al inicio" });
    if (!(data.tiposProyecto || []).length) alerts.push({ level: "warning", text: "Seleccione al menos un tipo de proyecto" });
    if ((data.tiposProyecto || []).includes("Otro") && !isFilled(data.otroTipo)) alerts.push({ level: "error", text: "Especifique el tipo de proyecto marcado como Otro" });
    const acts = (data.actividades || []).filter((r) => activeRow(r, ["descripcion", "unidad", "cantidad", "ejecutada", "adicional", "aprobacionAdicional", "observaciones"]));
    const actResults = acts.map(activityRow);
    actResults.forEach((r, i) => { if (r.estado === "REVISAR") alerts.push({ level: "error", text: `Actividad ${i + 1}: ${r.alerta}` }); });
    (data.requisitosLugar || []).forEach((r) => {
      if (!isFilled(r.respuesta)) alerts.push({ level: "error", text: `SST: responda “${r.requisito}”` });
      else if (r.respuesta === "No" && !isFilled(r.observaciones)) alerts.push({ level: "error", text: `SST: justifique/control para “${r.requisito}”` });
    });
    const peligrosPendientes = (data.peligros || []).filter((r) => !isFilled(r.presente));
    const aspectosPendientes = (data.aspectos || []).filter((r) => !isFilled(r.aplica));
    if (peligrosPendientes.length) alerts.push({ level: "warning", text: `${peligrosPendientes.length} peligros pendientes de evaluar` });
    if (aspectosPendientes.length) alerts.push({ level: "warning", text: `${aspectosPendientes.length} aspectos ambientales pendientes de evaluar` });
    (data.peligros || []).forEach((r) => {
      if (r.presente === "Sí" && !isFilled(r.observaciones)) alerts.push({ level: "error", text: `Defina control para peligro: ${r.peligro}` });
    });
    (data.aspectos || []).forEach((r) => {
      if (r.aplica === "Sí" && !isFilled(r.observaciones)) alerts.push({ level: "error", text: `Defina manejo para aspecto ambiental: ${r.aspecto}` });
    });
    const generalProgress = countFilled(required) / required.length;
    const actProgress = acts.length ? actResults.filter((r) => r.estado === "COMPLETO").length / acts.length : 0;
    const assessed = [...(data.peligros || []).map((r) => r.presente), ...(data.aspectos || []).map((r) => r.aplica), ...(data.requisitosLugar || []).map((r) => r.respuesta)];
    const sstProgress = assessed.length ? countFilled(assessed) / assessed.length : 0;
    const progress = generalProgress * 0.4 + actProgress * 0.3 + sstProgress * 0.3;
    const base = baseResult(progress, alerts, { actividades: acts.length, completas: actResults.filter((r) => r.estado === "COMPLETO").length, peligrosSi: (data.peligros || []).filter((r) => r.presente === "Sí").length, ambientalesSi: (data.aspectos || []).filter((r) => r.aplica === "Sí").length });
    if (progress >= 1 && !alerts.length) base.status = "LISTO PARA CIERRE";
    return base;
  }

  if (formatId === "herramientas") {
    const modalidad = data.modalidad || "H1";
    if (modalidad === "H2") {
      const evalMov = (m, idx) => {
        const tools = (m?.herramientas || []).filter((r) => activeRow(r, ["nombre", "descripcion", "marca", "referencia", "serie", "cantidad"]));
        if (!tools.length && idx === 1) alerts.push({ level: "error", text: "Movimiento 1: agregue al menos una herramienta" });
        tools.forEach((r, i) => { if (!isFilled(r.nombre) || num(r.cantidad) <= 0) alerts.push({ level: "error", text: `Movimiento ${idx}, herramienta ${i + 1}: nombre y cantidad son obligatorios` }); });
        if (tools.length && !isFilled(m.fechaEntrega)) alerts.push({ level: "error", text: `Movimiento ${idx}: falta fecha de entrega` });
        if (isFilled(m.fechaEntrega) && (!isFilled(m.entregaPor) || !isFilled(m.recibePor))) alerts.push({ level: "error", text: `Movimiento ${idx}: faltan responsables de entrega y recibo` });
        if (isFilled(m.fechaDevolucion) && (!isFilled(m.devuelvePor) || !isFilled(m.recibeDevolucion))) alerts.push({ level: "error", text: `Movimiento ${idx}: faltan responsables de devolución` });
        return { tools, cerrado: tools.length > 0 && isFilled(m.fechaEntrega) && isFilled(m.fechaDevolucion) };
      };
      const m1 = evalMov(data.movimiento1, 1), m2 = evalMov(data.movimiento2, 2);
      const activos = m1.tools.length + m2.tools.length;
      const progress = activos ? ((m1.cerrado ? m1.tools.length : 0) + (m2.cerrado ? m2.tools.length : 0)) / activos : 0;
      const base = baseResult(progress, alerts, { herramientas: activos, movimiento1: m1.cerrado ? "DEVUELTO" : isFilled(data.movimiento1?.fechaEntrega) ? "ENTREGADO" : "SIN INICIAR", movimiento2: m2.cerrado ? "DEVUELTO" : isFilled(data.movimiento2?.fechaEntrega) ? "ENTREGADO" : "SIN INICIAR" });
      if (m1.cerrado && (!m2.tools.length || m2.cerrado) && !alerts.length) base.status = "LISTO";
      else if (!alerts.length && activos) base.status = "EN TENENCIA";
      return base;
    }
    const required = [data.nombre, data.descripcion, data.marca, data.referencia, data.serie, data.fechaAdquisicion];
    required.forEach((v, i) => { if (!isFilled(v)) alerts.push({ level: "error", text: ["Falta nombre", "Falta descripción", "Falta marca", "Falta referencia", "Falta número de serie", "Falta fecha de adquisición"][i] }); });
    if (modalidad === "AP" && isFilled(data.fechaEntrega) && (!isFilled(data.entregaPor) || !isFilled(data.recibePor))) alerts.push({ level: "error", text: "Entrega: identifique quien entrega y quien recibe" });
    if (modalidad === "AP" && isFilled(data.fechaDevolucion) && (!isFilled(data.devuelvePor) || !isFilled(data.recibeDevolucion))) alerts.push({ level: "error", text: "Devolución: identifique quien devuelve y quien recibe" });
    (data.mantenimientos || []).filter((r) => activeRow(r, ["fecha", "tipo", "actividades", "resultado"])).forEach((r, i) => {
      if (!isFilled(r.fecha) || !isFilled(r.tipo) || !isFilled(r.actividades) || !isFilled(r.resultado)) alerts.push({ level: "error", text: `Mantenimiento ${i + 1}: complete fecha, tipo, actividad y resultado` });
    });
    if (isFilled(data.fechaRetiro) && (!isFilled(data.apruebaRetiro) || !isFilled(data.motivoRetiro))) alerts.push({ level: "error", text: "Retiro definitivo: falta aprobación o motivo" });
    const progress = countFilled(required) / required.length;
    const base = baseResult(progress, alerts, { mantenimientos: (data.mantenimientos || []).filter((r) => isFilled(r.fecha)).length, estadoActivo: isFilled(data.fechaRetiro) ? "RETIRADO" : modalidad === "AP" ? (isFilled(data.fechaDevolucion) ? "DEVUELTO" : isFilled(data.fechaEntrega) ? "EN TENENCIA" : "SIN ENTREGA") : "ACTIVO" });
    if (progress >= 1 && !alerts.length) base.status = isFilled(data.fechaRetiro) ? "RETIRADO" : "LISTO";
    return base;
  }

  if (formatId === "liquidacion") {
    const required = [data.proceso, data.objetoContrato, data.numeroContrato, data.consecutivoActa, data.interventoria, data.valorInicial, data.tipoObra, data.fechaInicio, data.fechaTerminacion, data.fechaActa, data.proyecto, data.consecutivoPresupuesto];
    required.forEach((v, i) => { if (!isFilled(v)) alerts.push({ level: "error", text: ["Falta proceso", "Falta objeto contractual", "Falta número de contrato", "Falta consecutivo del acta", "Falta interventoría", "Falta valor inicial del contrato", "Falta tipo de obra", "Falta fecha de inicio", "Falta fecha de terminación", "Falta fecha del acta", "Falta proyecto", "Falta consecutivo del presupuesto"][i] }); });
    const ini = dateMs(data.fechaInicio), fin = dateMs(data.fechaTerminacion), acta = dateMs(data.fechaActa);
    if (ini && fin && fin < ini) alerts.push({ level: "error", text: "La fecha de terminación debe ser igual o posterior al inicio" });
    if (fin && acta && acta < fin) alerts.push({ level: "warning", text: "El acta está fechada antes de la terminación registrada" });
    const rows = (data.filas || []).filter((r) => activeRow(r, ["codigo", "descripcion", "unidad", "cantInicial", "valorUnitario", "cantPresente", "cantAcumulada"]));
    rows.forEach((r, i) => {
      if (!isFilled(r.descripcion)) alerts.push({ level: "error", text: `Ítem ${i + 1}: falta descripción` });
      if (!isFilled(r.unidad)) alerts.push({ level: "error", text: `Ítem ${i + 1}: falta unidad` });
      if (!isFilled(r.cantInicial)) alerts.push({ level: "error", text: `Ítem ${i + 1}: falta cantidad inicial` });
      if (!isFilled(r.valorUnitario)) alerts.push({ level: "error", text: `Ítem ${i + 1}: falta valor unitario` });
      if (!isFilled(r.cantPresente)) alerts.push({ level: "error", text: `Ítem ${i + 1}: falta cantidad presente` });
      if (!isFilled(r.cantAcumulada)) alerts.push({ level: "error", text: `Ítem ${i + 1}: falta cantidad acumulada` });
      if (num(r.cantAcumulada) < num(r.cantPresente)) alerts.push({ level: "error", text: `Ítem ${i + 1}: acumulada menor que presente` });
    });
    if (!rows.length) alerts.push({ level: "error", text: "Agregue al menos un ítem al detalle económico" });
    const totals = liquidationTotals(data);
    const disponible = num(data.valorInicial) + num(data.valorAdicional);
    if (disponible > 0 && totals.acumulado > disponible + 0.5) alerts.push({ level: "error", text: "La liquidación acumulada excede el valor contractual disponible" });
    const esperadoAnticipo = num(data.valorInicial) * (num(data.anticipoPct) / 100);
    if (num(data.anticipoPct) > 100 || num(data.anticipoPct) < 0) alerts.push({ level: "error", text: "El anticipo debe estar entre 0% y 100%" });
    if (!isFilled(data.valorLetras)) alerts.push({ level: "error", text: "Diligencie el valor de la presente acta en letras" });
    if (isFilled(data.valorAcumuladoAnterior) && Math.abs((num(data.valorAcumuladoAnterior) + totals.presente) - totals.acumulado) > 1) alerts.push({ level: "warning", text: "Revise conciliación: acumulado anterior + presente no coincide con acumulado calculado" });
    const progress = countFilled(required) / required.length;
    const base = baseResult(progress, alerts, { items: rows.length, presente: totals.presente, acumulado: totals.acumulado, disponible, anticipo: esperadoAnticipo });
    if (progress >= 1 && !alerts.length) base.status = "LISTO PARA FIRMA";
    return base;
  }

  if (formatId === "finalizacion") {
    const required = [data.fechaActa, data.codigoProyecto, data.ciudad, data.etapa, data.objeto, data.contratista, data.nit, data.contratoNo, data.fechaContrato, data.valorContrato, data.fechaFinalizacion, data.valorFinal, data.reciboSatisfaccion, data.repContratista, data.contratante, data.repContratante1, data.repContratante2, data.interventor, data.cumpleEspecificaciones, data.pendientesAbiertos];
    required.forEach((v, i) => { if (!isFilled(v)) alerts.push({ level: "error", text: `Campo crítico pendiente: ${["Fecha del acta", "Código / Proyecto", "Ciudad", "Etapa", "Obra / objeto", "Contratista", "NIT", "Contrato No.", "Fecha del contrato", "Valor contrato", "Fecha de finalización", "Valor final", "Recibo a satisfacción", "Representante contratista", "Contratante", "Representante contratante 1", "Representante contratante 2", "Interventor", "Cumplimiento técnico", "Pendientes abiertos"][i]}` }); });
    const acta = dateMs(data.fechaActa), fin = dateMs(data.fechaFinalizacion), contrato = dateMs(data.fechaContrato);
    if (contrato && fin && fin < contrato) alerts.push({ level: "error", text: "La finalización no puede ser anterior a la fecha del contrato" });
    if (acta && fin && acta < fin) alerts.push({ level: "error", text: "La fecha del acta no puede ser anterior a la finalización" });
    if (data.reciboSatisfaccion && data.reciboSatisfaccion !== "Sí") alerts.push({ level: "error", text: "El recibo a satisfacción debe quedar confirmado o documentar el tratamiento antes de firma" });
    if (data.cumpleEspecificaciones && data.cumpleEspecificaciones !== "Sí") alerts.push({ level: "error", text: "El cumplimiento técnico debe quedar conforme o con tratamiento documentado" });
    if (data.pendientesAbiertos && data.pendientesAbiertos !== "No") alerts.push({ level: "error", text: "Existen pendientes abiertos: cierre o justifique antes de firma" });
    const progress = countFilled(required) / required.length;
    const dias = acta && fin ? Math.round((acta - fin) / 86400000) : null;
    const variacion = isFilled(data.valorContrato) && isFilled(data.valorFinal) ? num(data.valorFinal) - num(data.valorContrato) : null;
    const variacionPct = num(data.valorContrato) ? num(data.valorFinal) / num(data.valorContrato) - 1 : null;
    const base = baseResult(progress, alerts, { diasCierreActa: dias, variacion, variacionPct });
    if (progress >= 1 && !alerts.length) base.status = "LISTO PARA FIRMA";
    return base;
  }

  return baseResult(0, [], {});
}

export function liquidationTotals(data) {
  const rows = (data.filas || []).filter((r) => activeRow(r, ["codigo", "descripcion", "unidad", "cantInicial", "valorUnitario", "cantPresente", "cantAcumulada"]));
  const subtotalInicial = rows.reduce((s, r) => s + num(r.cantInicial) * num(r.valorUnitario), 0);
  const subtotalPresente = rows.reduce((s, r) => s + num(r.cantPresente) * num(r.valorUnitario), 0);
  const subtotalAcumulado = rows.reduce((s, r) => s + num(r.cantAcumulada) * num(r.valorUnitario), 0);
  const baseInicial = subtotalInicial + num(data.distanciaInicial);
  const basePresente = subtotalPresente + num(data.distanciaPresente);
  const baseAcumulado = subtotalAcumulado + num(data.distanciaAcumulada);
  const aiuInicialValor = baseInicial * (num(data.aiuInicial) / 100);
  const aiuPresenteValor = basePresente * (num(data.aiuPresente) / 100);
  const aiuAcumuladoValor = baseAcumulado * (num(data.aiuAcumulada) / 100);
  return {
    subtotalInicial, subtotalPresente, subtotalAcumulado,
    aiuInicialValor, aiuPresenteValor, aiuAcumuladoValor,
    inicial: baseInicial + aiuInicialValor,
    presente: basePresente + aiuPresenteValor,
    acumulado: baseAcumulado + aiuAcumuladoValor,
  };
}

export function formatTitle(formatId, data) {
  if (formatId === "bitacora") return `${data.proyecto || "Bitácora"}${data.fecha ? ` · ${data.fecha}` : ""}`;
  if (formatId === "solicitud-materiales") return data.proyecto || "Solicitud de materiales";
  if (formatId === "control-material") return data.proyecto || "Control de material";
  if (formatId === "orden-trabajo") return data.proyecto || "Orden de trabajo";
  if (formatId === "herramientas") return data.modalidad === "H2" ? "Movimiento de herramientas H2" : data.nombre || `Herramienta ${data.modalidad || "H1"}`;
  if (formatId === "liquidacion") return data.proyecto || data.numeroContrato || "Acta de liquidación";
  if (formatId === "finalizacion") return data.codigoProyecto || data.objeto || "Acta de finalización";
  return "Registro de ejecución";
}

export function newDocument(formatId) {
  const now = new Date().toISOString();
  return { id: uid(), formatId, createdAt: now, updatedAt: now, data: initialData(formatId) };
}
