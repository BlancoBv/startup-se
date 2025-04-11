export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();

  console.log({ user });

  if (import.meta.server) return;
});
