export default defineEventHandler((event) => {
  const { sendMail } = useNodeMailer();
  const date = new Date(Date.now());

  return sendMail({
    subject: `prieba de correo ${date}`,
    text: "prueba de correo 2",
    html: "<h1>Titulo de prueba</h1><p>Esto es un parrafo</p>",
    to: "diegosuwu@outlook.com",
  });
});
