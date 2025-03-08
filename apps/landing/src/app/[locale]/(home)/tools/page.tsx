import Link from "next/link";
import { useLocale } from "next-intl";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gradient } from "@/components/gradient";
import { Particles } from "@/components/magicui/particles";

import { BarChart3 } from "lucide-react";

const tools = [
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    title: "Compound Interest Calculator",
    description:
      "See how your investments grow over time by earning interest on interest and letting your money work for you.",
    category: "SAVINGS",
    categoryColor: "text-blue-500",
    path: "compound-interest-calculator",
  },
];

export default function FinancialToolsPage() {
  const locale = useLocale();

  return (
    <>
      <Gradient />
      <Particles
        className="absolute top-0 left-0 w-full h-full"
        quantity={50}
      />
      <main className="relative mx-auto mb-16 max-w-4xl px-8 py-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 space-y-8">
            <h1 className="text-3xl font-extrabold">
              Try our{" "}
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Free
              </span>{" "}
              Financial Tools and Calculators
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All the interactive tools and calculators you need to visualize
              and navigate your financial journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <Link href={`/${locale}/tools/${tool.path}`} key={index}>
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-shadow h-[250px] relative bg-slate-50 dark:bg-slate-900"
                >
                  <CardHeader>
                    <div className="mb-4">{tool.icon}</div>
                    <h2 className="text-lg font-semibold">{tool.title}</h2>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <p className="text-muted-foreground text-sm">
                      {tool.description}
                    </p>
                    <div className="absolute bottom-4 left-4">
                      <Badge
                        variant="secondary"
                        className={`font-medium ${tool.categoryColor}`}
                      >
                        {tool.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
