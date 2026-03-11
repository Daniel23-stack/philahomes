export interface ServiceSubcategory {
  id: string;
  name: string;
  slug?: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  subcategories: ServiceSubcategory[];
  icon?: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'plumbing',
    name: 'Plumbing',
    shortDescription: 'Leak repairs, pipe installations, and maintenance for your home.',
    subcategories: [
      { id: 'leak-repairs', name: 'Leak Repairs' },
      { id: 'pipe-installations', name: 'Pipe Installations' },
      { id: 'maintenance', name: 'Maintenance' },
    ],
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    shortDescription: 'Wiring, lighting, and fault repairs by certified electricians.',
    subcategories: [
      { id: 'wiring', name: 'Wiring' },
      { id: 'lighting', name: 'Lighting' },
      { id: 'fault-repairs', name: 'Fault Repairs' },
    ],
  },
  {
    slug: 'renovations',
    name: 'Renovations',
    shortDescription: 'Remodeling, extensions, and full project management.',
    subcategories: [
      { id: 'remodeling', name: 'Remodeling' },
      { id: 'extensions', name: 'Extensions' },
      { id: 'project-management', name: 'Project Management' },
    ],
  },
  {
    slug: 'interior-design',
    name: 'Interior Design',
    shortDescription: 'Space planning, furniture selection, and décor.',
    subcategories: [
      { id: 'space-planning', name: 'Space Planning' },
      { id: 'furniture-selection', name: 'Furniture Selection' },
      { id: 'decor', name: 'Décor' },
    ],
  },
  {
    slug: 'bricklaying',
    name: 'Bricklaying',
    shortDescription: 'Wall repairs and masonry work.',
    subcategories: [
      { id: 'wall-repairs', name: 'Wall Repairs' },
      { id: 'masonry', name: 'Masonry Work' },
    ],
  },
  {
    slug: 'general-maintenance',
    name: 'General Maintenance',
    shortDescription: 'Painting, waterproofing, and carpentry.',
    subcategories: [
      { id: 'painting', name: 'Painting' },
      { id: 'waterproofing', name: 'Waterproofing' },
      { id: 'carpentry', name: 'Carpentry' },
    ],
  },
  {
    slug: 'welding',
    name: 'Welding Services',
    shortDescription: 'Professional welding for home and structural needs.',
    subcategories: [
      { id: 'structural', name: 'Structural Welding' },
      { id: 'repairs', name: 'Welding Repairs' },
    ],
  },
  {
    slug: 'solar',
    name: 'Solar PV Installation & Maintenance',
    shortDescription: 'Solar panel installation and ongoing maintenance.',
    subcategories: [
      { id: 'installation', name: 'Installation' },
      { id: 'maintenance', name: 'Maintenance' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
