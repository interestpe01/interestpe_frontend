import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calculator, IndianRupee, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { Range } from "react-range";

export const CiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(15000); // monthly SIP
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(20); // invest for (years)
  const [investStay, setInvestStay] = useState(25); // total horizon

  const [futureValue, setFutureValue] = useState(null);
  const [totalGains, setTotalGains] = useState(null);
  const [totalInvested, setTotalInvested] = useState(null);

  const calculateCI = () => {
    const monthlyInvestment = Number(loanAmount);
    const annualRate = Number(interestRate);
    const investYears = Number(loanTerm);
    const totalYears = Number(investStay);

    if (
      !monthlyInvestment ||
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

    const r = annualRate / 12 / 100;
    const totalMonths = totalYears * 12;
    const investMonths = investYears * 12;

    // ✅ HDFC SIP Formula
    const fv =
      (monthlyInvestment *
        (Math.pow(1 + r, totalMonths) -
          Math.pow(1 + r, totalMonths - investMonths))) /
      r;

    const invested = monthlyInvestment * investMonths;
    const gains = fv - invested;

    setFutureValue(fv.toFixed(2));
    setTotalGains(gains.toFixed(2));
    setTotalInvested(invested.toFixed(2));
  };

  useEffect(() => {
    calculateCI();
  }, [loanAmount, interestRate, loanTerm, investStay]);

  const renderSlider = (value, setValue, min, max, step) => (
    <Range
      step={step}
      min={min}
      max={max}
      values={[value]}
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
              width: `${((value - min) / (max - min)) * 100}%`,
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

  return (
    <div className="min-h-screen bg-inherit flex items-center justify-center p-2">
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-xl rounded-xl bg-white border border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-xl p-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <Calculator size={24} />
              Compound Interest Calculator
            </CardTitle>
            <p className="text-sm text-blue-100 mt-1">Powered by interestpe</p>
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
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mt-2 border-blue-300 rounded-lg"
                />
                {renderSlider(loanAmount, setLoanAmount, 1000, 50000, 500)}
              </div>

              <div>
                <Label className="text-blue-900 font-semibold">
                  Years you invest
                </Label>
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="mt-2 border-blue-300 rounded-lg"
                />
                {renderSlider(loanTerm, setLoanTerm, 1, 40, 1)}
              </div>

              <div>
                <Label className="text-blue-900 font-semibold">
                  Total investment period
                </Label>
                <Input
                  type="number"
                  value={investStay}
                  onChange={(e) => setInvestStay(Number(e.target.value))}
                  className="mt-2 border-blue-300 rounded-lg"
                />
                {renderSlider(investStay, setInvestStay, 1, 40, 1)}
              </div>

              <div>
                <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                  <Percent size={16} /> Expected CAGR (%)
                </Label>
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-2 border-blue-300 rounded-lg"
                />
                {renderSlider(interestRate, setInterestRate, 1, 20, 0.5)}
              </div>
            </div>

            {/* RESULTS */}
            <div className="flex-1 bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md">
              {futureValue && (
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>Invested Amount</span>
                    <span className="font-semibold">
                      ₹{Number(totalInvested).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Gains</span>
                    <span className="font-semibold">
                      ₹{Number(totalGains).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Final Value</span>
                    <span className="text-blue-700">
                      ₹{Number(futureValue).toLocaleString()}
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
