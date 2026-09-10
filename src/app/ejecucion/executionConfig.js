export const STORAGE_KEY = "proyectos-ei-ejecucion-v3";

export const UNIDADES = [
  "UND", "UN", "M", "MTR", "ML", "M²", "M³", "KG", "G", "TON", "L", "GAL",
  "ROLLO", "CAJA", "JUEGO", "KIT", "PAR", "HORA", "DÍA", "SERVICIO", "GLOBAL", "OTRO",
];

export const BODEGAS = ["BOD-10", "BOD-21", "OTRA"];
export const TIPOS_MANTENIMIENTO = ["Preventivo", "Correctivo", "Predictivo", "Calibración", "Inspección", "Otro"];
export const RESULTADOS_MANTENIMIENTO = ["Conforme", "Requiere seguimiento", "Pendiente", "Fuera de servicio", "No aplica"];
export const RESPUESTAS = ["Sí", "No", "No aplica"];
export const RESPUESTAS_OBS = ["Sí", "No", "Con observaciones"];
export const ETAPAS_ACTA = ["Borrador", "En revisión", "Listo para firma", "Firmado"];
export const TIPOS_OBRA = ["Construcción", "Montaje", "Mantenimiento", "Expansión", "Reposición", "Mejoramiento", "Otro"];
export const UBICACIONES = ["Urbano", "Rural", "Mixto"];

export const PELIGROS = [
  ["BIOLÓGICOS", "Residuo, desechos orgánicos o residuo animal (virus, bacterias)"],
  ["BIOLÓGICOS", "Picaduras o mordeduras de insectos o animales"],
  ["FÍSICOS", "Ruido"], ["FÍSICOS", "Iluminación"], ["FÍSICOS", "Vibración"],
  ["FÍSICOS", "Temperaturas bajas o extremas"], ["FÍSICOS", "Radiaciones"],
  ["QUÍMICOS", "Gases y vapores"], ["QUÍMICOS", "Polvo (material particulado)"],
  ["QUÍMICOS", "Materias o sustancias combustibles, irritantes o tóxicas"],
  ["BIOMECÁNICO", "Manipulación de cargas"],
  ["BIOMECÁNICO", "Posturas prolongadas, mantenidas, forzadas o antigravitacionales"],
  ["BIOMECÁNICO", "Movimientos repetitivos"],
  ["CONDICIONES DE SEGURIDAD", "Mecánico: equipos y herramientas en movimiento"],
  ["CONDICIONES DE SEGURIDAD", "Accidente de tránsito"],
  ["CONDICIONES DE SEGURIDAD", "Público: atracos, orden público, atentados, secuestros o extorsiones"],
  ["CONDICIONES DE SEGURIDAD", "Trabajo en alturas o espacio confinado"],
  ["CONDICIONES DE SEGURIDAD", "Locativo: pisos, escaleras, barandas, plataformas o andamios defectuosos"],
  ["CONDICIONES DE SEGURIDAD", "Locativo: techos defectuosos o en mal estado"],
  ["CONDICIONES DE SEGURIDAD", "Locativo: superficie del piso deslizante o en mal estado"],
  ["CONDICIONES DE SEGURIDAD", "Locativo: falta de orden y aseo"],
  ["CONDICIONES DE SEGURIDAD", "Locativo: señalización o demarcación deficiente/inexistente"],
  ["CONDICIONES DE SEGURIDAD", "Eléctrico: conexiones eléctricas"],
  ["CONDICIONES DE SEGURIDAD", "Eléctrico: tableros de distribución"],
  ["CONDICIONES DE SEGURIDAD", "Eléctrico: redes de media y baja tensión"],
  ["OTRO", "Otro peligro / ¿Cuál?"],
];

export const ASPECTOS_AMBIENTALES = [
  "Tala y/o poda de árboles", "Desplazamiento de fauna",
  "Afectación de cobertura vegetal del suelo / excavaciones",
  "Generación de RCD (residuos de construcción y demolición)",
  "Posible generación de derrames (combustibles, aceites, sustancias químicas)",
  "Emisiones contaminantes (humos y vapores de equipos y vehículos)",
  "Generación de residuos sólidos peligrosos",
  "Generación de residuos reciclables (empaques, cartón, plástico, etc.)",
];

