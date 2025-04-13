import { ColaMantenimiento, Procedimiento } from "~/db/models";
import ControllerBuilder from "../utils/builders/controllerBuilder";
import { z } from "zod";

const querySchema = z.object({
  estatus: z.enum(["en_cola", "terminado", "terminado_entregado"]),
});

export default defineEventHandler(async (event) => {
  const controller = new ControllerBuilder();
  const query = await getValidatedQuery(event, (res) =>
    querySchema.safeParse(res)
  );

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "query invalida",
      data: query.error.errors.flat(),
    });
  }
  const response = await controller
    .setModel(ColaMantenimiento)
    .setWhereFilters({ estatus: query.data.estatus })
    .setOrderFilters([["createdAt", "DESC"]])
    .setIncludedModels([{ model: Procedimiento, as: "procedimientos" }])
    .getModelResult()
    .getAll()
    .then((res) => res.toRawArray())
    .catch((err) => {
      console.log(err);

      throw createError({
        data: err,
        statusCode: 400,
        statusMessage: "Error al obtener cola",
      });
    });
  return response;
});
