"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserRole } from "@/server/auth/roles";
import { Status } from "@/constants/constants";
import LoadingButton from "../loadingButton";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
interface Props {
  user: any;
}

export default function UpdateUserForm({ user }: Props) {
  const formSchema = z.object({
    name: z.string(),
    email: z.string(),
    role: z.nativeEnum(UserRole),
    status: z.nativeEnum(Status),
    country: z.string().min(2),
    state: z.string().min(2),
    city: z.string().min(2),
    pincode: z.string().min(2),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      country: user.country || "",
      state: user.state || "",
      city: user.city || "",
      pincode: user.pincode || "",
    },
    resolver: zodResolver(formSchema),
  });

  const [formStatus, setFormStatus] = useState({ pending: false });
  const utils = api.useUtils();

  const updateUser = api.user.update.useMutation({
    onSuccess: async () => {
      console.log("Successs");
      setFormStatus({ pending: false });

      toast({
        title: "Success ",
        description: `Updated succesfully..`,
        duration: 2000,
      });

      await utils.user.invalidate();
    },
    onError: async (error: any) => {
      toast({
        variant: "destructive",
        title: "Fail ",
        description: `${error.name}: ${error.message}`,
        duration: 2000,
      });
    },
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      setFormStatus({ pending: true });
      //-parse zod schema
      const monkeyParse = formSchema.safeParse(formData);
      const data = monkeyParse.data!;

      if (!monkeyParse.success) {
        toast({
          variant: "destructive",
          title: "Fail ",
          description: `Parse fail..`,
          duration: 3000,
        });
        return;
      }

      console.log("------data-------", data);

      updateUser.mutate({
        userId: user.id,
        name: data.name!,
        email: data.email!,
        role: data.role!,
        status: data.status!,
        country: data.country!,
        state: data.state!,
        city: data.city!,
        pincode: data.pincode!,
      });

      //-On success
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 gap-4">
      <Form {...form}>
      
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display email.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(UserRole).map(([key, value]) => (
                            <SelectItem
                              key={key}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Set role of user.</FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(Status).map(([key, value]) => (
                            <SelectItem
                              key={key}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Set status of user.</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="part-2 ml-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display coutntry.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display state.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display coutntry.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Zipcode</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display state.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start gap-4 pt-10">
            <LoadingButton loading={formStatus.pending}>Submit</LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
