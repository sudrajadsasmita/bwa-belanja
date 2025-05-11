// components/loading.tsx
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle color="blue" className="h-12 w-12 animate-spin" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
