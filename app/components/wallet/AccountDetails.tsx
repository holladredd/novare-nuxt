import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { AccountInfo } from "@/types/wallet";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 shrink-0"
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="w-3 h-3 text-emerald-600" />
      ) : (
        <Copy className="w-3 h-3 text-muted-foreground" />
      )}
    </Button>
  );
};

const AccountDetails = ({ accounts }: { accounts: AccountInfo[] }) => {
  if (accounts.length === 0) return null;

  return (
    <Card className="border-0 shadow-md shadow-foreground/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Landmark className="w-4 h-4" />
          Account Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="rounded-lg border border-border/60 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold">
                  {account.bankName}
                </span>
              </div>
              {account.isPrimary && (
                <Badge variant="secondary" className="text-[10px]">
                  Primary
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailRow label="Account Name" value={account.accountName} />
              <DetailRow
                label="Account Number"
                value={account.accountNumber}
                copyable
              />
              {account.routingNumber && (
                <DetailRow
                  label="Routing Number"
                  value={account.routingNumber}
                  copyable
                />
              )}
              {account.sortCode && (
                <DetailRow
                  label="Sort Code"
                  value={account.sortCode}
                  copyable
                />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const DetailRow = ({
  label,
  value,
  copyable,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) => (
  <div className="flex items-center justify-between gap-2">
    <div>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-medium font-mono tabular-nums">{value}</p>
    </div>
    {copyable && <CopyButton text={value} />}
  </div>
);

export default AccountDetails;
