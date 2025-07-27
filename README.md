# 🎫 Etkinlik Yönetim Uygulaması 

Modern ve kullanıcı dostu bir etkinlik keşif ve yönetim platformu. Next.js 15, React 19, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## ✨ Özellikler

### 🏠 Ana Sayfa
- **Etkinlik Keşfi**: Kategorilere göre filtrelenmiş etkinlik listesi
- **Arama Fonksiyonu**: Başlık ve açıklamaya göre etkinlik arama
- **Kategori Filtreleme**: Teknoloji, Müzik, İş, Sanat, Sağlık, Yemek kategorileri
- **Görünüm Modları**: Grid ve liste görünümü
- **Sıralama Seçenekleri**: Tarih, popülerlik ve fiyata göre sıralama
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

### 🎯 Etkinlik Detay Sayfası
- **Detaylı Bilgiler**: Etkinlik açıklaması, tarih, konum, fiyat
- **Katılım Yönetimi**: Etkinliğe katılma/iptal etme
- **Takvim Entegrasyonu**: Google Calendar'a etkinlik ekleme
- **Paylaşım Özellikleri**: Sosyal medya paylaşımları
- **QR Kod**: Etkinlik QR kodu oluşturma
- **Harita Entegrasyonu**: Etkinlik konumu gösterimi
- **İstatistikler**: Katılımcı sayısı, kapasite bilgileri

### 👤 Profil Sayfası
- **Kişisel Dashboard**: Kullanıcı istatistikleri ve bilgileri
- **Etkinlik Geçmişi**: Katılınan, planlanan ve iptal edilen etkinlikler
- **Takvim Görünümü**: Aylık etkinlik takvimi
- **Değerlendirme Sistemi**: Etkinlik puanlama ve yorum yapma
- **Profil Yönetimi**: Kullanıcı bilgileri ve tercihleri

### 🔧 Teknik Özellikler
- **State Yönetimi**: Redux Toolkit ile merkezi state yönetimi
- **API Entegrasyonu**: RESTful API servisleri ve Next.js API Routes
- **Görsel Entegrasyonu**: Unsplash API ile dinamik görseller
- **TypeScript**: Tip güvenliği ve geliştirici deneyimi
- **Modern UI**: Tailwind CSS ile modern tasarım
- **FontAwesome**: Zengin ikon kütüphanesi
- **Responsive Design**: Mobile-first yaklaşım
- **Performance**: Optimized image loading ve lazy loading
- **Error Handling**: Comprehensive error handling ve fallback UI'lar

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd case
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── event/[id]/        # Etkinlik detay sayfası
│   ├── profile/           # Profil sayfası
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
│   ├── features/          # Özellik bileşenleri
│   ├── layout/           # Layout bileşenleri
│   ├── sections/         # Sayfa bölümleri
│   └── ui/               # UI bileşenleri
├── lib/                  # Yardımcı fonksiyonlar
├── services/             # API servisleri
├── store/                # Redux store
└── types/                # TypeScript tip tanımları
```

## 🛠️ Kullanılan Teknolojiler

### Frontend
- **Next.js 15.4.4**: React framework
- **React 19.1.0**: UI kütüphanesi
- **TypeScript 5**: Tip güvenliği
- **Tailwind CSS 4**: CSS framework
- **Redux Toolkit 2.8.2**: State yönetimi
- **FontAwesome**: İkon kütüphanesi

### Geliştirme Araçları
- **ESLint**: Kod kalitesi
- **PostCSS**: CSS işleme
- **Turbopack**: Hızlı geliştirme

## 🔌 API Servisleri

### Event Service
- `getEvents()`: Tüm etkinlikleri getir
- `getEventById(id)`: Belirli etkinliği getir
- `searchEvents(query)`: Etkinlik arama
- `getEventsByCategory(category)`: Kategoriye göre filtrele

### Profile Service
- `getUserProfile()`: Kullanıcı profilini getir
- `getUserStats()`: Kullanıcı istatistiklerini getir

### Unsplash Service
- `getImagesForEvents(categories)`: Kategoriler için görseller
- `getRandomImage(category)`: Kategori için rastgele görsel

## 🎨 Bileşen Yapısı ve Teknik Detaylar

### Layout Bileşenleri
- `Header`: Navigasyon ve arama - Responsive navigation bar
- `Footer`: Alt bilgi - Static footer component
- `Layout`: Ana layout wrapper - App-wide layout management

### Feature Bileşenleri
- `EventCard`: Etkinlik kartı - Hover effects, image optimization, capacity indicators
- `QRModal`: QR kod modalı - Dynamic QR code generation
- `ReviewModal`: Değerlendirme modalı - Star rating system, form validation
- `ShareModal`: Paylaşım modalı - Social media integration, clipboard API

### Section Bileşenleri
- `HeroSection`: Ana sayfa hero bölümü - Background image, gradient overlays, responsive text
- `SearchSection`: Arama bölümü - Real-time search, debounced input, filter combinations
- `EventsSection`: Etkinlik listesi - Grid/list view toggle, infinite scroll ready
- `CategoryPills`: Kategori filtreleri - Interactive pills, gradient backgrounds

### UI Bileşenleri
- `Button`: Reusable button component - Multiple variants, loading states
- `LoadingSkeleton`: Loading states - Skeleton screens for better UX

## 📊 State Yönetimi

### Redux Store Yapısı
```typescript
interface RootState {
  events: {
    events: Event[];
    loading: boolean;
    error: string | null;
    userEvents: {
      attending: string[];
      cancelled: string[];
    };
  };
}
```

### Ana Actions
- `setEvents`: Etkinlikleri güncelle
- `setLoading`: Yükleme durumu
- `setError`: Hata durumu
- `attendEvent`: Etkinliğe katıl
- `cancelEvent`: Etkinliği iptal et

**Teknik Özellikler:**
- Tab-based navigation system
- Calendar view integration
- Review system with star ratings
- Form validation ve state management
- API integration for user data
- Responsive sidebar layout
- Modal components for reviews




## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 📱 Responsive Tasarım

- **Mobile First**: Mobil öncelikli tasarım
- **Breakpoints**: Tailwind CSS breakpoint sistemi
- **Touch Friendly**: Dokunmatik cihaz uyumlu
- **Performance**: Optimize edilmiş görsel yükleme

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: Mavi tonları
- **Secondary**: Mor ve pembe tonları
- **Success**: Yeşil tonları
- **Warning**: Turuncu tonları
- **Error**: Kırmızı tonları

### Tipografi
- **Headings**: Inter font ailesi
- **Body**: System font stack
- **Weights**: 400, 500, 600, 700

### Bileşen Stilleri
- **Cards**: Gölge ve border radius
- **Buttons**: Gradient ve hover efektleri
- **Modals**: Backdrop blur efektleri


---

**Görsel Kullanımı Hakkında Not**: 
Bu uygulama, görselleri dinamik olarak Unsplash üzerinden almaktadır. Unsplash API kullanım limitleri gereği, saatte maksimum 50 istek sınırı bulunmaktadır.
Eğer bu sınır aşılırsa, ilgili görseller yerine varsayılan (default) görseller gösterilecektir.
