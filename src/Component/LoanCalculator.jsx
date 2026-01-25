import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calculator, IndianRupee, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { Range } from "react-range";

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(24);

  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateEMI = () => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const n = Number(loanTerm);

    if (!principal || !annualRate || !n) {
      setEmi(null);
      return;
    }

    const rate = annualRate / 12 / 100;

    const emiCalc =
      (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);

    const totalPay = emiCalc * n;
    const totalInt = totalPay - principal;

    setEmi(emiCalc.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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
          style={{
            touchAction: "none",
          }}
        >
          {/* Filled Track */}
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
          className="h-5 w-5 bg-white border-4 border-blue-600 rounded-full shadow-md cursor-pointer absolute -top-1.2"
          style={{
            touchAction: "none",
          }}
        />
      )}
    />
  );

  return (
    <div className="min-h-screen bg-inherit flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl mx-auto"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="shadow-xl rounded-xl bg-white border border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-xl p-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <Calculator size={24} /> InterestPe Loan Calculator
            </CardTitle>
            <p className="text-sm text-blue-100 mt-1">
              Befikar lending for your financial needs
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Inputs */}
              <div className="flex-1 space-y-10">
                {/* Loan Amount */}
                <div>
                  <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                    <IndianRupee size={16} /> Loan Amount (₹)
                  </Label>

                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="mt-2 border-blue-300 rounded-lg"
                  />

                  {renderSlider(loanAmount, setLoanAmount, 1000, 500000, 10000)}

                  <span className="text-sm text-blue-700">
                    ₹{loanAmount.toLocaleString()}
                  </span>
                </div>

                {/* Interest Rate */}
                <div>
                  <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                    <Percent size={16} /> Interest Rate (% p.a.)
                  </Label>

                  <Input
                    type="number"
                    value={interestRate}
                    step="0.1"
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="mt-2 border-blue-300 rounded-lg"
                  />

                  {renderSlider(interestRate, setInterestRate, 1, 36, 0.1)}

                  <span className="text-sm text-blue-700">{interestRate}%</span>
                </div>

                {/* Loan Term */}
                <div>
                  <Label className="text-blue-900 font-semibold">
                    Loan Term (Months)
                  </Label>

                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="mt-2 border-blue-300 rounded-lg"
                  />

                  {renderSlider(loanTerm, setLoanTerm, 1, 360, 1)}

                  <span className="text-sm text-blue-700">
                    {loanTerm} Months
                  </span>
                </div>
              </div>

              {/* Results */}
              <div className="flex-1 bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Loan Summary
                </h3>

                {emi ? (
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-900">
                        Monthly EMI:
                      </span>
                      <span className="text-blue-700 font-medium">
                        ₹{Number(emi).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-900">
                        Total Interest:
                      </span>
                      <span className="text-blue-700 font-medium">
                        ₹{Number(totalInterest).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-900">
                        Total Payment:
                      </span>
                      <span className="text-blue-700 font-medium">
                        ₹{Number(totalPayment).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-blue-700 text-sm">
                    Enter valid values to see results
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoanCalculator;
