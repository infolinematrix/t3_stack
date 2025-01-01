import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="">
      {/* <SkeletonCard /> */}
      <SkeletonList />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-2/3 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] animate-pulse bg-gray-200" />
        <Skeleton className="h-4 w-[200px] animate-pulse bg-gray-200" />
      </div>
    </div>
  );
}
