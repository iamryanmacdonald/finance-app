import { neon } from "@neondatabase/serverless";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import { accounts, categories, transactions } from "@/db/schema";
import { convertAmountToMilliUnits } from "@/lib/utils";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2n0HjvKyObogMYreOPmWi7gsWzr";
const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", plaidId: null, userId: SEED_USER_ID },
  { id: "category_2", name: "Rent", plaidId: null, userId: SEED_USER_ID },
  { id: "category_3", name: "Utilities", plaidId: null, userId: SEED_USER_ID },
  { id: "category_7", name: "Clothing", plaidId: null, userId: SEED_USER_ID },
];
const SEED_ACCOUNTS = [
  { id: "account_1", name: "Checking", plaidId: null, userId: SEED_USER_ID },
  { id: "account_2", name: "Savings", plaidId: null, userId: SEED_USER_ID },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Rent":
      return Math.random() * 400 + 90;
    case "Utilities":
      return Math.random() * 200 + 50;
    case "Food":
      return Math.random() * 30 + 10;
    case "Transportation":
    case "Health":
      return Math.random() * 50 + 15;
    case "Entertainment":
    case "Clothing":
    case "Miscellaneous":
      return Math.random() * 100 + 20;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMilliUnits(
      isExpense ? -amount : amount,
    );

    SEED_TRANSACTIONS.push({
      accountId: SEED_ACCOUNTS[0].id,
      amount: formattedAmount,
      categoryId: category.id,
      date: day,
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      notes: "Random transaction",
      payee: "Merchant",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({
    end: defaultTo,
    start: defaultFrom,
  });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(SEED_CATEGORIES).execute();

    await db.insert(accounts).values(SEED_ACCOUNTS).execute();

    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1);
  }
};

main();
