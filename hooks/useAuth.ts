import { useCallback, useState } from "react";
import { trpc } from "@/lib/trpc-client";

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  );
  const [user, setUser] = useState<any>(null);

  const { data: currentUser } = trpc.users.me.useQuery(undefined, {
    enabled: !!token,
  });

  const { mutate: register, isPending: isRegistering } = trpc.users.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      setToken(data.token);
      setUser(data.user);
    },
  });

  const { mutate: login, isPending: isLoggingIn } = trpc.users.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      setToken(data.token);
      setUser(data.user);
    },
  });

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  }, []);

  return {
    token,
    user: currentUser || user,
    register,
    login,
    logout,
    isLoading: isRegistering || isLoggingIn,
  };
}
