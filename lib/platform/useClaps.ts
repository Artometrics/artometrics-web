import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { hapticMedium } from "@/lib/haptics";
import { clapCount, hasClapped, toggleClap } from "@/lib/platform/social";

export function clapQueryKey(
  targetKind: "report" | "member_post",
  targetId: string,
  userId?: string | null,
) {
  return ["claps", targetKind, targetId, userId ?? "anon"] as const;
}

export function useClaps(
  targetKind: "report" | "member_post",
  targetId: string,
) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: clapQueryKey(targetKind, targetId, user?.id),
    queryFn: async () => {
      const count = await clapCount(targetKind, targetId);
      const clapped = user
        ? await hasClapped(user.id, targetKind, targetId)
        : false;
      return { count, clapped };
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not signed in");
      return toggleClap(user.id, targetKind, targetId);
    },
    onSuccess: (res) => {
      void hapticMedium();
      queryClient.setQueryData(
        clapQueryKey(targetKind, targetId, user?.id),
        { count: res.count, clapped: res.clapped },
      );
    },
  });

  return {
    count: data?.count ?? 0,
    clapped: data?.clapped ?? false,
    toggle: () => mutation.mutate(),
    toggling: mutation.isPending,
  };
}
