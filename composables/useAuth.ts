// composables/useAuth.ts
import { type User } from "lucia";
export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const isAuthenticated = computed(() => !!user.value);

  const logout = async () => {
    await $fetch("/api/logout", { method: "POST" })
      .then(async () => {
        return navigateTo("/login");
      })
      .catch((err) => {});
  };

  return { user, isAuthenticated, logout };
};
