export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '1', title: 'Kitchen plumbing upgrade', category: 'plumbing', description: 'Full repipe and new fixtures.', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80' },
  {
    id: '2',
    title: 'Home electrical panel',
    category: 'electrical',
    description: 'New DB board and circuits.',
    image: 'https://images.unsplash.com/photo-1576446470246-499c738d1c8e?auto=format&fit=crop&w=1200&q=80',
  },
  { id: '3', title: 'Bathroom renovation', category: 'renovations', description: 'Tile, plumbing, and lighting.', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80' },
  { id: '4', title: 'Solar PV installation', category: 'solar', description: '6kW system with battery backup.', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80' },
  { id: '5', title: 'Exterior painting', category: 'general-maintenance', description: 'House exterior and gates.', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80' },
  { id: '6', title: 'Wall repair and repoint', category: 'bricklaying', description: 'Boundary wall repair.', image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80' },
];

/** First 3 items for homepage featured strip */
export const FEATURED_PORTFOLIO = PORTFOLIO_ITEMS.slice(0, 3);