export const REQUISITOS_LUGAR = ["Inducción", "Registro de material, herramienta u otro", "Envío previo de seguridad social", "Otros requisitos"];
export const TIPOS_PROYECTO = ["Construcción", "Diseño", "Entrega de obra", "PQR", "Ejecución", "Montaje", "Mantenimiento", "Visita", "Otro"];

export const FORMATOS = [
  { id: "orden", codigo: "P-F-2", nombre: "Orden de trabajo de entrega", titulo: "ORDEN DE TRABAJO DE ENTREGA", etapa: "Inicio", desc: "Apertura de obra, alcance, cantidades, riesgos de calidad, SST y ambiente.", icon: "clipboard", guia: ["Complete proyecto, centro de costo, objetivo, cliente, fechas y responsables antes de iniciar la ejecución.", "Registre una fila por actividad. Ejecutado no puede superar cantidad inicial más adicionales aprobados.", "Todo adicional debe tener aprobación o soporte.", "Verifique requisitos del lugar antes de iniciar; todo No debe justificarse.", "Evalúe cada peligro y aspecto ambiental; si marca Sí, documente la medida de control o manejo.", "Este checklist es un control operativo y no sustituye la matriz formal de peligros, permisos o procedimientos SST aplicables."] },
  { id: "herramienta", codigo: "FORMATO", nombre: "Entrega de herramientas", titulo: "FORMATO DE ENTREGA DE HERRAMIENTAS", etapa: "Inicio", desc: "Tenencia, movimientos, mantenimiento y retiro definitivo de herramientas/equipos.", icon: "tool", guia: ["Seleccione H1 para ficha individual, H2 para movimientos de grupos y AP para tenencia con entrega/devolución.", "En H1 y AP identifique nombre, descripción, marca, referencia, serie y fecha de adquisición.", "En H2 cada movimiento admite máximo siete herramientas, igual que el formato fuente.", "Registre primero la entrega y cierre el movimiento con la devolución, identificando responsables y constancias.", "Cada mantenimiento debe indicar fecha, tipo, actividad y resultado.", "El retiro definitivo solo se diligencia cuando el elemento sale de servicio."] },
  { id: "bitacora", codigo: "BITÁCORA", nombre: "Bitácora", titulo: "FORMATO DE BITÁCORA", etapa: "Seguimiento", desc: "Registro diario de jornada, cuadrilla, novedades, procedimiento, pendientes y cantidades instaladas.", icon: "book", guia: ["Cree un registro por jornada y proyecto; fecha, proyecto y cuadrilla son obligatorios.", "En novedades describa hechos que afectaron la jornada; si no hubo, registre Sin novedades.", "En procedimiento deje trazabilidad concreta de lo ejecutado.", "En pendientes registre lo que queda por ejecutar o corregir; si no hay, registre Sin pendientes.", "En cantidades use una fila por material o actividad cuantificable con cantidad y unidad.", "Ubicación, condiciones y retrasos son datos complementarios añadidos para mejorar la trazabilidad de campo."] },
  { id: "control-material", codigo: "P-F-7", nombre: "Requerimiento / control de material", titulo: "FORMATO DE CONTROL DE MATERIAL", etapa: "Seguimiento", desc: "Trazabilidad de requerimiento, entrega, utilización, devolución y saldo de materiales.", icon: "box", guia: ["Complete proyecto, fecha real de inicio, destino y sucursal.", "Una descripción activa la línea; bodega, unidad, cantidad y fecha de requerimiento pasan a ser obligatorias.", "Factura/RM y código de producto pueden quedar vacíos cuando no existan.", "No registre uso o devolución antes de registrar la entrega.", "Si hay entrega, identifique entregado por y recibido por; si hay devolución, la fecha de devolución es obligatoria.", "Saldo = cantidad requerida − utilizada − devuelta; la línea queda CERRADA cuando utilizado + devuelto coincide con lo requerido."] },
  { id: "solicitud-materiales", codigo: "FORMATO", nombre: "Solicitud de materiales", titulo: "FORMATO DE SOLICITUD DE MATERIALES", etapa: "Seguimiento", desc: "Conciliación de cantidades solicitadas, facturadas, utilizadas y devueltas.", icon: "truck", guia: ["Registre una fila por material con descripción, unidad y cantidad solicitada.", "Cuando se facture, diligencie cantidad facturada y número de factura.", "La cantidad facturada no puede superar la solicitada.", "Utilizado + devuelto no puede superar lo facturado; si hay devolución, registre su número.", "Saldo = facturado − utilizado − devuelto. El pendiente por facturar se controla aparte como solicitado − facturado.", "No cierre con filas en REVISAR; SOLICITADO o EN PROCESO requieren seguimiento."] },
  { id: "finalizacion", codigo: "ACTA", nombre: "Acta de finalización", titulo: "ACTA DE FINALIZACIÓN", etapa: "Cierre", desc: "Cierre técnico y contractual, responsables, recibo a satisfacción y pendientes.", icon: "check", guia: ["Complete los veinte campos críticos definidos en el formato fuente.", "La fecha del acta no debe ser anterior a la finalización.", "Revise valor final frente al contractual; variación absoluta y porcentual son automáticas.", "Identifique contratista, contratante, sus representantes e interventoría antes de firma.", "Para LISTO PARA FIRMA: recibo Sí, cumplimiento Sí y pendientes abiertos No.", "Si existe observación o pendiente, descríbalo antes de cerrar."] },
  { id: "liquidacion", codigo: "P-F-3", nombre: "Acta de liquidación", titulo: "ACTA DE LIQUIDACIÓN", etapa: "Cierre", desc: "Liquidación inicial, presente y acumulada con control de cantidades y valor contractual disponible.", icon: "cash", guia: ["Complete proceso, objeto, contrato, acta, interventoría, valor inicial, tipo de obra, fechas, proyecto y presupuesto.", "En cada ítem registre código, descripción, unidad, cantidad inicial y valor unitario; luego cantidades presente y acumulada.", "Cantidad acumulada no puede ser menor que cantidad presente.", "Subtotales, AIU y totales inicial/presente/acumulado son automáticos.", "La liquidación acumulada no debe superar el valor inicial más adicionales.", "Si existe acumulado anterior, debe conciliar con acumulado anterior + liquidación presente.", "El valor en letras se mantiene manual, igual que en el formato fuente."] },
];

