import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText } from "lucide-react";
import type { BusinessFormData, UploadedDocument } from "@/types/onboarding";

interface Props {
  data: BusinessFormData;
  onChange: (data: Partial<BusinessFormData>) => void;
}

const DocumentUploadStep = ({ data, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newDocs: UploadedDocument[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      file,
      type: file.type,
    }));
    onChange({ documents: [...data.documents, ...newDocs] });
  };

  const removeDoc = (id: string) => {
    onChange({ documents: data.documents.filter((d) => d.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Upload Supporting Documents</Label>
        <p className="text-sm text-muted-foreground">
          Upload any additional documents such as utility bills, tax
          certificates, or business permits.
        </p>
      </div>

      <div
        className="border-2 border-dashed border-input rounded-xl p-8 text-center hover:border-primary/50 hover:bg-accent/30 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium mb-1">
          Drag & drop files here or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          PDF, DOC, DOCX, JPG, PNG (max 10MB each)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {data.documents.length > 0 && (
        <div className="space-y-3">
          <Label>Uploaded Documents ({data.documents.length})</Label>
          <div className="space-y-2">
            {data.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[250px]">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(doc.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDoc(doc.id)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadStep;
