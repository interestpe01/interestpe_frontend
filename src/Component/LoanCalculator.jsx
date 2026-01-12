import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Calculator, IndianRupee, Percent } from "lucide-react";
import { motion } from "framer-motion";

export const LoanCalculator = () => {
  // keep state as string for inputs
  const [loanAmount, setLoanAmount] = useState("0");
  const [interestRate, setInterestRate] = useState("0");
  const [loanTerm, setLoanTerm] = useState("0");

  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [effectiveInterestRate, setEffectiveInterestRate] = useState(null);

  const calculateEMI = () => {
    const principal = Number(loanAmount); // Loan amount
    const annualRate = Number(interestRate); // Annual interest rate in %
    const n = Number(loanTerm); // Time in months

    if (!principal || !annualRate || !n) {
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
      setEffectiveInterestRate(null);
      return;
    }

    const rate = annualRate / 12 / 100; // Monthly interest rate

    // EMI formula (reducing balance method)
    const emiCalc =
      (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);

    const totalPay = emiCalc * n; // Total payment over the loan term
    const totalInt = totalPay - principal; // Total interest paid
    const effectiveIntRate = (totalInt / principal / (n / 12)) * 100; // Effective annual rate

    setEmi(emiCalc.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setEffectiveInterestRate(effectiveIntRate.toFixed(2));
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.6, ease: "easeOut" },
    },
  };

  const resultItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.1 + 0.8, ease: "easeOut" },
    }),
  };

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
              <Calculator size={24} /> interestpe Loan Calculator
            </CardTitle>
            <p className="text-sm text-blue-100 mt-1">
              Befikar lending for your financial needs
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Input Section */}
              <div className="flex-1 space-y-6">
                {/* Loan Amount */}
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                    <IndianRupee size={16} /> Loan Amount (₹)
                  </Label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900 transition-all duration-200"
                  />
                  <Slider
                    min={1000}
                    max={500000}
                    step={10000}
                    value={[Number(loanAmount) || 0]}
                    onValueChange={(value) => setLoanAmount(String(value[0]))}
                    className="mt-3 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full [&>span]:bg-white [&>span]:border-2 [&>span]:border-blue-600"
                  />
                  <span className="text-sm text-blue-700">
                    ₹{Number(loanAmount || 0).toLocaleString()}
                  </span>
                </motion.div>

                {/* Interest Rate */}
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <Label className="flex items-center gap-2 text-blue-900 font-semibold">
                    <Percent size={16} /> Interest Rate (% p.a.)
                  </Label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900 transition-all duration-200"
                    step="0.1"
                  />
                  <Slider
                    min={1}
                    max={36}
                    step={0.1}
                    value={[Number(interestRate) || 0]}
                    onValueChange={(value) => setInterestRate(String(value[0]))}
                    className="mt-3 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full [&>span]:bg-white [&>span]:border-2 [&>span]:border-blue-600"
                  />
                  <span className="text-sm text-blue-700">
                    {interestRate || "0"}%
                  </span>
                </motion.div>
                {/* Loan Term */}

                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <Label className="text-blue-900 font-semibold">
                    Loan Term (Months)
                  </Label>
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900 transition-all duration-200"
                  />
                  <Slider
                    min={1}
                    max={360} // 30 years in months
                    step={1}
                    value={[Number(loanTerm) || 0]}
                    onValueChange={(value) => setLoanTerm(String(value[0]))}
                    className="mt-3 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full [&>span]:bg-white [&>span]:border-2 [&>span]:border-blue-600"
                  />
                  <span className="text-sm text-blue-700">
                    {loanTerm || "0"} Months
                  </span>
                </motion.div>
              </div>

              {/* Results Section */}
              <motion.div
                className="flex-1 bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md"
                variants={resultVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Loan Summary
                </h3>
                {emi ? (
                  <div className="space-y-4 text-sm">
                    <motion.div
                      className="flex justify-between"
                      variants={resultItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      <span className="font-semibold text-blue-900">
                        Monthly EMI:
                      </span>
                      <span className="text-blue-700 font-medium">
                        ₹{Number(emi).toLocaleString()}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between"
                      variants={resultItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      <span className="font-semibold text-blue-900">
                        Total Interest:
                      </span>
                      <span className="text-blue-700 font-medium">
                        ₹{Number(totalInterest).toLocaleString()}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between"
                      variants={resultItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    >
                      <span className="font-semibold text-blue-900">
                        Total Payment:
                      </span>
                      <span className="text-blue-700 font-medium">
                        ₹{Number(totalPayment).toLocaleString()}
                      </span>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    className="text-center text-blue-700 text-sm"
                    variants={resultItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    Enter valid values to see results
                  </motion.div>
                )}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoanCalculator;
