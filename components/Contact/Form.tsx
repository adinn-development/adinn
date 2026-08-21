"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import TopNav from "../reusable-components/TopNav";
import { Excellence, HandImage } from "../reusable-components/Icons/Icons";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

// Indian mobile number: 10 digits starting 6-9, optional +91/91/0 prefix
const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
};

const Form = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
// Math CAPTCHA state
const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, operator: '+', answer: 0 });
const [captchaInput, setCaptchaInput] = useState<string>('');
const [captchaError, setCaptchaError] = useState<string>('');
// 👇 ADD HERE
React.useEffect(() => {
    generateCaptcha();
}, []);
  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate random math CAPTCHA
const generateCaptcha = () => {
  const operators = ['+', '-', '×'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  let answer = 0;

  if (operator === '+') answer = num1 + num2;
  if (operator === '-') {
    if (num2 > num1) [num1, num2] = [num2, num1]; // avoid negative
    answer = num1 - num2;
  }
  if (operator === '×') answer = num1 * num2;

  setCaptcha({ num1, num2, operator, answer });
  setCaptchaInput('');
  setCaptchaError('');
};

  // Validate form data
  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) {
      errors.push("First name is required");
    }

    if (!formData.lastName.trim()) {
      errors.push("Last name is required");
    }

    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push("Please enter a valid email address");
      }
    }

    if (!formData.phone.trim()) {
      errors.push("Phone number is required");
    } else if (!validatePhone(formData.phone)) {
      errors.push("Please enter a valid 10-digit phone number");
    }

    if (!formData.message.trim()) {
      errors.push("Message is required");
    }
    // Validate CAPTCHA
if (!captchaInput.trim()) {
  errors.push("Please answer the math question");
} else if (parseInt(captchaInput) !== captcha.answer) {
  errors.push("Incorrect math answer. Please try again.");
  generateCaptcha(); // refresh on wrong answer
}

    return errors;
  };

  // Handle form submission with Google Apps Scripts
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     // Validate form
//     const errors = validateForm();
//     if (errors.length > 0) {
//       errors.forEach(error => toast.error(error));
//       setLoading(false);
//       return;
//     }

//     // Replace this URL with your actual Google Apps Script URL
//     const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqR-8EkQ2IiLWuRd6FHCfhwaQmLHfGMtBXaLMTfnzpRdsbNBBnwXUrTo1T0H-yqmOLSQ/exec';

//     try {
//       const formDataToSend = {
//         firstName: formData.firstName.trim(),
//         lastName: formData.lastName.trim(),
//         email: formData.email.trim().toLowerCase(),
//         message: formData.message.trim(),
//         timestamp: new Date().toISOString()
//       };

//       console.log('Sending data:', formDataToSend);

//       const response = await fetch(APPS_SCRIPT_URL, {
//         method: 'POST',
//         mode: 'no-cors',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formDataToSend)
//       });

//       // Since we're using no-cors mode, we can't read the response
//       // but if no error is thrown, we assume success
//       toast.success("Your message has been sent successfully!");
// generateCaptcha(); // refresh CAPTCHA after success
//       // Reset form after successful submission
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         message: ''
//       });

//     } catch (error) {
//       console.error('Form submission error:', error);
//       toast.error('Network error. Please check your connection and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
// Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      setLoading(false);
      return;
    }

    const loadingToast = toast.loading("Sending your enquiry...");

    try {
      const response = await fetch("https://adinndigital.com/api/index_adinnenquiry.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailtype: "adinnEnquiry",
          userFirstName: formData.firstName.trim(),
          userLastName: formData.lastName.trim(),
          userEnquiryEmail: formData.email.trim().toLowerCase(),
          userPhone: formData.phone.replace(/[\s-]/g, ""),
          userEnquiryMessage: formData.message.trim(),
        }),
      });

      const result = await response.json();
      toast.dismiss(loadingToast);

      if (result.status === "success") {
        toast.success("Thank you for your enquiry! We'll get back soon", {
          autoClose: 5000,
        });
        generateCaptcha();
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }

   } catch (error) {
  toast.dismiss(loadingToast);
  toast.error("Network error. Please check your internet connection and try again.");
  console.log('Full error:', error);
  console.log('Error message:', (error as Error).message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Contact Section */}
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[600px] mx-auto mt-30 lg:mt-60">
        <div className="flex flex-row items-center justify-center ml-10">
          <div className="text-14px md:text-[20px] text-[#6A6B6D]">Contact Us</div>
          <div>
            <Image src={Excellence} alt="Excellence" width={100} height={100} className="w-[50px] h-[50px] sm:w-[75px] sm:h-[75px] md:w-[100px] md:h-[100px]" />
          </div>
        </div>

        <div className="text-[26px] md:text-[60px] text-[#000000] font-bold leading-tight md:-mt-5 mb-5">
          IT&apos;s nice to
          <span className="text-[#CF1E00] italic instrument-font font-serif"> meet ya</span>
        </div>

        <div>
          <Image src={HandImage} alt="HandImage" width={219} height={87} className="md:w-[200px] w-[100px]"/>
        </div>
      </div>

      {/* Form Section */}
      <div className="md:p-10 p-3">
        <div className="max-w-[659px] mx-auto mt-16 p-8 bg-white rounded-2xl border border-[#DDDAE0]">
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-[16px] text-gray-700 mb-2 font-medium">
                  First Name <span className="text-[#EC2B45]">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none bg-[#EFF0F5]"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="flex-1">
                <label htmlFor="lastName" className="block text-[16px] text-gray-700 mb-2 font-medium">
                  Last Name <span className="text-[#EC2B45]">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none bg-[#EFF0F5]"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[16px] text-gray-700 mb-2 font-medium">
                Email <span className="text-[#EC2B45]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl focus:outline-none bg-[#EFF0F5]"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-[16px] text-gray-700 mb-2 font-medium">
                Phone Number <span className="text-[#EC2B45]">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl focus:outline-none bg-[#EFF0F5]"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-[16px] text-gray-700 mb-2 font-medium">
                Message <span className="text-[#EC2B45]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl focus:outline-none bg-[#EFF0F5] resize-none"
                placeholder="Type your message here..."
                required
              />
            </div>
{/* Math CAPTCHA */}
<div>
  <label className="block text-[16px] text-gray-700 mb-2 font-medium">
    Solve this <span className="text-[#EC2B45]">*</span>
  </label>
  <div className="flex items-center gap-3">
    {/* <div className="bg-[#EFF0F5] px-4 py-3 rounded-xl font-bold text-[18px] tracking-widest select-none">
      {captcha.num1} {captcha.operator} {captcha.num2} = ?
    </div> */}
    <div className="bg-[#EFF0F5] px-3 py-3 rounded-xl font-bold text-[14px] md:text-[18px] tracking-normal md:tracking-widest select-none whitespace-nowrap">
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
}}      className="w-26 px-4 py-3 rounded-xl focus:outline-none bg-[#EFF0F5]"
      placeholder="Answer"
    />
   <button
  type="button"
  onClick={generateCaptcha}
  className="p-2 rounded-full hover:bg-gray-100 cursor-pointer text-[#CF1E00] transition-all duration-300"
  title="Refresh CAPTCHA"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0 0 20.49 15" />
  </svg>
</button>
  </div>
  {captchaError && <p className="text-[#EC2B45] text-sm mt-1">{captchaError}</p>}
</div>
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#EC2B45] via-[#BE3234] to-[#790619] text-white w-full px-4 py-3 rounded-[20px] sm:rounded-[28px] disabled:opacity-70 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Book a Call"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;