import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calculator, IndianRupee, Percent } from "lucide-react";
import { motion } from "framer-motion";

// MUI imports
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles"; // ← Added this import for styled

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("12");
  const [loanTerm, setLoanTerm] = useState("24");

  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateEMI = () => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const n = Number(loanTerm);

    if (!principal || principal <= 0 || !annualRate || !n || n <= 0) {
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
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

  // Define a larger, more prominent slider style
  const LargeSlider = styled(Slider)(({ theme }) => ({
    height: 5, // Thicker track
    padding: "13px 0", // More space for thumb
    "& .MuiSlider-thumb": {
      height: 18,
      width: 18,
      backgroundColor: "#fff",
      border: "4px solid #2563eb", // Blue border to match your theme
      boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "0 0 0 12px rgba(37, 99, 235, 0.16)", // Larger hover glow
      },
    },
    "& .MuiSlider-track": {
      height: 7,
      background: "linear-gradient(to right, #3b82f6, #1e40af)", // Your gradient
      border: "none",
    },
    "& .MuiSlider-rail": {
      height: 7,
      opacity: 0.5,
      backgroundColor: "#bfdbfe", // Light blue rail
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 14,
      padding: 6,
      backgroundColor: "#2563eb", // Blue label background
      borderRadius: 4,
      color: "#fff",
      top: -8, // Position label higher
    },
  }));

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
              <div className="flex-1 space-y-8">
                {" "}
                {/* Increased spacing for larger sliders */}
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

                  <Box sx={{ width: "100%", py: 3 }}>
                    <LargeSlider
                      min={1000}
                      max={500000}
                      step={10000}
                      value={Number(loanAmount) || 100000}
                      onChange={(event, newValue) => {
                        setLoanAmount(newValue.toString()); // 👈 smooth live update
                      }}
                      valueLabelDisplay="on"
                      valueLabelFormat={(v) => `₹${v.toLocaleString()}`}
                      disableSwap
                    />
                  </Box>

                  <span className="text-sm text-blue-700 block mt-1">
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

                  <Box sx={{ width: "100%", py: 3 }}>
                    <LargeSlider
                      min={1}
                      max={36}
                      step={0.1}
                      value={Number(interestRate) || 10}
                      onChange={(_, val) => setInterestRate(String(val))}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(v) => `${v}%`}
                    />
                  </Box>

                  <span className="text-sm text-blue-700 block mt-1">
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

                  <Box sx={{ width: "100%", py: 3 }}>
                    <LargeSlider
                      min={1}
                      max={360}
                      step={1}
                      value={Number(loanTerm) || 12}
                      onChange={(_, val) => setLoanTerm(String(val))}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(v) => `${v} mo`}
                    />
                  </Box>

                  <span className="text-sm text-blue-700 block mt-1">
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
