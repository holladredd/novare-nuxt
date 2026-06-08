import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Business {
  id: string;
  name: string;
  role: string;
  industry: string;
}

const mockBusinesses: Business[] = [
  { id: "1", name: "Acme Technologies", role: "Owner", industry: "Technology" },
  {
    id: "2",
    name: "Lagos Bistro",
    role: "Manager",
    industry: "Food & Beverage",
  },
  { id: "3", name: "Swift Logistics", role: "Staff", industry: "Logistics" },
];

const roleColors: Record<string, string> = {
  Owner: "bg-primary text-primary-foreground",
  Manager: "bg-accent text-accent-foreground",
  Staff: "bg-secondary text-secondary-foreground",
};

const Businesses = () => {
  const navigate = useNavigate();

  const handleSelectBusiness = (business: Business) => {
    navigate("/dashboard", { state: { businessName: business.name } });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <Building2 className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Your Businesses
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Select a business to continue
          </p>
        </div>

        <div className="space-y-3">
          {mockBusinesses.map((biz) => (
            <Card
              key={biz.id}
              className="shadow-sm border cursor-pointer hover:shadow-md hover:border-primary/30 transition-all"
              onClick={() => handleSelectBusiness(biz)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{biz.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {biz.industry}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      roleColors[biz.role] ||
                      "bg-secondary text-secondary-foreground"
                    }
                  >
                    {biz.role}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={() => navigate("/onboard")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Onboard New Business
        </Button>
      </div>
    </div>
  );
};

export default Businesses;
