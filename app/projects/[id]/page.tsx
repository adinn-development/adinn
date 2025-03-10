"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ProjectImage1, ProjectImage2, IdHero } from '@/components/ReUsableComponents/Icons/Icons';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Gallery from '@/components/service/Gallery';
import Footer from '@/components/ReUsableComponents/Footer';
import LandingDreamProject from '@/components/Home/LandingDreamProject';
import TopNav from '@/components/ReUsableComponents/TopNav';
import ProjectVideoFrame from '@/public/ProjectVideoFrame.svg';

import { ProjectOverview } from '@/components/ReUsableComponents/Icons/Icons';
// Import the project data
const images = [
  {
    id: 1,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
  {
    id: 2,
    image: ProjectImage2,
    alt: "Project Image 2",
    name: "Geo Targeting",
    description: "Malabar",
  },
  {
    id: 3,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
  {
    id: 4,
    image: ProjectImage2,
    alt: "Project Image 2",
    name: "Geo Targeting",
    description: "Malabar",
  },
  {
    id: 5,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
  {
    id: 6,
    image: ProjectImage2,
    alt: "Project Image 2",
    name: "Geo Targeting",
    description: "Malabar",
  },
  {
    id: 7,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
  { 
    id: 8,
    image: ProjectImage2,
    alt: "Project Image 2",
    name: "Geo Targeting",
    description: "Malabar",
  },
  {
    id: 9,
    image: ProjectImage1,
    alt: "Project Image 1",
    name: "3D & Cut - Out",
    description: "Dindugal Thalappakatti",
  },
];

// Define the Project type
type Project = {
  id: number;
  image: any; // Using any for StaticImageData
  alt: string;
  name: string;
  description: string;
};

const ProjectDetailPage = () => {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);


  const contents = [
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
    description: "Lorem ipsum dolor sit amet consectetur. Sit purus diam sit gravida. Fames semper enim nisi aliquet pellentesque arcu vitae. Mi vel elit quis praesent sed lacus diam quis. In aliquam laoreet lacus elementum.",
  },
  {
    number: "02",
    title: "Solution",
    description: "Lorem ipsum dolor sit amet consectetur. Sit purus diam sit gravida. Fames semper enim nisi aliquet pellentesque arcu vitae. Mi vel elit quis praesent sed lacus diam quis. In aliquam laoreet lacus elementum.",
  },
  {
    number: "03",
    title: "Key Highlights",
    description: "Lorem ipsum dolor sit amet consectetur. Sit purus diam sit gravida. Fames semper enim nisi aliquet pellentesque arcu vitae. Mi vel elit quis praesent sed lacus diam quis. In aliquam laoreet lacus elementum.",
  }
]

  

  useEffect(() => {
    if (params.id) {
      const foundProject = images.find(item => item.id === Number(params.id));
      if (foundProject) {
        setProject(foundProject);
      }
    }
  }, [params.id]);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading project details...</h1>
        
      </div>
    );
  }

  return (
    <>
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col"
      style={{ backgroundImage: `url(${IdHero.src})` }}
    >
      <TopNav />
      {/* <Link href="/projects" className="text-[#CF1E00] flex items-center gap-2 mb-8 px-8">
        <FiArrowLeft /> Back to all projects
      </Link> */}
      
      {/* Main content container */}
      <div className="flex-1 flex flex-col items-center justify-end relative">
        <Image 
          src={ProjectVideoFrame} 
          alt="HomeFrame" 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] md:max-w-90%] lg:max-w-90%]" 
        />
        
        <div className="flex flex-col items-center z-10 mb-[30%]">
          {project.description.split(' ').map((word, index) => (
            <p 
              key={index} 
              className={`text-[48px] md:text-[72px] lg:text-[100px] leading-[0.9] uppercase ${
                index === 1 
                  ? 'bg-gradient-to-t from-transparent to-white bg-clip-text text-transparent font-bold'
                  : 'text-white font-bold'
              }`}
            >
              {word}
            </p>
          ))}
        </div>
      </div>
    </div>
    {/* second section */}
    {/* <div className="flex flex-col md:flex-row items-center justify-center gap-45 mb-20 mt-20">
        {contents.map((content, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-1">
            <p className="text-[20px] font-bold text-black">{content.title}</p>
            <p className="text-[16px] text-black/50 text-center max-w-[200px]">{content.description}</p>
          </div>
        ))}
    </div> */}
    <div className="w-full  mx-auto px-10 mt-20 mb-40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[215px] shadow-orange-50">
                    {contents.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center text-center justify-center p-8 border-[#E7E5E5] rounded-2xl border
                                     transition-all duration-300 ease-in-out
                                     hover:border-[#EC2B45] hover:shadow-lg hover:shadow-[#EC2B45]/20
                                     hover:-translate-y-1 hover:scale-105
                                     cursor-pointer"
                        >
                            <h3 className="text-[#444349] text-[20px] mb-2 transition-colors duration-300 group-hover:text-[#EC2B45]">
                                {item.title}
                            </h3>
                            <p className="text-[#EC2B45] text-[54px] md:text-4xl font-bold">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
    <div className="flex flex-row items-center justify-center gap-10 p-8">
      {/* Image Section */}
      <div className="flex  pl-15">
        <Image 
          src={ProjectOverview} 
          alt="Project Overview"
          height={699}
          className="rounded-xl"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col space-y-10 px-10">
        <div className="text-[#000000] font-medium text-[32px]">Project Overview</div>
        <div className="flex flex-col gap-6 flex-1 justify-between">
          {overViewContents.map((content, index) => (
            <div key={index} className="bg-[#F6F6FA] rounded-[20px] p-6 h-[172px] shadow-sm">
              <div className="flex flex-row items-start gap-4">
                <div className="text-white bg-[#EC2B45] rounded-full min-w-[40px] h-[40px] flex items-center justify-center font-medium text-[16px]">
                  {content.number}
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-[20px] font-bold ">{content.title}</p>
                  <p className="text-[16px] text-[#000000]/50 ">{content.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>

<Gallery />
<div className='mt-30 mb-50'>

<LandingDreamProject />
</div>
<Footer />
</>
  );
};

export default ProjectDetailPage;
