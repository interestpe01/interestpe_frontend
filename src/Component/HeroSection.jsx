import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle, Shield, Zap, Users, X } from "lucide-react";
import bg from "../assets/background.png";
import { motion, AnimatePresence } from "framer-motion";
import LoanCalculator from "./LoanCalculator";

export const HeroSection = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const navigate = useNavigate();

  const handleapply = () => {
    navigate("/applicationform");
  };

  // Animation variants for main content
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for left content items
  const leftContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  // Animation variants for right content cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  // Animation variants for feature items
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: index * 0.1, ease: "easeOut" },
    }),
  };

  // Animation variants for LoanCalculator
  const calculatorVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <motion.section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decoration overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15), transparent 50%)",
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="px-4 md:px-12 lg:px-16 grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              className="space-y-4"
              variants={leftContentVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
                <span className="text-blue-500">Befikar</span> Lending
                <br />
                <span>Made Simple</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-700 max-w-lg">
                Secure instant personal loans with minimal documentation.
                Transparent process, no hidden charges, and quick approval.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={leftContentVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <Button
                onClick={() => handleapply()}
                size="lg"
                className="h-12 px-8 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:cursor-pointer"
              >
                Apply Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowCalculator(true)}
                className="h-12 px-8 border-blue-400 text-blue-900 hover:bg-blue-200 hover:text-blue-900 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md"
              >
                Calculate EMI
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-2 gap-4 pt-8"
              variants={leftContentVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              {[
                { Icon: CheckCircle, text: "Instant Approval" },
                { Icon: Shield, text: "100% Secure" },
                { Icon: Zap, text: "Quick Disbursal" },
                { Icon: Users, text: "10L+ Happy Users" },
              ].map(({ Icon, text }, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3"
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                >
                  <Icon className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-900">
                    {text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Stats Cards or Loan Calculator */}
          <div className="space-y-6">
            <AnimatePresence>
              {!showCalculator ? (
                <motion.div
                  key="stats"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      <Card className="p-6 border border-blue-200 bg-white shadow-md rounded-lg">
                        <CardContent className="p-0 text-center">
                          <div className="text-2xl font-bold text-blue-900">
                            2 Minutes
                          </div>
                          <div className="text-sm text-blue-700">
                            Application Time
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      <Card
                        className="p-6 border border-blue-200 bg-blue-50"
                        style={{
                          background:
                            "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))",
                        }}
                      >
                        <CardContent className="p-0 text-center">
                          <div className="text-2xl font-bold text-blue-500">
                            ₹10 Lakhs
                          </div>
                          <div className="text-sm text-blue-700">
                            Max Loan Amount
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <Card
                      className="p-8 bg-white border border-blue-200 shadow-lg rounded-lg"
                      style={{
                        background:
                          "linear-gradient(to bottom right, rgba(255, 255, 255, 1), rgba(59, 130, 246, 0.1))",
                      }}
                    >
                      <CardContent className="p-0 space-y-4">
                        <h3 className="text-lg font-semibold text-blue-900">
                          Why Choose Us?
                        </h3>
                        <ul className="space-y-3 text-sm text-blue-700">
                          {[
                            "No collateral required",
                            "Flexible repayment options",
                            "Competitive interest rates",
                            "24/7 customer support",
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="calculator"
                  className="relative"
                  variants={calculatorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Card className="p-1 bg-inherit border border-blue-200 shadow-lg rounded-lg">
                    <Button
                      variant="ghost"
                      className="absolute top-4 right-4 text-blue-900 hover:text-blue-600"
                      onClick={() => setShowCalculator(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    <LoanCalculator />
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
