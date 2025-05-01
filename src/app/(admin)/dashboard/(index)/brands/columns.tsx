"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Brand",
    cell: ({ row }) => {
      const brand = row.original;
      console.log(getImageUrl(brand.logo));
      return (
        <div className="inline-block items-center gap-5 md:inline-flex">
          <Image
            src={getImageUrl(brand.logo)}
            alt="Product"
            width={80}
            height={80}
          />
          <span>{brand.name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ cell }) => {
      return (
        <div className="flex items-center gap-2">
          {cell.getValue<Date>().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className="flex items-center justify-center">
          <div className="hidden gap-2 md:flex">
            <Button
              className="bg-orange-500 uppercase hover:bg-orange-600"
              asChild
            >
              <Link href={`/dashboard/brands/edit/${brand.id}`}>
                <Pencil className="mr-2" />
                Edit
              </Link>
            </Button>
            <FormDelete type="BIG" id={brand.id} />
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
                  <Link href={`/dashboard/brands/edit/${brand.id}`}>Edit</Link>
                </DropdownMenuItem>
                <FormDelete type="SMALL" id={brand.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      );
    },
  },
];
