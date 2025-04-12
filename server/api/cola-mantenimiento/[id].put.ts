import z, { object } from "zod";
import { ColaMantenimiento } from "~/db/models";

const colaSchema = z.object({
  nombreCliente: z
    .string()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("nombre")
    )
    .optional(),
  /*   numTel: z
    .string()
    .min(10)
    .max(10)
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("núm. telefeno")
    ),
  correo: z
    .string()
    .email()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("correo")
    ),
  marcaEquipo: z
    .string()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("marca de equipo")
    ),
  numSerieEquipo: z
    .string()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("marca de equipo")
    )
    .nullish(), */
  razonEntrada: z
    .string()
    .max(255)
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("razón de entrada")
    )
    .optional(),
});
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const controller = new controllerBuilder();
  const body = await readValidatedBody(event, (res) =>
    colaSchema.safeParse(res)
  );
  if (!body.success) {
    throw createError({
      statusMessage: "Error en datos",
      data: body.error,
      statusCode: 400,
    });
  }
  const { nombreCliente, razonEntrada } = body.data;
  await controller
    .setModel(ColaMantenimiento)
    .setBody({ nombreCliente, razonEntrada } as any)
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
