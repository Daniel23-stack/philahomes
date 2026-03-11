type Props = {
  title: string;
  description?: string;
};

export function AdminPageHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      {description && <p className="mt-1 text-slate-500">{description}</p>}
    </div>
  );
}
