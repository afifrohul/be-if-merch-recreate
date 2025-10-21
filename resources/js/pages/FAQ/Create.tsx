import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { FaqForm } from "./Partials/FaqForm";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "FAQ - Create", href: "/faqs/create" },
];

export default function Create() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create FAQ" />
      <div className="container mx-auto p-4">
        <div className="rounded-md border p-4">
          <h1 className="mb-4 text-xl font-bold">Create FAQ</h1>
          <Separator className="my-4" />
          <FaqForm submitUrl="/faqs" method="post" />
        </div>
      </div>
    </AppLayout>
  );
}
