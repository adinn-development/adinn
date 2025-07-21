"use client";
import React, { useState } from "react";
import {
  ProjectImage1,
  ProjectImage2,
} from "../ReUsableComponents/Icons/Icons";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const ProjectImage3 = ProjectImage1; 
const ProjectImage4 = ProjectImage2; 
const ProjectImage5 = ProjectImage1; 
const ProjectImage6 = ProjectImage2; 

const Solutions = () => {
  const contents = [
    { 
      name: "Outdoor Media", 
      lastWord: "Solutions",
      images: [
        {
          id: 1,
          image: ProjectImage1,
          alt: "Outdoor Billboard",
          name: "LED Billboard",
          description: "Times Square Display",
        },
        {
          id: 2,
          image: ProjectImage2,
          alt: "Bus Shelter Ad",
          name: "Transit Media",
          description: "Bus Shelter Campaign",
        },
        {
          id: 3,
          image: ProjectImage1,
          alt: "Digital Hoarding",
          name: "Digital Display",
          description: "Highway Advertisement",
        },
        {
          id: 4,
          image: ProjectImage2,
          alt: "Street Furniture",
          name: "Street Branding",
          description: "Urban Furniture Ads",
        },
        {
          id: 5,
          image: ProjectImage1,
          alt: "Outdoor Campaign",
          name: "OOH Campaign",
          description: "Multi-location Display",
        },
        {
          id: 6,
          image: ProjectImage2,
          alt: "Landmark Ad",
          name: "Landmark Display",
          description: "Prime Location Ad",
        },
      ]
    },
    { 
      name: "RoadShow", 
      lastWord: "Events",
      images: [
        {
          id: 7,
          image: ProjectImage3,
          alt: "Mobile Van",
          name: "Mobile Campaign",
          description: "Brand Activation Van",
        },
        {
          id: 8,
          image: ProjectImage4,
          alt: "Road Show Setup",
          name: "Live Activation",
          description: "Interactive Roadshow",
        },
        {
          id: 9,
          image: ProjectImage3,
          alt: "Product Demo",
          name: "Product Launch",
          description: "Mobile Demo Unit",
        },
        {
          id: 10,
          image: ProjectImage4,
          alt: "Brand Experience",
          name: "Experience Zone",
          description: "Mobile Brand Center",
        },
        {
          id: 11,
          image: ProjectImage3,
          alt: "Sampling Campaign",
          name: "Sampling Drive",
          description: "Product Sampling",
        },
        {
          id: 12,
          image: ProjectImage4,
          alt: "Promotional Tour",
          name: "Promo Tour",
          description: "Multi-city Campaign",
        },
      ]
    },
    { 
      name: "Retail Branding & Signage", 
      lastWord: "Solutions",
      images: [
        {
          id: 13,
          image: ProjectImage5,
          alt: "Store Signage",
          name: "Storefront Design",
          description: "Premium Retail Space",
        },
        {
          id: 14,
          image: ProjectImage6,
          alt: "Interior Branding",
          name: "Interior Signage",
          description: "In-store Navigation",
        },
        {
          id: 15,
          image: ProjectImage5,
          alt: "Window Display",
          name: "Window Graphics",
          description: "Attractive Displays",
        },
        {
          id: 16,
          image: ProjectImage6,
          alt: "POS Material",
          name: "POS Displays",
          description: "Point of Sale Setup",
        },
        {
          id: 17,
          image: ProjectImage5,
          alt: "Brand Identity",
          name: "Brand Elements",
          description: "Consistent Branding",
        },
        {
          id: 18,
          image: ProjectImage6,
          alt: "Digital Signage",
          name: "Digital Screens",
          description: "Interactive Displays",
        },
      ]
    },
    { 
      name: "Exhibition Design", 
      lastWord: "Services",
      images: [
        {
          id: 19,
          image: ProjectImage1,
          alt: "Trade Show Booth",
          name: "Exhibition Booth",
          description: "Custom Trade Show",
        },
        {
          id: 20,
          image: ProjectImage2,
          alt: "Convention Display",
          name: "Convention Setup",
          description: "Large Scale Display",
        },
        {
          id: 21,
          image: ProjectImage1,
          alt: "Product Showcase",
          name: "Product Display",
          description: "Interactive Showcase",
        },
        {
          id: 22,
          image: ProjectImage2,
          alt: "Corporate Pavilion",
          name: "Corporate Stand",
          description: "Professional Setup",
        },
        {
          id: 23,
          image: ProjectImage1,
          alt: "Modular Display",
          name: "Modular System",
          description: "Flexible Configuration",
        },
        {
          id: 24,
          image: ProjectImage2,
          alt: "Exhibition Graphics",
          name: "Visual Graphics",
          description: "Eye-catching Visuals",
        },
      ]
    },
    { 
      name: "Events & Activate", 
      lastWord: "Solutions",
      images: [
        {
          id: 25,
          image: ProjectImage3,
          alt: "Corporate Event",
          name: "Corporate Events",
          description: "Business Gatherings",
        },
        {
          id: 26,
          image: ProjectImage4,
          alt: "Brand Activation",
          name: "Brand Experience",
          description: "Experiential Marketing",
        },
        {
          id: 27,
          image: ProjectImage3,
          alt: "Product Launch",
          name: "Launch Events",
          description: "Grand Launches",
        },
        {
          id: 28,
          image: ProjectImage4,
          alt: "Promotional Event",
          name: "Promotions",
          description: "Marketing Events",
        },
        {
          id: 29,
          image: ProjectImage3,
          alt: "Conference Setup",
          name: "Conferences",
          description: "Professional Meets",
        },
        {
          id: 30,
          image: ProjectImage4,
          alt: "Activation Campaign",
          name: "Activations",
          description: "Consumer Engagement",
        },
      ]
    },
    { 
      name: "Digital", 
      lastWord: "Marketing",
      images: [
        {
          id: 31,
          image: ProjectImage5,
          alt: "Social Media Campaign",
          name: "Social Media",
          description: "Instagram Campaign",
        },
        {
          id: 32,
          image: ProjectImage6,
          alt: "SEO Services",
          name: "SEO Optimization",
          description: "Search Rankings",
        },
        {
          id: 33,
          image: ProjectImage5,
          alt: "PPC Campaign",
          name: "Paid Advertising",
          description: "Google Ads Campaign",
        },
        {
          id: 34,
          image: ProjectImage6,
          alt: "Content Marketing",
          name: "Content Strategy",
          description: "Engaging Content",
        },
        {
          id: 35,
          image: ProjectImage5,
          alt: "Email Marketing",
          name: "Email Campaigns",
          description: "Newsletter Design",
        },
        {
          id: 36,
          image: ProjectImage6,
          alt: "Analytics Dashboard",
          name: "Analytics",
          description: "Performance Tracking",
        },
      ]
    },
    { 
      name: "Media Buying &", 
      lastWord: "Planning",
      images: [
        {
          id: 37,
          image: ProjectImage1,
          alt: "Media Strategy",
          name: "Media Strategy",
          description: "Strategic Planning",
        },
        {
          id: 38,
          image: ProjectImage2,
          alt: "Ad Placement",
          name: "Ad Placements",
          description: "Prime Time Slots",
        },
        {
          id: 39,
          image: ProjectImage1,
          alt: "Campaign Analysis",
          name: "Campaign Metrics",
          description: "Performance Analysis",
        },
        {
          id: 40,
          image: ProjectImage2,
          alt: "Budget Planning",
          name: "Budget Strategy",
          description: "Cost Optimization",
        },
        {
          id: 41,
          image: ProjectImage1,
          alt: "Audience Research",
          name: "Target Audience",
          description: "Market Research",
        },
        {
          id: 42,
          image: ProjectImage2,
          alt: "Media Mix",
          name: "Media Mix",
          description: "Channel Strategy",
        },
      ]
    },
    { 
      name: "Rural Engagement", 
      lastWord: "Solutions",
      images: [
        {
          id: 43,
          image: ProjectImage3,
          alt: "Village Campaign",
          name: "Village Outreach",
          description: "Rural Marketing",
        },
        {
          id: 44,
          image: ProjectImage4,
          alt: "Local Events",
          name: "Community Events",
          description: "Local Engagement",
        },
        {
          id: 45,
          image: ProjectImage3,
          alt: "Wall Paintings",
          name: "Wall Art",
          description: "Traditional Media",
        },
        {
          id: 46,
          image: ProjectImage4,
          alt: "Folk Media",
          name: "Cultural Programs",
          description: "Folk Performances",
        },
        {
          id: 47,
          image: ProjectImage3,
          alt: "Panchayat Meetings",
          name: "Community Meets",
          description: "Local Gatherings",
        },
        {
          id: 48,
          image: ProjectImage4,
          alt: "Regional Campaign",
          name: "Regional Push",
          description: "Vernacular Content",
        },
      ]
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex justify-center items-center px-4 sm:px-6 lg:px-16 py-12 md:mt-25 md:mb-10 mt:20">
        <div className="flex flex-wrap justify-center gap-4 max-w-7xl ">
          {contents.map((content, index) => (
            <button
              key={index}
              className={`${
                index === activeIndex 
                  ? 'bg-gradient-to-r from-[#EC2B45] to-[#861927] text-white'
                  : 'bg-[#F5F5F5]/[.26] text-[#333] hover:bg-gradient-to-r hover:from-[#EC2B45] hover:to-[#861927] hover:text-white'
              }
              py-2.5 rounded-full
              transform hover:-translate-y-1 transition-all duration-300 ease-in-out
              text-[16px] md:text-[16px] whitespace-nowrap px-4
              shadow-sm hover:shadow-md min-w-[150px] text-center
              `}
              onClick={() => setActiveIndex(index)}
            >
              {content.name} {content.lastWord}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-row w-full md:flex-row items-center md:justify-start justify-center sm:px-6 lg:px-20 gap-2 md:gap-3 py-8 md:py-12 mt-[80px] ">
        <div className="text-[24px] sm:text-[54px] md:text-[54px] tracking-[-2px] md:tracking-[-4px] font-bold whitespace-nowrap ">
          {contents[activeIndex].name}
        </div>
        <div className="text-[24px] sm:text-[54px] md:text-[54px] md:ml-2 instrument-font text-[#CF1E00] font-serif italic">
          {contents[activeIndex].lastWord}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-20 ">
        {contents[activeIndex].images.map((item, index) => (
          <Link
            href={`/projects/${item.id}`}
            key={item.id}
            className="block group cursor-pointer"
          >
            <div className="bg-white shadow-lg w-full h-[300px] rounded-2xl overflow-hidden
                         relative transform hover:scale-[1.02] transition-transform duration-300 ease-out">
              <Image
                src={item.image}
                alt={item.alt}
                className="w-full h-full rounded-2xl object-cover"
                priority={index < 3}
                loading={index >= 3 ? "lazy" : "eager"}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                <div className="text-white">
                  <h3 className="text-[24px] font-bold">{item.name}</h3>
                  <p className="text-[14px] text-[#AFB0B6]">{item.description}</p>
                </div>
                <div>
                  <FiArrowRight className="w-5 h-5 text-white group-hover:text-[#CF1E00] transition-colors duration-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Solutions);