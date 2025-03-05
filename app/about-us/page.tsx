import React from 'react'
import LandingProjects from '@/components/Home/LandingProjects'
import LandingDreamProject from '@/components/Home/LandingDreamProject'
import LandingQueries from '@/components/Home/LandingQueries'
const page = () => {
  return (
    <div>
      {/* <LandingProjects /> */}
      <LandingDreamProject />
      <LandingQueries />
    </div>
  )
}

export default page
