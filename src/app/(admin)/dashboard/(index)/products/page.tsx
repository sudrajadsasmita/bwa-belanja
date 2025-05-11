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
import Link from "next/link";
import getProducts from "./lib/data";
import { columns } from "./columns";

export default async function ProductPage() {
  const data = await getProducts();
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
          <div className="flex flex-col space-y-2">
            <CardTitle>List Product</CardTitle>
            <CardDescription>
              Manage your product and view their sales performance.
            </CardDescription>
          </div>
          <Button className="w-full md:w-auto" asChild>
            <Link href={`products/create`}>
              <Plus /> Add Product
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
