"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface FooterFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
const PrivacyPolicyContent = () => (
  <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
    <p className="text-xs text-gray-400">
      <span className="block">Effective Date: 04-11-2014</span>
      <span className="block">Last Updated: 18-06-2025</span>
    </p>

    <p>
      At <span className="text-white font-medium">Adinn</span>, we value your
      privacy and are committed to protecting the personal and business
      information shared with us. This Privacy Policy explains how we collect,
      use, store, and safeguard client data while delivering our advertising and
      marketing services.
    </p>

    <h3 className="text-white font-semibold text-base">
      Information We Collect
    </h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>Name, company name, and designation</li>
      <li>Phone number, WhatsApp number, and email address</li>
      <li>Business address and location details</li>
      <li>Campaign-related data shared for service execution</li>
      <li>
        Information submitted through website forms, WhatsApp, email, or calls
      </li>
    </ul>

    <p>
      We do not collect sensitive personal data unless required and consented.
    </p>

    <h3 className="text-white font-semibold text-base">
      How We Use Your Information
    </h3>
    <p>
      We use the collected data strictly for legitimate business purposes such
      as:
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Executing advertising and marketing campaigns</li>
      <li>Managing OOH Media, Roadshows, Signage, Events & Activation</li>
      <li>Providing digital marketing and WhatsApp campaign services</li>
      <li>Client communication, support, and billing</li>
      <li>Improving service quality and customer experience</li>
    </ul>

    <h3 className="text-white font-semibold text-base">Data Sharing</h3>

    <p>
      We do not sell, rent, or misuse client data.<br></br>
      Information may be shared only with:
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Authorized service partners (Meta, WhatsApp API providers)</li>
      <li>Internal teams for campaign execution</li>
      <li>Legal authorities if required by law</li>
    </ul>

    <h3 className="text-white font-semibold text-base">Data Security</h3>
    <p>We take reasonable measures to protect client data, including:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Controlled access to information</li>
      <li>Secure digital storage</li>
      <li>Confidential handling of all client records</li>
    </ul>

    <h3 className="text-white font-semibold text-base">Data Retention</h3>
    <p>
      Client information is retained only for as long as required for service
      delivery, legal, or accounting purposes and is securely deleted afterward.
    </p>

    <h3 className="text-white font-semibold text-base">Your Rights</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>Access your data</li>
      <li>Correct or delete your data</li>
      <li>Withdraw consent for communication</li>
    </ul>

    <p>
      Requests can be sent to{" "}
      <a
        href="mailto:info@adinn.co.in"
        className="text-[#EC2B45] hover:underline"
      >
        info@adinn.co.in
      </a>
    </p>

    <h3 className="text-white font-semibold text-base">Contact Us</h3>
    <p>
      Email:{" "}
      <a
        href="mailto:info@adinn.co.in"
        className="text-[#EC2B45] hover:underline"
      >
        info@adinn.co.in
      </a>
      <br />
      Phone: +919790257861 | +918015806062
    </p>
  </div>
);

const TermsContent = () => (
  <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
    <p>
      <strong>Effective Date:</strong> 04-11-2014
    </p>
    <p>
      By accessing our website or using our services, you agree to the following
      Terms & Conditions.
    </p>

    <h3 className="text-white font-semibold text-base">Services</h3>
    <p>We provide advertising and marketing services including:</p>
    <ul className="list-disc list-inside">
      <li>OOH Media</li>
      <li>Roadshows</li>
      <li>Signage</li>
      <li>Events & Activation</li>
      <li>Fixtures</li>
      <li>POPs & Offsets</li>
      <li>Wall Painting</li>
      <li>Digital Marketing & WhatsApp Campaigns</li>
    </ul>
    <p>
      Service scope, timelines, and costs are defined before project execution.
    </p>

    <h3 className="text-white font-semibold text-base">
      Client Responsibilities
    </h3>
    <p>Clients agree to:</p>
    <ul className="list-disc list-inside">
      <li>Provide accurate and lawful campaign information</li>
      <li>Ensure content and contact data comply with applicable laws</li>
      <li>
        Obtain prior consent from customers for WhatsApp or digital promotions
      </li>
    </ul>
    <p>
      We are not responsible for issues arising from incorrect or unauthorized
      data provided by clients.
    </p>

    <h3 className="text-white font-semibold text-base">
      Intellectual Property
    </h3>
    <p>
      All creatives, designs, and materials developed by us remain our
      intellectual property unless otherwise agreed in writing.
    </p>

    <h3 className="text-white font-semibold text-base">
      Limitation of Liability
    </h3>
    <p>We are not liable for:</p>
    <ul className="list-disc list-inside">
      <li>Platform downtime (Meta, WhatsApp, Google, etc.)</li>
      <li>Third-party delays or failures</li>
      <li>Marketing performance beyond agreed deliverables</li>
    </ul>

    <h3 className="text-white font-semibold text-base">Confidentiality</h3>
    <p>
      All client data and campaign details are treated as confidential and used
      only for service execution.
    </p>

    <h3 className="text-white font-semibold text-base">Governing Law</h3>
    <p>
      These Terms are governed by the laws of India. Any disputes shall be
      subject to local jurisdiction.
    </p>

    <h3 className="text-white font-semibold text-base">Updates</h3>
    <p>
      We reserve the right to modify these Terms at any time. Continued use of
      our services indicates acceptance of updated terms.
    </p>
  </div>
);

