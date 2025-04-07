import React from 'react'

const Achievements = () => {
    const contents = [
        {
            title: 'Member team',
            description: '130+'
        },
        {
            title: 'Largest in',
            description: 'Tamilnadu'
        },
        {
            title: 'Vehicles',
            description: '250+'
        },
    ]
    
    return (
        <div className='flex flex-col justify-start p-8'>
           <div className="text-[24px] sm:text-[40px] md:text-[40px] p-2 md:p-1 leading-[40px] md:leading-[105px] text-center md:text-left lg:text-left md:whitespace-normal  font-normal mb-5 md:mb-16">
    Highlights of {' '}
    <span className="text-[#CF1E00] font-serif instrument-font italic">Achievements</span>
</div>

            {/* Achievements Container */}
            <div className="w-full  mx-auto md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 shadow-orange-50 ">
                    {contents.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center text-center px-8 py-8 max-w-full border-[#E7E5E5] rounded-2xl border
                                     transition-all duration-300 ease-in-out
                                     hover:border-[#EC2B45] hover:shadow-lg hover:shadow-[#EC2B45]/20
                                     hover:-translate-y-1 hover:scale-105
                                     cursor-pointer"
                        >
                            <h3 className="text-[#444349] text-[20px] sm:text-[15.02px] md:text-[15.02px] mb-2 transition-colors duration-300 group-hover:text-[#EC2B45]">
                                {item.title}
                            </h3>
                            <p className="text-[#EC2B45] text-[20px] sm:text-[54px] md:text-[54px]  font-bold">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Achievements
