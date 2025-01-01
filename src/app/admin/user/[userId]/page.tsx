import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
// import { api } from "@/trpc/react";
import { api, HydrateClient } from "@/trpc/server";
import { User2 } from "lucide-react";
import UpdateUserForm from "../../_components/form/UpdateUser";
import FeedbackForm from "../../_components/FeedbackForm";

interface Props {
  params: { userId: string };
}
export default async function UserPage({ params }: Props) {
  const { userId } = await params;
  const user = await api.user.getUser({ userId: userId });

  if (!user) return <>No Data Found </>;

  return (
    <HydrateClient>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 xl:col-span-9">
                <Card className="w-full">
                  <CardHeader>
                    <header className="sticky top-0 z-50">
                      <div className="flex-col items-center justify-between space-x-0 space-y-2 md:flex md:flex-row">
                        <div className="flex flex-col gap-1">
                          <CardTitle>User </CardTitle>
                          <CardDescription>
                            # List of all users registered..
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
                    <UpdateUserForm user={user} />
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-3 hidden xl:block">{rightPanel()}</div>
            </div>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}

const rightPanel = () => {
  return (
    <FeedbackForm/>
  );
};
