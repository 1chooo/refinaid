"use client";

import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";

interface CalculationResult {
  year: number;
  contributed: number;
  total: number;
}

interface InputError {
  field: string;
  message: string;
}

export default function CompoundInterestCalculatorPage() {
  const [initial, setInitial] = useState("");
  const [monthly, setMonthly] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [errors, setErrors] = useState<InputError[]>([]);

  useEffect(() => {
    calculateCompoundInterest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial, monthly, years, rate]); //This line was already correct.  No changes needed.

  const validateInputs = (): boolean => {
    const newErrors: InputError[] = [];

    if (initial === "" || isNaN(Number(initial)) || Number(initial) < 0) {
      newErrors.push({
        field: "initial",
        message: "Initial investment must be a non-negative number",
      });
    }
    if (monthly === "" || isNaN(Number(monthly)) || Number(monthly) < 0) {
      newErrors.push({
        field: "monthly",
        message: "Monthly contribution must be a non-negative number",
      });
    }
    if (
      years === "" ||
      isNaN(Number(years)) ||
      !Number.isInteger(Number(years)) ||
      Number(years) <= 0
    ) {
      newErrors.push({
        field: "years",
        message: "Years must be a positive integer",
      });
    }
    if (rate === "" || isNaN(Number(rate)) || Number(rate) < 0) {
      newErrors.push({
        field: "rate",
        message: "Interest rate must be a non-negative number",
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const calculateCompoundInterest = () => {
    if (!validateInputs()) {
      setResults([]);
      setTotalValue(null);
      return;
    }

    const initialAmount = Number.parseFloat(initial) || 0;
    const monthlyContribution = Number.parseFloat(monthly) || 0;
    const numberOfYears = Number.parseInt(years) || 0;
    const interestRate = Number.parseFloat(rate) || 0;

    const calculations: CalculationResult[] = [];
    let totalContributed = initialAmount;

    for (let year = 0; year <= numberOfYears; year++) {
      if (year === 0) {
        calculations.push({
          year,
          contributed: initialAmount,
          total: initialAmount,
        });
        continue;
      }

      const previousTotal = calculations[year - 1].total;
      const yearlyContribution = monthlyContribution * 12;
      totalContributed += yearlyContribution;

      const totalWithInterest =
        (previousTotal + yearlyContribution) * (1 + interestRate / 100);

      calculations.push({
        year,
        contributed: totalContributed,
        total: totalWithInterest,
      });
    }

    setResults(calculations);
    setTotalValue(calculations[calculations.length - 1].total);
  };

  return (
    <main className="relative mx-auto mb-16 max-w-4xl px-8 py-24">
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Compound Interest Calculator</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="initial">Initial investment</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="initial"
                  placeholder="0.00"
                  className="pl-8"
                  value={initial}
                  onChange={(e) => setInitial(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthly">Monthly contribution</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="monthly"
                  placeholder="0.00"
                  className="pl-8"
                  value={monthly}
                  onChange={(e) => setMonthly(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="years">Years to grow</Label>
              <Input
                id="years"
                placeholder="0"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rate">Annual interest rate (%)</Label>
              <Input
                id="rate"
                placeholder="0.0"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertDescription>
                  <ul className="list-disc pl-4">
                    {errors.map((error, index) => (
                      <li key={index}>{error.message}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardHeader>
            <CardTitle>
              {totalValue ? (
                <>
                  The total value after {years} years
                  <div className="mt-1 text-3xl">
                    $
                    {totalValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </>
              ) : (
                "Enter your details to see how your investments can grow with compound interest!"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <ChartContainer
                config={{
                  contributed: {
                    label: "Contributed",
                    color: "hsl(var(--chart-1))",
                  },
                  total: {
                    label: "Total with Interest",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <AreaChart
                  data={results}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    tickFormatter={(value) => `Year ${value}`}
                  />
                  <YAxis
                    tickFormatter={(value) =>
                      `$${value.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}`
                    }
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stackId="2"
                    stroke="var(--color-total)"
                    fill="var(--color-total)"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="contributed"
                    stackId="1"
                    stroke="var(--color-contributed)"
                    fill="var(--color-contributed)"
                    fillOpacity={0.2}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                Chart will appear here
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
