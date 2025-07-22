"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ProjectImage1,
  ProjectImage2,
  IdHero,
  ProjectOverview,
  Royal,
  BGBanner,
  PoorvikaRoadshow,
  NativoRoadshow,
  TitanRoadshow,
  KubotaRoadshow,
  kenstarRoadshow,
  TracktersRoadshow,
  DiloRoadshow,
  MuthootRoadshow,
  KFCRoadshow,
  BayerRoadshow,
  JamesRoadshow,
  BajajRoadshow,
} from "@/components/ReUsableComponents/Icons/Icons";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Gallery from "@/components/service/Gallery";
import Footer from "@/components/ReUsableComponents/Footer";
import LandingDreamProject from "@/components/Home/LandingDreamProject";
import TopNav from "@/components/ReUsableComponents/TopNav";
import ProjectVideoFrame from "@/public/ProjectVideoFrame.svg";

// Additional placeholder images - replace with actual images
const ProjectImage3 = ProjectImage1;
const ProjectImage4 = ProjectImage2;
const ProjectImage5 = ProjectImage1;
const ProjectImage6 = ProjectImage2;

// Centralized project data
const projectsData = [
  {
    category: "Outdoor Media Solutions",
    projects: [
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
    ],
  },
  {
    name: "Roadshow",
    lastWord: "Events",
    images: [
      {
        id: 7,
        image: Royal,
        alt: "Royal Enfield",
        name: "Royal Enfield",
        description: "Van",
      },
      {
        id: 8,
        image: BajajRoadshow,
        alt: "Bajaj",
        name: "Bajaj",
        description: "Van",
      },
      {
        id: 9,
        image: JamesRoadshow,
        alt: "James & Co",
        name: "James & Co",
        description: "Van",
      },
      {
        id: 10,
        image: BayerRoadshow,
        alt: "Bayer",
        name: "Bayer",
        description: "van",
      },
      {
        id: 11,
        image: KFCRoadshow,
        alt: "KFC",
        name: "KFC",
        description: "Van",
      },
      {
        id: 12,
        image: MuthootRoadshow,
        alt: "Muthoot Fincorp",
        name: "Muthoot Fincorp",
        description: "Van",
      },
      {
        id: 13,
        image: DiloRoadshow,
        alt: "Dilo",
        name: "Dilo",
        description: "Van",
      },
      {
        id: 14,
        image: TracktersRoadshow,
        alt: "Ishare Trackters",
        name: "Ishare Trackters",
        description: "Van",
      },
      {
        id: 15,
        image: kenstarRoadshow,
        alt: "Kenstar",
        name: "Kenstar",
        description: "Van",
      },
      {
        id: 16,
        image: KubotaRoadshow,
        alt: "Kubota",
        name: "Kubota",
        description: "Van",
      },
      {
        id: 17,
        image: TitanRoadshow,
        alt: "Titan Eye +",
        name: "Titan Eye +",
        description: "Van",
      },
      {
        id: 18,
        image: NativoRoadshow,
        alt: "Nativo",
        name: "Nativo",
        description: "Van",
      },
      {
        id: 19,
        image: PoorvikaRoadshow,
        alt: "Poorvika",
        name: "Poorvika",
        description: "Van",
      },
    ],
  },  
  {
    category: "Retail Branding & Signage Solutions",
    projects: [
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
    ],
  },
  {
    category: "Exhibition Design Services",
    projects: [
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
    ],
  },
  {
    category: "Events & Activate Solutions",
    projects: [
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
    ],
  },
  {
    category: "Digital Marketing",
    projects: [
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
    ],
  },
  {
    category: "Media Buying & Planning",
    projects: [
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
    ],
  },
  {
    category: "Rural Engagement Solutions",
    projects: [
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
    ],
  },
];

// Flatten all projects into a single array
const allProjects = projectsData.flatMap(category => category.projects);

// Define the Project type
type Project = {
  id: number;
  image: any;
  alt: string;
  name: string;
  description: string;
};

