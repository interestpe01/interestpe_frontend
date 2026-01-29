import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calculator, IndianRupee, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { Range } from "react-range";

export const CiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100); // monthly SIP
  const [interestRate, setInterestRate] = useState(1);
  const [loanTerm, setLoanTerm] = useState(1); // invest for (years)
  const [investStay, setInvestStay] = useState(1); // total horizon

  const [futureValue, setFutureValue] = useState(null);
  const [totalGains, setTotalGains] = useState(null);
  const [totalInvested, setTotalInvested] = useState(null);

  const calculateCI = () => {
    const P = Number(loanAmount); // Monthly SIP
    const annualRate = Number(interestRate);
    const investYears = Number(loanTerm);
    const totalYears = Number(investStay);

    if (
      !P ||
      !annualRate ||
      !investYears ||
      !totalYears ||
      investYears > totalYears
    ) {
      setFutureValue(null);
      setTotalGains(null);
      setTotalInvested(null);
      return;
    }

    const i = annualRate / 12 / 100; // Monthly interest rate
    const n = investYears * 12; // Total months of investment

    // 1. Calculate value at the end of the SIP period
    // Formula for Future Value of SIP (Annuity Due):
    // FV = P × [{(1 + i)^n - 1} / i] × (1 + i)
    let corpus = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));

    // 2. Calculate growth for the "Stay Invested" period (Wait Period)
    // If totalYears > investYears, the money sits and grows without new additions
    const waitYears = totalYears - investYears;
    if (waitYears > 0) {
      const waitMonths = waitYears * 12;
      corpus = corpus * Math.pow(1 + i, waitMonths);
    }

    const invested = P * n;
    const gains = corpus - invested;

    setFutureValue(corpus);
    setTotalInvested(invested);
    setTotalGains(gains);
  };

  useEffect(() => {
    calculateCI();
  }, [loanAmount, interestRate, loanTerm, investStay]);

  const renderSlider = (value, setValue, min, max, step) => {
    // Ensure value is within bounds for the slider to prevent crashes
    const safeValue = Math.min(Math.max(value, min), max);

    return (
      <Range
        step={step}
        min={min}
        max={max}
        values={[safeValue]}
        onChange={(values) => setValue(values[0])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 bg-blue-200 rounded-full relative mt-4"
            style={{ touchAction: "none" }}
          >
            <div
              className="absolute h-2 bg-blue-600 rounded-full"
              style={{
                width: `${((safeValue - min) / (max - min)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-5 w-5 bg-white border-4 border-blue-600 rounded-full shadow-md cursor-pointer"
            style={{ touchAction: "none" }}
          />
        )}
      />
    );
  };

  const formatIndianAmount = (amount) => {
    const num = Number(amount);

    if (num >= 10000000) {
      const crValue = (num / 10000000).toFixed(2);
      return crValue + " Cr";
    } else if (num >= 100000) {
      const lakhValue = (num / 100000).toFixed(2);
      return lakhValue + " Lakh";
    } else if (num >= 1000) {
      return "₹" + num.toLocaleString("en-IN");
    } else {
      return "₹" + num.toLocaleString("en-IN");
    }
  };

  return (
    <div className="min-h-screen bg-inherit flex items-center justify-center p-2">
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-xl rounded-xl bg-white border border-blue-200">
           <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6">
            <CardTitle className="flex items-center gap-3">
              <Calculator size={24} />
              <div>
                Compound Interest Calculator
                <p className="text-sm text-blue-100">Powered by interestpe</p>
              </div>
            </CardTitle>
          </CardHeader>


          <CardContent className="p-6 flex flex-col md:flex-row gap-8">
            {/* InputS */}
            <div className="flex-1 space-y-3">
              <div>
                <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <IndianRupee size={16} /> Monthly Investment (₹)
                </Label>
                <Input
                  type="number"
                  value={loanAmount}
                    onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") {
                      setLoanAmount("");
                    } else if (val > 300000) {
                      setLoanAmount(300000);
                    }
                     else if (val >=0) {
                      setLoanAmount(val);
                    }
                  }}
                  onBlur={() => !loanAmount && setLoanAmount(0)}
                  className="mt-2 border-blue-300 rounded-lg focus-visible:ring-blue-500"
                  placeholder="0"
                />
                {/* {renderSlider(Number(loanAmount) || 0, setLoanAmount, 1000, 50000, 500)} */}
              </div>

              <div>
                <Label className="text-blue-900 font-semibold">
                  Years you invest for
                </Label>
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") {
                      setLoanTerm("");
                    } else if (val > 40) {
                      setLoanTerm(40);
                      if (investStay < 40) setInvestStay(40);
                    } else if (val >= 0) {
                      setLoanTerm(val);
                      if (investStay < val) setInvestStay(val);
                    }
                  }}
                  onBlur={() => !loanTerm && setLoanTerm(0)}
                  className="mt-2 border-blue-300 rounded-lg focus-visible:ring-blue-500"
                  placeholder="0"
                />
                {renderSlider(Number(loanTerm) || 0, (val) => {
                    setLoanTerm(val);
                    if (investStay < val) setInvestStay(val);
                }, 0, 40, 1)}
              </div>

              <div>
                <Label className="text-blue-900 font-semibold">
                  Stay invested for
                </Label>
                <Input
                  type="number"
                  value={investStay}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") setInvestStay("");
                    else if (val > 50) setInvestStay(50);
                    else if (val >= 0) setInvestStay(val);
                  }}
                  onBlur={() => {
                    if (!investStay) setInvestStay(0);
                    else if (investStay < loanTerm) setInvestStay(loanTerm);
                  }}
                  className="mt-2 border-blue-300 rounded-lg focus-visible:ring-blue-500"
                  placeholder="0"
                />
                {renderSlider(Number(investStay) || 0, (val) => {
                     const safeVal = Math.max(val, Number(loanTerm) || 0);
                     setInvestStay(safeVal);
                }, 0, 50, 1)}
              </div>

              <div>
                <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <Percent size={16} /> Expected CAGR (%)
                </Label>
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") setInterestRate("");
                    else if (val > 36) setInterestRate(36);
                    else if (val >= 0) setInterestRate(val);
                  }}
                  onBlur={() => !interestRate && setInterestRate(0)}
                  className="mt-2 border-blue-300 rounded-lg focus-visible:ring-blue-500"
                  placeholder="0"
                />
                {renderSlider(Number(interestRate) || 0, setInterestRate, 0, 36, 1)}
              </div>
            </div>

            {/* RESULTS */}
            <div className="flex-1 bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md">
              {futureValue && (
                <div className="space-y-4 text-sm">

                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600">Invested Amount</span>
                    <span className="font-semibold text-gray-800">
                      {formatIndianAmount(totalInvested)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Gain</span>
                    <span className="font-semibold text-green-600">
                         {formatIndianAmount(futureValue)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
