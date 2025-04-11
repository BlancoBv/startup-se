import type { Session, User } from "lucia";
import { lucia } from "~/server/utils/auth";
import VerifyPath from "../utils/verifyPaths";

export default defineEventHandler(async (event) => {
  const urlSearch = event.path.match(/\?(.*?)($|#)/)?.[0] ?? "";
  const verifyPaths = new VerifyPath(event.path, event.method, urlSearch);

  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    event.context.session = null;
    event.context.user = null;

    if (event.path.match("/panel")) {
      await sendRedirect(event, "/login");
    }
    if (event.path.match("/api/") && verifyPaths.isProtected()) {
      setResponseStatus(event, 400);
      return "Not found.";
    }
    return;
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    appendResponseHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  }

  if (!session) {
    appendResponseHeader(
      event,
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }
  event.context.session = session;
  event.context.user = user;

  if (event.path === "/login") {
    if (session) {
      await sendRedirect(event, "/panel");
    }
  }

  if (verifyPaths.isProtected() && verifyPaths.pathnameType() === "content") {
    if (!session) {
      await sendRedirect(event, "/login");
    }
  }
});

declare module "h3" {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
  }
}
