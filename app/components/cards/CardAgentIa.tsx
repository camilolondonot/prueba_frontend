import Link from 'next/link';
import { AgentData } from '@/app/types';
import { HiLanguage } from "react-icons/hi2";
import { RiSpeakLine } from "react-icons/ri";



const CardAgentIa = ({agentData}: {agentData: AgentData}) => {

  const { id, titulo, language, type } = agentData;

  return (
    <Link
      key={id}
      href={`/${id}`}
      className="block group"
    >
      <div className="bg-[#2D3249] rounded-md p-6 shadow-sm transition-all duration-300 transform">
        
        <h2 className="text-xl font-bold mb-2 font-figtree dark:text-white">
          {titulo}
        </h2>


        <div className='flex gap-4 items-center'>
          <HiLanguage />
          <small>{language}</small>
        </div>

        <div className='flex gap-4 items-center'>
          <RiSpeakLine />
          <small>{type}</small>
        </div>
        
        <div className="mt-4 flex items-center text-sm font-medium group-hover:gap-2 transition-all">
          <span className="text-custom-accent">Ver detalles</span>
          <svg 
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform text-custom-accent"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default CardAgentIa