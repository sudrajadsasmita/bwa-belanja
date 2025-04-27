"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";
export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
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
      const category = row.original;
      return (
        <div className="flex items-center justify-center">
          <div className="hidden gap-2 md:flex">
            <Button
              className="bg-orange-500 uppercase hover:bg-orange-600"
              asChild
            >
              <Link href={`/dashboard/categories/edit/${category.id}`}>
                <Pencil className="mr-2" />
                Edit
              </Link>
            </Button>
            <FormDelete type="BIG" id={category.id} />
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
                  <Link href={`/dashboard/categories/edit/${category.id}`}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <FormDelete type="SMALL" id={category.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      );
    },
  },
];
