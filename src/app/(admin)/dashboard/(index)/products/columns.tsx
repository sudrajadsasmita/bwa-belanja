"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getImageUrl } from "@/lib/supabase";
import { formatDate, rupiahFormatter } from "@/lib/utils";
import { StockProduct } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type TColumns = {
  id: number;
  name: string;
  imageUrl: string;
  categoryName: string;
  productName: string;
  price: number;
  totalSales: number;
  stock: StockProduct;
  createdAt: Date;
};

export const columns: ColumnDef<TColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="inline-block items-center gap-5 md:inline-flex">
          <Image
            src={getImageUrl(product.imageUrl)}
            alt="Product"
            width={80}
            height={80}
          />
          <span>{product.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return rupiahFormatter(product.price);
    },
  },
  {
    accessorKey: "stock",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      return <Badge variant={"outline"}> {product.stock}</Badge>;
    },
  },
  {
    accessorKey: "totalSales",
    header: "Total Sales",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const product = row.original;
      return formatDate(product.createdAt);
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center justify-center">
          <div className="hidden gap-2 md:flex">
            <Button
              className="bg-orange-500 uppercase hover:bg-orange-600"
              asChild
            >
              <Link href={`/dashboard/products/edit/${product.id}`}>
                <Pencil className="mr-2" />
                Edit
              </Link>
            </Button>
            {/* <FormDelete type="BIG" id={product.id} /> */}
          </div>
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/products/edit/${product.id}`}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                {/* <FormDelete type="SMALL" id={product.id} /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      );
    },
  },
];
