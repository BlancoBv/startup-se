import VerifyPath from "~/utils/verifyPaths";

export default defineNuxtRouteMiddleware(async (to) => {
  const urlSearch = to.fullPath.match(/\?(.*?)($|#)/)?.[0] ?? "";

  const verifyPaths = new VerifyPath(to.path, "GET", urlSearch);
  const { user, isAuthenticated } = useAuth();
  const data = await useRequestFetch()("/api/auth").catch(
    () => (user.value = null)
  );

  if (data) {
    user.value = data;
  }

  if (isAuthenticated.value) {
    if (to.path === "/login") {
      return navigateTo("/panel", { replace: true });
    }
  } else {
    if (to.path.match("/panel")) {
      return navigateTo("/login", { replace: true });
    }
    if (verifyPaths.isProtected() && verifyPaths.pathnameType() === "content") {
      return navigateTo("/404", { replace: true });
    }
  }
});
verifyPaths;
