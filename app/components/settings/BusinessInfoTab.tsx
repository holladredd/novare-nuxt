import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface Props {
  businessName: string;
}

const BusinessInfoTab = ({ businessName }: Props) => {
  const [info, setInfo] = useState({
    name: businessName,
    description: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    taxId: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const update = (key: string, value: string) =>
    setInfo((p) => ({ ...p, [key]: value }));

  const handleSave = () => {
    if (!info.name.trim()) {
      toast.error("Business name is required");
      return;
    }
    toast.success("Business information updated");
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md shadow-foreground/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Business Name</Label>
              <Input
                value={info.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Industry</Label>
              <Select
                value={info.industry}
                onValueChange={(v) => update("industry", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Technology",
                    "Retail",
                    "Healthcare",
                    "Food & Beverage",
                    "Education",
                    "Finance",
                    "Other",
                  ].map((i) => (
                    <SelectItem key={i} value={i.toLowerCase()}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={info.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Brief description of your business"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                value={info.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                value={info.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Website</Label>
              <Input
                value={info.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Tax ID / Registration Number</Label>
            <Input value={info.taxId} disabled className="disabled:bg-muted" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md shadow-foreground/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Business Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Street Address</Label>
            <Input
              value={info.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label>City</Label>
              <Input
                value={info.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>State</Label>
              <Input
                value={info.state}
                onChange={(e) => update("state", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Country</Label>
              <Input
                value={info.country}
                onChange={(e) => update("country", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Zip Code</Label>
              <Input
                value={info.zipCode}
                onChange={(e) => update("zipCode", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default BusinessInfoTab;
