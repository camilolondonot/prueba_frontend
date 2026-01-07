'use client';

import { useAgentStore } from '@/app/store/agentStore';

export default function Header() {
  const agents = useAgentStore((state) => state.agents);
  const agentCount = agents.length;
  const maxAgents = 6;
  
  // Calcular el porcentaje
  const percentage = Math.min((agentCount / maxAgents) * 100, 100);
  
  // Determinar el emoji según la cantidad de agentes
  const getEmoji = () => {
    if (agentCount >= 6) return '🤯';
    if (agentCount >= 4) return '😬';
    return '😎';
  };
  
  // Determinar el color de la barra según el porcentaje
  const getProgressColor = () => {
    if (percentage >= 100) return 'progress-error';
    if (percentage >= 66) return 'progress-warning';
    return 'progress-success';
  };
  
  return (
    <div className="navbar">
      <div className="flex-1">
        {/* <img src={logo} alt="Logo" className="h-auto w-32" /> */}
        <div className="flex items-center gap-3 pointer-events-none">
          <div className="icon text-2xl">
            {getEmoji()}
          </div>
          <div className="data">
            <h6 className='text-sm font-medium text-white mb-1'>Consumo del plan</h6>
            <progress 
              className={`progress ${getProgressColor()} w-56`} 
              value={percentage} 
              max="100"
            ></progress>
          </div>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

