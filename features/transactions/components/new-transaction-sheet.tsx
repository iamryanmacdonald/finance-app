import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import {
  ApiFormValues,
  TransactionForm,
} from "@/features/transactions/components/transaction-form";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransaction();

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const isLoading = accountQuery.isLoading || categoryQuery.isLoading;

  const isPending =
    createMutation.isPending ||
    accountMutation.isPending ||
    categoryMutation.isPending;

  const onSubmit = (values: ApiFormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TransactionForm
            accountOptions={accountOptions}
            categoryOptions={categoryOptions}
            disabled={isPending}
            onCreateAccount={onCreateAccount}
            onCreateCategory={onCreateCategory}
            onSubmit={onSubmit}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
