import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";

export const StatusTracker = () => {
  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState(null);

  const handleTrackStatus = () => {
    setStatus({
      id: applicationId,
      currentStage: 2,
      status: "Under Review",
      loanAmount: "₹2,50,000",
      appliedDate: "15 Dec 2024",
      stages: [
        {
          id: 1,
          title: "Application Submitted",
          status: "completed",
          date: "15 Dec 2024",
        },
        {
          id: 2,
          title: "Document Verification",
          status: "in-progress",
          date: "16 Dec 2024",
        },
        { id: 3, title: "Credit Assessment", status: "pending", date: "" },
        { id: 4, title: "Approval", status: "pending", date: "" },
        { id: 5, title: "Disbursement", status: "pending", date: "" },
      ],
    });
  };

  const getStageIcon = (stage) => {
    if (stage.status === "completed")
      return <CheckCircle className="h-5 w-5 text-blue-500" />;
    if (stage.status === "in-progress")
      return <Clock className="h-5 w-5 text-blue-600 animate-pulse" />;
    return (
      <div className="w-4 h-4 rounded-full border-2 border-blue-200 bg-white" />
    );
  };

  const getStatusBadge = (statusText) => {
    switch (statusText) {
      case "Under Review":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Under Review
          </Badge>
        );
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Pending
          </Badge>
        );
    }
  };

  // Animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Animation variants for input section
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  // Animation variants for status summary
  const summaryVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for timeline items
  const timelineItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.1 + 0.8, ease: "easeOut" },
    }),
  };

  // Animation variants for notice section
  const noticeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 1.2, ease: "easeOut" },
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
        className="w-full max-w-2xl mx-auto"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="shadow-xl rounded-xl bg-white border border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-xl p-6 text-center">
            <CardTitle className="flex justify-center items-center gap-2 text-2xl font-bold">
              <FileText className="w-6 h-6" />
              Track Your Application
            </CardTitle>
            <p className="text-sm text-blue-100 mt-1">
              Check the status of your loan application in real-time
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Input Section */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <Label
                htmlFor="applicationId"
                className="text-blue-900 font-semibold"
              >
                Application ID
              </Label>
              <div className="flex gap-3 mt-2">
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="flex-1"
                >
                  <Input
                    id="applicationId"
                    placeholder="Enter your application ID"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    className="border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-lg text-blue-900 transition-all duration-200"
                  />
                </motion.div>
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <Button
                    onClick={handleTrackStatus}
                    disabled={!applicationId}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                  >
                    Track
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Status Summary */}
            {status && (
              <motion.div
                variants={summaryVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          Application #{status.id}
                        </h4>
                        <p className="text-sm text-blue-700">
                          Applied on {status.appliedDate}
                        </p>
                      </div>
                      {getStatusBadge(status.status)}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-900 font-medium">
                        Loan Amount:
                      </span>
                      <span className="text-blue-600 font-semibold">
                        {status.loanAmount}
                      </span>
                    </div>
                  </div>

                  {/* Timeline Section */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-900">
                      Application Progress
                    </h4>
                    <div className="space-y-6">
                      {status.stages.map((stage, index) => (
                        <motion.div
                          key={stage.id}
                          className="flex items-start gap-4"
                          variants={timelineItemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <div className="flex flex-col items-center">
                            {getStageIcon(stage)}
                            {index < status.stages.length - 1 && (
                              <div className="w-0.5 h-8 bg-blue-200 mt-1" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h5
                                className={`font-medium ${
                                  stage.status === "completed"
                                    ? "text-blue-500"
                                    : stage.status === "in-progress"
                                    ? "text-blue-600"
                                    : "text-blue-300"
                                }`}
                              >
                                {stage.title}
                              </h5>
                              {stage.date && (
                                <span className="text-xs text-blue-700">
                                  {stage.date}
                                </span>
                              )}
                            </div>
                            {stage.status === "in-progress" && (
                              <p className="text-sm text-blue-700 mt-1">
                                We're currently reviewing your documents. This
                                usually takes 1-2 business days.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps Notice */}
                  <motion.div
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    variants={noticeVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h4 className="font-semibold text-blue-900 mb-1">
                      What's Next?
                    </h4>
                    <p className="text-sm text-blue-700">
                      We're reviewing your application. You will receive an
                      update via SMS or email. Contact support for any
                      assistance.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Placeholder when no status */}
            {!status && applicationId && (
              <motion.div
                className="text-center text-sm text-blue-700 py-6"
                variants={noticeVariants}
                initial="hidden"
                animate="visible"
              >
                No application found. Please check your Application ID.
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
