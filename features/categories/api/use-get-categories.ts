import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategories = () => {
  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.categories.$get();

      if (!response.ok) throw new Error("Failed to fetch categories");

      const { data } = await response.json();
      return data;
    },
    queryKey: ["categories"],
  });

  return query;
};
