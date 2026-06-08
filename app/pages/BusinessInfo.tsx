import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Save,
  Palette,
  Info,
  Package,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";
import BrandingTab from "@/components/settings/BrandingTab";
import ProductsServicesTab from "@/components/settings/ProductsServicesTab";
import BranchesTab from "@/components/settings/BranchesTab";
import BusinessHoursTab from "@/components/settings/BusinessHoursTab";
import ReviewsTab from "@/components/settings/ReviewsTab";

const BusinessInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const businessName = (location.state as any)?.businessName || "My Business";

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
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => navigate("/settings", { state: { businessName } })}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                Business Information
              </h1>
              <p className="text-xs text-muted-foreground">{businessName}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto py-6 px-4">
        <Tabs defaultValue="details">
          <TabsList className="mb-6 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="details" className="gap-1.5 text-xs">
              <Info className="w-3.5 h-3.5" />
              Details
            </TabsTrigger>
            <TabsTrigger value="branding" className="gap-1.5 text-xs">
              <Palette className="w-3.5 h-3.5" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="products-services" className="gap-1.5 text-xs">
              <Package className="w-3.5 h-3.5" />
              Products & Services
            </TabsTrigger>
            <TabsTrigger value="branches" className="gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              Branches
            </TabsTrigger>
            <TabsTrigger value="hours" className="gap-1.5 text-xs">
              <Clock className="w-3.5 h-3.5" />
              Hours
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-1.5 text-xs">
              <MessageSquare className="w-3.5 h-3.5" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
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
                  <Input
                    value={info.taxId}
                    disabled
                    className="disabled:bg-muted"
                  />
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
          </TabsContent>

          <TabsContent value="branding">
            <BrandingTab />
          </TabsContent>
          <TabsContent value="products-services">
            <ProductsServicesTab />
          </TabsContent>
          <TabsContent value="branches">
            <BranchesTab />
          </TabsContent>
          <TabsContent value="hours">
            <BusinessHoursTab />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BusinessInfo;
