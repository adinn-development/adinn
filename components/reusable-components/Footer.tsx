"use client";

import React, { useState, ChangeEvent } from "react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  LinkedInLogo,
  YoutubeLogo,
  Card,
  AdinnLogoFooter,
} from "./Icons/Icons";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

interface FooterFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// NEW: Add errors interface
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const Footer = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FooterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // NEW: Add errors state
  const [errors, setErrors] = useState<FormErrors>({});
  // Math CAPTCHA state
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, operator: '+', answer: 0 });
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [captchaError, setCaptchaError] = useState<string>('');

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  // Generate random math CAPTCHA
  const generateCaptcha = () => {
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let answer = 0;
    if (operator === '+') answer = num1 + num2;
    if (operator === '-') {
      if (num2 > num1) [num1, num2] = [num2, num1];
      answer = num1 - num2;
    }
    if (operator === '×') answer = num1 * num2;
    setCaptcha({ num1, num2, operator, answer });
    setCaptchaInput('');
    setCaptchaError('');
  };

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // NEW: Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // NEW: Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.firstName)) {
      newErrors.firstName = "First name should only contain letters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.lastName)) {
      newErrors.lastName = "Last name should only contain letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    // CAPTCHA validation
    if (!captchaInput.trim()) {
      newErrors.firstName = newErrors.firstName; // keep existing
      toast.error("Please answer the math question");
      generateCaptcha();
      return false;
    } else if (parseInt(captchaInput) !== captcha.answer) {
      toast.error("Incorrect math answer. Please try again.");
      generateCaptcha();
      return false;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // NEW: Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // NEW: Show loading toast
    const loadingToast = toast.loading("Sending your enquiry...");

    try {
      const response = await fetch("https://adinndigital.com/api/index_adinnenquiry.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailtype: "adinnEnquiry",
          userFirstName: formData.firstName,
          userLastName: formData.lastName,
          userEnquiryEmail: formData.email,
          userEnquiryMessage: formData.message,
        }),
      });

      const result = await response.json();

      // NEW: Dismiss loading toast
      toast.dismiss(loadingToast);

      if (result.status === "success") {
        // Simple toast without custom icon
        toast.success("Thank you for your enquiry! We'll get back soon", {
          autoClose: 5000,
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
        // NEW: Clear errors
        setErrors({});
        generateCaptcha();

      } else {
        // NEW: Show error toast
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      // NEW: Dismiss loading toast
      toast.dismiss(loadingToast);
      // NEW: Show network error toast
      toast.error("Network error. Please check your internet connection and try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const FooterLogos = [
    {
      src: FacebookLogo,
      alt: "Facebook",
      link: "https://www.facebook.com/AdinnAdvertisingServicesLtd",
    },
    {
      src: InstagramLogo,
      alt: "Instagram",
      link: "https://www.instagram.com/adinnadvertising/",
    },
    {
      src: LinkedInLogo,
      alt: "Linkedin",
      link: "https://www.linkedin.com/company/adinn-advertising-service-pvt-ltd-/",
    },
    {
      src: YoutubeLogo,
      alt: "Youtube",
      link: "https://www.youtube.com/channel/UCAnRMAjYwSv_g90SYa5vdXw",
    },
  ];

  return (
    <div className="bg-[#0C0C0C] w-full min-h-auto p-8 md:p-12">
      {/* NEW: Enhanced ToastContainer configuration */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-6 sm:gap-7 md:gap-8 mb-7">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-7 md:gap-8 w-full lg:w-[55%]">
          <div className="relative w-full min-h-[600px] sm:min-h-[480px] md:min-h-[590px]">
            <Image
              src={Card}
              alt="card"
              fill
              className="object-cover rounded-[20px] sm:rounded-[28px]"
              priority
            />
            <div className="absolute  top-6 sm:top-8 md:top-10 left-3 sm:left-6 md:left-8 flex flex-col gap-2 sm:gap-3 max-w-[90%]">
              {/* Heading */}
              <div className="text-white m-3 mx-9 text-lg sm:text-2xl xl:text-[34px] font-semibold leading-tight">
                Let&apos;s Work Together
              </div>

              {/* Phone Numbers */}
              <div className="flex flex-col top-9 m-8 sm:gap-1 text-white">
                <div>
                  <span className="font-semibold">Email: </span>
                  <a
                    href="mailto:info@adinn.co.in"
                    style={{ textDecoration: "none" }}
                  >
                    info@adinn.co.in
                  </a>
                  {" | "}
                  <a href="mailto:ba@adinn.co.in" style={{ textDecoration: "none" }}>
                    ba@adinn.co.in
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Phone: </span>
                  {/* YOGESH  - ADMIN */}
                  <a href="tel:8015806062" style={{ textDecoration: "none" }}>
                    {" "}
                    +918015806062{" "}
                  </a>
                </div>
              </div>

              {/* Addresss */}
              <div className="flex flex-col m-8  sm:gap-2 mt-2 text-white text-base sm:text-base max-[400px]:text-sm ">
                <div>
                  <span className="font-semibold">Address:</span>
                </div>
                <div>
                  29, 1st Cross Street, Vanamamalai Nagar, Bypass road, <br></br>
                  <b>Madurai - 625010.</b>
                </div>
                <div>
                  No. 19/43, MG Chakrapani Street,
                  Sathya Garden, Saligramam,
                  <br></br>
                  <b>Chennai - 600092.</b>
                </div>
                <div>
                 No.24, 2nd floor, 9th A Cross road, Park area, Wilson Garden, 
                  <br></br>
                  <b>Bangalore - 560027.</b>
                </div>
                <div>
                  No. 13,  Sivasakthi Colony, (Near coimbatore roller flour mill), Ganapathy,
                  <br></br><b>Coimbatore - 641006.</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-[#121212] rounded-[20px] sm:rounded-[28px] p-5 sm:p-7.5 md:p-7.5 w-full lg:w-[45%] flex flex-col gap-6 sm:gap-6 md:gap-7">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 sm:gap-6 md:gap-7"
          >
            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-6 sm:gap-6 md:gap-6">
              <div className="flex flex-col space-y-3 sm:space-y-4 flex-1">
                <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                  FIRST NAME
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  // NEW: Add error styling
                  className={`border-b focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white ${errors.firstName ? 'border-red-500' : 'border-white/16'
                    }`}
                />
                {/* NEW: Add error message */}
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div className="flex flex-col space-y-3 sm:space-y-4 flex-1">
                <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                  LAST NAME
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  // NEW: Add error styling
                  className={`border-b focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white ${errors.lastName ? 'border-red-500' : 'border-white/16'
                    }`}
                />
                {/* NEW: Add error message */}
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:space-y-4">
              <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                EMAIL
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                // NEW: Add error styling
                className={`border-b focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white ${errors.email ? 'border-red-500' : 'border-white/16'
                  }`}
              />
              {/* NEW: Add error message */}
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col space-y-3 sm:space-y-4">
              <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                MESSAGE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                // NEW: Add error styling
                className={`border-b focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full min-h-[60px] resize-none text-white ${errors.message ? 'border-red-500' : 'border-white/16'
                  }`}
                rows={2}
              />
              {/* NEW: Add error message */}
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Math CAPTCHA */}
            <div className="flex flex-col space-y-3">
              <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                SOLVE THIS *
              </label>
              <div className="flex items-center gap-3">
                <div className="bg-white/10 px-3 py-2 rounded-lg font-bold text-white text-[14px] whitespace-nowrap select-none">
                  {captcha.num1} {captcha.operator} {captcha.num2} = ?
                </div>
                <input
                  type="number"
                  value={captchaInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCaptchaInput(val);
                    if (val && parseInt(val) !== captcha.answer) {
                      setCaptchaError('❌ Wrong answer, try again');
                    } else {
                      setCaptchaError('');
                    }
                  }}
                  className="w-32 border-b border-white/16 focus:border-white/30 bg-transparent outline-none pb-2 text-white"
                  placeholder="Answer"
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-2 rounded-full hover:bg-white/10 cursor-pointer text-[#EC2B45] transition-all duration-300"
                  title="Refresh CAPTCHA"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 4v6h-6" />
                    <path d="M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                </button>
              </div>
              {captchaError && <p className="text-[#EC2B45] text-xs mt-1">{captchaError}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#EC2B45] via-[#BE3234] to-[#790619] text-white w-full px-4 py-3 text-[7.5px] md:text-[12px] rounded-[20px] sm:rounded-[28px] transition-all duration-300 cursor-pointer hover:bg-[#EC2B45] hover:bg-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4">
          {FooterLogos.map((logo, index) => (
            <Link
              key={index}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[50px] sm:h-[70px] md:h-[80px] bg-[#121212] rounded-[12.9px] md:rounded-[28px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mt-12 flex flex-col items-center gap-4">
        {/* Left bottom links */}
        <div className="flex gap-4 text-[12px] text-white/70">
          <Link href="/terms-conditions" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

        {/* Center copyright */}
        <div className="text-white text-[12px] sm:text-sm text-center">
          © Designed & Developed by{" "}
          <a
            href="https://adinn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Adinn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;