import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building2, ArrowLeft, Users, Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TeamMembersTab from "@/components/settings/TeamMembersTab";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const businessName = (location.state as any)?.businessName || "My Business";

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
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Settings</h1>
              <p className="text-xs text-muted-foreground">{businessName}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto py-6 px-4">
        <Tabs defaultValue="business-info">
          <TabsList className="mb-6 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="business-info" className="gap-1.5 text-xs">
              <Info className="w-3.5 h-3.5" />
              Business Info
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-1.5 text-xs">
              <Users className="w-3.5 h-3.5" />
              Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business-info">
            <Card
              className="border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() =>
                navigate("/business-info", { state: { businessName } })
              }
            >
              <CardContent className="flex items-center justify-between py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Info className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Edit Business Information</p>
                    <p className="text-sm text-muted-foreground">
                      Update branding, details, products, branches, and hours
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team">
            <TeamMembersTab userRole="owner" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
