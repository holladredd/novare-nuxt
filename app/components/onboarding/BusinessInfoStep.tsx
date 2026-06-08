import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const BusinessInfoStep = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name *</Label>
        <Input
          id="businessName"
          placeholder="Enter your business name"
          value={data.businessName}
          onChange={(e) => onChange({ businessName: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="services">Services Offered *</Label>
        <Textarea
          id="services"
          placeholder="Describe the services your business provides"
          value={data.services}
          onChange={(e) => onChange({ services: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Business Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="business@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Resident Country *</Label>
        <Select
          value={data.residentCountry}
          onValueChange={(value) => onChange({ residentCountry: value })}
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

      <div className="space-y-3">
        <Label>Business Type *</Label>
        <RadioGroup
          value={data.businessType}
          onValueChange={(value) =>
            onChange({ businessType: value as "onsite" | "offsite" })
          }
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onsite" id="onsite" />
            <Label htmlFor="onsite" className="cursor-pointer">
              Onsite
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="offsite" id="offsite" />
            <Label htmlFor="offsite" className="cursor-pointer">
              Offsite
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.businessType === "onsite" && (
        <div className="space-y-4 p-4 rounded-lg bg-accent/50 border border-accent">
          <h4 className="text-sm font-semibold text-accent-foreground">
            Business Address
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="addressNumber">Number</Label>
              <Input
                id="addressNumber"
                placeholder="123"
                value={data.address.number}
                onChange={(e) =>
                  onChange({
                    address: { ...data.address, number: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                placeholder="Main Street"
                value={data.address.street}
                onChange={(e) =>
                  onChange({
                    address: { ...data.address, street: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="Lagos"
                value={data.address.state}
                onChange={(e) =>
                  onChange({
                    address: { ...data.address, state: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Nigeria"
                value={data.address.country}
                onChange={(e) =>
                  onChange({
                    address: { ...data.address, country: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                placeholder="100001"
                value={data.address.zipCode}
                onChange={(e) =>
                  onChange({
                    address: { ...data.address, zipCode: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Label>Is your business registered? *</Label>
        <RadioGroup
          value={data.isRegistered}
          onValueChange={(value) =>
            onChange({ isRegistered: value as "yes" | "no" })
          }
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="reg-yes" />
            <Label htmlFor="reg-yes" className="cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="reg-no" />
            <Label htmlFor="reg-no" className="cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
