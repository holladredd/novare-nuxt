import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building2,
  ArrowLeft,
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";

import type { Transaction, WalletData } from "@/types/wallet";
import AccountDetails from "@/components/wallet/AccountDetails";

const ngnTransactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    description: "Payment from Adewale B.",
    amount: 125000,
    date: "2026-03-18",
    status: "completed",
    reference: "TXN-NGN-8271",
  },
  {
    id: "2",
    type: "debit",
    description: "Supplier — Kemi Fabrics",
    amount: 45000,
    date: "2026-03-17",
    status: "completed",
    reference: "TXN-NGN-8270",
  },
  {
    id: "3",
    type: "credit",
    description: "Service fee — Hair styling",
    amount: 18500,
    date: "2026-03-16",
    status: "completed",
    reference: "TXN-NGN-8269",
  },
  {
    id: "4",
    type: "credit",
    description: "Product sale — Skincare set",
    amount: 32000,
    date: "2026-03-15",
    status: "pending",
    reference: "TXN-NGN-8268",
  },
  {
    id: "5",
    type: "debit",
    description: "Withdrawal to GTBank",
    amount: 200000,
    date: "2026-03-14",
    status: "completed",
    reference: "TXN-NGN-8267",
  },
  {
    id: "6",
    type: "credit",
    description: "Payment from Tunde M.",
    amount: 67000,
    date: "2026-03-12",
    status: "completed",
    reference: "TXN-NGN-8266",
  },
  {
    id: "7",
    type: "debit",
    description: "Electricity — EKEDC",
    amount: 15800,
    date: "2026-03-10",
    status: "failed",
    reference: "TXN-NGN-8265",
  },
];

const usdTransactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    description: "Freelance — Morgan & Co.",
    amount: 2400,
    date: "2026-03-19",
    status: "completed",
    reference: "TXN-USD-4102",
  },
  {
    id: "2",
    type: "debit",
    description: "SaaS subscription — Notion",
    amount: 96,
    date: "2026-03-17",
    status: "completed",
    reference: "TXN-USD-4101",
  },
  {
    id: "3",
    type: "credit",
    description: "Consulting fee — Harper Ltd",
    amount: 1750,
    date: "2026-03-14",
    status: "completed",
    reference: "TXN-USD-4100",
  },
  {
    id: "4",
    type: "debit",
    description: "Domain renewal",
    amount: 14.99,
    date: "2026-03-12",
    status: "completed",
    reference: "TXN-USD-4099",
  },
  {
    id: "5",
    type: "credit",
    description: "Product sale — Int'l order",
    amount: 385,
    date: "2026-03-10",
    status: "pending",
    reference: "TXN-USD-4098",
  },
];

const wallets: WalletData[] = [
  {
    currency: "NGN",
    symbol: "₦",
    balance: 1_847_320.55,
    totalRevenue: 3_240_500,
    totalSpent: 1_393_179.45,
    pendingAmount: 32_000,
    transactions: ngnTransactions,
    accounts: [
      {
        id: "ngn-1",
        bankName: "GTBank",
        accountName: "Chidi Ventures Ltd",
        accountNumber: "0123456789",
        sortCode: "058",
        isPrimary: true,
      },
      {
        id: "ngn-2",
        bankName: "Access Bank",
        accountName: "Chidi Ventures Ltd",
        accountNumber: "9876543210",
        sortCode: "044",
        isPrimary: false,
      },
    ],
  },
  {
    currency: "USD",
    symbol: "$",
    balance: 8_274.01,
    totalRevenue: 14_535,
    totalSpent: 6_260.99,
    pendingAmount: 385,
    transactions: usdTransactions,
    accounts: [
      {
        id: "usd-1",
        bankName: "Mercury",
        accountName: "Chidi Ventures Inc",
        accountNumber: "1928374650",
        routingNumber: "084009519",
        isPrimary: true,
      },
    ],
  },
];

const formatAmount = (amount: number, symbol: string) =>
  `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const statusColor = (status: Transaction["status"]) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-500/10 text-amber-700 border-amber-200";
    case "failed":
      return "bg-red-500/10 text-red-700 border-red-200";
  }
};

const WalletDetail = ({
  wallet,
  onBack,
}: {
  wallet: WalletData;
  onBack: () => void;
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [txFilter, setTxFilter] = useState("all");

  const filtered =
    txFilter === "all"
      ? wallet.transactions
      : wallet.transactions.filter((t) => t.type === txFilter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 -ml-2 text-muted-foreground"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" /> All Wallets
      </Button>

      {/* Balance hero */}
      <Card className="border-0 shadow-md shadow-foreground/5 overflow-hidden">
        <div className="bg-primary/5 p-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">
              {wallet.currency} Balance
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-3xl font-bold tracking-tight">
            {showBalance
              ? formatAmount(wallet.balance, wallet.symbol)
              : `${wallet.symbol}••••••`}
          </p>
        </div>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md shadow-foreground/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Revenue</p>
              <p className="text-lg font-bold tabular-nums">
                {formatAmount(wallet.totalRevenue, wallet.symbol)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md shadow-foreground/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Spent</p>
              <p className="text-lg font-bold tabular-nums">
                {formatAmount(wallet.totalSpent, wallet.symbol)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md shadow-foreground/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-lg font-bold tabular-nums">
                {formatAmount(wallet.pendingAmount, wallet.symbol)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Details */}
      <AccountDetails accounts={wallet.accounts} />

      {/* Transactions */}
      <Card className="border-0 shadow-md shadow-foreground/5">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Transactions</CardTitle>
          <Tabs value={txFilter} onValueChange={setTxFilter}>
            <TabsList className="h-8">
              <TabsTrigger value="all" className="text-xs px-2.5 h-6">
                All
              </TabsTrigger>
              <TabsTrigger value="credit" className="text-xs px-2.5 h-6">
                Credits
              </TabsTrigger>
              <TabsTrigger value="debit" className="text-xs px-2.5 h-6">
                Debits
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Reference
                </TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          tx.type === "credit"
                            ? "bg-emerald-500/10"
                            : "bg-red-500/10"
                        }`}
                      >
                        {tx.type === "credit" ? (
                          <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                        )}
                      </div>
                      <span className="text-sm">{tx.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground font-mono">
                    {tx.reference}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] capitalize ${statusColor(tx.status)}`}
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium tabular-nums text-sm ${
                      tx.type === "credit"
                        ? "text-emerald-700"
                        : "text-foreground"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "−"}
                    {formatAmount(tx.amount, wallet.symbol)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const Wallet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const businessName = (location.state as any)?.businessName || "My Business";
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() =>
                navigate("/dashboard", { state: { businessName } })
              }
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <WalletIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Wallet</h1>
              <p className="text-xs text-muted-foreground">{businessName}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto py-6 px-4">
        {selectedWallet ? (
          <WalletDetail
            wallet={selectedWallet}
            onBack={() => setSelectedWallet(null)}
          />
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wallets.map((w) => (
                <Card
                  key={w.currency}
                  className="border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg transition-shadow active:scale-[0.98] transition-transform"
                  onClick={() => setSelectedWallet(w)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="secondary"
                        className="text-xs font-semibold"
                      >
                        {w.currency}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Available Balance
                    </p>
                    <p className="text-2xl font-bold tracking-tight tabular-nums">
                      {formatAmount(w.balance, w.symbol)}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ArrowDownLeft className="w-3 h-3 text-emerald-600" />
                        <span>{formatAmount(w.totalRevenue, w.symbol)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ArrowUpRight className="w-3 h-3 text-red-600" />
                        <span>{formatAmount(w.totalSpent, w.symbol)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wallet;
