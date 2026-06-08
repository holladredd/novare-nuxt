import { Badge } from "@/components/ui/badge";
import {
  FileText,
  MapPin,
  Building2,
  Mail,
  Globe,
  CheckCircle2,
} from "lucide-react";
import type { BusinessFormData } from "@/types/onboarding";

interface Props {
  data: BusinessFormData;
}

const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-primary">
      <Icon className="w-4 h-4" />
      <h4 className="font-semibold text-sm">{title}</h4>
    </div>
    <div className="pl-6 space-y-2">{children}</div>
  </div>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right max-w-[60%]">{value || "—"}</span>
  </div>
);

const ReviewStep = ({ data }: Props) => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-accent/50 border border-accent flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-accent-foreground">
            Review Your Information
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Please confirm all details are correct before submitting your
            business onboarding application.
          </p>
        </div>
      </div>

      <Section icon={Building2} title="Business Information">
        <Field label="Business Name" value={data.businessName} />
        <Field label="Services" value={data.services} />
        <Field label="Email" value={data.email} />
        <Field label="Resident Country" value={data.residentCountry} />
        <Field
          label="Business Type"
          value={data.businessType === "onsite" ? "Onsite" : "Offsite"}
        />
        {data.isRegistered === "yes" && (
          <div className="pt-1">
            <Badge variant="secondary">Registered Business</Badge>
          </div>
        )}
      </Section>

      {data.businessType === "onsite" && (
        <Section icon={MapPin} title="Business Address">
          <Field
            label="Address"
            value={`${data.address.number} ${data.address.street}`}
          />
          <Field label="State" value={data.address.state} />
          <Field label="Country" value={data.address.country} />
          <Field label="Zip Code" value={data.address.zipCode} />
        </Section>
      )}

      {data.isRegistered === "yes" && (
        <Section icon={Globe} title="Registration Details">
          <Field label="Reg. Number" value={data.registration.regNumber} />
          <Field
            label="Country of Incorporation"
            value={data.registration.countryOfIncorporation}
          />
          <Field
            label="CAC"
            value={data.registration.cacDocument?.name || "Not uploaded"}
          />
          <Field
            label="MEMART"
            value={data.registration.memartDocument?.name || "Not uploaded"}
          />
          <Field
            label="Status Report"
            value={data.registration.statusReport?.name || "Not uploaded"}
          />
        </Section>
      )}

      {data.documents.length > 0 && (
        <Section icon={FileText} title={`Documents (${data.documents.length})`}>
          {data.documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-2 text-sm">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{doc.name}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
};

export default ReviewStep;
