const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const hash = await bcrypt.hash(password, 10);

  // Admin user
  await prisma.user.upsert({
    where: { email: 'admin@philahomes.co.za' },
    update: { passwordHash: hash, role: 'admin' },
    create: {
      email: 'admin@philahomes.co.za',
      name: 'Admin',
      passwordHash: hash,
      role: 'admin',
    },
  });
  console.log('Admin user ready: admin@philahomes.co.za');

  // Demo client users
  const clientEmails = ['sarah.m@email.com', 'james.k@email.com', 'linda.t@email.com', 'peter.n@email.com'];
  const clientHash = await bcrypt.hash('demo123', 10);
  const clientIds = [];
  for (const email of clientEmails) {
    const u = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        passwordHash: clientHash,
        role: 'client',
      },
    });
    clientIds.push(u.id);
  }
  console.log('Demo clients created:', clientEmails.length);

  // Demo service requests (mix of statuses)
  const categories = ['plumbing', 'electrical', 'renovations', 'solar', 'general-maintenance', 'interior-design'];
  const statuses = ['pending', 'pending', 'quoted', 'quoted', 'accepted', 'in_progress', 'completed', 'completed'];
  const contacts = [
    { name: 'Sarah M.', email: 'sarah.m@email.com', phone: '+27 82 111 2233' },
    { name: 'James K.', email: 'james.k@email.com', phone: '+27 83 222 3344' },
    { name: 'Linda T.', email: 'linda.t@email.com', phone: '+27 84 333 4455' },
    { name: 'Peter N.', email: 'peter.n@email.com', phone: '+27 81 444 5566' },
    { name: 'Thabo S.', email: 'thabo@email.com', phone: '+27 72 555 6677' },
    { name: 'Nomsa D.', email: 'nomsa@email.com', phone: '+27 76 666 7788' },
  ];
  const descriptions = [
    'Kitchen sink leaking under the cabinet, need repair and possibly pipe replacement.',
    'Install new LED downlights in living room and hallway.',
    'Bathroom renovation: new tiles, vanity, and shower.',
    'Solar PV system for home, 5kW preferred.',
    'General painting and minor repairs before moving in.',
    'Living room interior design and furniture layout.',
    'Emergency plumbing: burst pipe in ceiling.',
    'Electrical fault in garage, trip switch keeps going.',
    'Backyard wall repair and repointing.',
    'Solar panel cleaning and inverter check.',
  ];

  const requestIds = [];
  for (let i = 0; i < 10; i++) {
    const c = contacts[i % contacts.length];
    const r = await prisma.serviceRequest.create({
      data: {
        serviceCategory: categories[i % categories.length],
        description: descriptions[i % descriptions.length],
        contactName: c.name,
        contactEmail: c.email,
        contactPhone: c.phone,
        status: statuses[i % statuses.length],
        userId: i < 4 ? clientIds[i % clientIds.length] : null,
      },
    });
    requestIds.push(r);
  }
  console.log('Demo service requests created:', requestIds.length);

  // Demo quotes (link to some requests)
  const quoteData = [
    { requestIndex: 0, amount: 1250, status: 'sent', notes: 'Includes parts and labour.' },
    { requestIndex: 2, amount: 8500, status: 'accepted', notes: 'Full bathroom renovation quote.' },
    { requestIndex: 3, amount: 95000, status: 'sent', notes: '5kW solar system with installation.' },
    { requestIndex: 4, amount: 3200, status: 'draft', notes: 'Painting and small repairs.' },
    { requestIndex: 5, amount: 4500, status: 'sent', notes: 'Design consultation and layout.' },
    { requestIndex: 6, amount: 1800, status: 'accepted', notes: 'Emergency call-out and repair.' },
  ];
  const quoteIds = [];
  for (const q of quoteData) {
    const req = requestIds[q.requestIndex];
    const quote = await prisma.quote.create({
      data: {
        requestId: req.id,
        amount: q.amount,
        notes: q.notes,
        status: q.status,
      },
    });
    quoteIds.push(quote);
  }
  console.log('Demo quotes created:', quoteIds.length);

  // Demo jobs (link to quotes + requests)
  const jobData = [
    { quoteIndex: 1, requestIndex: 2, status: 'in_progress', scheduled: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    { quoteIndex: 5, requestIndex: 6, status: 'completed', scheduled: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    { quoteIndex: 2, requestIndex: 3, status: 'scheduled', scheduled: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
  ];
  for (const j of jobData) {
    const quote = quoteIds[j.quoteIndex];
    const req = requestIds[j.requestIndex];
    await prisma.job.create({
      data: {
        quoteId: quote.id,
        requestId: req.id,
        status: j.status,
        scheduledDate: j.scheduled,
        completedAt: j.status === 'completed' ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) : null,
        notes: j.status === 'completed' ? 'Job completed successfully.' : null,
      },
    });
  }
  console.log('Demo jobs created:', jobData.length);

  // Demo blog posts (upsert by slug so re-run doesn't duplicate)
  const posts = [
    { title: '5 Signs You Need a Plumber', slug: '5-signs-you-need-a-plumber', excerpt: 'When to call a professional for your plumbing issues.', body: 'Content about plumbing signs...', publishedAt: new Date(), category: 'Plumbing' },
    { title: 'Going Solar: What to Expect', slug: 'going-solar-what-to-expect', excerpt: 'A quick guide to solar PV installation for your home.', body: 'Content about solar installation...', publishedAt: new Date(), category: 'Solar' },
    { title: 'Home Renovation Checklist', slug: 'home-renovation-checklist', excerpt: 'Plan your renovation with this simple checklist.', body: 'Content about renovation planning...', publishedAt: new Date(), category: 'Renovations' },
  ];
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: { title: p.title, excerpt: p.excerpt, body: p.body, publishedAt: p.publishedAt, category: p.category },
      create: p,
    });
  }
  console.log('Demo blog posts created: 3');

  // Demo catalog items (create with add-ons; skip if already have items)
  const existingCatalog = await prisma.catalogItem.count();
  if (existingCatalog === 0) {
    const catalogSpecs = [
      { serviceCategory: 'plumbing', name: 'Leak Repair', description: 'Standard leak repair including labour', basePrice: 450, order: 0, addOns: [{ name: 'Emergency call-out', price: 200 }, { name: 'Parts (supplied)', price: 0 }] },
      { serviceCategory: 'plumbing', name: 'Pipe Installation', description: 'New pipe runs and connections', basePrice: 850, order: 1, addOns: [{ name: 'Copper piping (per m)', price: 180 }, { name: 'PVC piping (per m)', price: 95 }] },
      { serviceCategory: 'electrical', name: 'Light Installation', description: 'Per fitting, labour included', basePrice: 350, order: 0, addOns: [{ name: 'LED downlight', price: 120 }, { name: 'Pendant fitting', price: 85 }] },
      { serviceCategory: 'electrical', name: 'DB Board Upgrade', description: 'Consumer unit upgrade and compliance', basePrice: 2500, order: 1, addOns: [{ name: 'Additional circuits', price: 450 }, { name: 'Surge protection', price: 380 }] },
      { serviceCategory: 'solar', name: '5kW Solar System', description: 'Supply and install, grid-tied', basePrice: 95000, order: 0, addOns: [{ name: 'Battery (5kWh)', price: 25000 }, { name: 'Extended warranty', price: 3500 }] },
      { serviceCategory: 'solar', name: 'Solar Maintenance', description: 'Panel clean and system check', basePrice: 650, order: 1, addOns: [{ name: 'Inverter inspection', price: 150 }] },
      { serviceCategory: 'renovations', name: 'Bathroom Renovation', description: 'Full bathroom refresh, labour and project management', basePrice: 35000, order: 0, addOns: [{ name: 'Tiling (per m²)', price: 450 }, { name: 'Plumbing move', price: 2200 }] },
      { serviceCategory: 'general-maintenance', name: 'Painting (per room)', description: 'Walls and ceiling, 2 coats', basePrice: 1200, order: 0, addOns: [{ name: 'Premium paint', price: 180 }, { name: 'Skirting', price: 95 }] },
    ];
    for (const spec of catalogSpecs) {
      const { addOns, ...data } = spec;
      const item = await prisma.catalogItem.create({ data });
      if (addOns.length > 0) {
        await prisma.addOn.createMany({
          data: addOns.map((a) => ({ catalogItemId: item.id, name: a.name, price: a.price })),
        });
      }
    }
    console.log('Demo catalog items created:', catalogSpecs.length);
  } else {
    console.log('Demo catalog already has items, skipping.');
  }

  // Demo invoices (link to a user and optional quote/job)
  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@philahomes.co.za' } });
  const firstJob = await prisma.job.findFirst({ where: { status: 'completed' }, include: { quote: true, request: true } });
  if (firstJob && clientIds[0]) {
    await prisma.invoice.create({
      data: {
        userId: clientIds[0],
        quoteId: firstJob.quoteId,
        jobId: firstJob.id,
        amount: firstJob.quote?.amount ?? 1800,
        status: 'sent',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });
    await prisma.invoice.create({
      data: {
        userId: clientIds[1],
        amount: 3200,
        status: 'draft',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    console.log('Demo invoices created: 2');
  }

  // Demo activity logs
  if (adminUser) {
    await prisma.activityLog.createMany({
      data: [
        { userId: adminUser.id, action: 'login', entityType: 'user', entityId: adminUser.id },
        { userId: adminUser.id, action: 'view', entityType: 'ServiceRequest', entityId: requestIds[0]?.id },
        { action: 'quote_created', entityType: 'Quote' },
        { userId: adminUser.id, action: 'job_updated', entityType: 'Job' },
      ],
    });
    console.log('Demo activity logs created: 4');
  }

  console.log('Demo data seed complete.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
