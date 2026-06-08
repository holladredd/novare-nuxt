import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, ImageIcon, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

const BrandingTab = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string | null) => void,
    label: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const url = URL.createObjectURL(file);
    setter(url);
    toast.success(`${label} updated`);
  };

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <Card className="border-0 shadow-md shadow-foreground/5 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Cover Image</CardTitle>
          <CardDescription>Recommended size: 1200 × 400px</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="relative w-full h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group"
            onClick={() => coverRef.current?.click()}
          >
            {cover ? (
              <>
                <img
                  src={cover}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-background" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImageIcon className="w-10 h-10" />
                <span className="text-sm font-medium">
                  Click to upload cover image
                </span>
              </div>
            )}
          </div>
          <input
            ref={coverRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e, setCover, "Cover image")}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => coverRef.current?.click()}
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              {cover ? "Change" : "Upload"}
            </Button>
            {cover && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCover(null);
                  toast.success("Cover image removed");
                }}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Remove
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Logo */}
      <Card className="border-0 shadow-md shadow-foreground/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Business Logo</CardTitle>
          <CardDescription>
            Recommended size: 400 × 400px (square)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div
              className="relative w-28 h-28 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group shrink-0"
              onClick={() => logoRef.current?.click()}
            >
              {logo ? (
                <>
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <Camera className="w-6 h-6 text-background" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <Camera className="w-8 h-8" />
                  <span className="text-[10px] font-medium">Upload</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Your logo appears on your business profile, invoices, and
                customer-facing pages.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logoRef.current?.click()}
                >
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  {logo ? "Change" : "Upload"}
                </Button>
                {logo && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setLogo(null);
                      toast.success("Logo removed");
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e, setLogo, "Logo")}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingTab;
