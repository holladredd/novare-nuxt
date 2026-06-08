import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  TrendingUp,
  Eye,
  Settings,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const engagementDataMonth = [
  { name: "Jan", visits: 120 },
  { name: "Feb", visits: 210 },
  { name: "Mar", visits: 340 },
  { name: "Apr", visits: 280 },
  { name: "May", visits: 390 },
  { name: "Jun", visits: 450 },
  { name: "Jul", visits: 520 },
  { name: "Aug", visits: 480 },
];

const engagementDataWeek = [
  { name: "Mon", visits: 45 },
  { name: "Tue", visits: 62 },
  { name: "Wed", visits: 58 },
  { name: "Thu", visits: 71 },
  { name: "Fri", visits: 80 },
  { name: "Sat", visits: 35 },
  { name: "Sun", visits: 28 },
];

const engagementDataDay = [
  { name: "6am", visits: 5 },
  { name: "9am", visits: 18 },
  { name: "12pm", visits: 32 },
  { name: "3pm", visits: 28 },
  { name: "6pm", visits: 22 },
  { name: "9pm", visits: 12 },
];

const revenueData = [
  { name: "Jan", revenue: 4200 },
  { name: "Feb", revenue: 5800 },
  { name: "Mar", revenue: 7200 },
  { name: "Apr", revenue: 6100 },
  { name: "May", revenue: 8400 },
  { name: "Jun", revenue: 9200 },
  { name: "Jul", revenue: 11000 },
  { name: "Aug", revenue: 10500 },
];

const customerData = [
  { name: "Jan", customers: 34 },
  { name: "Feb", customers: 52 },
  { name: "Mar", customers: 78 },
  { name: "Apr", customers: 95 },
  { name: "May", customers: 120 },
  { name: "Jun", customers: 148 },
  { name: "Jul", customers: 175 },
  { name: "Aug", customers: 203 },
];

const engagementConfig = {
  visits: { label: "Visits", color: "hsl(321 8% 49%)" },
};

const revenueConfig = {
  revenue: { label: "Revenue ($)", color: "hsl(321 12% 42%)" },
};

const customerConfig = {
  customers: { label: "Customers", color: "hsl(321 10% 55%)" },
};

interface DashboardProps {
  businessName: string;
}

const Dashboard = ({ businessName }: DashboardProps) => {
  const navigate = useNavigate();
  const [engagementPeriod, setEngagementPeriod] = useState("month");

  const engagementData =
    engagementPeriod === "month"
      ? engagementDataMonth
      : engagementPeriod === "week"
        ? engagementDataWeek
        : engagementDataDay;

  const totalVisits = engagementData.reduce((s, d) => s + d.visits, 0);
  const latestRevenue = revenueData[revenueData.length - 1].revenue;
  const totalCustomers = customerData[customerData.length - 1].customers;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                {businessName || "My Business"}
              </h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] bg-[hsl(var(--warning)/0.1)] gap-1.5 py-1"
            >
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--warning))] animate-pulse" />
              Pending Approval
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => navigate("/wallet", { state: { businessName } })}
            >
              <Wallet className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => navigate("/settings", { state: { businessName } })}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto py-6 px-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-md shadow-foreground/5">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Visits</p>
                <p className="text-2xl font-bold">
                  {totalVisits.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md shadow-foreground/5">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Latest Revenue</p>
                <p className="text-2xl font-bold">
                  ${latestRevenue.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md shadow-foreground/5">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Chart */}
        <Card className="border-0 shadow-md shadow-foreground/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Business Engagements</CardTitle>
            <Tabs value={engagementPeriod} onValueChange={setEngagementPeriod}>
              <TabsList className="h-8">
                <TabsTrigger value="day" className="text-xs px-2.5 h-6">
                  Day
                </TabsTrigger>
                <TabsTrigger value="week" className="text-xs px-2.5 h-6">
                  Week
                </TabsTrigger>
                <TabsTrigger value="month" className="text-xs px-2.5 h-6">
                  Month
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={engagementConfig}
              className="h-[260px] w-full"
            >
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="visits"
                  fill="var(--color-visits)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue & Customer Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md shadow-foreground/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Business Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={revenueConfig}
                className="h-[220px] w-full"
              >
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md shadow-foreground/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Customer Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={customerConfig}
                className="h-[220px] w-full"
              >
                <AreaChart data={customerData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient
                      id="customerGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--color-customers)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-customers)"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="customers"
                    stroke="var(--color-customers)"
                    strokeWidth={2.5}
                    fill="url(#customerGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
