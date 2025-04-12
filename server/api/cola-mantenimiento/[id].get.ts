import { ColaMantenimiento, Procedimiento } from "~/db/models";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const controller = new controllerBuilder();

  const response = await controller
    .setModel(ColaMantenimiento)
    .setWhereFilters({ id })
    .setIncludedModels([{ model: Procedimiento, as: "procedimientos" }])
    .getModelResult()
    .getOne()
    .then((res) => res.toRawJSON<{ procedimientos: Procedimiento[] }>())
    .catch((err) => {
      throw createError({
        data: err,
        statusCode: 400,
        statusMessage: "Error al obtener cola",
      });
    });
  return response;
});
