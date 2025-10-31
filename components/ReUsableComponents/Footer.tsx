"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  Card,
  AdinnLogoFooter,
} from "./Icons/Icons";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface FooterFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
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

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    if (!formData.message.trim()) {
      errors.push("Message is required");
    }

    return errors;
  };

  // Handle form submission with Google Apps Script
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

    // Use the same Google Apps Script URL - you'll need to update your script to handle both formats
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqR-8EkQ2IiLWuRd6FHCfhwaQmLHfGMtBXaLMTfnzpRdsbNBBnwXUrTo1T0H-yqmOLSQ/exec';

    try {
      const formDataToSend = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
        source: 'footer' // To identify which form was submitted
      };

      console.log('Sending data:', formDataToSend);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSend)
      });

      // Since we're using no-cors mode, we can't read the response
      // but if no error is thrown, we assume success
      toast.success("Your message has been sent successfully!");

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const FooterLogos = [
    {
      src: FacebookLogo,
      alt: "Facebook",
      link:'#'
    },
    {
      src: InstagramLogo,
      alt: "Instagram",
      link:'#'

    },
    {
      src: TwitterLogo,
      alt: "Twitter",
      link:'#'

    },
    {
      src: YoutubeLogo,
      alt: "Youtube",
      link:'#'

    },
  ];

  return (
    <div className="bg-[#0C0C0C] w-full min-h-auto p-8 md:p-12">
      <ToastContainer position="top-right" autoClose={3000} />
      
    <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-6 sm:gap-7 md:gap-8 mb-7">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-7 md:gap-8 w-full lg:w-[55%]">
          <div className="relative w-full">
            <Image
              src={Card}
              alt="card"
              className="w-full h-auto rounded-[20px] sm:rounded-[28px]"
            />
            <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-3 sm:left-6 md:left-8 flex flex-col gap-1.5 sm:gap-2">
              <div className="text-white text-lg sm:text-2xl xl:text-[34px] font-semibold leading-tight">
                Let&apos;s Work Together
              </div>
              <span className="text-sm sm:text-base md:text-[21px] text-white/80">
                webadmin@adinn.co.in
              </span>
            </div>
          </div>

          <div className="w-full">
            <Image
              src={AdinnLogoFooter}
              className="rounded-[20px] sm:rounded-[28px] w-full h-auto"
              alt="card"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-[#121212] rounded-[20px] sm:rounded-[28px] p-5 sm:p-7.5 md:p-7.5 w-full lg:w-[45%] flex flex-col gap-6 sm:gap-6 md:gap-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-6 md:gap-7">
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
                  className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white"
                  required
                />
              </div>

              <div className="flex flex-col space-y-3 sm:space-y-4 flex-1">
                <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                  LAST NAME
                </label>
                <input 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white"
                  required
                />
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
                className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full text-white"
                required
              />
            </div>

            <div className="flex flex-col space-y-3 sm:space-y-4">
              <label className="text-[12px] font-medium text-[#BDBDBD] tracking-[2px]">
                MESSAGE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border-b border-white/16 focus:border-white/30 bg-transparent outline-none transition-colors pb-2 w-full min-h-[60px] resize-none text-white"
                rows={2}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#EC2B45] via-[#BE3234] to-[#790619] text-white w-full px-4 py-3 text-[7.5px] md:text-[12px] rounded-[20px] sm:rounded-[28px] transition-all duration-300 cursor-pointer hover:bg-[#EC2B45] hover:bg-none disabled:opacity-70"
            >
              {loading ? "SUBMITTING..." : "SUBMIT"}
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

      <div className="text-white text-[12px] sm:text-sm md:text-[14.53px] text-center mt-8 sm:mt-10 md:mt-12">
        © Designed & Developed by {" "}
  <a 
    href="https://www.theinternetcompany.one/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-white hover:underline"
  >
    Adinn
  </a>
      </div>
    </div>
  );
};

export default Footer;