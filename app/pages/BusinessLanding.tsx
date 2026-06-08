import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  Package,
  Wrench,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

// Mock data representing what would come from the business info
const business = {
  name: "Adeola's Kitchen",
  description:
    "Premium catering and food services. We deliver quality meals for events, offices, and private dining experiences across Lagos.",
  industry: "Food & Beverage",
  email: "hello@adeolaskitchen.com",
  phone: "+234 801 234 5678",
  website: "https://adeolaskitchen.com",
  address: "15 Admiralty Way, Lekki Phase 1",
  city: "Lagos",
  state: "Lagos",
  country: "Nigeria",
  logo: null as string | null,
  cover: null as string | null,
};

const products = [
  {
    id: "1",
    name: "Party Jollof Rice",
    description:
      "Our signature smoky party jollof rice, cooked with premium ingredients. Perfect for events of any size.",
    images: [] as string[],
  },
  {
    id: "2",
    name: "Grilled Chicken Platter",
    description:
      "Perfectly seasoned and grilled whole chicken served with sides.",
    images: [] as string[],
  },
  {
    id: "3",
    name: "Assorted Meat Pepper Soup",
    description:
      "Rich and spicy pepper soup with assorted cuts of premium meat.",
    images: [] as string[],
  },
];

const services = [
  {
    id: "1",
    name: "Event Catering",
    description:
      "Full-service catering for weddings, birthdays, corporate events and more.",
    images: [] as string[],
  },
  {
    id: "2",
    name: "Meal Prep Delivery",
    description:
      "Weekly meal prep packages delivered to your doorstep across Lagos.",
    images: [] as string[],
  },
];

const branches = [
  {
    id: "1",
    name: "Lekki Main",
    address: "15 Admiralty Way",
    city: "Lekki Phase 1",
    state: "Lagos",
    country: "Nigeria",
    phone: "+234 801 234 5678",
    isMain: true,
  },
  {
    id: "2",
    name: "Victoria Island",
    address: "22 Adeola Odeku Street",
    city: "Victoria Island",
    state: "Lagos",
    country: "Nigeria",
    phone: "+234 802 345 6789",
    isMain: false,
  },
];

const hours = [
  { day: "Monday", open: "08:00", close: "20:00", isClosed: false },
  { day: "Tuesday", open: "08:00", close: "20:00", isClosed: false },
  { day: "Wednesday", open: "08:00", close: "20:00", isClosed: false },
  { day: "Thursday", open: "08:00", close: "20:00", isClosed: false },
  { day: "Friday", open: "08:00", close: "22:00", isClosed: false },
  { day: "Saturday", open: "09:00", close: "22:00", isClosed: false },
  { day: "Sunday", open: "00:00", close: "00:00", isClosed: true },
];

const reviews = [
  {
    id: "1",
    author: "Adebayo Ogunlesi",
    rating: 5,
    comment:
      "Excellent service and very professional team. Would highly recommend to anyone looking for quality.",
    date: "2026-03-18",
    helpful: 12,
  },
  {
    id: "2",
    author: "Fatima Ibrahim",
    rating: 4,
    comment:
      "Good experience overall. The delivery was a bit delayed but the product quality made up for it.",
    date: "2026-03-15",
    helpful: 5,
  },
  {
    id: "3",
    author: "Chinedu Okafor",
    rating: 5,
    comment:
      "Best in the business! I've been a loyal customer for over a year now.",
    date: "2026-03-10",
    helpful: 8,
  },
  {
    id: "4",
    author: "Amina Yusuf",
    rating: 3,
    comment: "Average experience. Customer support could be more responsive.",
    date: "2026-03-05",
    helpful: 2,
  },
  {
    id: "5",
    author: "Ngozi Eze",
    rating: 5,
    comment: "Absolutely wonderful! The attention to detail is impressive.",
    date: "2026-02-20",
    helpful: 15,
  },
];

const avgRating = (
  reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
).toFixed(1);
const totalReviews = reviews.length;

