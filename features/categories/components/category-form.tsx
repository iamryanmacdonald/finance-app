import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertCategorySchema } from "@/db/schema";

const formSchema = insertCategorySchema.pick({ name: true });

export type FormValues = z.input<typeof formSchema>;

type Props = {
  defaultValues?: FormValues;
  disabled?: boolean;
  id?: string;
  onDelete?: () => void;
  onSubmit: (values: FormValues) => void;
};

export const CategoryForm = ({
  defaultValues,
  disabled,
  id,
  onDelete,
  onSubmit,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleDelete = () => onDelete?.();

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 pt-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Food, Travel, etc."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create Category"}
        </Button>
        {!!id && (
          <Button
            className="w-full"
            disabled={disabled}
            onClick={handleDelete}
            type="button"
            variant="outline"
          >
            <Trash className="mr-2 size-4" />
            Delete Category
          </Button>
        )}
      </form>
    </Form>
  );
};
