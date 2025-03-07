"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ProjectImage1, ProjectImage2, IdHero } from '@/components/ReUsableComponents/Icons/Icons';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Gallery from '@/components/service/Gallery';
import Footer from '@/components/ReUsableComponents/Footer';

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
        <Link href="/projects" className="text-[#CF1E00] flex items-center justify-center gap-2 mt-8">
          <FiArrowLeft /> Back to all projects
        </Link>
      </div>
    );
  }

  return (
    <>
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${IdHero.src})` }}
    >
      <Link href="/projects" className="text-[#CF1E00] flex items-center gap-2 mb-8">
        <FiArrowLeft /> Back to all projects
      </Link>
      
      {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.name}</h1> */}
      <p className="text-[100px] text-white mb-8">{project.description}</p>
      
      {/* <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={project.image}
          alt={project.alt}
          className="object-cover"
          fill
          priority
        />
      </div> */}

    </div>

    <div>
        
    </div>

<Gallery />
<Footer />
</>
  );
};

export default ProjectDetailPage;
