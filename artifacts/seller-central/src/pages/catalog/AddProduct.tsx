import { useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  const steps = [
    { num: 1, label: "Product Identity" },
    { num: 2, label: "Listing Details" },
    { num: 3, label: "Pricing & Inventory" },
  ];

  if (submitted) {
    return (
      <div className="bg-[#F3F3F3] min-h-screen">
        <PageHeader
          title="Add a Product"
          breadcrumbs={[{ label: "Catalog" }, { label: "Add a Product" }]}
        />
        <div className="p-6">
          <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Listing Submitted for Review
            </h2>
            <p className="text-gray-700 mb-6">
              Your listing has been submitted and will be reviewed by Amazon within 24
              hours. You can track its status in Manage All Listings.
            </p>
            <Button
              onClick={() => setLocation("/catalog/listings")}
              data-testid="button-view-listings"
            >
              View All Listings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Add a Product"
        breadcrumbs={[{ label: "Catalog" }, { label: "Add a Product" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Add a Product"
          description="This is where you create a new product listing on Amazon. You'll need a product identifier (UPC, EAN, or ASIN), select the right category, and fill in all required fields like title, bullet points, images, and pricing before Amazon will make it live."
          whyItMatters="Your listing content — title, bullets, and images — is what convinces shoppers to buy. Amazon also uses it for search indexing, so keyword placement matters from day one."
        />

        <div className="max-w-3xl mx-auto bg-card rounded-lg border p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step.num < currentStep
                        ? "bg-[#146EB4] text-white"
                        : step.num === currentStep
                        ? "bg-[#146EB4] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.num < currentStep ? "✓" : step.num}
                  </div>
                  <span className="text-xs mt-2 text-center whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-24 h-0.5 mx-2 mb-6 ${
                      step.num < currentStep ? "bg-[#146EB4]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Product Identity */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-id">Product ID (UPC, EAN, ISBN, or ASIN)</Label>
                <Input
                  id="product-id"
                  placeholder="Enter 12 or 13-digit barcode or ASIN"
                  data-testid="input-product-id"
                />
              </div>
              <div>
                <Label htmlFor="category">Product Category</Label>
                <Select>
                  <SelectTrigger id="category" data-testid="select-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    <SelectItem value="tools">Tools & Home Improvement</SelectItem>
                    <SelectItem value="beauty">Health & Beauty</SelectItem>
                    <SelectItem value="toys">Toys & Games</SelectItem>
                    <SelectItem value="office">Office Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-amber-50 border border-amber-200 text-sm p-3 rounded">
                Amazon will search its catalog for an existing product match. If found,
                you can sell against that existing listing.
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#146EB4] hover:bg-[#0F5A92]"
                  data-testid="button-next-step-1"
                >
                  Next: Listing Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Listing Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive product title (max 200 characters)"
                  data-testid="input-title"
                />
              </div>
              <div>
                <Label htmlFor="bullets">Bullet Points (Key Features)</Label>
                <Textarea
                  id="bullets"
                  rows={4}
                  placeholder="• Feature 1&#10;• Feature 2&#10;• Feature 3&#10;• Feature 4&#10;• Feature 5"
                  data-testid="textarea-bullets"
                />
              </div>
              <div>
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  data-testid="textarea-description"
                />
              </div>
              <div>
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Drag and drop images or click to upload
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Main image must have white background · Min 1000px · JPEG or PNG
                  </p>
                  <Button variant="outline" data-testid="button-upload-images">
                    Choose Files
                  </Button>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  data-testid="button-back-step-2"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#146EB4] hover:bg-[#0F5A92]"
                  data-testid="button-next-step-2"
                >
                  Next: Pricing & Inventory
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Inventory */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="price">Your Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="price"
                    placeholder="0.00"
                    className="pl-7"
                    data-testid="input-price"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                <Input
                  id="sku"
                  placeholder="Your internal product identifier"
                  data-testid="input-sku"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Initial Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  data-testid="input-quantity"
                />
              </div>
              <div>
                <Label htmlFor="fulfillment">Fulfillment Method</Label>
                <Select>
                  <SelectTrigger id="fulfillment" data-testid="select-fulfillment">
                    <SelectValue placeholder="Select fulfillment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fba">Fulfilled by Amazon (FBA)</SelectItem>
                    <SelectItem value="fbm">Fulfilled by Merchant (FBM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm">
                Your listing will be reviewed by Amazon before going live. This
                typically takes 15 minutes to 24 hours.
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  data-testid="button-back-step-3"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setSubmitted(true)}
                  className="bg-[#146EB4] hover:bg-[#0F5A92]"
                  data-testid="button-submit-listing"
                >
                  Submit Listing
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
