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
import { ArrowLeft, ArrowRight, Send, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "@/components/onboarding/StepIndicator";
import BusinessInfoStep from "@/components/onboarding/BusinessInfoStep";
import RegistrationStep from "@/components/onboarding/RegistrationStep";
import DocumentUploadStep from "@/components/onboarding/DocumentUploadStep";
import ReviewStep from "@/components/onboarding/ReviewStep";
import { initialFormData, type BusinessFormData } from "@/types/onboarding";

const STEPS = ["Business Info", "Registration", "Documents", "Review"];

const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BusinessFormData>(initialFormData);

  const updateFormData = (updates: Partial<BusinessFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateStep = (step: number): string | null => {
    switch (step) {
      case 0:
        if (!formData.businessName.trim()) return "Business name is required";
        if (!formData.services.trim())
          return "Services description is required";
        if (
          !formData.email.trim() ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        )
          return "A valid email is required";
        if (!formData.residentCountry) return "Please select a country";
        if (!formData.businessType) return "Please select business type";
        if (formData.businessType === "onsite") {
          if (!formData.address.street.trim())
            return "Street address is required";
          if (!formData.address.state.trim()) return "State is required";
          if (!formData.address.country.trim()) return "Country is required";
        }
        if (!formData.isRegistered)
          return "Please indicate if business is registered";
        return null;
      case 1:
        if (formData.isRegistered === "yes") {
          if (!formData.registration.regNumber.trim())
            return "Registration number is required";
          if (!formData.registration.countryOfIncorporation)
            return "Country of incorporation is required";
          if (!formData.registration.cacDocument)
            return "CAC certificate is required";
          if (!formData.registration.memartDocument)
            return "MEMART document is required";
          if (!formData.registration.statusReport)
            return "Status report is required";
        }
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const error = validateStep(currentStep);
    if (error) {
      toast.error(error);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    toast.success("Business onboarding submitted successfully!", {
      description: "We'll review your application and get back to you shortly.",
    });
    console.log("Submitted data:", formData);
    navigate("/dashboard", { state: { businessName: formData.businessName } });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessInfoStep data={formData} onChange={updateFormData} />;
      case 1:
        return <RegistrationStep data={formData} onChange={updateFormData} />;
      case 2:
        return <DocumentUploadStep data={formData} onChange={updateFormData} />;
      case 3:
        return <ReviewStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container max-w-4xl mx-auto flex items-center gap-3 py-4 px-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Business Onboarding</h1>
            <p className="text-xs text-muted-foreground">
              Complete your business registration
            </p>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto py-8 px-4">
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <Card className="shadow-lg border-0 shadow-foreground/5">
          <CardHeader>
            <CardTitle className="text-xl">{STEPS[currentStep]}</CardTitle>
            <CardDescription>
              {currentStep === 0 && "Enter your basic business information"}
              {currentStep === 1 &&
                "Provide registration details if applicable"}
              {currentStep === 2 && "Upload any supporting documents"}
              {currentStep === 3 && "Review and submit your application"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