const StarRating = ({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) => {
  const s = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${s} ${i <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
};

const isOpenNow = () => {
  const now = new Date();
  const dayIndex = now.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = hours.find((h) => h.day === days[dayIndex]);
  if (!today || today.isClosed) return false;
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return currentTime >= today.open && currentTime <= today.close;
};

const BusinessLanding = () => {
  const navigate = useNavigate();
  const open = isOpenNow();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Cover */}
      <div className="relative">
        <div className="w-full h-48 md:h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-accent overflow-hidden">
          {business.cover && (
            <img
              src={business.cover}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="container max-w-5xl mx-auto px-4">
          <div className="relative -mt-12 flex items-end gap-4 md:gap-6">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-card border-4 border-background shadow-lg flex items-center justify-center shrink-0 overflow-hidden">
              {business.logo ? (
                <img
                  src={business.logo}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-10 h-10 text-primary" />
              )}
            </div>
            <div className="pb-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {business.name}
                </h1>
                <Badge
                  variant={open ? "default" : "secondary"}
                  className="text-[10px]"
                >
                  {open ? "Open Now" : "Closed"}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {business.industry}
                </Badge>
                <div className="flex items-center gap-1">
                  <StarRating rating={Math.round(Number(avgRating))} />
                  <span className="text-xs text-muted-foreground">
                    {avgRating} ({totalReviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back nav */}
      <div className="container max-w-5xl mx-auto px-4 mt-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs gap-1.5"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Button>
      </div>

      <main className="container max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* About */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
          <Card className="border-0 shadow-md shadow-foreground/5">
            <CardContent className="pt-5 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {business.description}
              </p>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {business.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground truncate">
                      {business.email}
                    </span>
                  </div>
                )}
                {business.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">
                      {business.phone}
                    </span>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-primary shrink-0" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {business.website}
                    </a>
                  </div>
                )}
                {business.address && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">
                      {[business.address, business.city, business.state]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Products */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" /> Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <Card
                key={p.id}
                className="border-0 shadow-md shadow-foreground/5 overflow-hidden group"
              >
                <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                  {p.images.length > 0 ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Package className="w-10 h-10 text-muted-foreground/40" />
                  )}
                </div>
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold text-sm">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" /> Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <Card
                key={s.id}
                className="border-0 shadow-md shadow-foreground/5 overflow-hidden group"
              >
                <div className="h-36 bg-muted flex items-center justify-center overflow-hidden">
                  {s.images.length > 0 ? (
                    <img
                      src={s.images[0]}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Wrench className="w-10 h-10 text-muted-foreground/40" />
                  )}
                </div>
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold text-sm">{s.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {s.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Branches & Hours side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branches */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Locations
            </h2>
            <div className="space-y-3">
              {branches.map((b) => (
                <Card
                  key={b.id}
                  className="border-0 shadow-md shadow-foreground/5"
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{b.name}</h3>
                      {b.isMain && (
                        <Badge variant="secondary" className="text-[10px]">
                          Main
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {[b.address, b.city, b.state, b.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {b.phone && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" /> {b.phone}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Hours */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Business Hours
            </h2>
            <Card className="border-0 shadow-md shadow-foreground/5">
              <CardContent className="pt-4 pb-4 space-y-0">
                {hours.map((h) => {
                  const days = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ];
                  const isToday = days[new Date().getDay()] === h.day;
                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between py-2.5 border-b border-border last:border-0 ${isToday ? "bg-primary/5 -mx-4 px-4 rounded-md" : ""}`}
                    >
                      <span
                        className={`text-sm ${isToday ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                      >
                        {h.day}{" "}
                        {isToday && (
                          <span className="text-[10px] text-primary ml-1">
                            (Today)
                          </span>
                        )}
                      </span>
                      {h.isClosed ? (
                        <span className="text-sm text-destructive font-medium">
                          Closed
                        </span>
                      ) : (
                        <span className="text-sm tabular-nums text-foreground">
                          {h.open} – {h.close}
                        </span>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Reviews */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" /> Reviews & Ratings
          </h2>

          {/* Rating summary */}
          <Card className="border-0 shadow-md shadow-foreground/5 mb-4">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold tabular-nums">{avgRating}</p>
                  <StarRating
                    rating={Math.round(Number(avgRating))}
                    size="lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {totalReviews} reviews
                  </p>
                </div>
                <Separator orientation="vertical" className="h-16" />
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const count = reviews.filter((r) => r.rating === s).length;
                    return (
                      <div key={s} className="flex items-center gap-2">
                        <span className="text-xs w-3 text-right tabular-nums">
                          {s}
                        </span>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{
                              width: `${(count / totalReviews) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-4 tabular-nums">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review cards */}
          <div className="space-y-3">
            {reviews.map((r) => (
              <Card
                key={r.id}
                className="border-0 shadow-md shadow-foreground/5"
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                        {r.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{r.author}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(r.date).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {r.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container max-w-5xl mx-auto px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BusinessLanding;
