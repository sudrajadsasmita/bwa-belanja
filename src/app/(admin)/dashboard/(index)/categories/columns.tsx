"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "action",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="">
          <TableCell className="hidden align-middle md:table-cell">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:flex-row lg:gap-4">
              <Button className="h-full w-full bg-orange-500 uppercase hover:bg-orange-600 lg:h-auto lg:w-auto">
                <Pencil className="mr-2" />
                Edit
              </Button>
              <Button className="h-full w-full bg-red-500 uppercase hover:bg-red-600 lg:h-auto lg:w-auto">
                <Trash className="mr-2" />
                Delete
              </Button>
            </div>
          </TableCell>

          <TableCell className="table-cell md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </div>
      );
    },
  },
];
