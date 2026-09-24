import { useState } from "react";
import { trpc } from "@/lib/trpc-client";

export function useSubscription() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { data: plans } = trpc.subscriptions.getPlans.useQuery();
  const { data: subscription, refetch: refetchSubscription } = 
    trpc.subscriptions.getSubscription.useQuery();

  const { mutate: createCheckout } = trpc.subscriptions.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });

  return {
    plans,
    subscription,
    refetchSubscription,
    createCheckout,
    isCheckingOut,
  };
}
