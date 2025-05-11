"use client";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { schemaProduct } from "@/lib/schema";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Brand, Category, Location, StockProduct } from "@prisma/client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-uploads";

interface FormProductProps {
  brand: Brand[];
  location: Location[];
  category: Category[];
}
interface FileWithPreview extends File {
  preview: string;
}

export default function FormProduct({
  brand,
  location,
  category,
}: FormProductProps) {
  const form = useForm<z.infer<typeof schemaProduct>>({
    resolver: zodResolver(schemaProduct),
    defaultValues: {
      brandId: 0,
      locationId: 0,
      categoryId: 0,
      name: "",
      description: "",
      price: 0,
      stock: StockProduct.ready,
      images: [] as FileWithPreview[],
    },
  });

  function onSubmit(data: z.infer<typeof schemaProduct>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/products">Product</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Main container with full width and adjusted padding */}
      <main className="grid w-full items-start gap-4 px-4 sm:px-6 sm:py-0 md:gap-8">
        {/* Removed mx-auto to allow full width */}
        <div className="grid auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href={`/dashboard/products`}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Product Controller
            </h1>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:col-span-3 lg:gap-8">
              {/* Card with full width, removed max-w-3xl */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Create new brand to help your customers find what they are
                    looking for.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                      >
                        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="name" {...field} />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="brandId"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Brand</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.name}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Brand" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {brand.map((brand) => (
                                      <SelectItem
                                        key={brand.id}
                                        value={brand.id.toString()}
                                      >
                                        {brand.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                          <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Category</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.name}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {category.map((category) => (
                                      <SelectItem
                                        key={category.id}
                                        value={category.id.toString()}
                                      >
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="locationId"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Location</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.name}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Location" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {location.map((location) => (
                                      <SelectItem
                                        key={location.id}
                                        value={location.id.toString()}
                                      >
                                        {location.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input placeholder="Price" {...field} />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Stock</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.name}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Stock status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value={StockProduct.preorder}>
                                      {StockProduct.preorder.toUpperCase()}
                                    </SelectItem>
                                    <SelectItem value={StockProduct.ready}>
                                      {StockProduct.ready.toUpperCase()}
                                    </SelectItem>
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Description"
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <FileUpload
                                    files={field.value as FileWithPreview[]}
                                    onFilesChange={field.onChange}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center justify-center gap-2 lg:justify-start">
                          <Button
                            type="submit"
                            className="w-full lg:w-fit"
                            size={"sm"}
                          >
                            Submit
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full lg:w-fit"
                            size="sm"
                            asChild
                          >
                            <Link href={`/dashboard/products`}>Discard</Link>
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
