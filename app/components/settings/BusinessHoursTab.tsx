import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Clock } from "lucide-react";
import { toast } from "sonner";
import { defaultBusinessHours, type BusinessHours } from "@/types/settings";

const BusinessHoursTab = () => {
  const [hours, setHours] = useState<BusinessHours[]>(defaultBusinessHours);

  const updateDay = (
    index: number,
    field: keyof BusinessHours,
    value: string | boolean,
  ) => {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)),
    );
  };

  const handleSave = () => toast.success("Business hours updated");

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md shadow-foreground/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Operating Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hours.map((h, i) => (
            <div
              key={h.day}
              className="flex items-center gap-4 py-2 border-b border-border last:border-0"
            >
              <span className="w-24 text-sm font-medium">{h.day}</span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={!h.isClosed}
                  onCheckedChange={(v) => updateDay(i, "isClosed", !v)}
                />
                <span className="text-xs text-muted-foreground w-10">
                  {h.isClosed ? "Closed" : "Open"}
                </span>
              </div>
              {!h.isClosed && (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="time"
                    value={h.open}
                    onChange={(e) => updateDay(i, "open", e.target.value)}
                    className="w-32 h-8 text-xs"
                  />
                  <span className="text-xs text-muted-foreground">to</span>
                  <Input
                    type="time"
                    value={h.close}
                    onChange={(e) => updateDay(i, "close", e.target.value)}
                    className="w-32 h-8 text-xs"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Hours
        </Button>
      </div>
    </div>
  );
};

export default BusinessHoursTab;