const Footer = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FooterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [policyModal, setPolicyModal] = useState<"terms" | "privacy" | null>(
    null
  );

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const APPS_SCRIPT_URL =
  //     "https://backend-bq11.onrender.com/sendMailAdinnContactUs";

  //   try {
  //     const payload = {
  //       firstName: formData.firstName.trim(),
  //       lastName: formData.lastName.trim(),
  //       email: formData.email.trim().toLowerCase(),
  //       message: formData.message.trim(),
  //       timestamp: new Date().toISOString(),
  //       source: "footer",
  //     };

  //     const response = await fetch(APPS_SCRIPT_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || "Failed to send message");
  //     }

  //     toast.success("Your message has been sent successfully!");

  //     setFormData({
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       message: "",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to send message. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("https://adinndigital.com/api/index.php", {
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

    if (result.status === "success") {
      alert("Your enquiry has been submitted successfully!");
    }
  } catch (error) {
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
      <ToastContainer position="top-right" autoClose={3000} />

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
                  <a href="mailto:marketing@adinn.com" style={{ textDecoration: "none" }}>
                    marketing@adinn.com
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Phone: </span>
                  {/* YOGESH  - ADMIN */}
                  <a href="tel:8015806062" style={{ textDecoration: "none" }}>
                    {" "}
                    +918015806062{" "}
                  </a> 
                  {/* |
                  <a href="tel:9626987861" style={{ textDecoration: "none" }}>
                    {" "}
                    +919626987861{" "}
                  </a>|
                
                  <a href="tel:7373785048" style={{ textDecoration: "none" }}>
                    {" "}
                    +917373785048{" "}
                  </a>
                  |
           
                  <a
                    href="tel:7339509090"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    +917339509090{" "}
                  </a> */}
                </div>
              </div>

              {/* Addresss */}
              <div className="flex flex-col m-8  sm:gap-2 mt-2 text-white">
                <div>
                  <span className="font-semibold">Address:</span>
                </div>
                <div>
                  29, 1st Cross Street, Vanamamalai Nagar, Bypass road, <br></br>
                  <b>Madurai - 625010.</b>
                </div>
                <div>
                  No. 3, Vijayalakshmi Street, Mahalingapuram,
                  Nungambakkam,
                  <br></br>
                  <b>Chennai - 600034.</b>
                </div>
                <div>
                  No. 407/8, 4th Cross, Jayanagar 7th Block,
                  Opp- Saraswat Cooperative Bank,
                  <br></br>
                  <b>Bangalore - 560070.</b>
                </div>
                <div>
                  No. 13,  Sivasakthi Colony, (Near coimbatore roller flour mill), Ganapathy,
                  <br></br><b>Coimbatore - 641006.</b>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="w-full">
            <Image
              src={AdinnLogoFooter}
              className="rounded-[20px] sm:rounded-[28px] w-full h-auto"
              alt="card"
            />
          </div> */}
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

      {/* Bottom bar */}
      <div className="relative mt-12 flex flex-col items-center gap-4">
        {/* Left bottom links */}
        <div className="flex gap-4 text-[12px] text-white/70">
          <button
            onClick={() => setPolicyModal("terms")}
            className="hover:underline"
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setPolicyModal("privacy")}
            className="hover:underline"
          >
            Privacy Policy
          </button>
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

      {/* Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111] text-white max-w-lg w-full mx-4 rounded-2xl p-6 relative">
            <button
              onClick={() => setPolicyModal(null)}
              className="absolute top-3 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {policyModal === "terms"
                ? "Terms & Conditions"
                : "Privacy Policy"}
            </h2>

            <div className="text-sm text-gray-300 space-y-3 max-h-[450px] overflow-y-auto hide-scrollbar">
              {policyModal === "privacy" && <PrivacyPolicyContent />}
              {policyModal === "terms" && <TermsContent />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
