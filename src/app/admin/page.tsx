/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { salesData } from "@/constants/dummydata";
import { auth } from "@/server/auth";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { ChartBar } from "./_components/chartBar";

export default async function Dashboard() {
  
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4">
        <header className="sticky top-0 z-50">
          <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex-col items-center space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
              {/* <DateRangePicker
              selectedRange={selectedRange}
              onChangeRange={setSelectedRange}
            /> 
            <Button className="w-full">Download</Button>*/}
            </div>
          </div>
        </header>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <Activity className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Order
                </CardTitle>
                <Activity className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          
          
          
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
            <div className="col-span-3 lg:col-span-3">
              <ChartBar/>
            </div>
            <Card className="col-span-3 lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {salesData.map((sale) => (
                    <div key={sale.name} className="flex items-center">
                      <Avatar className="size-9">
                        <AvatarFallback>{sale.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {sale.name}
                        </p>
                        <p className="text-xs text-muted-foreground md:text-sm">
                          {sale.email}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">{sale.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>


        </div>
      </div>
    </div>
  );
}

