import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { salesData } from "@/constants/dummydata";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DollarSign, User2 } from "lucide-react";
import { api, HydrateClient } from "@/trpc/server";
import { formatDate } from "@/lib/common";
import FeedbackForm from "../_components/FeedbackForm";

export default async function UsersPage() {
  const users = await api.user.getAll();

  return (
    <HydrateClient>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 xl:col-span-9">
                <div className="xs:hidden mb-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active
                      </CardTitle>
                      <User2 className="text-muted-foreground size-4" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-1xl font-bold">45,645</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Inactive
                      </CardTitle>
                      <User2 className="text-muted-foreground size-4" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-1xl font-bold">523</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Suspended
                      </CardTitle>
                      <User2 className="text-muted-foreground size-4" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-1xl font-bold">231</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Today
                      </CardTitle>
                      <User2 className="text-muted-foreground size-4" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-1xl font-bold">145</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="w-full">
                  <CardHeader>
                    <header className="sticky top-0 z-50">
                      <div className="flex-col items-center justify-between space-x-0 space-y-2 md:flex md:flex-row">
                        <div className="flex flex-col gap-1">
                          <CardTitle>User list</CardTitle>
                          <CardDescription>
                            List of all users registered..
                          </CardDescription>
                        </div>
                        <div className="flex-col items-center space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
                          <Button variant={"secondary"} className="w-full">
                            Download
                          </Button>
                        </div>
                      </div>
                    </header>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Table>
                        <TableCaption>A list of latest users.</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[400px]">Invoice</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users ? (
                            users.map((user) => {
                              return (
                                <TableRow key={user.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex gap-4">
                                      <Avatar>
                                        <AvatarImage src="/favicon.ico" />
                                        <AvatarFallback>...</AvatarFallback>
                                      </Avatar>

                                      <div>
                                        <div>{user.name}</div>
                                        <div className="text-muted-foreground text-xs font-light">
                                          {user.id}
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    {user.city}, {user.state},{user.country}
                                  </TableCell>
                                  <TableCell>{user.status}</TableCell>
                                  <TableCell>
                                    {formatDate(user.createdAt)}
                                  </TableCell>
                                 
                                 
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                          <DotsHorizontalIcon />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                          Action
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                          <Link href={`/admin/user/${user.id}`}>
                                            Update
                                          </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Team
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Subscription
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <p>You have no posts yet.</p>
                          )}
                        </TableBody>
                      </Table>
                      <PagePagination />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-3 hidden xl:block">
                <FeedbackForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}

const PagePagination = () => {
  return (
    <Pagination className="justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const rightPanel = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>sdas</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};