'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faCalendarAlt, faUserMinus } from '@fortawesome/free-solid-svg-icons';

interface ProfileTabsProps {
  activeTab: 'upcoming' | 'past' | 'attended' | 'calendar';
  setActiveTab: (tab: 'upcoming' | 'past' | 'attended' | 'calendar') => void;
}

export default function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
  const tabs = [
    { key: 'upcoming', label: 'Planladıklarım', icon: faTicket },
    { key: 'attended', label: 'Geçmiş Etkinlikler', icon: faCalendarAlt },
    { key: 'past', label: 'İptal Edilenler', icon: faUserMinus },
    { key: 'calendar', label: 'Takvim', icon: faCalendarAlt }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'upcoming' | 'past' | 'attended' | 'calendar')}
              className={`
                relative min-w-0 flex-1 overflow-hidden py-4 sm:py-6 px-2 sm:px-4 text-center text-xs sm:text-sm font-bold hover:bg-gray-50 transition-all duration-300 whitespace-nowrap
                ${activeTab === tab.key
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-b-2 border-transparent'
                }
              `}
            >
              <FontAwesomeIcon icon={tab.icon} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">
                {tab.key === 'upcoming' ? 'Rezervasyon' : 
                 tab.key === 'attended' ? 'Geçmiş' :
                 tab.key === 'past' ? 'İptal' : 'Takvim'}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
} 