export function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`; }
export function hoy() { return new Date().toISOString().slice(0, 10); }
export function numero(value) { const n = Number(value); return Number.isFinite(n) ? n : 0; }
export function moneda(value) { return numero(value).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }); }
export function porcentaje(value) { return `${Math.round((Number(value) || 0) * 100)}%`; }
const filas = (cantidad, factory) => Array.from({ length: cantidad }, () => factory());

export function crearDatos(tipo) {
  if (tipo === "bitacora") return { fecha: hoy(), proyecto: "", cuadrilla: "", ubicacion: "", condiciones: "", retrasos: "", novedades: "", procedimiento: "", pendientes: "", responsable: "", tercero: "", cantidades: filas(3, () => ({ id: uid(), descripcion: "", cantidad: "", unidad: "UND", observaciones: "" })) };
  if (tipo === "control-material") return { proyecto: "", fechaInicio: "", destino: "", sucursal: "", lineas: filas(3, () => ({ id: uid(), factura: "", bodega: "", requisicion: "", codigo: "", descripcion: "", unidad: "UND", cantidad: "", fechaReq: "", fechaEnt: "", entregadoPor: "", recibidoPor: "", utilizado: "", devuelto: "", fechaDev: "" })) };
  if (tipo === "solicitud-materiales") return { proyecto: "", responsable: "", fecha: hoy(), observacionGeneral: "", lineas: filas(3, () => ({ id: uid(), descripcion: "", unidad: "UND", solicitada: "", facturada: "", utilizada: "", devuelta: "", factura: "", devolucion: "", observaciones: "" })) };
  if (tipo === "finalizacion") return { fechaActa: hoy(), codigoProyecto: "", ciudad: "Tuluá", etapaActa: "Borrador", objeto: "", codigoDocumento: "X-FT-X", version: "X", contratista: "ELECTRO INGENIERIA S.A.S.", nit: "891.903.664-9", ciudadContratista: "Tuluá", contratoNo: "", fechaContrato: "", valorContrato: "", fechaFinalizacion: "", valorFinal: "", recibo: "", repContratista: "", cargoContratista: "", contratante: "", repContratante1: "", repContratante2: "", interventor: "", empresaInterventoria: "", ciudadContratante: "", cumple: "", pendientesAbiertos: "", observaciones: "" };
  if (tipo === "herramienta") { const firma = () => ({ fecha: "", entrega: "", recibe: "", firmaEntrega: "", firmaRecibe: "", observaciones: "" }); return { modalidad: "H1", nombre: "", descripcion: "", marca: "", referencia: "", serial: "", fechaAdquisicion: "", observaciones: "", mantenimientos: filas(2, () => ({ id: uid(), fecha: "", tipo: "Preventivo", actividades: "", resultado: "Conforme" })), retiro: { fecha: "", aprueba: "", motivo: "", firma: "" }, entrega: firma(), devolucion: firma(), movimientos: [1, 2].map((n) => ({ id: uid(), numero: n, herramientas: filas(2, () => ({ id: uid(), nombre: "", descripcion: "", marca: "", referencia: "", serial: "", cantidad: 1 })), entrega: firma(), devolucion: firma() })) }; }
  if (tipo === "orden") return { proyecto: "", centroCosto: "", objetivo: "", visitaTecnica: "", cliente: "", fechaInicio: "", fechaFin: "", responsable: "", autoriza: "", tipos: [], otroTipo: "", actividades: filas(3, () => ({ id: uid(), descripcion: "", unidad: "UND", cantidad: "", ejecutada: "", adicional: "", aprobacion: "", observaciones: "" })), riesgosCalidad: "", requisitos: REQUISITOS_LUGAR.map((nombre) => ({ id: uid(), nombre, cumple: "", observaciones: "" })), peligros: PELIGROS.map(([categoria, nombre]) => ({ id: uid(), categoria, nombre, presente: "", observaciones: "" })), aspectos: ASPECTOS_AMBIENTALES.map((nombre) => ({ id: uid(), nombre, aplica: "", observaciones: "" })), observacionesSst: "", firmaResponsable: "", firmaRecibe: "" };
  if (tipo === "liquidacion") return { proceso: "", objeto: "", contratoNo: "", actaNo: "", interventoria: "", valorInicial: "", tipoObra: "", fechaInicio: "", fechaTerminacion: "", fechaActa: hoy(), valorAdicional: "", anticipoPct: "", valorAcumuladoAnterior: "", fechaAnticipo: "", concesion: "", proyecto: "", visitaTecnica: "", ubicacion: "", presupuestoNo: "", lineas: filas(3, () => ({ id: uid(), codigo: "", descripcion: "", unidad: "UND", cantidadInicial: "", valorUnitario: "", cantidadPresente: "", cantidadAcumulada: "" })), incrementoInicial: "", incrementoPresente: "", incrementoAcumulado: "", aiuInicial: "", aiuPresente: "", aiuAcumulado: "", valorLetras: "", repEi: "", repInterventoria: "" };
  return {};
}

export function estadoMaterial(x) {
  const q = numero(x.cantidad), u = numero(x.utilizado), d = numero(x.devuelto);
  if (!x.descripcion) return "VACÍA";
  if (!x.bodega || !x.unidad || !String(x.cantidad ?? "").trim() || !x.fechaReq || (x.fechaEnt && x.fechaEnt < x.fechaReq) || u + d > q || (!x.fechaEnt && (u > 0 || d > 0)) || (x.fechaEnt && (!x.entregadoPor || !x.recibidoPor)) || (d > 0 && !x.fechaDev) || (x.fechaDev && d === 0) || (x.fechaDev && x.fechaEnt && x.fechaDev < x.fechaEnt)) return "REVISAR";
  if (!x.fechaEnt) return "REQUERIDO";
  if (u + d === q) return "CERRADO";
  if (u + d === 0) return "ENTREGADO";
  return "EN OBRA";
}
export const saldoMaterial = (x) => numero(x.cantidad) - numero(x.utilizado) - numero(x.devuelto);

export function estadoSolicitud(x) {
  const hayAlgo = [x.descripcion, x.unidad, x.solicitada, x.facturada, x.utilizada, x.devuelta, x.factura, x.devolucion, x.observaciones].some((v) => String(v ?? "").trim());
  if (!hayAlgo) return "SIN DILIGENCIAR";
  const s = numero(x.solicitada), f = numero(x.facturada), u = numero(x.utilizada), d = numero(x.devuelta);
  if (!x.descripcion || !x.unidad || !String(x.solicitada ?? "").trim() || f > s || u + d > f || (f > 0 && !x.factura) || (d > 0 && !x.devolucion)) return "REVISAR";
  if (!String(x.facturada ?? "").trim() || f < s) return "SOLICITADO";
  if (saldoSolicitud(x) !== 0) return "EN PROCESO";
  return "OK";
}
export const saldoSolicitud = (x) => numero(x.facturada) - numero(x.utilizada) - numero(x.devuelta);

export function estadoActividad(x) {
  if (!x.descripcion) return "SIN DILIGENCIAR";
  const q = numero(x.cantidad), a = numero(x.adicional), e = numero(x.ejecutada);
  if (!x.unidad || !String(x.cantidad ?? "").trim() || e > q + a || (a > 0 && !x.aprobacion)) return "REVISAR";
  if (e === q + a) return "COMPLETO";
  return "PENDIENTE";
}
export function estadoMovimiento(m) { if (m.devolucion?.fecha) return "DEVUELTO"; if (m.entrega?.fecha) return "ENTREGADO"; return "SIN INICIAR"; }
export function estadoHerramienta(data) { if (data.modalidad === "H2") return `${estadoMovimiento(data.movimientos?.[0] || {})} / ${estadoMovimiento(data.movimientos?.[1] || {})}`; if (data.retiro?.fecha) return "RETIRADO"; if (data.modalidad === "AP") { if (data.devolucion?.fecha) return "DEVUELTO"; if (data.entrega?.fecha) return "EN TENENCIA"; return "SIN ENTREGA"; } return "ACTIVO"; }

export function totalesLiquidacion(data) {
  const subtotalInicial = (data.lineas || []).reduce((s, x) => s + numero(x.cantidadInicial) * numero(x.valorUnitario), 0);
  const subtotalPresente = (data.lineas || []).reduce((s, x) => s + numero(x.cantidadPresente) * numero(x.valorUnitario), 0);
  const subtotalAcumulado = (data.lineas || []).reduce((s, x) => s + numero(x.cantidadAcumulada) * numero(x.valorUnitario), 0);
  const total = (subtotal, incremento, aiu) => subtotal + numero(incremento) + (subtotal + numero(incremento)) * (numero(aiu) / 100);
  return { subtotalInicial, subtotalPresente, subtotalAcumulado, inicial: total(subtotalInicial, data.incrementoInicial, data.aiuInicial), presente: total(subtotalPresente, data.incrementoPresente, data.aiuPresente), acumulado: total(subtotalAcumulado, data.incrementoAcumulado, data.aiuAcumulado) };
}

const falta = (v) => !String(v ?? "").trim();
export function completitud(tipo, d) {
  let v = [];
  if (tipo === "bitacora") v = [d.fecha, d.proyecto, d.cuadrilla, d.novedades, d.procedimiento, d.pendientes];
  if (tipo === "control-material") v = [d.proyecto, d.fechaInicio, d.destino, d.sucursal];
  if (tipo === "solicitud-materiales") v = [d.fecha, d.proyecto, d.responsable];
  if (tipo === "herramienta") v = d.modalidad === "H2" ? [d.modalidad] : [d.nombre, d.descripcion, d.marca, d.referencia, d.serial, d.fechaAdquisicion];
  if (tipo === "orden") v = [d.proyecto, d.centroCosto, d.objetivo, d.cliente, d.fechaInicio, d.fechaFin, d.responsable, d.autoriza];
  if (tipo === "finalizacion") v = [d.fechaActa, d.codigoProyecto, d.ciudad, d.etapaActa, d.objeto, d.contratista, d.nit, d.contratoNo, d.fechaContrato, d.valorContrato, d.fechaFinalizacion, d.valorFinal, d.recibo, d.repContratista, d.contratante, d.repContratante1, d.repContratante2, d.interventor, d.cumple, d.pendientesAbiertos];
  if (tipo === "liquidacion") v = [d.proceso, d.objeto, d.contratoNo, d.actaNo, d.interventoria, d.valorInicial, d.tipoObra, d.fechaInicio, d.fechaTerminacion, d.fechaActa, d.proyecto, d.presupuestoNo];
  return v.length ? v.filter((x) => !falta(x)).length / v.length : 0;
}

export function validar(tipo, d) {
  const errors = [], warnings = [];
  const req = (v, label) => { if (falta(v)) errors.push(`Complete ${label}.`); };
  if (tipo === "bitacora") { [[d.fecha,"la fecha"],[d.proyecto,"el proyecto"],[d.cuadrilla,"la cuadrilla"],[d.novedades,"las novedades o Sin novedades"],[d.procedimiento,"el procedimiento del día"],[d.pendientes,"los pendientes o Sin pendientes"]].forEach(([v,l])=>req(v,l)); (d.cantidades||[]).forEach((x,i)=>{ if(numero(x.cantidad)>0&&!x.descripcion)errors.push(`Cantidad ${i+1}: falta descripción.`); if(x.descripcion&&!x.unidad)errors.push(`Cantidad ${i+1}: falta unidad de medida.`); }); }
  if (tipo === "control-material") { [[d.proyecto,"el proyecto"],[d.fechaInicio,"la fecha de inicio"],[d.destino,"el destino"],[d.sucursal,"la sucursal"]].forEach(([v,l])=>req(v,l)); (d.lineas||[]).forEach((x,i)=>{ if(!x.descripcion)return; if(!x.bodega)errors.push(`Material ${i+1}: falta bodega.`); if(!x.unidad)errors.push(`Material ${i+1}: falta unidad de medida.`); if(!String(x.cantidad??"").trim())errors.push(`Material ${i+1}: falta cantidad.`); if(!x.fechaReq)errors.push(`Material ${i+1}: falta fecha de requerimiento.`); if(x.fechaEnt&&x.fechaReq&&x.fechaEnt<x.fechaReq)errors.push(`Material ${i+1}: entrega anterior al requerimiento.`); if(numero(x.utilizado)+numero(x.devuelto)>numero(x.cantidad))errors.push(`Material ${i+1}: utilizado + devuelto supera lo requerido.`); if(!x.fechaEnt&&(numero(x.utilizado)>0||numero(x.devuelto)>0))errors.push(`Material ${i+1}: hay uso/devolución sin fecha de entrega.`); if(x.fechaEnt&&(!x.entregadoPor||!x.recibidoPor))errors.push(`Material ${i+1}: complete responsables de entrega y recibo.`); if(numero(x.devuelto)>0&&!x.fechaDev)errors.push(`Material ${i+1}: falta fecha de devolución.`); if(x.fechaDev&&numero(x.devuelto)===0)errors.push(`Material ${i+1}: existe fecha de devolución sin cantidad devuelta.`); if(x.fechaDev&&x.fechaEnt&&x.fechaDev<x.fechaEnt)errors.push(`Material ${i+1}: devolución anterior a la entrega.`); }); }
  if (tipo === "solicitud-materiales") { [[d.fecha,"la fecha del registro"],[d.proyecto,"el proyecto"],[d.responsable,"el responsable"]].forEach(([v,l])=>req(v,l)); (d.lineas||[]).forEach((x,i)=>{ const st=estadoSolicitud(x); if(st==="SIN DILIGENCIAR")return; const s=numero(x.solicitada),f=numero(x.facturada),u=numero(x.utilizada),dv=numero(x.devuelta); if(!x.descripcion)errors.push(`Material ${i+1}: falta descripción.`); if(!x.unidad)errors.push(`Material ${i+1}: falta unidad.`); if(!String(x.solicitada??"").trim())errors.push(`Material ${i+1}: falta cantidad solicitada.`); if(f>s)errors.push(`Material ${i+1}: facturado supera solicitado.`); if(u+dv>f)errors.push(`Material ${i+1}: utilizado + devuelto supera lo facturado.`); if(f>0&&!x.factura)errors.push(`Material ${i+1}: falta No. factura.`); if(dv>0&&!x.devolucion)errors.push(`Material ${i+1}: falta No. devolución.`); if(st==="SOLICITADO")warnings.push(`Material ${i+1}: pendiente por facturar.`); if(st==="EN PROCESO")warnings.push(`Material ${i+1}: saldo facturado pendiente por conciliar.`); }); }
  if (tipo === "finalizacion") { [[d.fechaActa,"fecha del acta"],[d.codigoProyecto,"código/proyecto"],[d.ciudad,"ciudad"],[d.etapaActa,"etapa del acta"],[d.objeto,"obra/objeto contractual"],[d.contratista,"contratista"],[d.nit,"NIT"],[d.contratoNo,"contrato No."],[d.fechaContrato,"fecha del contrato"],[d.valorContrato,"valor del contrato"],[d.fechaFinalizacion,"fecha de finalización"],[d.valorFinal,"valor final"],[d.recibo,"recibo a satisfacción"],[d.repContratista,"representante contratista"],[d.contratante,"contratante"],[d.repContratante1,"representante contratante 1"],[d.repContratante2,"representante contratante 2"],[d.interventor,"interventor"],[d.cumple,"cumplimiento técnico"],[d.pendientesAbiertos,"pendientes abiertos"]].forEach(([v,l])=>req(v,l)); if(d.fechaActa&&d.fechaFinalizacion&&d.fechaActa<d.fechaFinalizacion)errors.push("La fecha del acta no puede ser anterior a la finalización."); if(d.recibo&&d.recibo!=="Sí")errors.push("Recibo a satisfacción debe quedar en Sí para firma."); if(d.cumple&&d.cumple!=="Sí")errors.push("Cumplimiento técnico debe quedar en Sí para firma."); if(d.pendientesAbiertos==="Sí"){errors.push("Existen pendientes abiertos; el acta no está lista para firma."); if(!d.observaciones)errors.push("Describa los pendientes abiertos.");} }
  if (tipo === "herramienta") { if(d.modalidad!=="H2")[[d.nombre,"nombre"],[d.descripcion,"descripción"],[d.marca,"marca"],[d.referencia,"referencia"],[d.serial,"No. de serie"],[d.fechaAdquisicion,"fecha de adquisición"]].forEach(([v,l])=>req(v,l)); const validEntrega=(b,p)=>{if(!b?.fecha)return;if(!b.entrega||!b.recibe)errors.push(`${p}: complete responsables.`);}; if(d.modalidad==="AP"){validEntrega(d.entrega,"Entrega AP");validEntrega(d.devolucion,"Devolución AP");if(d.devolucion?.fecha&&!d.entrega?.fecha)errors.push("AP: devolución sin entrega previa.");if(d.entrega?.fecha&&d.devolucion?.fecha&&d.devolucion.fecha<d.entrega.fecha)errors.push("AP: devolución anterior a entrega.");} if(d.modalidad==="H2"){(d.movimientos||[]).forEach((m,i)=>{const tools=(m.herramientas||[]).filter(x=>x.nombre||x.descripcion||x.serial);if(tools.length>7)errors.push(`Movimiento ${i+1}: máximo 7 herramientas.`);tools.forEach((t,j)=>{if(numero(t.cantidad)<=0)errors.push(`Movimiento ${i+1}, herramienta ${j+1}: cantidad inválida.`);});validEntrega(m.entrega,`Movimiento ${i+1} entrega`);validEntrega(m.devolucion,`Movimiento ${i+1} devolución`);if(m.entrega?.fecha&&!tools.length)errors.push(`Movimiento ${i+1}: agregue herramientas antes de entregar.`);if(m.devolucion?.fecha&&!m.entrega?.fecha)errors.push(`Movimiento ${i+1}: devolución sin entrega.`);if(m.entrega?.fecha&&m.devolucion?.fecha&&m.devolucion.fecha<m.entrega.fecha)errors.push(`Movimiento ${i+1}: devolución anterior a entrega.`);});if(estadoMovimiento(d.movimientos?.[0]||{})==="SIN INICIAR")warnings.push("Movimiento 1 aún no ha iniciado.");} (d.mantenimientos||[]).forEach((m,i)=>{const hay=m.fecha||m.actividades;if(hay&&(!m.fecha||!m.tipo||!m.actividades||!m.resultado))errors.push(`Mantenimiento ${i+1}: complete fecha, tipo, actividad y resultado.`);if(["Fuera de servicio","Requiere seguimiento","Pendiente"].includes(m.resultado))warnings.push(`Mantenimiento ${i+1}: ${m.resultado}.`);});if(d.retiro?.fecha&&(!d.retiro.aprueba||!d.retiro.motivo))errors.push("Retiro definitivo: complete aprobación y motivo."); }
  if (tipo === "orden") { [[d.proyecto,"proyecto"],[d.centroCosto,"centro de costo"],[d.objetivo,"objetivo"],[d.cliente,"cliente"],[d.fechaInicio,"fecha de inicio"],[d.fechaFin,"fecha fin"],[d.responsable,"responsable"],[d.autoriza,"autoriza"]].forEach(([v,l])=>req(v,l));if(d.fechaInicio&&d.fechaFin&&d.fechaFin<d.fechaInicio)errors.push("Fecha fin anterior al inicio.");(d.actividades||[]).forEach((x,i)=>{const st=estadoActividad(x);if(st==="REVISAR"){if(!x.unidad)errors.push(`Actividad ${i+1}: falta unidad.`);if(!String(x.cantidad??"").trim())errors.push(`Actividad ${i+1}: falta cantidad.`);if(numero(x.ejecutada)>numero(x.cantidad)+numero(x.adicional))errors.push(`Actividad ${i+1}: ejecutado supera cantidad + adicional.`);if(numero(x.adicional)>0&&!x.aprobacion)errors.push(`Actividad ${i+1}: adicional sin aprobación.`);}if(st==="PENDIENTE")warnings.push(`Actividad ${i+1}: saldo pendiente.`);});(d.requisitos||[]).forEach(x=>{if(!x.cumple)warnings.push(`SST pendiente: ${x.nombre}.`);if(x.cumple==="No"&&!x.observaciones)errors.push(`SST: justifique ${x.nombre}.`);});(d.peligros||[]).forEach(x=>{if(!x.presente)warnings.push(`Peligro pendiente: ${x.nombre}.`);if(x.presente==="Sí"&&!x.observaciones)errors.push(`Peligro sin control: ${x.nombre}.`);});(d.aspectos||[]).forEach(x=>{if(!x.aplica)warnings.push(`Aspecto ambiental pendiente: ${x.nombre}.`);if(x.aplica==="Sí"&&!x.observaciones)errors.push(`Aspecto sin manejo: ${x.nombre}.`);}); }
  if (tipo === "liquidacion") { [[d.proceso,"proceso"],[d.objeto,"objeto del contrato"],[d.contratoNo,"número de contrato"],[d.actaNo,"consecutivo de acta"],[d.interventoria,"interventoría"],[d.valorInicial,"valor inicial"],[d.tipoObra,"tipo de obra"],[d.fechaInicio,"fecha de inicio"],[d.fechaTerminacion,"fecha de terminación"],[d.fechaActa,"fecha del acta"],[d.proyecto,"proyecto"],[d.presupuestoNo,"consecutivo presupuesto"],[d.valorLetras,"valor en letras"]].forEach(([v,l])=>req(v,l));if(d.fechaInicio&&d.fechaTerminacion&&d.fechaTerminacion<d.fechaInicio)errors.push("Fecha de terminación anterior al inicio.");const t=totalesLiquidacion(d);if(t.acumulado>numero(d.valorInicial)+numero(d.valorAdicional))errors.push("Liquidación acumulada supera el valor contractual disponible.");if(String(d.valorAcumuladoAnterior??"").trim()&&Math.abs(t.acumulado-(numero(d.valorAcumuladoAnterior)+t.presente))>1)errors.push("Acumulado no concilia con acumulado anterior + presente.");(d.lineas||[]).forEach((x,i)=>{if(!x.descripcion)return;if(!x.unidad)errors.push(`Ítem ${i+1}: falta unidad.`);if(numero(x.cantidadAcumulada)<numero(x.cantidadPresente))errors.push(`Ítem ${i+1}: cantidad acumulada menor que presente.`);}); }
  return { errors, warnings };
}

export function estadoRegistro(tipo, data) { const { errors, warnings } = validar(tipo, data); const c = completitud(tipo, data); if (c === 0) return "BORRADOR"; if (errors.length) return "REVISAR"; if (c < 1 || warnings.length) return "EN DILIGENCIAMIENTO"; return tipo === "finalizacion" ? "LISTO PARA FIRMA" : "LISTO PARA REVISIÓN"; }
