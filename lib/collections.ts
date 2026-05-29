export type CollectionOption = {
  name: string;
  slug: string;
};

export const COLLECTIONS: CollectionOption[] = [
  { name: "Woody", slug: "woody" },
  { name: "Fresh", slug: "fresh" },
  { name: "Floral", slug: "floral" },
  { name: "Edible", slug: "edible" },
  { name: "Warm", slug: "warm" },
  { name: "Body Care", slug: "body-care" },
];

export function categoryToSlug(category: string): string {
  return category.toLowerCase().trim().replace(/\s+/g, "-");
}

export function findCollection(slugOrName: string): CollectionOption | null {
  const s = categoryToSlug(slugOrName);
  return COLLECTIONS.find((c) => c.slug === s) ?? null;
}
