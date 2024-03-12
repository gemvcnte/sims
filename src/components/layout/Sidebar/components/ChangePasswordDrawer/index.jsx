import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import showErrorNotification from "@/utils/ShowErrorNotification";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import updatePasswordApi from "./update-password-api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/PasswordInput";

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Repeat password is required"),
});

export default function ChangePasswordDrawer({ userType }) {
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const handleChangePassword = async (data) => {
    try {
      if (data.newPassword !== data.repeatPassword) {
        showErrorNotification("New password and repeat password do not match.");
        return;
      }

      const response = await updatePasswordApi(
        data.currentPassword,
        data.newPassword,
        userType,
      );

      showSuccessNotification(response.data.message);
    } catch (error) {
      showErrorNotification(error.response?.data.message);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="ghost" className="w-full justify-start">
          <Icon icon="mdi:password-outline" className="mr-2" />
          Password
        </Button>
      </DrawerTrigger>
      <DrawerContent className="overflow-scroll">
        <section className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Update Password</DrawerTitle>
            <DrawerDescription>
              We recommend updating your password regularly
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleChangePassword)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="space-y-0 px-4">
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter announcement currentPassword..."
                        {...field}
                        className=" border-white-700 placeholder-white-700 w-full rounded-md border p-3 focus:border focus:border-primary focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="space-y-0 px-4">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter announcement newPassword..."
                        {...field}
                        className=" border-white-700 placeholder-white-700 w-full rounded-md border p-3 focus:border focus:border-primary focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem className="space-y-0 px-4">
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter announcement repeatPassword..."
                        {...field}
                        className=" border-white-700 placeholder-white-700 w-full rounded-md border p-3 focus:border focus:border-primary focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button type="submit">Change Password</Button>
                <DrawerClose className="w-full">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
