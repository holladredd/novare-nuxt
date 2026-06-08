import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Building2, ArrowRight, RotateCcw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || "your email";
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate checking verification status
      const isVerified = true; // Toggle to test different flows
      if (isVerified) {
        navigate("/businesses");
      } else {
        navigate("/verify-identity");
      }
    }, 1000);
  };

  const handleResend = () => {
    toast.success("A new OTP has been sent to your email");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <Building2 className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Verify your email
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <Card className="shadow-lg border-0 shadow-foreground/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Enter OTP</CardTitle>
            <CardDescription>
              Check your inbox for the verification code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>

            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResend}
                className="text-muted-foreground"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Resend code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOtp;
