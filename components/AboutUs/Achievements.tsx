import React from 'react'

const Achievements = () => {
    const contents = [
        {
            title: 'Medias in Chennai',
            description: '150+'
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
        <div className='flex flex-col justify-start p-8 mb-16'>
            <div className="text-[40px] p-5  leading-[105px] md:text-[90px] md:whitespace-normal whitespace-nowrap font-normal text-start mb-16">
                Highlights of  {' '}
                <span className="text-[#CF1E00] font-serif italic">Achievements</span>
            </div>

            {/* Achievements Container */}
            <div className="w-full  mx-auto px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 shadow-orange-50">
                    {contents.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center text-center p-8 border-[#E7E5E5] rounded-2xl border
                                     transition-all duration-300 ease-in-out
                                     hover:border-[#EC2B45] hover:shadow-lg hover:shadow-[#EC2B45]/20
                                     hover:-translate-y-1 hover:scale-105
                                     cursor-pointer"
                        >
                            <h3 className="text-[#444349] text-[20px] mb-2 transition-colors duration-300 group-hover:text-[#EC2B45]">
                                {item.title}
                            </h3>
                            <p className="text-[#EC2B45] text-3xl md:text-4xl font-bold">
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
