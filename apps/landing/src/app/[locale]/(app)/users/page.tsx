"use client";

import * as z from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useLocale } from "next-intl";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "請輸入有效的電子郵件地址。" }),
  userName: z.string().min(2, { message: "用戶名至少需要 2 個字符。" }),
  role: z.enum(["user", "admin", "moderator"]),
  avatar: z.string().url().optional(),
});

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = auth.currentUser;
  const locale = useLocale();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      userName: "",
      role: "user",
      avatar: "",
    },
  });

  useEffect(() => {
    async function fetchUserData() {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      const defaultUserName =
        user.displayName || (user.email ? user.email.slice(0, 2) : "JD");

      if (userDoc.exists()) {
        const userData = userDoc.data();
        form.reset({
          email: userData.email || user.email,
          userName: userData.userName || defaultUserName,
          role: userData.role || "user",
          avatar: userData.avatar || "",
        });
      } else {
        form.reset({
          email: user.email || "",
          userName: defaultUserName,
          role: "user",
          avatar: user.photoURL || "",
        });
      }
    }

    fetchUserData();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = auth.currentUser;
    setIsLoading(true);
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to update your account information.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        userName: values.userName,
        role: values.role,
        avatar: values.avatar || "",
        updatedAt: new Date(),
      });

      toast({
        title: "Successfully Updated",
        description: "Your account information has been updated.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to Update", error);
      toast({
        title: "Failed to Update",
        description:
          "An error occurred while updating your account information.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <ContentLayout title="Users">
      {user ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={field.value} alt="Avatar" />
                            <AvatarFallback className="uppercase">
                              {form.getValues("userName").charAt(0)}
                              {form.getValues("userName").charAt(1)}
                            </AvatarFallback>
                          </Avatar>
                          <Input
                            {...field}
                            type="url"
                            placeholder="輸入頭像 URL"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Input a valid image URL to update your avatar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>E-mail</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        This is your email address associated with your account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Name</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Your Name" />
                      </FormControl>
                      <FormDescription>
                        This is your public username that will be displayed in
                        the app.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Role</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="選擇您的角色" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="user">用戶</SelectItem>
                          <SelectItem value="moderator">版主</SelectItem>
                          <SelectItem value="admin">管理員</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>您在系統中的角色。</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating" : "Update Profile"}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="text-sm text-center justify-center my-4">
          <Link
            href={`/${locale}/signin`}
            className="text-sm underline dark:text-sky-400 text-sky-500 font-semibold"
          >
            Sign in
          </Link>{" "}
          to manage your account.
        </div>
      )}
    </ContentLayout>
  );
}
