'use client';

export default function DottedBackground({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="min-h-screen transition-colors duration-300 relative"
      style={{
        backgroundColor: '#262B3E'
      }}
    >
      {/* Patrón de puntos */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.6
        }}
      />
      
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

