"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import TopNav from "../ReUsableComponents/TopNav";
import { Excellence, HandImage } from "../ReUsableComponents/Icons/Icons";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const Form = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
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

    // Replace this URL with your actual Google Apps Script URL
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztK-CqK8K0XLt35s4HntDppsc_y6M17bGK7Jb7mn_bs_Oiu-HUWmPoxCya4GqZNbTz/exec';

    try {
      const formDataToSend = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
        timestamp: new Date().toISOString()
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

  return (
    <div>
      <TopNav />
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Contact Section */}
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[600px] mx-auto mt-10 md:mt-10">
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