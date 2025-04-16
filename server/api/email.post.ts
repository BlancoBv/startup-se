import PDFDocument from "pdfkit";
function createPDFBuffer(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Aquí puedes personalizar tu PDF
    doc.fontSize(25).text("Hola! Este es tu PDF adjunto.", 100, 100);
    doc.fontSize(12).text("Costo: $500.00");

    doc.end();
  });
}

export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer();
  const date = new Date(Date.now());
  const pdfBuffer = await createPDFBuffer();

  return sendMail({
    from: "Systems Engineers <systemsengineers.startup@gmail.com>",
    subject: `prieba de correo ${date}`,
    text: "prueba de correo 2",
    html: "<h1>Titulo de prueba</h1><p>Esto es un parrafo</p><p>Se adjunta tu factura</p>",
    to: "dehara14@gmail.com",
    attachments: [
      {
        filename: "factura.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
});
