import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";
import type { BusinessFormData } from "@/types/onboarding";

interface Props {
  data: BusinessFormData;
  onChange: (data: Partial<BusinessFormData>) => void;
}

const countries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "France",
  "India",
  "Other",
];

const FileUploadField = ({
  label,
  file,
  onFileChange,
  id,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  id: string;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <label
      htmlFor={id}
      className="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-input bg-muted/30 cursor-pointer hover:bg-muted/60 transition-colors"
    >
      {file ? (
        <>
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <span className="text-sm truncate">{file.name}</span>
        </>
      ) : (
        <>
          <Upload className="w-5 h-5 text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground">Click to upload</span>
        </>
      )}
      <input
        id={id}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
      />
    </label>
  </div>
);

const RegistrationStep = ({ data, onChange }: Props) => {
  if (data.isRegistered !== "yes") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          No Registration Details Needed
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Since your business is not registered, you can skip this step and
          proceed to document upload.
        </p>
      </div>
    );
  }

  const updateReg = (updates: Partial<BusinessFormData["registration"]>) => {
    onChange({ registration: { ...data.registration, ...updates } });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="regNumber">Business Registration Number *</Label>
        <Input
          id="regNumber"
          placeholder="RC-123456"
          value={data.registration.regNumber}
          onChange={(e) => updateReg({ regNumber: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Country of Incorporation *</Label>
        <Select
          value={data.registration.countryOfIncorporation}
          onValueChange={(value) =>
            updateReg({ countryOfIncorporation: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <FileUploadField
        label="CAC Certificate *"
        file={data.registration.cacDocument}
        onFileChange={(file) => updateReg({ cacDocument: file })}
        id="cac"
      />

      <FileUploadField
        label="MEMART Document *"
        file={data.registration.memartDocument}
        onFileChange={(file) => updateReg({ memartDocument: file })}
        id="memart"
      />

      <FileUploadField
        label="Status Report *"
        file={data.registration.statusReport}
        onFileChange={(file) => updateReg({ statusReport: file })}
        id="statusReport"
      />
    </div>
  );
};

export default RegistrationStep;
