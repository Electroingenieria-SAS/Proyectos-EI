"use client";

import { numero, uid, UNIDADES } from "../executionConfig";
import { AddRow, Field, Grid, MiniInput, MiniSelect, Remove, Section, Stat, TableWrap, Td, Th } from "../ExecutionUI";
import { deleteRow, rowUpdate } from "./helpers";

export default function BitacoraForm({ data, setData }) {
  const active = data.cantidades.filter((x) => x.descripcion || numero(x.cantidad));
  const total = active.reduce((sum, x) => sum + numero(x.cantidad), 0);
  return <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      <Stat label="Fecha" value={data.fecha || "—"} />
      <Stat label="Ítems registrados" value={active.length} />
      <Stat label="Cantidad total" value={total} />
      <Stat label="Jornada" value={data.retrasos ? "CON NOVEDAD" : "NORMAL"} accent />
    </div>
    <Section number="01" title="Datos generales" help="Identifique la jornada, el proyecto y la cuadrilla.">
      <Grid>
        <Field label="Fecha" type="date" required value={data.fecha} onChange={(v) => setData({ ...data, fecha: v })} />
        <Field label="Nombre del proyecto" required value={data.proyecto} onChange={(v) => setData({ ...data, proyecto: v })} />
        <Field className="md:col-span-2" label="Integrantes de la cuadrilla" required textarea value={data.cuadrilla} onChange={(v) => setData({ ...data, cuadrilla: v })} placeholder="Nombres, cargos o identificación de la cuadrilla" />
        <Field label="Ubicación / frente (complementario)" value={data.ubicacion} onChange={(v) => setData({ ...data, ubicacion: v })} />
        <Field label="Condiciones de la jornada (complementario)" value={data.condiciones} onChange={(v) => setData({ ...data, condiciones: v })} placeholder="Clima, accesos, restricciones..." />
      </Grid>
    </Section>
    <Section number="02" title="Novedades relevantes" help="Registre lo que ocurrió o afectó la jornada. Si no hubo, escriba “Sin novedades”.">
      <Field label="Novedades del día" required textarea value={data.novedades} onChange={(v) => setData({ ...data, novedades: v })} />
    </Section>
    <Section number="03" title="Procedimiento del día" help="Describa de forma concreta qué actividades se ejecutaron.">
      <Field label="Actividades ejecutadas" required textarea value={data.procedimiento} onChange={(v) => setData({ ...data, procedimiento: v })} />
    </Section>
    <Section number="04" title="Pendientes y retrasos" help="Separe lo pendiente del alcance de cualquier restricción o retraso observado.">
      <Grid>
        <Field label="Actividades pendientes" required textarea value={data.pendientes} onChange={(v) => setData({ ...data, pendientes: v })} placeholder="Si no hay, escriba “Sin pendientes”" />
        <Field label="Retrasos / restricciones (complementario)" textarea value={data.retrasos} onChange={(v) => setData({ ...data, retrasos: v })} placeholder="Causa, impacto y acción tomada" />
      </Grid>
    </Section>
    <Section number="05" title="Cantidades instaladas" help="Una fila por material o actividad cuantificable.">
      <TableWrap><thead><tr><Th>Descripción / material</Th><Th>Cantidad</Th><Th>U/M</Th><Th>Observaciones</Th><Th /></tr></thead><tbody>
        {data.cantidades.map((x, i) => <tr key={x.id}>
          <Td><MiniInput value={x.descripcion} onChange={(v) => rowUpdate(data, "cantidades", i, "descripcion", v, setData)} /></Td>
          <Td><MiniInput type="number" value={x.cantidad} onChange={(v) => rowUpdate(data, "cantidades", i, "cantidad", v, setData)} /></Td>
          <Td><MiniSelect value={x.unidad} options={UNIDADES} onChange={(v) => rowUpdate(data, "cantidades", i, "unidad", v, setData)} /></Td>
          <Td><MiniInput value={x.observaciones} onChange={(v) => rowUpdate(data, "cantidades", i, "observaciones", v, setData)} /></Td>
          <Td><Remove onClick={() => deleteRow(data, "cantidades", i, setData)} /></Td>
        </tr>)}
      </tbody></TableWrap>
      <AddRow onClick={() => setData({ ...data, cantidades: [...data.cantidades, { id: uid(), descripcion: "", cantidad: "", unidad: "UND", observaciones: "" }] })} />
    </Section>
    <Section number="06" title="Firmas / responsables" help="Identifique quién valida la bitácora.">
      <Grid>
        <Field label="Responsable de la obra (opcional)" value={data.responsable} onChange={(v) => setData({ ...data, responsable: v })} />
        <Field label="Tercero / interventoría / encargado (opcional)" value={data.tercero} onChange={(v) => setData({ ...data, tercero: v })} />
      </Grid>
    </Section>
  </>;
}
