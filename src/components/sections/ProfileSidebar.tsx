'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface ProfileSidebarProps {
  profile: any;
  userEvents: any;
  attendedEvents: any[];
}

export default function ProfileSidebar({ profile, userEvents, attendedEvents }: ProfileSidebarProps) {
  return (
    <div className="col-span-1 lg:col-span-4 order-2 lg:order-1">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-sm sm:text-base text-gray-600">{profile.email}</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Konum</div>
              <div className="flex items-center text-gray-900 text-sm sm:text-base">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <span className="truncate">{profile.location}</span>
              </div>
            </div>
            
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">İlgi Alanları</div>
              <div className="flex flex-wrap gap-2">
                {profile.interests?.map((interest: string) => (
                  <span
                    key={interest}
                    className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Hakkında</div>
              <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="group">
              <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {userEvents.attending.length}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Katılacağım</div>
            </div>
            <div className="group">
              <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {attendedEvents.length}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Katıldığım</div>
            </div>
            <div className="group">
              <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {profile.stats?.averageRating || 0}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Ortalama Puan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 