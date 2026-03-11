import { prisma } from '@/lib/prisma';

export default async function CatalogPage() {
  let items: { name: string; description: string | null; basePrice: number | null; isRetired: boolean }[] = [];
  try {
    items = await prisma.catalogItem.findMany({
      where: { isRetired: false },
      orderBy: { order: 'asc' },
      select: { name: true, description: true, basePrice: true, isRetired: true },
    });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <h1 className="section-heading">Service catalog</h1>
      <p className="mt-2 text-gray-600">Browse our services and indicative pricing.</p>
      {items.length === 0 ? (
        <p className="mt-8 text-gray-500">Catalog is being updated. Check back soon.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {items.map((item, i) => (
            <li key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex justify-between">
                <span className="font-medium text-[var(--color-primary)]">{item.name}</span>
                {item.basePrice != null && (
                  <span className="text-[var(--color-accent)]">
                    From R{item.basePrice.toLocaleString()}
                  </span>
                )}
              </div>
              {item.description && <p className="mt-2 text-sm text-gray-600">{item.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
