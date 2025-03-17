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

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      toast.success("Your message has been sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TopNav />
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Contact Section */}
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[600px] mx-auto mt-2 md:mt-10">
        <div className="flex flex-row items-center justify-center ml-10">
          <div className="text-14px md:text-[20px] text-[#6A6B6D]">Contact Us</div>
          <div>
            <Image src={Excellence} alt="Excellence" width={100} height={100}   className="w-[50px] h-[50px] sm:w-[75px] sm:h-[75px] md:w-[100px] md:h-[100px]" />
          </div>
        </div>

        <div className="text-20px md:text-[60px] text-[#000000] font-bold leading-tight md:-mt-5 mb-5">
          IT&apos;s nice to
          <span className="text-[#CF1E00] italic instrument-font font-serif"> meet ya</span>
        </div>

        <div>
          <Image src={HandImage} alt="HandImage" width={219} height={87} className="md:w-[200px] w-[100px]"/>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-10">
      <div className="max-w-[659px] mx-auto mt-16  p-8 bg-white rounded-2xl border border-[#DDDAE0]">
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
              Message
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
              className="bg-gradient-to-r from-[#EC2B45] via-[#BE3234] to-[#790619] text-white w-full px-4 py-3 rounded-[20px] sm:rounded-[28px]"
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