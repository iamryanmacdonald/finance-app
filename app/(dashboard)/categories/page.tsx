"use client";

import { Loader2, Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { columns } from "./columns";

const CategoriesPage = () => {
  const categoriesQuery = useGetCategories();
  const deleteCategories = useBulkDeleteCategories();
  const newCategory = useNewCategory();

  const categories = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

  if (categoriesQuery.isLoading)
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Categories Page
          </CardTitle>
          <Button onClick={newCategory.onOpen} size="sm">
            <Plus className="mr-2 size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            disabled={isDisabled}
            filterKey="name"
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              deleteCategories.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
