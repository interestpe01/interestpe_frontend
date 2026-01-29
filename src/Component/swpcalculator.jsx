import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Range } from "react-range";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { IndianRupee, Percent, Calendar, Calculator } from "lucide-react";

export const SwpCalculator = () => {
  const [investment, setInvestment] = useState(100000); // 4 Cr
  const [withdrawal, setWithdrawal] = useState(1000); // 2 Lakh
  const [rate, setRate] = useState(1); // %
  const [years, setYears] = useState(1);

  const [finalValue, setFinalValue] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  // ================= SWP CALCULATION =================
  const calculateSWP = () => {
    let corpus = investment;

    // Effective monthly rate
    const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
    const totalMonths = years * 12;

    let withdrawn = 0;

    for (let i = 0; i < totalMonths; i++) {
      corpus *= 1 + monthlyRate; // grow
      corpus -= withdrawal; // withdraw
      withdrawn += withdrawal;

      if (corpus <= 0) {
        corpus = 0;
        break;
      }
    }

    setFinalValue(Math.round(corpus));
    setTotalWithdrawn(withdrawn);
  };

  useEffect(() => {
    calculateSWP();
  }, [investment, withdrawal, rate, years]);

  // ================= SLIDER (PROVEN WORKING) =================
  const Slider = (value, setValue, min, max, step, formatValue) => (
    <Range
      step={step}
      min={min}
      max={max}
      values={[value]}
      onChange={(values) => setValue(values[0])}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className="relative w-full h-2 rounded-full bg-gray-200"
          style={{ touchAction: "none" }}
        >
          {/* Filled track */}
          <div
            className="absolute h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="h-5 w-5 bg-white border-4 border-blue-600 rounded-full shadow-md cursor-pointer"
          style={{ touchAction: "none" }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs font-medium px-2 py-1 rounded shadow-md whitespace-nowrap pointer-events-none">
            {formatValue ? formatValue(value) : value}
          </div>
        </div>
      )}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Card className="rounded-2xl shadow-2xl border border-blue-200 bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6">
            <CardTitle className="flex items-center gap-3">
              <Calculator />
              <div>
                <h1 className="text-2xl font-bold">SWP Calculator</h1>
                <p className="text-sm text-blue-100">Powered by interestpe</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* InputS */}
            <div className="space-y-8">
              {/* Investment */}
              <div>
                <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <IndianRupee className="w-4 h-4 text-blue-600" />
                  Initial Investment
                </Label>
                  <Input
                  type="number"
                  value={investment}
                    onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") {
                      setInvestment("");
                    } else if (val > 100000000) {
                      setInvestment(100000000);
                    }
                     else if (val >=0) {
                      setInvestment(val);
                    }
                  }}
                  onBlur={() => !investment && setInvestment(0)}
                  className="mt-2 border-blue-300 rounded-lg focus-visible:ring-blue-500"
                  placeholder="0"
                />
              </div>

              {/* Withdrawal */}
              <div>
                <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <IndianRupee className="w-4 h-4 text-blue-600" />
                  Monthly Withdrawal
                </Label>
                 <Input
                  type="number"
                  value={withdrawal}
                    onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") {
                      setWithdrawal("");
                    } else if (val > 1500000) {
                      setWithdrawal(1500000);
                    }
                     else if (val >=0) {
                      setWithdrawal(val);
                    }
                  }}
                  onBlur={() => !withdrawal && setWithdrawal(0)}
                  className="mt-2 border-blue-300 rounded-lg focus-visible:ring-blue-500"
                  placeholder="0"
                />
              </div>

              {/* Rate */}
              <div>
                <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <span className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-blue-600" />
                    Expected CAGR (p.a.)
                  </span>
                  <span className="text-blue-700 font-semibold">{rate}%</span>
                </Label>
                <Input
                  type="number"
                  step="0.1"
                   value={rate}
                    onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") {
                      setRate("");
                    } else if (val > 36) {
                      setRate(36);
                    }
                     else if (val >=0) {
                      setRate(val);
                    }
                  }}
                  onBlur={() => !rate && setRate(0)}
                  className="mt-2 mb-7 border-blue-300 rounded-lg"
                />

                

                {Slider(rate, setRate, 1, 36, 1, (v) => `${v}%`)}
              </div>

              {/* Years */}
              <div>
                <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    SWP Time Period
                  </span>
                  <span className="text-blue-700 font-semibold">
                    {years} yrs
                  </span>
                </Label>
                <Input
                  type="number"
                   value={years}
                    onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") {
                      setYears("");
                    } else if (val > 40) {
                      setYears(40);
                    }
                     else if (val >=0) {
                      setYears(val);
                    }
                  }}
                  onBlur={() => !years && setYears(0)}
                  className="mt-2 mb-7 border-blue-300 rounded-lg"
                />

                {Slider(years, setYears, 1, 40, 1, (v) => `${v} yrs`)}
              </div>
            </div>

            {/* RESULT */}
            <div className="flex-1 bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md">
              <p className="text-lg font-semibold text-blue-900 mb-4">
                Remaining Corpus after {years} years
              </p>

              <p className="text-3xl font-bold text-blue-700 mb-6">
                ₹ {finalValue.toLocaleString("en-IN")}
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <p className="font-semibold text-blue-900">Initial</p>
                  <p className="text-blue-700 font-medium">
                    ₹ {investment.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-blue-900">Withdrawn</p>
                  <p className="text-blue-700 font-medium">
                    ₹ {totalWithdrawn.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {finalValue === 0 && withdrawal > 0 && (
                <p className="mt-4 text-center text-red-600 font-medium">
                  Corpus depleted before {years} years
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
