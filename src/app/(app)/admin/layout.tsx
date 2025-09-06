import { AdminTabs } from "@/components/admin/admin-tabs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your platform, users, and content.
        </p>
      </div>
      <AdminTabs />
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
