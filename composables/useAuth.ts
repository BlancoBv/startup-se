// composables/useAuth.ts
export const useAuth = () => {
  const userS = useState("user", () => null);
  const session = useState("session", () => null);

  const isAuthenticated = computed(() => !!userS.value);

  const login = async ({
    user,
    password,
  }: {
    user: string;
    password: string;
  }) => {
    await $fetch("/api/login", {
      body: { user, password },
      method: "POST",
    })
      .then((res) => {
        userS.value = res;
        navigateTo("/panel");
      })
      .catch(() => {});
  };

  const fetchUser = async () => {
    if (!userS.value) {
      try {
        const res = await $fetch("/api/auth");
        userS.value = res;
      } catch {
        userS.value = null;
        session.value = null;
      }
    }
  };

  // ... login, logout, etc.

  return {
    user: userS,
    session,
    isAuthenticated,
    login,
    /*logout, */
  };
};
