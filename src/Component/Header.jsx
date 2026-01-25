import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Home, Calculator, FileText, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();

  const [openCalculatorDesktop, setOpenCalculatorDesktop] = useState(false);

  // Mobile accordion state
  const [openCalculatorMobile, setOpenCalculatorMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loginClick = () => {
    navigate("/notfound");
  };

  const menuOptions = [
    {
      text: "Home",
      icon: <Home className="h-4 w-4" />,
      path: "/",
    },
    {
      text: "Calculator",
      icon: <Calculator className="h-4 w-4" />,
      children: [
        {
          text: "Loan EMI Calculator",
          path: "/loancalculator",
        },
        {
          text: "Compound Interest Calculator",
          path: "/cicalculator",
        },
        {
          text: "Systematic Withdrawal Plan Calculator",
          path: "/swpcalculator",
        },
      ],
    },
    {
      text: "Apply",
      icon: <FileText className="h-4 w-4" />,
      path: "/applicationform",
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

  const submenuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 relative">
          {menuOptions.map((item, index) => {
            if (item.children) {
              return (
                <div
                  key={item.text}
                  className="relative"
                  onMouseEnter={() => setOpenCalculatorDesktop(true)}
                  onMouseLeave={() => setOpenCalculatorDesktop(false)}
                >
                  <button className="flex items-center gap-2 text-blue-900 hover:cursor-pointer hover:text-blue-700 font-medium text-base transition-colors duration-200">
                    {item.icon}
                    {item.text}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openCalculatorDesktop ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openCalculatorDesktop && (
                      <motion.ul
                        className="absolute top-full left-0 mt-4 w-72 bg-white rounded-lg shadow-lg border border-gray-300 min-w-[240px] divide-y divide-gray-300"
                        variants={submenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {item.children.map((child, index) => (
                          <React.Fragment key={child.text}>
                            <li>
                              <Link
                                to={child.path}
                                className="block px-5 py-2.5 rounded-lg text-[14px] text-blue-900 hover:bg-blue-50 transition-colors duration-150"
                                onClick={() => setOpenCalculatorDesktop(false)}
                              >
                                {child.text}
                              </Link>
                            </li>

                            {/* Add divider after every item except the last one */}
                            {/* {index < item.children.length - 1 && (
                              <div className="mx-5 h-[1px] bg-gray-200" /> // ← mx-5 matches px-5 of link
                            )} */}
                          </React.Fragment>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <motion.div
                key={item.text}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Link
                  to={item.path}
                  className="flex items-center gap-2 text-blue-900 hover:text-blue-700 font-medium text-base transition-colors duration-200"
                >
                  {item.icon}
                  {item.text}
                </Link>
              </motion.div>
            );
          })}

          <motion.div
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            custom={menuOptions.length}
          >
            <Button
              onClick={loginClick}
              variant="outline"
              className="rounded-full px-6 py-2 text-blue-900 border-blue-400 hover:bg-blue-700 hover:text-white hover:cursor-pointer transition-all duration-200"
            >
              Login / SignUp
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setMobileMenuOpen(true)}
              >
                <HiOutlineBars3 className="w-8 h-8 text-blue-900 cursor-pointer" />
              </motion.div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] max-w-[340px] p-0 bg-white"
            >
              {/* Custom close button */}
              <SheetClose asChild>
                <button className="absolute top-4 right-2 z-50 h-12 w-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition">
                  <X className="h-7 w-7 text-blue-700" />
                </button>
              </SheetClose>

              <motion.div
                className="h-full p-6 flex flex-col"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 180,
                  duration: 0.45,
                }}
              >
                <div className="flex flex-col gap-3 mt-10">
                  {menuOptions.map((item) => {
                    if (item.children) {
                      return (
                        <div key={item.text} className="flex flex-col">
                          <button
                            onClick={() =>
                              setOpenCalculatorMobile(!openCalculatorMobile)
                            }
                            className="flex items-center justify-between w-full text-blue-900 hover:bg-blue-50/80 p-4 rounded-xl transition-all duration-200 font-medium text-lg"
                          >
                            <div className="flex items-center gap-3">
                              {item.icon}
                              <span>{item.text}</span>
                            </div>
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-300 ${
                                openCalculatorMobile ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {openCalculatorMobile && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col pl-6 py-2 bg-blue-50/50 rounded-xl my-1 divide-y divide-blue-100/70">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.text}
                                      to={child.path}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="py-3.5 px-4 text-sm text-blue-800 hover:text-blue-600 hover:bg-blue-100/50 transition-all rounded-lg"
                                    >
                                      {child.text}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.text}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 text-blue-900 hover:bg-blue-50/80 p-4 rounded-xl transition-all duration-200 font-medium text-lg"
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </Link>
                    );
                  })}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        loginClick();
                      }}
                      className="mt-8 w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md py-6 text-base"
                    >
                      Login / SignUp
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
