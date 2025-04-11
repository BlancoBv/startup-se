import type { Session, User } from "lucia";
import { lucia } from "~/server/utils/auth";
import VerifyPath from "../utils/verifyPaths";

export default defineEventHandler(async (event) => {
  const urlSearch = event.path.match(/\?(.*?)($|#)/)?.[0] ?? "";
  const verifyPaths = new VerifyPath(event.path, event.method, urlSearch);

  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
  //actualiza el contexto de no existir cookie
  if (!sessionId) {
    event.context.session = null;
    event.context.user = null;

    if (event.path.match("/api/") && verifyPaths.isProtected()) {
      setResponseStatus(event, 400);
      return "Not found.";
    }
    return;
  }
  //valida sesion
  const { session, user } = await lucia.validateSession(sessionId);
  //crea la cookie y la envia al navegador
  if (session && session.fresh) {
    appendResponseHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  }
  //elimina la cookie si ya no es valida o si se cierra sesion
  if (!session) {
    appendResponseHeader(
      event,
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }
  event.context.session = session;
  event.context.user = user;

  /*   if (verifyPaths.isProtected() && verifyPaths.pathnameType() === "content") {
    if (!session) {
      await sendRedirect(event, "/login");
    }
  } */
});

declare module "h3" {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
  }
}
