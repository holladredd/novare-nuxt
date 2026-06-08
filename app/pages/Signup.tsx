import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Building2, ArrowRight, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

const signupSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .max(100, "Display name must be less than 100 characters")
      .optional(),
    email: z.string().trim().email("Invalid email address").max(255),
    firstName: z.string().trim().nonempty("First name is required").max(50),
    lastName: z.string().trim().nonempty("Last name is required").max(50),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be less than 72 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signupSchema.safeParse({
      displayName: form.displayName || undefined,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created. Check your email for an OTP.");
      navigate("/verify-otp", { state: { email: form.email } });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <Building2 className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Get started in just a moment
          </p>
        </div>

        <Card className="shadow-lg border-0 shadow-foreground/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign Up</CardTitle>
            <CardDescription>Tell us a bit about yourself</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">
                  Display name{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="displayName"
                  value={form.displayName}
                  onChange={handleChange("displayName")}
                  placeholder="janedoe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange("password")}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
