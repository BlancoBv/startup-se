import { ColaMantenimiento } from "~/db/models";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const controller = new controllerBuilder();

  await controller
    .setModel(ColaMantenimiento)
    .setWhereFilters({ id })
    .setBody({ estatus: "terminado_entregado" } as any)
    .getModelResult()
    .update()
    .catch((err) => {
      throw createError({
        statusMessage: "Error al insertar",
        statusCode: 400,
        data: err,
      });
    });
  return { msg: "Editado correctamente" };
});
