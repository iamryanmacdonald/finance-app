import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.accounts.$post>;

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts.$post({ json });

      return await response.json();
    },
    onError: () => {
      toast.error("Failed to create account");
    },
    onSuccess: () => {
      toast.success("Account created");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  return mutation;
};
