export default function HeroSection() {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/concert-unsplash.jpg')`
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="w-full">
          {/* Left Side - App Info */}
          <div className="text-white max-w-4xl">
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent pr-2">
                  Etkinlikleri
                </span>
                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                  Keşfet
                </span>
              </h1>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-4"> Unutulmaz Anlar Sizi Bekliyor</h2>
              <p className="text-lg leading-relaxed mb-6">
                En büyük konserler, festivaller, konferanslar ve daha fazlası. 
                <span className="text-yellow-300 font-semibold"> Hayallerinizi gerçeğe dönüştürün.</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white/90">Premium etkinlik deneyimleri</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white/90">Anında bilet rezervasyonu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white/90">Güvenli ödeme sistemi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
} 