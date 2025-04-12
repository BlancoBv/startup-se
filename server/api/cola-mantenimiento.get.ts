import { ColaMantenimiento, Procedimiento } from "~/db/models";
import ControllerBuilder from "../utils/builders/controllerBuilder";
import { z } from "zod";

const querySchema = z.object({
  id: z.string().uuid().optional(),
});

export default defineEventHandler(async (event) => {
  const controller = new ControllerBuilder();

  const response = await controller
    .setModel(ColaMantenimiento)
    .setWhereFilters({ estatus: "en_cola" })
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
