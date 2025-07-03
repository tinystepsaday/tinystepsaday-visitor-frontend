export default function DashboardPageHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">
          {subtitle}
        </p>
      </div>
  )
}
