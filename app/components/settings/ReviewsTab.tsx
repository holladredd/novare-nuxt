import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  replied: boolean;
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Adebayo Ogunlesi",
    rating: 5,
    comment:
      "Excellent service and very professional team. Would highly recommend to anyone looking for quality.",
    date: "2026-03-18",
    helpful: 12,
    replied: true,
  },
  {
    id: "2",
    author: "Fatima Ibrahim",
    rating: 4,
    comment:
      "Good experience overall. The delivery was a bit delayed but the product quality made up for it.",
    date: "2026-03-15",
    helpful: 5,
    replied: false,
  },
  {
    id: "3",
    author: "Chinedu Okafor",
    rating: 5,
    comment:
      "Best in the business! I've been a loyal customer for over a year now.",
    date: "2026-03-10",
    helpful: 8,
    replied: true,
  },
  {
    id: "4",
    author: "Amina Yusuf",
    rating: 3,
    comment: "Average experience. Customer support could be more responsive.",
    date: "2026-03-05",
    helpful: 2,
    replied: false,
  },
  {
    id: "5",
    author: "Emeka Nwosu",
    rating: 2,
    comment: "Had some issues with the order accuracy. Hoping for improvement.",
    date: "2026-02-28",
    helpful: 1,
    replied: true,
  },
  {
    id: "6",
    author: "Ngozi Eze",
    rating: 5,
    comment: "Absolutely wonderful! The attention to detail is impressive.",
    date: "2026-02-20",
    helpful: 15,
    replied: false,
  },
];

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

const ReviewsTab = () => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? mockReviews
      : mockReviews.filter((r) => r.rating === Number(filter));
  const avg = (
    mockReviews.reduce((a, r) => a + r.rating, 0) / mockReviews.length
  ).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: mockReviews.filter((r) => r.rating === s).length,
  }));

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md shadow-foreground/5">
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold tabular-nums">{avg}</p>
            <StarRating rating={Math.round(Number(avg))} size="lg" />
            <p className="text-xs text-muted-foreground mt-1">
              {mockReviews.length} reviews
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md shadow-foreground/5 md:col-span-2">
          <CardContent className="pt-6 space-y-2">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-2">
                <span className="text-xs w-3 text-right tabular-nums">
                  {d.star}
                </span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{
                      width: `${mockReviews.length ? (d.count / mockReviews.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-6 tabular-nums">
                  {d.count}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4" /> Reviews
        </h3>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-36 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            {[5, 4, 3, 2, 1].map((s) => (
              <SelectItem key={s} value={String(s)}>
                {s} Stars
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <Card className="border-0 shadow-md shadow-foreground/5">
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              No reviews match this filter.
            </CardContent>
          </Card>
        )}
        {filtered.map((review) => (
          <Card
            key={review.id}
            className="border-0 shadow-md shadow-foreground/5"
          >
            <CardContent className="pt-5 pb-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    {review.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {review.author}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  {review.replied && (
                    <Badge variant="secondary" className="text-[10px]">
                      Replied
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
              <div className="flex items-center gap-1 pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground gap-1"
                >
                  <ThumbsUp className="w-3 h-3" /> {review.helpful}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
