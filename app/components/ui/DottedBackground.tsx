'use client';

import { useEffect, useState } from 'react';

export default function DottedBackground({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    
    // Función para obtener el tema actual directamente del HTML
    const getCurrentTheme = (): 'light' | 'dark' => {
      const htmlTheme = document.documentElement.getAttribute('data-theme');
      return (htmlTheme === 'dark' ? 'dark' : 'light');
    };

    // Establecer tema inicial
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);

    // Observar cambios en el atributo data-theme del HTML
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = getCurrentTheme();
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // También escuchar eventos personalizados de cambio de tema
    const handleThemeChange = () => {
      const newTheme = getCurrentTheme();
      setTheme(newTheme);
    };

    // Escuchar cambios en localStorage mediante un evento personalizado
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        handleThemeChange();
      }
    };

    // Escuchar eventos personalizados (para cambios en la misma pestaña)
    window.addEventListener('themechange', handleThemeChange);
    window.addEventListener('storage', handleStorageChange);

    // Polling como respaldo (cada 100ms para detectar cambios rápidos)
    const interval = setInterval(() => {
      const currentTheme = getCurrentTheme();
      setTheme((prevTheme) => {
        if (prevTheme !== currentTheme) {
          return currentTheme;
        }
        return prevTheme;
      });
    }, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener('themechange', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-base-200">{children}</div>;
  }

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 relative ${
        theme === 'dark' ? '' : 'bg-base-200'
      }`}
      style={{
        backgroundColor: theme === 'dark' ? '#262B3E' : undefined
      }}
    >
      {/* Patrón de puntos */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: theme === 'dark'
            ? 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: theme === 'dark' ? 0.6 : 0.5
        }}
      />
      
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

