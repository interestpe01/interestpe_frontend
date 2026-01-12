import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Home,
  Phone,
  User,
  Calculator,
  FileText,
  BookOpen,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const navigate = useNavigate();

  const loginClick = () => {
    navigate("/notfound");
  };

  const menuOptions = [
    { text: "Home", icon: <Home className="h-4 w-4" />, path: "/" },
    {
      text: "Calculator",
      icon: <Calculator className="h-4 w-4" />,
      path: "/loancalculator",
    },
    {
      text: "Apply",
      icon: <FileText className="h-4 w-4" />,
      path: "/applicationform",
    },
    {
      text: "Track Status",
      icon: <User className="h-4 w-4" />,
      path: "/statustracker",
    },
    {
      text: "Khatabook",
      icon: <BookOpen className="h-4 w-4" />,
      path: "/khatabook",
    },
  ];

  // Animation variants for header
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: index * 0.1, ease: "easeOut" },
    }),
    exit: (index) => ({
      opacity: 0,
      x: 20,
      transition: { duration: 0.3, delay: index * 0.05, ease: "easeIn" },
    }),
  };

  // Animation variants for drawer
  const drawerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <motion.header
      className="w-full bg-blue-200 sticky top-0 z-50 shadow-sm"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <motion.div
          variants={menuItemVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link to="/" className="flex flex-col leading-tight">
            <span className="text-3xl font-bold text-blue-900 tracking-tight">
              interestpe
            </span>
            <span className="text-sm text-blue-900 font-light">
              Befikar lending
            </span>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuOptions.map((item, index) => (
            <motion.div
              key={index}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              custom={index + 1}
            >
              <Link
                to={item.path}
                className="flex items-center gap-2 text-blue-900 hover:text-blue-700 font-medium text-base transition-colors duration-200"
              >
                {item.icon}
                {item.text}
              </Link>
            </motion.div>
          ))}
          <motion.div
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            custom={menuOptions.length + 1}
          >
            <Button
              onClick={loginClick}
              variant="outline"
              className="rounded-full px-6 py-2 text-blue-900 border-blue-400 hover:bg-blue-300 hover:text-blue-900 transition-all duration-200"
            >
              Login/SignUp
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <motion.div
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <HiOutlineBars3 className="w-8 h-8 text-blue-900 cursor-pointer" />
              </motion.div>
            </SheetTrigger>
            <AnimatePresence>
              <SheetContent side="right" className="w-[280px] p-6 bg-white">
                <motion.div
                  className="flex flex-col gap-3 mt-6"
                  variants={drawerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {menuOptions.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                    >
                      <Link
                        to={item.path}
                        className="flex items-center gap-3 text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        {item.icon}
                        <span className="font-medium">{item.text}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={menuOptions.length}
                  >
                    <Button
                      onClick={loginClick}
                      variant="outline"
                      className="mt-4 rounded-full border-blue-400 text-blue-900 hover:bg-blue-300 hover:text-blue-900 transition-all duration-200 transform hover:scale-105"
                    >
                      Login/SignUp
                    </Button>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </AnimatePresence>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
