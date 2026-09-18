import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  Barcode,
  Check,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  ImageIcon,
  Info,
  Link2,
  LockKeyhole,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
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
import { Switch } from "@/components/ui/switch";

function PackageIllustration() {
  return (
    <div className="flex items-center justify-center" aria-label="Plain shipping package illustration">
      <svg
        viewBox="0 0 280 230"
        className="h-auto w-full max-w-[270px]"
        role="img"
        aria-hidden="true"
      >
        <ellipse cx="139" cy="208" rx="94" ry="10" fill="#d5e8e9" />
        <polygon points="58,72 143,32 224,73 139,119" fill="#f6ce69" />
        <polygon points="58,72 139,119 139,202 58,155" fill="#e9a943" />
        <polygon points="139,119 224,73 224,155 139,202" fill="#f2ba50" />
        <polygon points="58,72 139,119 139,137 58,90" fill="#e59a35" opacity="0.6" />
        <polygon points="139,119 224,73 224,91 139,137" fill="#e6a33a" opacity="0.55" />
        <polygon points="92,56 118,44 199,85 173,99" fill="#f8dd8b" opacity="0.9" />
        <polygon points="118,44 143,32 224,73 199,85" fill="#ffe39a" />
        <polygon points="139,119 164,106 164,188 139,202" fill="#df9630" opacity="0.75" />
        <path d="M139 32v87M58 72l81 47 85-46" fill="none" stroke="#d28a2e" strokeWidth="2" />
        <path d="M139 126v64" fill="none" stroke="#c9822c" strokeWidth="2" opacity="0.8" />
        <path d="M80 84l40 23v17l-40-23z" fill="#f7d67d" opacity="0.85" />
        <path d="M80 84l40 23" fill="none" stroke="#d79431" strokeWidth="2" />
        <path d="M85 153l37 22" fill="none" stroke="#f5c35b" strokeWidth="3" opacity="0.9" />
        <path d="M180 107l25-13" fill="none" stroke="#fbd47a" strokeWidth="3" opacity="0.9" />
      </svg>
    </div>
  );
}

function ReferenceCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <article className="flex min-h-[170px] flex-col border border-[#d9e1e2] bg-white p-4">
      <h3 className="text-xs font-bold text-[#344650]">{title}</h3>
      <p className="mt-2 flex-1 text-[11px] leading-5 text-[#5e6d74]">{description}</p>
      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1 self-start text-[11px] font-semibold text-[#24717d] underline-offset-2 hover:underline"
        data-testid={`button-reference-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      >
        {link}
        <ArrowRight className="h-3 w-3" />
      </button>
    </article>
  );
}

const attributeControlClass =
  "h-9 rounded-none border-[#b8c4c8] bg-white text-[11px] text-[#344650]";

function AttributeRow({
  label,
  description,
  required = false,
  children,
}: {
  label: string;
  description: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-b border-[#dfe6e8] py-4 last:border-b-0 lg:grid-cols-[minmax(0,0.78fr)_minmax(320px,1.22fr)] lg:gap-8">
      <div>
        <p className="text-xs font-semibold text-[#344650]">
          {required && <span className="mr-1 text-[#148b9a]">*</span>}
          {label}
          <span className="ml-1 text-[9px] font-normal text-[#95a1a6]">Feedback</span>
        </p>
        <p className="mt-1 text-[10px] leading-4 text-[#68767e]">{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function AttributeSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className={attributeControlClass} data-testid={`select-${id}`}>
        <SelectValue placeholder={placeholder ?? "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function AttributeInput({
  id,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  if (multiline) {
    return (
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="min-h-[72px] resize-y rounded-none border-[#b8c4c8] bg-white text-[11px]"
        data-testid={`textarea-${id}`}
      />
    );
  }

  return (
    <Input
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={attributeControlClass}
      data-testid={`input-${id}`}
    />
  );
}

function MultiValueField({
  id,
  values,
  onChange,
}: {
  id: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {values.map((value, index) => (
        <Input
          key={`${id}-${index}`}
          id={`${id}-${index + 1}`}
          value={value}
          onChange={(event) =>
            onChange(values.map((current, valueIndex) => (valueIndex === index ? event.target.value : current)))
          }
          className={attributeControlClass}
          data-testid={`input-${id}-${index + 1}`}
        />
      ))}
      <div className="flex items-center gap-2 text-[10px]">
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="font-semibold text-[#24717d] hover:underline"
          data-testid={`button-add-${id}`}
        >
          Add more
        </button>
        {values.length > 1 && (
          <>
            <span className="text-[#aeb8bc]">|</span>
            <button
              type="button"
              onClick={() => onChange(values.slice(0, -1))}
              className="font-semibold text-[#24717d] hover:underline"
              data-testid={`button-remove-${id}`}
            >
              Remove last
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function YesNoField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className="divide-y divide-[#cbd5cf] border border-[#d4ded4] bg-[#f1f3ee]"
      role="radiogroup"
      aria-label={id}
      data-testid={`radio-group-${id}`}
    >
      {["Yes", "No"].map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className="flex w-full items-center gap-2 px-2 py-2 text-left text-[11px] text-[#344650] hover:bg-[#e8eee7]"
        >
          <span
            className={`flex h-3 w-3 items-center justify-center rounded-full border ${
              value === option ? "border-[#247f8e]" : "border-[#77898d]"
            }`}
          >
            {value === option && <span className="h-1.5 w-1.5 rounded-full bg-[#247f8e]" />}
          </span>
          {option}
        </button>
      ))}
    </div>
  );
}

type ListingSection = "identity" | "description" | "details" | "offer" | "compliance";

const listingSections: Array<{
  id: ListingSection;
  label: string;
  required: number;
}> = [
  { id: "identity", label: "Product Identity", required: 4 },
  { id: "description", label: "Description", required: 1 },
  { id: "details", label: "Product Details", required: 21 },
  { id: "offer", label: "Offer", required: 2 },
  { id: "compliance", label: "Safety and compliance", required: 1 },
];

const productTypes = [
  { value: "APPAREL", label: "Apparel" },
  { value: "AUTOMOTIVE", label: "Automotive" },
  { value: "BABY_PRODUCT", label: "Baby Product" },
  { value: "BEAUTY", label: "Beauty" },
  { value: "BOOK", label: "Book" },
  { value: "CAMERA", label: "Camera" },
  { value: "COMPUTER", label: "Computer" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "FURNITURE", label: "Furniture" },
  { value: "GROCERY", label: "Grocery" },
  { value: "HEALTH_AND_PERSONAL_CARE", label: "Health and Personal Care" },
  { value: "HOME", label: "Home" },
  { value: "HOME_FURNITURE_AND_DECOR", label: "Home Furniture and Decor" },
  { value: "JEWELRY", label: "Jewelry" },
  { value: "KITCHEN", label: "Kitchen" },
  { value: "LAWN_AND_GARDEN", label: "Lawn and Garden" },
  { value: "LUGGAGE", label: "Luggage" },
  { value: "MUSIC", label: "Music" },
  { value: "OFFICE_PRODUCTS", label: "Office Products" },
  { value: "PET_SUPPLIES", label: "Pet Supplies" },
  { value: "SHOES", label: "Shoes" },
  { value: "SOFTWARE", label: "Software" },
  { value: "SPORTING_GOODS", label: "Sporting Goods" },
  { value: "TOOLS", label: "Tools" },
  { value: "TOY", label: "Toy" },
  { value: "VIDEO_GAME", label: "Video Game" },
  { value: "WATCH", label: "Watch" },
  { value: "WIRELESS_ACCESSORY", label: "Wireless Accessory" },
];

const itemTypeKeywords = [
  { value: "DRINKING_CUP", label: "Industrial & Scientific > Food Service Equipment & Supplies > Tabletop & Serveware > Dinnerware" },
  { value: "COFFEE_MUG", label: "Home & Kitchen > Kitchen & Dining > Drinkware > Mugs" },
  { value: "WATER_BOTTLE", label: "Sports & Outdoors > Outdoor Recreation > Hydration > Water Bottles" },
];

const externalProductIdTypes = [
  { value: "UPC", label: "UPC" },
  { value: "EAN", label: "EAN" },
  { value: "ISBN", label: "ISBN" },
  { value: "GTIN", label: "GTIN" },
];

function ListingBuilder({
  onSubmit,
  onExit,
}: {
  onSubmit: () => void;
  onExit: () => void;
}) {
  const [activeSection, setActiveSection] = useState<ListingSection>("identity");
  const [completedSections, setCompletedSections] = useState<ListingSection[]>([]);
  const [itemName, setItemName] = useState("");
  const [productType, setProductType] = useState("");
  const [itemTypeKeyword, setItemTypeKeyword] = useState("");
  const [hasVariations, setHasVariations] = useState(false);
  const [itemHighlight, setItemHighlight] = useState("");
  const [brandName, setBrandName] = useState("");
  const [noBrandName, setNoBrandName] = useState(false);
  const [externalProductIdType, setExternalProductIdType] = useState("UPC");
  const [externalProductId, setExternalProductId] = useState("");
  const [noExternalProductId, setNoExternalProductId] = useState(false);
  const [description, setDescription] = useState("");
  const [bulletPoints, setBulletPoints] = useState<string[]>(() => Array.from({ length: 5 }, () => ""));
  const [imageNames, setImageNames] = useState<string[]>(() => Array.from({ length: 9 }, () => ""));
  const [ageRangeDescription, setAgeRangeDescription] = useState("Adult");
  const [material, setMaterial] = useState("Ceramic");
  const [materialPattern, setMaterialPattern] = useState("Solid");
  const [packagePattern, setPackagePattern] = useState("Solid");
  const [numberOfItems, setNumberOfItems] = useState("1");
  const [subjectCharacter, setSubjectCharacter] = useState("");
  const [color, setColor] = useState("White");
  const [size, setSize] = useState("12 Ounces");
  const [itemShape, setItemShape] = useState("Round");
  const [themes, setThemes] = useState<string[]>(["Classic", "Everyday"]);
  const [careInstructions, setCareInstructions] = useState<string[]>([
    "Dishwasher Safe",
    "Microwave Safe",
  ]);
  const [dishwasherSafe, setDishwasherSafe] = useState("Yes");
  const [materialFeatures, setMaterialFeatures] = useState<string[]>([
    "Dishwasher Safe",
    "Microwave Safe",
  ]);
  const [microwaveable, setMicrowaveable] = useState("Yes");
  const [materialType, setMaterialType] = useState("Ceramic");
  const [capacity, setCapacity] = useState("12");
  const [capacityUnit, setCapacityUnit] = useState("fluid-ounces");
  const [customerPackageType, setCustomerPackageType] = useState("Standard Packaging");
  const [finishType, setFinishType] = useState("Glazed");
  const [unitCount, setUnitCount] = useState("1");
  const [unitCountType, setUnitCountType] = useState("count");
  const [includedComponents, setIncludedComponents] = useState<string[]>([
    "1 Ceramic Coffee Mug",
  ]);
  const [specificUses, setSpecificUses] = useState<string[]>([
    "Coffee",
    "Tea",
    "Hot Chocolate",
    "Home Use",
    "Office Use",
  ]);
  const [teamName, setTeamName] = useState("");
  const [recommendedUses, setRecommendedUses] = useState<string[]>([
    "Coffee",
    "Tea",
    "Hot Chocolate",
    "Beverages",
    "Home Use",
    "Office Use",
    "Coffee Station",
  ]);
  const [embellishmentFeature, setEmbellishmentFeature] = useState("None");
  const [reusability, setReusability] = useState("Reusable");
  const [heightBaseToTop, setHeightBaseToTop] = useState("");
  const [heightUnit, setHeightUnit] = useState("inches");
  const [widthWidestPoint, setWidthWidestPoint] = useState("3.5");
  const [widthUnit, setWidthUnit] = useState("inches");
  const [drinkingCupFormType, setDrinkingCupFormType] = useState("Coffee Cup");
  const [drinkingCupFormSubtype, setDrinkingCupFormSubtype] = useState("");
  const [hasHandle, setHasHandle] = useState("Yes");
  const [numberOfPacks, setNumberOfPacks] = useState("1");
  const [itemWeight, setItemWeight] = useState("1");
  const [itemWeightUnit, setItemWeightUnit] = useState("pounds");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [complianceNote, setComplianceNote] = useState("");
  const [showAiNotice, setShowAiNotice] = useState(false);
  const [attributeFilter, setAttributeFilter] = useState<"all" | "required" | "recommended">("all");

  const activeIndex = listingSections.findIndex((section) => section.id === activeSection);
  const identityCount = [
    itemName.trim(),
    productType.trim(),
    brandName.trim() || noBrandName,
    externalProductId.trim() || noExternalProductId,
  ].filter(Boolean).length;

  const completedCount = (section: ListingSection) => {
    if (completedSections.includes(section)) {
      return listingSections.find((item) => item.id === section)?.required ?? 0;
    }
    if (section === "identity") return identityCount;
    return 0;
  };

  const isSectionUnlocked = (section: ListingSection) => {
    const sectionIndex = listingSections.findIndex((item) => item.id === section);
    return sectionIndex === 0 || completedSections.includes(listingSections[sectionIndex - 1].id);
  };

  const canContinue =
    activeSection === "identity"
      ? identityCount === 4
      : activeSection === "description"
        ? description.trim().length > 0
        : activeSection === "details"
          ? [material, color, capacity, numberOfPacks, itemWeight].every(
              (value) => value.trim().length > 0,
            )
          : activeSection === "offer"
            ? [price, quantity].every((value) => value.trim().length > 0)
            : complianceNote.trim().length > 0;

  const updateBulletPoint = (index: number, value: string) => {
    setBulletPoints((current) =>
      current.map((bullet, bulletIndex) => (bulletIndex === index ? value : bullet)),
    );
  };

  const addBulletPoint = () => {
    setBulletPoints((current) => (current.length < 10 ? [...current, ""] : current));
  };

  const removeBulletPoint = (index: number) => {
    setBulletPoints((current) =>
      current.length > 1 ? current.filter((_, bulletIndex) => bulletIndex !== index) : current,
    );
  };

  const updateImageName = (index: number, file: File | undefined) => {
    if (!file) return;
    setImageNames((current) =>
      current.map((name, imageIndex) => (imageIndex === index ? file.name : name)),
    );
  };

  const completeAndContinue = () => {
    if (!canContinue) return;
    setCompletedSections((current) =>
      current.includes(activeSection) ? current : [...current, activeSection],
    );
    const nextSection = listingSections[activeIndex + 1];
    if (nextSection) {
      setActiveSection(nextSection.id);
    } else {
      onSubmit();
    }
  };

  const renderSectionContent = () => {
    if (activeSection === "identity") {
      return (
        <>
          <div className="border border-[#33445b] bg-[#1d2940] px-4 py-3 text-white shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#72e2e9]" />
                <div>
                  <p className="text-sm font-semibold">Generate Listing Content</p>
                  <p className="mt-1 text-[11px] text-slate-200">
                    Use AI to generate product details using a short description, images, or both.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAiNotice(true)}
                className="inline-flex h-8 shrink-0 items-center justify-center gap-2 bg-[#36aabd] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#2c91a2]"
                data-testid="button-generate-listing-content"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Try now
              </button>
            </div>
          </div>

          {showAiNotice && (
            <div
              className="flex items-start gap-2 border border-[#f2c989] bg-[#fff8eb] px-3 py-2.5 text-xs text-[#835b19]"
              role="status"
              data-testid="notice-generate-listing-content"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              Generate Listing Content is still under construction XD. You can complete this listing manually for now.
            </div>
          )}

          <div className="space-y-6">
            <div>
              <Label htmlFor="builder-item-name" className="text-xs font-semibold text-[#33404e]">
                <span className="mr-1 text-[#c75142]">*</span>Item Name
                <span className="ml-1 font-normal text-[#7b8790]">(Required)</span>
              </Label>
              <p className="mt-1 text-[11px] text-[#68767e]">Provide a title for the item that may be customer facing.</p>
              <Input
                id="builder-item-name"
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
                placeholder="Example: Acidan Blue Sneakers"
                className="mt-2 h-10 rounded-none border-[#c6d0d4] bg-white text-sm"
                data-testid="input-builder-item-name"
              />
            </div>

            <div>
              <Label htmlFor="builder-product-type" className="text-xs font-semibold text-[#33404e]">
                <span className="mr-1 text-[#c75142]">*</span>Product Type
                <span className="ml-1 font-normal text-[#7b8790]">(Required)</span>
              </Label>
              <p className="mt-1 text-[11px] text-[#68767e]">
                Select the product type that best suits the item.
              </p>
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger
                  id="builder-product-type"
                  className="mt-2 h-10 rounded-none border-[#c6d0d4] bg-white text-sm"
                  data-testid="select-builder-product-type"
                >
                  <SelectValue placeholder="Select a product type" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {productTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label} <span className="text-xs text-muted-foreground">({type.value})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-[11px] text-[#68767e]">
                More attributes will be displayed once a product type is selected.
              </p>
            </div>

            <div className="border-t border-[#e1e5e7] pt-5">
              <Label htmlFor="builder-item-type-keyword" className="text-xs font-semibold text-[#33404e]">
                Item Type Keyword
              </Label>
              <p className="mt-1 text-[11px] text-[#68767e]">
                Item type keywords help place the item in the appropriate category.
              </p>
              <Select value={itemTypeKeyword} onValueChange={setItemTypeKeyword}>
                <SelectTrigger
                  id="builder-item-type-keyword"
                  className="mt-2 h-10 rounded-none border-[#c6d0d4] bg-white text-sm"
                  data-testid="select-builder-item-type-keyword"
                >
                  <SelectValue placeholder="Select an item type keyword" />
                </SelectTrigger>
                <SelectContent className="max-w-[680px]">
                  {itemTypeKeywords.map((keyword) => (
                    <SelectItem key={keyword.value} value={keyword.value}>
                      <span className="block max-w-[620px] truncate">{keyword.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t border-[#e1e5e7] pt-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Label className="text-xs font-semibold text-[#33404e]">
                    Variations <span className="font-normal text-[#7b8790]">Feedback</span>
                  </Label>
                  <p className="mt-1 max-w-2xl text-[11px] text-[#68767e]">
                    Variations are the same product offered with different specifications like size, color, or style while maintaining identical core functionality.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Switch
                    checked={hasVariations}
                    onCheckedChange={setHasVariations}
                    data-testid="switch-builder-variations"
                  />
                  <span className="text-[11px] text-[#4d5d66]">This product has variations</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e1e5e7] pt-5">
              <Label htmlFor="builder-item-highlight" className="text-xs font-semibold text-[#33404e]">
                Item Highlight <span className="font-normal text-[#7b8790]">Feedback</span>
              </Label>
              <p className="mt-1 text-[11px] text-[#68767e]">
                Provide product features or benefits in brief phrases, not a full sentence. Use up to 75 characters.
              </p>
              <Input
                id="builder-item-highlight"
                value={itemHighlight}
                onChange={(event) => setItemHighlight(event.target.value)}
                maxLength={75}
                placeholder="Example: Dishwasher safe, microwave safe"
                className="mt-2 h-10 rounded-none border-[#c6d0d4] bg-white text-sm"
                data-testid="input-builder-item-highlight"
              />
              <div className="mt-1 text-right text-[10px] text-[#718087]">
                {itemHighlight.length} / 75 characters
              </div>
            </div>

            <div className="border-t border-[#e1e5e7] pt-5">
              <Label htmlFor="builder-brand-name" className="text-xs font-semibold text-[#33404e]">
                <span className="mr-1 text-[#c75142]">*</span>Brand Name
                <span className="ml-1 font-normal text-[#7b8790]">Feedback</span>
              </Label>
              <p className="mt-1 text-[11px] text-[#68767e]">Provide the brand name of the product.</p>
              <Input
                id="builder-brand-name"
                value={brandName}
                onChange={(event) => setBrandName(event.target.value)}
                disabled={noBrandName}
                placeholder="Example: Sony"
                className="mt-2 h-10 rounded-none border-[#c6d0d4] bg-white text-sm disabled:bg-[#f2f4f5]"
                data-testid="input-builder-brand-name"
              />
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <Switch
                  checked={noBrandName}
                  onCheckedChange={(checked) => {
                    setNoBrandName(checked);
                    if (checked) setBrandName("");
                  }}
                  data-testid="switch-builder-no-brand-name"
                />
                <span className="text-[11px] text-[#4d5d66]">This product does not have a brand name</span>
                <button type="button" className="text-[11px] font-semibold text-[#24717d] hover:underline">
                  Learn more about the brand name policy
                </button>
              </div>
            </div>

            <div className="border-t border-[#e1e5e7] pt-5">
              <Label htmlFor="builder-external-product-id" className="text-xs font-semibold text-[#33404e]">
                <span className="mr-1 text-[#c75142]">*</span>External Product ID
                <span className="ml-1 font-normal text-[#7b8790]">Feedback</span>
              </Label>
              <p className="mt-1 text-[11px] text-[#68767e]">
                Provide the external ID and corresponding value used to identify the product.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-[180px_minmax(0,1fr)]">
                <Select
                  value={externalProductIdType}
                  onValueChange={setExternalProductIdType}
                  disabled={noExternalProductId}
                >
                  <SelectTrigger
                    className="h-10 rounded-none border-[#c6d0d4] bg-white text-sm disabled:bg-[#f2f4f5]"
                    data-testid="select-builder-external-product-id-type"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {externalProductIdTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="builder-external-product-id"
                  value={externalProductId}
                  onChange={(event) => setExternalProductId(event.target.value)}
                  disabled={noExternalProductId}
                  placeholder="Enter product ID"
                  className="h-10 rounded-none border-[#c6d0d4] bg-white text-sm disabled:bg-[#f2f4f5]"
                  data-testid="input-builder-external-product-id"
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <Switch
                  checked={noExternalProductId}
                  onCheckedChange={(checked) => {
                    setNoExternalProductId(checked);
                    if (checked) setExternalProductId("");
                  }}
                  data-testid="switch-builder-no-external-product-id"
                />
                <span className="text-[11px] text-[#4d5d66]">This product does not have a Product ID</span>
                <button type="button" className="text-[11px] font-semibold text-[#24717d] hover:underline">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeSection === "description") {
      return (
        <div className="space-y-6">
          <div>
            <Label htmlFor="builder-description" className="text-xs font-semibold text-[#33404e]">
              <span className="mr-1 text-[#c75142]">*</span>Product Description
            </Label>
            <p className="mt-1 text-[11px] text-[#68767e]">
              Provide a text description of the product. This information will appear in the product detail page.
            </p>
            <Textarea
              id="builder-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={2000}
              rows={8}
              placeholder="Enter a concise product description."
              className="mt-2 rounded-none border-[#c6d0d4] bg-white text-sm"
              data-testid="textarea-builder-description"
            />
            <div className="mt-1 text-right text-[10px] text-[#718087]">
              {description.length} / 2,000 characters
            </div>
          </div>

          <div className="border-t border-[#e1e5e7] pt-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <Label className="text-xs font-semibold text-[#33404e]">Bullet Points</Label>
                <p className="mt-1 text-[11px] text-[#68767e]">
                  Brief descriptive text for the key features of your product. Each bullet point can be up to 200 characters.
                </p>
              </div>
              <span className="text-[10px] text-[#718087]">{bulletPoints.length} of 10 boxes</span>
            </div>

            <div className="mt-3 space-y-2">
              {bulletPoints.map((bullet, index) => (
                <div key={`bullet-${index}`} className="group relative">
                  <Textarea
                    value={bullet}
                    onChange={(event) => updateBulletPoint(index, event.target.value)}
                    maxLength={200}
                    rows={2}
                    placeholder={`Bullet point ${index + 1}`}
                    className="min-h-[58px] resize-y rounded-none border-[#c6d0d4] bg-white pr-24 text-sm"
                    data-testid={`textarea-bullet-point-${index + 1}`}
                  />
                  <span className="absolute bottom-2 right-3 text-[10px] text-[#8a969c]">
                    {bullet.length} / 200
                  </span>
                  <button
                    type="button"
                    onClick={() => removeBulletPoint(index)}
                    disabled={bulletPoints.length === 1}
                    className="absolute right-2 top-2 inline-flex items-center gap-1 rounded border border-[#d7dfe1] bg-white px-2 py-1 text-[10px] font-semibold text-[#66767d] opacity-0 shadow-sm transition-opacity hover:border-[#b85c51] hover:text-[#a5463c] group-hover:opacity-100 group-focus-within:opacity-100 disabled:cursor-not-allowed disabled:opacity-0"
                    data-testid={`button-remove-bullet-point-${index + 1}`}
                  >
                    <X className="h-3 w-3" />
                    Remove list
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addBulletPoint}
              disabled={bulletPoints.length === 10}
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#24717d] hover:underline disabled:cursor-not-allowed disabled:text-[#aeb8bc] disabled:no-underline"
              data-testid="button-add-bullet-point"
            >
              <Plus className="h-3.5 w-3.5" />
              Add more
            </button>
          </div>

          <div className="border-t border-[#e1e5e7] pt-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <Label className="text-xs font-semibold text-[#33404e]">Images</Label>
                <p className="mt-1 text-[11px] text-[#68767e]">
                  Upload up to 9 images. You can arrange their order after uploading.
                </p>
              </div>
              <span className="text-[10px] text-[#718087]">
                {imageNames.filter(Boolean).length} of 9 uploaded
              </span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {imageNames.map((name, index) => (
                <label
                  key={`image-slot-${index}`}
                  className="flex min-h-[92px] cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-[#b8c8cc] bg-[#fbfdfd] px-3 py-3 text-center transition-colors hover:border-[#247f8e] hover:bg-[#f2fafa]"
                  data-testid={`upload-image-slot-${index + 1}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => updateImageName(index, event.target.files?.[0])}
                  />
                  <Upload className="h-5 w-5 text-[#247f8e]" />
                  <span className="max-w-full truncate text-[10px] font-semibold text-[#4f646b]">
                    {name || `Upload image ${index + 1}`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === "details") {
      return (
        <div className="space-y-1">
          <div className="border border-[#d3dde0] bg-[#fbfdfd] px-4 py-3">
            <p className="text-xs font-semibold text-[#344650]">Product details</p>
            <p className="mt-1 text-[10px] leading-4 text-[#68767e]">
              Provide the attributes that help customers understand and find this drinking cup.
              Values from the product details reference are prefilled and can be edited.
            </p>
          </div>

          <AttributeRow
            label="Age Range Description"
            description="Provide the intended age range for the drinking cup, indicating the appropriate user group for the item."
            required
          >
            <AttributeInput id="age-range-description" value={ageRangeDescription} onChange={setAgeRangeDescription} />
          </AttributeRow>
          <AttributeRow
            label="Material"
            description="Specify the primary materials used for manufacturing the item."
            required
          >
            <AttributeInput id="material" value={material} onChange={setMaterial} />
            <button type="button" className="mt-1 text-[10px] font-semibold text-[#24717d] hover:underline">
              Add more
            </button>
          </AttributeRow>
          <AttributeRow
            label="Pattern"
            description="Provide the decorative pattern that appears on the surface, such as checked, floral, or geometric designs."
          >
            <AttributeInput id="material-pattern" value={materialPattern} onChange={setMaterialPattern} />
          </AttributeRow>
          <AttributeRow
            label="Number of Items"
            description="Provide the total number of identical items in the selling unit to the customer."
            required
          >
            <AttributeInput id="number-of-items" value={numberOfItems} onChange={setNumberOfItems} />
          </AttributeRow>
          <AttributeRow
            label="Subject Character"
            description="Provide the main character depicted on the drinking cup, such as a fictional or real person featured in the cup's design."
          >
            <AttributeInput
              id="subject-character"
              value={subjectCharacter}
              onChange={setSubjectCharacter}
              placeholder="Example: Batman"
              multiline
            />
          </AttributeRow>
          <AttributeRow label="Color" description="Provide the color of the product." required>
            <AttributeInput id="color" value={color} onChange={setColor} />
          </AttributeRow>
          <AttributeRow label="Size" description="Provide the size of the item." required>
            <AttributeInput id="size" value={size} onChange={setSize} />
          </AttributeRow>
          <AttributeRow label="Item Shape" description="Specify the shape of the item.">
            <AttributeInput id="item-shape" value={itemShape} onChange={setItemShape} />
          </AttributeRow>
          <AttributeRow label="Theme" description="Provide the primary high-level subject, concept, topic, motif, or idea of an item.">
            <MultiValueField id="themes" values={themes} onChange={setThemes} />
          </AttributeRow>

          <AttributeRow
            label="Care Instructions"
            description="Provide instructions related to how to care for the item."
            required
          >
            <MultiValueField id="care-instructions" values={careInstructions} onChange={setCareInstructions} />
          </AttributeRow>
          <AttributeRow
            label="Is the item dishwasher safe?"
            description="If the item is dishwasher safe select yes, if it is not select no."
            required
          >
            <YesNoField id="dishwasher-safe" value={dishwasherSafe} onChange={setDishwasherSafe} />
          </AttributeRow>
          <AttributeRow
            label="Material Features"
            description="Provide the special qualities of the material used, such as compostability, biodegradability, or food safety features."
          >
            <MultiValueField id="material-features" values={materialFeatures} onChange={setMaterialFeatures} />
          </AttributeRow>
          <AttributeRow
            label="Is the item microwaveable?"
            description="If the item is microwaveable select yes, if it is not select no."
            required
          >
            <YesNoField id="microwaveable" value={microwaveable} onChange={setMicrowaveable} />
          </AttributeRow>
          <AttributeRow
            label="Material Type"
            description="Provide the materials specifically excluded from the drinking cup, indicating substances not used in its construction or content."
          >
            <AttributeInput id="material-type" value={materialType} onChange={setMaterialType} />
            <button type="button" className="mt-1 text-[10px] font-semibold text-[#24717d] hover:underline">
              Add more
            </button>
          </AttributeRow>
          <AttributeRow label="Capacity" description="The capacity of the item." required>
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <AttributeInput id="capacity" value={capacity} onChange={setCapacity} />
              <AttributeSelect
                id="capacity-unit"
                value={capacityUnit}
                onChange={setCapacityUnit}
                options={[
                  { value: "fluid-ounces", label: "Fluid Ounces" },
                  { value: "milliliters", label: "Milliliters" },
                  { value: "cups", label: "Cups" },
                ]}
              />
            </div>
          </AttributeRow>

          <AttributeRow
            label="Customer Package Type"
            description="Provide the type of packaging the item is sold in, indicating how the product is presented to the customer."
          >
            <AttributeInput id="customer-package-type" value={customerPackageType} onChange={setCustomerPackageType} multiline />
          </AttributeRow>
          <AttributeRow
            label="Pattern"
            description="Provide the most prominent repeated decorative design of the item."
          >
            <AttributeInput id="package-pattern" value={packagePattern} onChange={setPackagePattern} />
          </AttributeRow>
          <AttributeRow label="Finish Type" description="Specify the finish of the product's exterior surface.">
            <AttributeInput id="finish-type" value={finishType} onChange={setFinishType} />
          </AttributeRow>
          <AttributeRow
            label="Unit Count"
            description="For products that are consumed by volume, weight, linear dimension, etc., provide the net quantity that would be shipped to a customer."
            required
          >
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <AttributeInput id="unit-count" value={unitCount} onChange={setUnitCount} />
              <AttributeSelect
                id="unit-count-type"
                value={unitCountType}
                onChange={setUnitCountType}
                options={[
                  { value: "count", label: "Count" },
                  { value: "fluid-ounces", label: "Fluid Ounces" },
                  { value: "pounds", label: "Pounds" },
                ]}
              />
            </div>
          </AttributeRow>
          <AttributeRow
            label="Included Components"
            description="Specify the items that are included with this product."
            required
          >
            <MultiValueField id="included-components" values={includedComponents} onChange={setIncludedComponents} />
          </AttributeRow>
          <AttributeRow
            label="Specific Uses for Product"
            description="Select from the list of suggested values the conditions, or usages for which the product is specifically intended."
            required
          >
            <MultiValueField id="specific-uses" values={specificUses} onChange={setSpecificUses} />
          </AttributeRow>
          <AttributeRow
            label="Team Name"
            description="Provide the name of the sports team associated with the drinking cup, representing the team's branding or logo featured on the product."
          >
            <AttributeInput id="team-name" value={teamName} onChange={setTeamName} placeholder="Example: Seattle Seahawks" />
          </AttributeRow>
          <AttributeRow
            label="Recommended Uses For Product"
            description="Specify the recommended uses for the product."
          >
            <MultiValueField id="recommended-uses" values={recommendedUses} onChange={setRecommendedUses} />
          </AttributeRow>
          <AttributeRow
            label="Embellishment Feature"
            description="Provide the decorative element or ornamental detail added to enhance the appearance, such as patterns, textures, or attachments."
          >
            <AttributeInput id="embellishment-feature" value={embellishmentFeature} onChange={setEmbellishmentFeature} />
            <button type="button" className="mt-1 text-[10px] font-semibold text-[#24717d] hover:underline">
              Add more
            </button>
          </AttributeRow>
          <AttributeRow
            label="Reusability"
            description="Provide the intended usage duration, indicating whether the item is designed for single use or multiple uses."
          >
            <AttributeInput id="reusability" value={reusability} onChange={setReusability} />
          </AttributeRow>

          <AttributeRow
            label="Item Dimensions W x H"
            description="Provide the width and height measurements, indicating the overall size dimensions of the container."
            required
          >
            <div className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <AttributeInput id="height-base-to-top" value={heightBaseToTop} onChange={setHeightBaseToTop} placeholder="Example: 40" />
                <AttributeSelect
                  id="height-unit"
                  value={heightUnit}
                  onChange={setHeightUnit}
                  options={[
                    { value: "inches", label: "Inches" },
                    { value: "centimeters", label: "Centimeters" },
                  ]}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <AttributeInput id="width-widest-point" value={widthWidestPoint} onChange={setWidthWidestPoint} />
                <AttributeSelect
                  id="width-unit"
                  value={widthUnit}
                  onChange={setWidthUnit}
                  options={[
                    { value: "inches", label: "Inches" },
                    { value: "centimeters", label: "Centimeters" },
                  ]}
                />
              </div>
            </div>
          </AttributeRow>
          <AttributeRow
            label="Drinking Cup Form"
            description="Provide the physical form of the drinking cup. Drinking cup forms are based on the overall structure and shape of the cup."
            required
          >
            <div className="space-y-2">
              <AttributeSelect
                id="drinking-cup-form-type"
                value={drinkingCupFormType}
                onChange={setDrinkingCupFormType}
                options={[
                  { value: "coffee-cup", label: "Coffee Cup" },
                  { value: "travel-mug", label: "Travel Mug" },
                  { value: "tumbler", label: "Tumbler" },
                ]}
              />
              <AttributeSelect
                id="drinking-cup-form-subtype"
                value={drinkingCupFormSubtype}
                onChange={setDrinkingCupFormSubtype}
                placeholder="Example: Pilsner"
                options={[
                  { value: "pilsner", label: "Pilsner" },
                  { value: "latte", label: "Latte" },
                  { value: "espresso", label: "Espresso" },
                ]}
              />
            </div>
          </AttributeRow>
          <AttributeRow label="Has Handle" description="Provide whether the item has a handle for grip and portability." required>
            <YesNoField id="has-handle" value={hasHandle} onChange={setHasHandle} />
          </AttributeRow>
          <AttributeRow
            label="Number of Packs"
            description="Provide the count of inner packs included in an item. For a single pack or packed assortment of non-identical items, enter 1."
            required
          >
            <AttributeInput id="number-of-packs" value={numberOfPacks} onChange={setNumberOfPacks} />
          </AttributeRow>
          <AttributeRow label="Item Weight" description="Provide the weight of the item (not including the packaging)." required>
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <AttributeInput id="item-weight" value={itemWeight} onChange={setItemWeight} />
              <AttributeSelect
                id="item-weight-unit"
                value={itemWeightUnit}
                onChange={setItemWeightUnit}
                options={[
                  { value: "pounds", label: "Pounds" },
                  { value: "ounces", label: "Ounces" },
                  { value: "kilograms", label: "Kilograms" },
                ]}
              />
            </div>
          </AttributeRow>
        </div>
      );
    }

    if (activeSection === "offer") {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <BuilderField id="builder-price" label="Your price" value={price} onChange={setPrice} placeholder="0.00" />
          <BuilderField id="builder-quantity" label="Quantity" value={quantity} onChange={setQuantity} placeholder="0" />
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <div>
          <Label htmlFor="builder-compliance" className="text-xs font-semibold text-[#33404e]">
            <span className="mr-1 text-[#c75142]">*</span>Safety and compliance notes
          </Label>
          <p className="mt-1 text-[11px] text-[#68767e]">
            Add any safety, warning, certification, or compliance information for this product.
          </p>
          <Textarea
            id="builder-compliance"
            value={complianceNote}
            onChange={(event) => setComplianceNote(event.target.value)}
            rows={7}
            placeholder="Enter compliance information or type None if it does not apply."
            className="mt-2 rounded-none border-[#c6d0d4] bg-white text-sm"
            data-testid="textarea-builder-compliance"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f5f6]">
      <div className="border-b border-[#d8dde0] bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-[#33404e]">Add a product</h1>
            <span className="text-xs text-[#8a959b]">Build your listing in sequence</span>
          </div>
          <button type="button" onClick={onExit} className="text-xs font-semibold text-[#24717d] hover:underline" data-testid="button-exit-builder">
            Exit
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-4 px-3 py-4 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit border border-[#d5dce0] bg-white" aria-label="Listing attributes">
          <div className="border-b border-[#e1e5e7] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#718087]">Attributes</p>
          </div>
          <nav className="p-2">
            {listingSections.map((section, index) => {
              const unlocked = isSectionUnlocked(section.id);
              const completed = completedSections.includes(section.id);
              const selected = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-3 border-l-2 px-3 py-3 text-left transition-colors ${
                    selected
                      ? "border-[#247f8e] bg-[#eef8f8] text-[#24717d]"
                      : unlocked
                        ? "border-transparent text-[#4d5d66] hover:bg-[#f5f9f9]"
                        : "cursor-not-allowed border-transparent text-[#b0b8bc]"
                  }`}
                  data-testid={`button-builder-section-${section.id}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                      completed
                        ? "border-[#247f8e] bg-[#247f8e] text-white"
                        : selected
                          ? "border-[#247f8e] text-[#24717d]"
                          : unlocked
                            ? "border-[#aebbc0] text-[#68767e]"
                            : "border-[#d7dddf] text-[#b8c0c4]"
                    }`}
                  >
                    {completed ? <Check className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold">{section.label}</span>
                  {(section.id === "identity" || section.id === "details") && (
                      <span className="mt-0.5 block text-[10px] text-current opacity-75">
                        {section.id === "details"
                          ? completedSections.includes(section.id)
                            ? "21 of 21 Attributes"
                            : "17 of 21 Attributes"
                          : `${completedCount(section.id)} of ${section.required}`}
                      </span>
                    )}
                  </span>
                  {!unlocked && <LockKeyhole className="h-3.5 w-3.5 shrink-0" />}
                </button>
              );
            })}
          </nav>
          <div className="border-t border-[#e1e5e7] px-4 py-3 text-[11px] text-[#68767e]">
            <span className="font-semibold text-[#4c5d65]">Listing language:</span> English
          </div>
          <div className="space-y-2 border-t border-[#e1e5e7] p-3">
            <Button
              type="button"
              disabled={completedSections.length !== listingSections.length}
              onClick={onSubmit}
              className="h-9 w-full rounded-none bg-[#247f8e] text-xs text-white hover:bg-[#1d6875]"
              data-testid="button-submit-builder"
            >
              Submit
            </Button>
            <Button type="button" variant="outline" className="h-9 w-full rounded-none text-xs" data-testid="button-save-builder">
              Save as draft
            </Button>
            <Button type="button" variant="outline" onClick={onExit} className="h-9 w-full rounded-none text-xs" data-testid="button-cancel-builder">
              Cancel
            </Button>
          </div>
        </aside>

        <main className="min-w-0 border border-[#d5dce0] bg-white">
          <div className="border-b border-[#e1e5e7] px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#718087]">
                  {listingSections[activeIndex].label}
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#273746]">
                  {activeSection === "identity" ? "Classify your product" : `Complete ${listingSections[activeIndex].label.toLowerCase()}`}
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded border border-[#d8e1e3] bg-[#f7fbfb] px-3 py-1.5">
                <span className="whitespace-nowrap text-[10px] font-semibold text-[#3d5961]">Filter attributes</span>
                <Select
                  value={attributeFilter}
                  onValueChange={(value) => setAttributeFilter(value as "all" | "required" | "recommended")}
                >
                  <SelectTrigger
                    className="h-7 min-w-[112px] rounded-none border-[#c6d0d4] bg-white px-2 text-[10px]"
                    data-testid="select-attribute-filter"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="required">Required</SelectItem>
                    <SelectItem value="recommended">Recommended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-5 px-5 py-5 sm:px-7">
            {renderSectionContent()}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#e1e5e7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <button
              type="button"
              onClick={() => {
                const previousSection = listingSections[activeIndex - 1];
                if (previousSection) setActiveSection(previousSection.id);
              }}
              disabled={activeIndex === 0}
              className="text-left text-xs font-semibold text-[#24717d] hover:underline disabled:cursor-not-allowed disabled:text-[#b2bcc0] disabled:no-underline"
              data-testid="button-builder-back"
            >
              Back
            </button>
            <Button
              type="button"
              onClick={completeAndContinue}
              disabled={!canContinue}
              className="h-9 rounded-none bg-[#247f8e] px-5 text-xs text-white hover:bg-[#1d6875]"
              data-testid="button-builder-continue"
            >
              {activeIndex === listingSections.length - 1 ? "Submit listing" : "Continue"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

function BuilderField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-semibold text-[#33404e]">
        <span className="mr-1 text-[#c75142]">*</span>{label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-10 rounded-none border-[#c6d0d4] bg-white text-sm"
        data-testid={`input-${id}`}
      />
    </div>
  );
}

export default function AddProduct() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  const listingOptions = [
    { label: "Search", icon: Search },
    { label: "Product image", icon: ImageIcon },
    { label: "Product IDs", icon: Barcode },
    { label: "Web URL", icon: Link2 },
    { label: "Blank form", icon: FileText },
    { label: "Spreadsheet", icon: FileSpreadsheet },
  ];

  const [selectedOption, setSelectedOption] = useState("Blank form");

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

  if (!started) {
    return (
      <div className="min-h-screen bg-[#f4fbfb]">
        <PageHeader
          title="Add products"
          breadcrumbs={[{ label: "Catalog", href: "/catalog/listings" }, { label: "Add products" }]}
        />

        <section className="border-b border-[#e2eded] bg-[#eff9f9] px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1320px] items-center gap-8 lg:grid-cols-[280px_minmax(0,680px)] lg:justify-center lg:gap-14">
            <PackageIllustration />

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h2 className="text-[30px] font-semibold tracking-[-0.04em] text-[#1e2f3d] sm:text-[36px]">
                  List your products
                </h2>
                <button
                  type="button"
                  className="text-xs font-medium text-[#24717d] underline-offset-2 hover:underline"
                  data-testid="button-learn-more-products"
                >
                  Learn more
                </button>
              </div>
              <p className="mb-6 text-sm text-[#52636c]">Select an option to get started.</p>

              <div
                className="grid grid-cols-3 gap-2 sm:grid-cols-6"
                role="tablist"
                aria-label="Product listing methods"
              >
                {listingOptions.map(({ label, icon: Icon }) => {
                  const isSelected = selectedOption === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedOption(label)}
                      className={`flex min-h-[76px] flex-col items-center justify-center gap-2 border bg-[#f8fdfd] px-2 py-2 text-center transition-colors ${
                        isSelected
                          ? "border-[#2b7180] bg-white text-[#1b6978] shadow-[0_1px_2px_rgba(34,77,85,0.08)]"
                          : "border-transparent text-[#3c818b] hover:border-[#a9cdd0] hover:bg-white"
                      }`}
                      data-testid={`tab-add-product-${label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                      <span className="text-[10px] font-medium leading-tight">{label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="border border-[#96c1c6] bg-white px-4 py-5 sm:px-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="max-w-[430px] text-sm leading-6 text-[#334852]">
                      {selectedOption === "Blank form"
                        ? "List a single product from scratch using a blank interactive web form."
                        : `Use ${selectedOption.toLowerCase()} to begin a new product listing in this simulator.`}
                    </p>
                    <button
                      type="button"
                      className="mt-4 text-xs font-medium text-[#24717d] underline-offset-2 hover:underline"
                      data-testid="button-learn-more-method"
                    >
                      Learn more
                    </button>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStarted(true)}
                    className="h-9 shrink-0 rounded-none bg-[#247f8e] px-5 text-xs font-semibold text-white hover:bg-[#1d6875]"
                    data-testid="button-start-add-product"
                  >
                    Start
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-8 lg:px-12">
          <h2 className="mb-4 text-lg font-semibold text-[#344650]">Additional references</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <ReferenceCard
              title="What’s a GTIN?"
              description="You can find the barcode or GTIN (UPC/EAN/ISBN/ISBN) on the package of your item. If you do not have a GTIN, you can apply for exemption."
              link="Learn more"
            />
            <ReferenceCard
              title="Products requiring approval"
              description="Sellers are required to obtain approval from the marketplace before listing certain product categories."
              link="Learn more"
            />
            <ReferenceCard
              title="Create variations"
              description="Add to or sell an existing variation family using Search option above. Create a new variation family using Spreadsheet or Blank form."
              link="Learn more"
            />
            <ReferenceCard
              title="Compliance references"
              description="Learn compliance requirements and service providers for your products."
              link="Compliance self-assessment"
            />
            <ReferenceCard
              title="Listing requirement updates"
              description="We regularly update listing requirements to ensure customers can easily find and evaluate products in our store."
              link="Learn more"
            />
          </div>
        </section>
      </div>
    );
  }

  return <ListingBuilder onSubmit={() => setSubmitted(true)} onExit={() => setStarted(false)} />;

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
