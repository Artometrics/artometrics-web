import { useEffect } from "react";
import { router, usePathname } from "expo-router";
import { useAuth } from "@/lib/auth";

/** Redirect guests to login, preserving return path. */
export function useRequireAuth() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const next = encodeURIComponent(pathname || "/tools");
      router.replace(`/login?next=${next}`);
    }
  }, [user, loading, pathname]);

  return { user, loading, ready: !loading && !!user };
}
