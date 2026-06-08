import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin, Phone, Star } from "lucide-react";
import { toast } from "sonner";
import type { Branch } from "@/types/settings";

const BranchesTab = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
  });

  const update = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const addBranch = () => {
    if (!form.name.trim()) {
      toast.error("Branch name is required");
      return;
    }
    if (!form.address.trim()) {
      toast.error("Address is required");
      return;
    }
    setBranches((p) => [
      ...p,
      { id: crypto.randomUUID(), ...form, isMain: p.length === 0 },
    ]);
    setForm({
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phone: "",
    });
    toast.success("Branch added");
  };

  const removeBranch = (id: string) => {
    setBranches((p) => p.filter((b) => b.id !== id));
    toast.success("Branch removed");
  };

  const setMain = (id: string) => {
    setBranches((p) => p.map((b) => ({ ...b, isMain: b.id === id })));
    toast.success("Main branch updated");
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md shadow-foreground/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Add Branch Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Branch Name</Label>
              <Input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Main Office"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+1 234 567 890"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Street Address</Label>
            <Input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <Label>City</Label>
              <Input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>State</Label>
              <Input
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Country</Label>
              <Input
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Zip Code</Label>
              <Input
                value={form.zipCode}
                onChange={(e) => update("zipCode", e.target.value)}
              />
            </div>
          </div>
          <Button onClick={addBranch} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Branch
          </Button>
        </CardContent>
      </Card>

      {branches.length > 0 ? (
        <div className="space-y-3">
          {branches.map((branch) => (
            <Card
              key={branch.id}
              className="border-0 shadow-sm shadow-foreground/5"
            >
              <CardContent className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{branch.name}</p>
                    {branch.isMain && (
                      <Badge variant="secondary" className="text-[10px] gap-1">
                        <Star className="w-3 h-3" />
                        Main
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {[branch.address, branch.city, branch.state, branch.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  {branch.phone && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" />
                      {branch.phone}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  {!branch.isMain && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => setMain(branch.id)}
                    >
                      Set Main
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive h-8 w-8"
                    onClick={() => removeBranch(branch.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-8">
          No branches added yet
        </p>
      )}
    </div>
  );
};

export default BranchesTab;
