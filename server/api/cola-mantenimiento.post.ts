import z from "zod";
import { v4 } from "uuid";
import { ColaMantenimiento } from "~/db/models";

const colaSchema = z.object({
  nombreCliente: z
    .string()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("nombre")
    ),
  numTel: z
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
    .nullish(),
  razonEntrada: z
    .string()
    .max(255)
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("razón de entrada")
    ),
});
export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer();
  const idUsuario = event.context.user?.id;
  const controller = new controllerBuilder();
  const body = await readValidatedBody(event, (res) =>
    colaSchema.safeParse(res)
  );

  if (!body.success) {
    setResponseStatus(event, 400);
    return body.error.issues;
  }

  controller
    .setModel(ColaMantenimiento)
    .setBody({
      id: v4(),
      nombreCliente: body.data.nombreCliente,
      estatus: "en_cola",
      numTel: body.data.numTel,
      correo: body.data.correo,
      marcaEquipo: body.data.marcaEquipo,
      numSerieEquipo: body.data.numSerieEquipo,
      razonEntrada: body.data.razonEntrada,
      idUsuario: Number(idUsuario) ?? null,
    })
    .getModelResult()
    .create()
    .then((res) => {
      console.log(res.id);

      sendMail({
        subject: `Su equipo ha sido recibido.`,
        text: "prueba de correo 2",
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Notificación</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #4a90e2;
      color: white;
      padding: 20px 0;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .button {
      display: inline-block;
      padding: 12px 20px;
      background-color: #4a90e2;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Equipo recibido</h1>
    </div>
    <div class="content">
      <p>Hola ${body.data.nombreCliente},</p>
      <p>Tu equipo marca ${body.data.marcaEquipo} ha sido recibo y pronto tendras nuevas actualizciones de estado.</p>
      <p>Haz clic en el siguiente botón para verlas:</p>
      <a href="http://localhost:3000/estatus-equipo/${res.id}" class="button">Ver ahora</a>
    </div>
    <div class="footer">
      © 2025 Systems Engineers. Todos los derechos reservados.
    </div>
  </div>
</body>
</html>
`,
        to: body.data.correo,
      }).catch((err) => {
        throw err;
      });
    })
    .catch((err) => {
      throw createError({
        statusCode: 400,
        statusMessage: "Error al añadir",
        data: err,
      });
    });
  return { msg: "Añadido correctamente." };
});
