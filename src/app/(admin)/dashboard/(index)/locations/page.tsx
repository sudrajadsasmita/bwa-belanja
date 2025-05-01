import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-tables";

import { Plus } from "lucide-react";
import { columns } from "./columns";
import getCategories from "./lib/data";
import Link from "next/link";

export default async function LocationPage() {
  const data = await getCategories();
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Location</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
          <div className="flex flex-col space-y-2">
            <CardTitle>Location Product</CardTitle>
            <CardDescription>
              Manage your location product and view their sales performance.
            </CardDescription>
          </div>
          <Button className="w-full md:w-auto" asChild>
            <Link href={`locations/create`}>
              <Plus /> Add Location
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
