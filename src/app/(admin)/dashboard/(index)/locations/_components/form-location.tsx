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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/types";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { postLocation, updateLocation } from "../lib/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Location } from "@prisma/client";

const initialState: ActionResult = {
  error: "",
};

interface FormLocationProps {
  type: "ADD" | "EDIT";
  data?: Location;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" disabled={pending}>
      {pending ? "Saving..." : "Save Location"}
    </Button>
  );
}

export default function FormLocation({
  type = "ADD",
  data = undefined,
}: FormLocationProps) {
  const updateLocationWithId = (_: unknown, formData: FormData) =>
    updateLocation(_, formData, data?.id);

  const [state, formAction] = useActionState(
    type == "ADD" ? postLocation : updateLocationWithId,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/locations">
                Location
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href={`/dashboard/locations`}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Location Controller
              </h1>

              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/locations`}>Discard</Link>
                </Button>
                <SubmitButton />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card
                  x-chunk="dashboard-07-chunk-0"
                  className="w-full max-w-3xl"
                >
                  <CardHeader>
                    <CardTitle>Location Details</CardTitle>
                    <CardDescription>
                      Create new categories to help your customers find what
                      they are looking for.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          className="w-full"
                          defaultValue={type == "EDIT" ? data?.name : undefined}
                        />
                        {state?.error !== "" && (
                          <p className="text-sm font-medium text-red-500">
                            {state?.error}
                          </p>
                        )}
                      </div>
                      {/* <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                        className="min-h-32"
                      />
                    </div> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Location</Button>
            </div>
          </div>
        </main>
      </div>
    </form>
  );
}
