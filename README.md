# mimsinanb.com — Yeni Site

Statik, tek sayfalık, sade kod (saf HTML/CSS/JS — hiçbir build aracı/framework gerekmiyor). GitHub Pages'e doğrudan yüklenip yayınlanabilir.

## Dosyalar

```
index.html   → sayfa iskeleti ve metinler
style.css    → tasarım (renkler, tipografi, animasyonlar)
script.js    → portfolyo kartları, saat/timecode, mobil menü
CNAME        → özel alan adı (www.mimsinanb.com) için
```

## 1) GitHub'a yükleme

1. GitHub'da yeni bir repo oluştur (örn. `mimsinanb-site`).
2. Bu klasördeki dosyaları repo'ya yükle (GitHub arayüzünden "Add file → Upload files" da yeterli).
3. Repo → **Settings → Pages** →
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`, klasör `/ (root)`
4. Birkaç dakika içinde site `https://<kullanıcı-adın>.github.io/mimsinanb-site` adresinde yayında olur.

## 2) www.mimsinanb.com'u bağlama

`CNAME` dosyası zaten `www.mimsinanb.com` yazıyor, GitHub Pages bunu otomatik tanır. Alan adının DNS ayarlarını (şu an Wix'te) şuna göre güncellemen gerekiyor:

- `www` kaydını GitHub'ın verdiği adrese (`<kullanıcı-adın>.github.io`) **CNAME** kaydı olarak yönlendir.
- Kök alan adı (`mimsinanb.com`, `www` olmadan) için GitHub Pages'in A kayıtlarını kullan:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- DNS değişikliği yayılana kadar (birkaç saat sürebilir) Settings → Pages'te "DNS check" bekleyebilir; sonrasında "Enforce HTTPS" kutucuğunu işaretle.

## 3) İçerik güncelleme

- **Portfolyo kartları**: `script.js` içindeki `reels` listesi. Her kart bir `title`, `desc` ve `href` alır. Şu an linkler mevcut Wix alt sayfalarına gidiyor (site çalışır durumda kalsın diye) — kendi video/embed sayfalarını hazırladıkça `href` değerlerini oraya güncelle.
- **Telefon / e-posta / sosyal medya**: `index.html` içinde `#iletisim` bölümünde.
- **Metinler** (başlık, bio, istatistikler): `index.html` içinde ilgili bölümlerde düz Türkçe metin olarak duruyor, doğrudan düzenlenebilir.
- **Renkler / yazı tipleri**: `style.css` en üstteki `:root` bloğunda (`--amber`, `--teal`, `--bg` vb. değişkenler).

## 4) Görsel/video eklemek

Şu an tasarım metin ve renk ağırlıklı ("viewfinder" arayüzü, film HUD'u), gerçek görsel/video yok. Kendi kapak görsellerini veya video önizlemelerini eklemek istersen:

1. Görselleri repo içine bir `assets/` klasörü açıp oraya koy.
2. `.reel` kartlarına (`script.js` → `renderReels`) arka plan görseli veya `<video>` etiketi ekleyebilirsin; istersen bu adımda tekrar yardım isteyebilirsin.

## Notlar

- Yazı tipleri (Big Shoulders Display, IBM Plex Mono, Inter) Google Fonts CDN'den yükleniyor — siteye internetten erişildiğinde otomatik çalışır.
- Mobil menü, saat/timecode animasyonu ve scroll-reveal efektleri saf JavaScript ile yazıldı, ek kütüphane gerekmiyor.
- `prefers-reduced-motion` ayarı açık olan kullanıcılar için animasyonlar otomatik kısıtlanıyor.
