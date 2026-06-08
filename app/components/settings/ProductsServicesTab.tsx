import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, Package, Wrench, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import type { Product, Service } from "@/types/settings";

const MAX_IMAGES = 5;

const ProductsServicesTab = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "" });
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [newProductImages, setNewProductImages] = useState<string[]>([]);
  const [newServiceImages, setNewServiceImages] = useState<string[]>([]);
  const productImgRef = useRef<HTMLInputElement>(null);
  const serviceImgRef = useRef<HTMLInputElement>(null);

  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>,
    current: string[],
    setter: (imgs: string[]) => void,
  ) => {
    const files = Array.from(e.target.files || []);
    const remaining = MAX_IMAGES - current.length;
    if (remaining <= 0) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }
    const valid = files
      .filter((f) => {
        if (!f.type.startsWith("image/")) {
          toast.error(`${f.name} is not an image`);
          return false;
        }
        if (f.size > 5 * 1024 * 1024) {
          toast.error(`${f.name} exceeds 5MB`);
          return false;
        }
        return true;
      })
      .slice(0, remaining);
    const urls = valid.map((f) => URL.createObjectURL(f));
    setter([...current, ...urls]);
    e.target.value = "";
  };

  const removeImage = (
    images: string[],
    index: number,
    setter: (imgs: string[]) => void,
  ) => {
    setter(images.filter((_, i) => i !== index));
  };

  const addProduct = () => {
    if (!newProduct.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    setProducts((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        name: newProduct.name,
        description: newProduct.description,
        images: newProductImages,
      },
    ]);
    setNewProduct({ name: "", description: "" });
    setNewProductImages([]);
    toast.success("Product added");
  };

  const addService = () => {
    if (!newService.name.trim()) {
      toast.error("Service name is required");
      return;
    }
    setServices((s) => [
      ...s,
      {
        id: crypto.randomUUID(),
        name: newService.name,
        description: newService.description,
        images: newServiceImages,
      },
    ]);
    setNewService({ name: "", description: "" });
    setNewServiceImages([]);
    toast.success("Service added");
  };

  const removeProduct = (id: string) => {
    setProducts((p) => p.filter((x) => x.id !== id));
    toast.success("Product removed");
  };
  const removeService = (id: string) => {
    setServices((s) => s.filter((x) => x.id !== id));
    toast.success("Service removed");
  };

  const ImageGrid = ({ images }: { images: string[] }) =>
    images.length > 0 ? (
      <div className="flex gap-1.5 flex-wrap">
        {images.map((img, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-md overflow-hidden border border-border"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    ) : null;

  const ItemCard = ({
    item,
    onRemove,
  }: {
    item: Product | Service;
    onRemove: () => void;
  }) => (
    <Card className="border-0 shadow-sm shadow-foreground/5">
      <CardContent className="p-4 flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
          {item.images.length > 0 ? (
            <img
              src={item.images[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePlus className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <p className="font-medium text-sm">{item.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.description || "No description"}
          </p>
          {item.images.length > 1 && (
            <ImageGrid images={item.images.slice(1)} />
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive h-8 w-8"
          onClick={onRemove}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );

  const ImagePicker = ({
    images,
    setImages,
    inputRef,
  }: {
    images: string[];
    setImages: (imgs: string[]) => void;
    inputRef: React.RefObject<HTMLInputElement>;
  }) => (
    <div className="space-y-1.5">
      <Label>
        Images ({images.length}/{MAX_IMAGES})
      </Label>
      <div className="flex gap-2 flex-wrap">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(images, i, setImages)}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {images.length < MAX_IMAGES && (
          <button
            type="button"
            className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus className="w-5 h-5" />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleImages(e, images, setImages)}
      />
    </div>
  );

  const AddForm = ({
    data,
    setData,
    onAdd,
    label,
    images,
    setImages,
    inputRef,
  }: {
    data: { name: string; description: string };
    setData: (d: { name: string; description: string }) => void;
    onAdd: () => void;
    label: string;
    images: string[];
    setImages: (imgs: string[]) => void;
    inputRef: React.RefObject<HTMLInputElement>;
  }) => (
    <Card className="border-0 shadow-md shadow-foreground/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Add {label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder={`${label} name`}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder={`Describe this ${label.toLowerCase()}`}
            rows={2}
          />
        </div>
        <ImagePicker
          images={images}
          setImages={setImages}
          inputRef={inputRef}
        />
        <Button onClick={onAdd} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add {label}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="products">
      <TabsList className="mb-4">
        <TabsTrigger value="products" className="gap-1.5">
          <Package className="w-4 h-4" />
          Products
        </TabsTrigger>
        <TabsTrigger value="services" className="gap-1.5">
          <Wrench className="w-4 h-4" />
          Services
        </TabsTrigger>
      </TabsList>

      <TabsContent value="products" className="space-y-4">
        <AddForm
          data={newProduct}
          setData={setNewProduct}
          onAdd={addProduct}
          label="Product"
          images={newProductImages}
          setImages={setNewProductImages}
          inputRef={productImgRef}
        />
        {products.length > 0 && (
          <div className="space-y-3">
            {products.map((p) => (
              <ItemCard
                key={p.id}
                item={p}
                onRemove={() => removeProduct(p.id)}
              />
            ))}
          </div>
        )}
        {products.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No products added yet
          </p>
        )}
      </TabsContent>

      <TabsContent value="services" className="space-y-4">
        <AddForm
          data={newService}
          setData={setNewService}
          onAdd={addService}
          label="Service"
          images={newServiceImages}
          setImages={setNewServiceImages}
          inputRef={serviceImgRef}
        />
        {services.length > 0 && (
          <div className="space-y-3">
            {services.map((s) => (
              <ItemCard
                key={s.id}
                item={s}
                onRemove={() => removeService(s.id)}
              />
            ))}
          </div>
        )}
        {services.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No services added yet
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProductsServicesTab;
