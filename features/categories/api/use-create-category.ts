import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.categories.$post>;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories.$post({ json });

      return await response.json();
    },
    onError: () => {
      toast.error("Failed to create category");
    },
    onSuccess: () => {
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return mutation;
};
