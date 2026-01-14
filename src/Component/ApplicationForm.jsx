import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "../hooks/use-toast";
import {
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employment: "",
    monthlyIncome: "",
    loanAmount: "",
    purpose: "",
    panCard: "",
    address: "",
  });
  const navigate = useNavigate();

  // Your specific Google Apps Script URL
  // Inside your ApplicationForm component
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzPIdaiIZcF6hk8DZx-2nUIZ9vabH26yKoMkUVKQR11ZQyDoFrgPVKROzhgwWUV3VPAAQ/exec";

  const handleSubmit = async (e) => {
    // debugger; // 👈 execution will pause here

    e.preventDefault();
    setIsSubmitting(true);

    try {
      // debugger;

      console.log("Form Data:", formData);

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // debugger;

      setShowSuccess(true);

      toast({
        title: "Application Submitted!",
        description:
          "Your application has been recorded in our system. We'll get back to you within 24 hours.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        employment: "",
        monthlyIncome: "",
        loanAmount: "",
        purpose: "",
        panCard: "",
        address: "",
      });
    } catch (error) {
      // debugger; // 👈 pause on error

      console.error("Submission error:", error);

      toast({
        variant: "destructive",
        title: "Submission Failed",
        description:
          "Could not reach the server. Please check your connection.",
      });
    } finally {
      // debugger; // 👈 pause before finishing
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2 + 0.4, ease: "easeOut" },
    }),
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: index * 0.1 + 0.6, ease: "easeOut" },
    }),
  };

  const noteVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 1.0, ease: "easeOut" },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      y: -20,
      transition: { duration: 0.25 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="w-full max-w-3xl mx-auto"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="shadow-xl rounded-xl bg-white border border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-xl p-6 text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
              <FileText className="h-6 w-6" />
              Loan Application
            </CardTitle>
            <p className="text-sm text-blue-100 mt-1">
              Apply for your loan with ease and transparency
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <motion.section
                className="space-y-4"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-900">
                  <User className="h-5 w-5 text-blue-500" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    <Label
                      htmlFor="fullName"
                      className="text-blue-900 font-semibold"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900"
                      required
                    />
                  </motion.div>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <Label
                      htmlFor="phone"
                      className="text-blue-900 font-semibold"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900"
                      required
                    />
                  </motion.div>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <Label
                      htmlFor="email"
                      className="text-blue-900 font-semibold"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900"
                      required
                    />
                  </motion.div>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                  >
                    <Label
                      htmlFor="panCard"
                      className="text-blue-900 font-semibold"
                    >
                      PAN Card Number *
                    </Label>
                    <Input
                      id="panCard"
                      placeholder="ABCDE1234F"
                      value={formData.panCard}
                      onChange={(e) =>
                        handleInputChange(
                          "panCard",
                          e.target.value.toUpperCase()
                        )
                      }
                      className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900"
                      required
                    />
                  </motion.div>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                    className="md:col-span-2"
                  >
                    <Label
                      htmlFor="address"
                      className="text-blue-900 font-semibold"
                    >
                      Current Address *
                    </Label>
                    <Input
                      id="address"
                      placeholder="Enter your current address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900"
                      required
                    />
                  </motion.div>
                </div>
              </motion.section>

              {/* Employment & Income */}
              <motion.section
                className="space-y-4"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-900">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  Employment & Income
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={5}
                  >
                    <Label
                      htmlFor="employment"
                      className="text-blue-900 font-semibold"
                    >
                      Employment Type *
                    </Label>
                    <Select
                      value={formData.employment}
                      onValueChange={(value) =>
                        handleInputChange("employment", value)
                      }
                    >
                      <SelectTrigger className="mt-2 border-blue-300 rounded-lg text-blue-900">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self-employed">
                          Self Employed
                        </SelectItem>
                        <SelectItem value="business">Business Owner</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={6}
                  >
                    <Label
                      htmlFor="monthlyIncome"
                      className="text-blue-900 font-semibold"
                    >
                      Monthly Income *
                    </Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="Enter monthly income"
                      value={formData.monthlyIncome}
                      onChange={(e) =>
                        handleInputChange("monthlyIncome", e.target.value)
                      }
                      className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900"
                      required
                    />
                  </motion.div>
                </div>
              </motion.section>

              {/* Loan Details */}
              <motion.section
                className="space-y-4"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-900">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Loan Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={7}
                  >
                    <Label
                      htmlFor="loanAmount"
                      className="text-blue-900 font-semibold"
                    >
                      Loan Amount *
                    </Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="Enter loan amount"
                      value={formData.loanAmount}
                      onChange={(e) =>
                        handleInputChange("loanAmount", e.target.value)
                      }
                      className="mt-2 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900"
                      required
                    />
                  </motion.div>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    custom={8}
                  >
                    <Label
                      htmlFor="purpose"
                      className="text-blue-900 font-semibold"
                    >
                      Loan Purpose *
                    </Label>
                    <Select
                      value={formData.purpose}
                      onValueChange={(value) =>
                        handleInputChange("purpose", value)
                      }
                    >
                      <SelectTrigger className="mt-2 border-blue-300 rounded-lg text-blue-900">
                        <SelectValue placeholder="Select loan purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Use</SelectItem>
                        <SelectItem value="medical">
                          Medical Emergency
                        </SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="home-improvement">
                          Home Improvement
                        </SelectItem>
                        <SelectItem value="debt-consolidation">
                          Debt Consolidation
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>
              </motion.section>

              {/* Info Note */}
              <motion.div
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700"
                variants={noteVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="flex gap-2">
                  <span className="text-blue-900 font-medium">Note:</span>
                  All information will be verified. Ensure accuracy to avoid
                  delays.
                </p>
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                custom={9}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowSuccess(false)} // ← click outside to close (optional)
            />

            {/* Centered Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 text-center w-[90%] max-w-sm shadow-2xl"
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-5xl">✅</div>

                  <div>
                    <h3 className="font-bold text-xl">
                      Application Submitted Successfully
                    </h3>
                    <p className="text-sm mt-1 text-blue-100">
                      Our team will contact you soon.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowSuccess(false);
                      navigate("/");
                    }}
                    className="px-8 py-3 bg-white/15 hover:bg-white/25 hover:cursor-pointer text-white rounded-lg font-medium transition"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