const ProjectDetailPage = () => {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [projectCategory, setProjectCategory] = useState<string>("");

  // Static content for project details
  const projectDetails = [
    {
      title: "Service",
      description: "3D & Cut - Out",
    },
    {
      title: "Location",
      description: "Tamil Nadu",
    },
    {
      title: "Year",
      description: "2023",
    },
  ];

  const overViewContents = [
    {
      number: "01",
      title: "Problem",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sit purus diam sit gravida. Fames semper enim nisi aliquet pellentesque arcu vitae. Mi vel elit quis praesent sed lacus diam quis. In aliquam laoreet lacus elementum.",
    },
    {
      number: "02",
      title: "Solution",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sit purus diam sit gravida. Fames semper enim nisi aliquet pellentesque arcu vitae. Mi vel elit quis praesent sed lacus diam quis. In aliquam laoreet lacus elementum.",
    },
    {
      number: "03",
      title: "Key Highlights",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sit purus diam sit gravida. Fames semper enim nisi aliquet pellentesque arcu vitae. Mi vel elit quis praesent sed lacus diam quis. In aliquam laoreet lacus elementum.",
    },
  ];

  useEffect(() => {
    if (params.id) {
      const projectId = Number(params.id);
      const foundProject = allProjects.find((item) => item.id === projectId);

      if (foundProject) {
        setProject(foundProject);

        // Find the category for this project
        const category = projectsData.find(cat =>
          cat.projects.some(p => p.id === projectId)
        );
        if (category) {
          setProjectCategory(category.category);
        }
      }
    }
  }, [params.id]);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EC2B45] mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Loading project details...</h1>
            <p className="text-gray-600">Please wait while we fetch the project information.</p>
          </div>
        </div>
      </div>
    );
  }

  // Split project description into words for the hero display
  const altWords = project.alt.split(" ");

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full md:h-screen h-[400px] bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col"
        style={{ backgroundImage: `url(${IdHero.src})` }}
      >
        <TopNav />

        {/* Main content container */}
        <div className="flex-1 flex flex-col items-center justify-end relative">
          <div className="absolute bottom-0 w-full flex justify-center">
            {/* Background Banner */}
            <div className="relative w-full max-w-[90%] md:max-w-[55%]">
              <Image
                src={BGBanner}
                alt="Project Frame"
                className="w-full h-auto"
                priority
              />

              {/* Foreground Project Image */}
              {project && (
                <div className="absolute bottom-[20%] inset-0 flex justify-center items-end px-2">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-[88%] object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          {/* Project title display */}
          <div className="flex flex-col items-center z-10 mb-[50%] md:mb-[30%] lg:mb-[30%] px-4">


            {altWords.map((word, index) => (
              <p
                key={index}
                className={`text-[32px] sm:text-[48px] md:text-[72px] lg:text-[100px] leading-[0.9] uppercase font-bold ${index === altWords.length - 1
                  ? "bg-gradient-to-t from-transparent to-white bg-clip-text text-transparent"
                  : "text-white"
                  }`}
              >
                {word}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Cards */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 mt-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {projectDetails.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center justify-center p-8 border-[#E7E5E5] rounded-2xl border
                         transition-all duration-300 ease-in-out
                         hover:border-[#EC2B45] hover:shadow-lg hover:shadow-[#EC2B45]/20
                         hover:-translate-y-1 hover:scale-105
                          bg-white"
            >
              <h3 className="text-[#444349] text-[18px] md:text-[20px] mb-2 transition-colors duration-300 group-hover:text-[#EC2B45]">
                {item.title}
              </h3>
              <p className="text-[#EC2B45] text-[36px] md:text-[48px] lg:text-[48px] xl:whitespace-nowrap font-bold">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>



      {/* Project Overview Section */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 px-4 sm:px-6 lg:px-10 mb-20">
        {/* Mobile title */}
        <div className="text-[#000000] font-medium text-[28px] md:text-[32px] block lg:hidden text-center w-full mb-6">
          Project Overview
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:justify-start w-full lg:w-auto">
          <Image
            src={ProjectOverview}
            alt="Project Overview"
            className="rounded-xl w-full max-w-[500px] lg:max-w-none h-[699px]"
            height={699}
            priority
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col space-y-8 max-w-2xl">
          {/* Desktop title */}
          <div className="text-[#000000] font-medium text-[32px] hidden lg:block">
            Project Overview
          </div>

          <div className="flex flex-col gap-6">
            {overViewContents.map((content, index) => (
              <div
                key={index}
                className="bg-[#F6F6FA] rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-row items-start gap-4">
                  <div className="text-white bg-[#EC2B45] rounded-full min-w-[40px] h-[40px] flex items-center justify-center font-medium text-[16px] flex-shrink-0">
                    {content.number}
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="text-[18px] md:text-[20px] font-bold text-gray-800">
                      {content.title}
                    </p>
                    <p className="text-[14px] md:text-[16px] text-gray-600 leading-relaxed">
                      {content.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery />

      {/* Dream Project Section */}
      <div className="mt-20 mb-20">
        <LandingDreamProject />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProjectDetailPage;