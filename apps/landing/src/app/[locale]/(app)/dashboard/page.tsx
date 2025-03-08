"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NetworkPieChart } from "@/components/chart/network-pie-chart";
import { NetworkLineChart } from "@/components/chart/network-line-chart";
import { useAuthContext } from "@/context/auth-context";

export default function DashboardPage() {
  const locale = useLocale();
  const { user } = useAuthContext();

  return (
    <ContentLayout title="Dashboard">
      {user ? null : (
        <div className="text-sm text-center justify-center my-4">
          <Link
            href={`/${locale}/signin`}
            className="text-sm underline dark:text-sky-400 text-sky-500 font-semibold"
          >
            Sign in
          </Link>{" "}
          to save focus history and tasks.
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-6">
        {/* <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-31%20at%2010.32.09%E2%80%AFAM-7KNDKkDH3f3TXMJ6Bsk5yiATVzpcPg.png" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Morning, Josh</h2>
                <p className="text-muted-foreground">Here&apos;s what&apos;s happening today</p>
              </div>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New account
          </Button>
        </div> */}

        {/* Net Worth Card */}
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Net Worth</CardTitle>
              <Select defaultValue="1M">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1M">1M</SelectItem>
                  <SelectItem value="3M">3M</SelectItem>
                  <SelectItem value="6M">6M</SelectItem>
                  <SelectItem value="1Y">1Y</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$2,808,491.15</div>
              <div className="text-sm text-green-500">
                +$1,553.43 (+0.9%) vs last month
              </div>
              <NetworkLineChart />
            </CardContent>
          </Card>
          <NetworkPieChart />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Income Card */}
          <Card>
            <CardHeader>
              <CardTitle>Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,411.11</div>
              <div className="text-sm text-green-500">
                +$871.22 (+2.8%) vs last month
              </div>
            </CardContent>
          </Card>

          {/* Spending Card */}
          <Card>
            <CardHeader>
              <CardTitle>Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$6,112.24</div>
              <div className="text-sm text-red-500">
                +$1,704.56 (+1.9%) vs last month
              </div>
              <div className="mt-4 h-[100px] w-full" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Savings Rate Card */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2%</div>
              <div className="text-sm text-red-500">-0.3% vs last month</div>
              <div className="mt-4 h-[100px] w-full" />
            </CardContent>
          </Card>

          {/* Investing Card */}
          <Card>
            <CardHeader>
              <CardTitle>Investing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,120,448.79</div>
              <div className="text-sm text-green-500">
                +$3,286.91 (+1.8%) vs last month
              </div>
              <div className="mt-4 h-[100px] w-full" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Transactions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-center leading-8">
                      I
                    </div>
                    <div>
                      <div className="font-medium">Interest Payment</div>
                      <div className="text-sm text-muted-foreground">
                        Interest
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-500">+$1.42</div>
                    <div className="text-sm text-muted-foreground">
                      FEB 28, 2024
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-purple-100 text-center leading-8">
                      R
                    </div>
                    <div>
                      <div className="font-medium">Remote Salary</div>
                      <div className="text-sm text-muted-foreground">
                        Payroll
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-500">+$6,000</div>
                    <div className="text-sm text-muted-foreground">
                      FEB 28, 2024
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <div className="font-medium">Shopping</div>
                  </div>
                  <div className="text-right">
                    <div>22.37%</div>
                    <div className="text-sm text-red-500">-$1,161.44</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-pink-500" />
                    <div className="font-medium">Subscription</div>
                  </div>
                  <div className="text-right">
                    <div>9.28%</div>
                    <div className="text-sm text-red-500">-$87.97</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
