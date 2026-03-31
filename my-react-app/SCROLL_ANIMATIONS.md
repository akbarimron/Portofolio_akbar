# 🎨 Scroll Animations Documentation

## Overview
Portfolio sekarang dilengkapi dengan sistem scroll animations yang dinamis dan smooth menggunakan IntersectionObserver API dan CSS keyframes.

---

## 🎯 Animation Types

### 1. **reveal** (Default)
Fade in + slide up animation
```jsx
<div className="reveal">Content</div>
```
- Default delay: 0.1s
- Duration: 0.65s
- Easing: ease

### 2. **reveal-up**
Animated slide up dari bawah
```jsx
<div className="reveal-up">Content</div>
```
- Duration: 0.7s
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (elastic effect)

### 3. **reveal-down**
Animated slide down dari atas
```jsx
<div className="reveal-down">Content</div>
```
- Duration: 0.7s
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

### 4. **reveal-left**
Animated slide left dari kanan
```jsx
<div className="reveal-left">Content</div>
```
- Duration: 0.7s
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

### 5. **reveal-right**
Animated slide right dari kiri
```jsx
<div className="reveal-right">Content</div>
```
- Duration: 0.7s
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

### 6. **reveal-scale**
Scale up animation dari 0.85 ke 1
```jsx
<div className="reveal-scale">Content</div>
```
- Duration: 0.7s
- Transform: scale(0.85) → scale(1)

### 7. **reveal-fade**
Opacity animation saja (no transform)
```jsx
<div className="reveal-fade">Content</div>
```
- Duration: 0.8s
- Easing: ease

### 8. **reveal-parallax**
Parallax effect untuk elemen bergerak dengan scroll
```jsx
<div className="reveal-parallax" data-parallax="0.5">Content</div>
```
- data-parallax: kecepatan parallax (0.5 = setengah kecepatan scroll)

---

## ⏱️ Animation Delays

### Menggunakan Inline Styles
```jsx
<div className="reveal-up" style={{ animationDelay: '0.2s' }}>First Item</div>
<div className="reveal-up" style={{ animationDelay: '0.3s' }}>Second Item</div>
<div className="reveal-up" style={{ animationDelay: '0.4s' }}>Third Item</div>
```

### Bagus untuk Staggered Animations
```jsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="reveal-up"
    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
  >
    {item.content}
  </div>
))}
```

---

## 🚀 Parallax Effect

### Setup
Tambahkan `data-parallax` attribute dengan nilai kecepatan:

```jsx
<div className="reveal-parallax" data-parallax="0.5">
  Background Element
</div>
```

### Nilai Parallax Common
- `0.2` - Sangat lambat, jauh di belakang
- `0.5` - Moderate, medium parallax
- `0.8` - Cepat, dekat ke viewer
- `1.0` - Sama dengan scroll speed (tidak ada parallax)

---

## 📋 Current Implementation

### Hero Section
- **hero-left-intro**: reveal-up dengan delay 0.3s
- **hero-tags**: reveal-up dengan delay 0.6s
- **hero-desc**: reveal-up dengan delay 0.7s
- **btn-contact**: reveal-up dengan delay 0.8s
- **hero-side-panel**: reveal-right dengan delay 0.6s
- **stat-blocks**: reveal-scale dengan delay staggered (0.7s, 0.8s, 0.9s)

### Who Section
- **who-grid**: reveal-up
- **who-text**: reveal-left dengan delay 0.1s
- **who-title**: reveal-up dengan delay 0.1s
- **who-line**: reveal-up dengan delay 0.2s
- **paragraphs**: reveal-up dengan delay 0.3s dan 0.4s
- **who-photo**: reveal-right dengan delay 0.2s

### About Section
- **about-h**: reveal-up
- **about-sub**: reveal-up dengan delay 0.1s
- **acard**: reveal-scale dengan delay staggered (0.1s - 0.4s)
- **tools chips**: reveal-up dengan delay staggered

### Projects Section
- **proj-main-h**: reveal-up
- **proj-main-sub**: reveal-up dengan delay 0.1s
- **pcard**: reveal-scale dengan delay staggered
- **buttons**: reveal-up dengan delay

### Contact Section
- **contact-h**: reveal-up
- **contact-sub**: reveal-up dengan delay 0.1s
- **left column**: reveal-left dengan delay 0.2s
- **form inputs**: reveal-up dengan delay staggered (0.35s - 0.5s)
- **submit button**: reveal-up dengan delay 0.5s

### Footer
- **footer text**: reveal-fade dengan delay 0.1s dan 0.2s

---

## 🎮 JavaScript Setup

### Automatic Setup di App.tsx
```tsx
import { setupAdvancedScrollAnimations, setupNavScroll } from './utils/animations';

useEffect(() => {
  setupAdvancedScrollAnimations();
  setupNavScroll();
}, []);
```

### Functions Available:
1. **setupScrollReveal()** - Inisialisasi basic reveal animations
2. **setupParallaxScroll()** - Inisialisasi parallax effects
3. **setupAdvancedScrollAnimations()** - Kombinasi keduanya

---

## 🛠️ CSS Customization

### Mengubah Duration
Edit di `src/styles/global.css`:
```css
.reveal-up {
  transition: opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s,
              transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
}
```

### Mengubah Easing Function
- `ease` - Smooth ease-in-out
- `linear` - Constant speed
- `cubic-bezier(0.34, 1.56, 0.64, 1)` - Elastic/bounce effect
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Smooth ease

---

## 📱 Responsive Behavior

Semua animations bekerja di semua screen sizes:
- Desktop (1400px+)
- Tablet (768px - 1399px)
- Mobile (400px - 767px)
- Ultra Mobile (<400px)

Timing dan easing tetap konsisten untuk pengalaman yang smooth.

---

## 🐛 Troubleshooting

### Animasi tidak muncul?
1. Pastikan element memiliki class yang tepat (`reveal-up`, `reveal-left`, dll)
2. Cek console untuk error
3. Pastikan `setupAdvancedScrollAnimations()` dipanggil di App.tsx

### Animasi terjadi terlalu cepat/lambat?
- Ubah `transition` duration di global.css
- Sesuaikan `threshold` di IntersectionObserver (default: 0.1)

### Parallax tidak bekerja?
- Pastikan element memiliki `data-parallax` attribute
- Nilai harus number (0-1 yang umum)

---

## 🎨 Best Practices

1. **Gunakan delay untuk stagger effects**
   ```jsx
   style={{ animationDelay: `${index * 0.1}s` }}
   ```

2. **Kombinasikan animation types yang berbeda**
   - Judul: reveal-left
   - Content: reveal-up
   - Side elements: reveal-right
   - Cards: reveal-scale

3. **Hindari animasi yang terlalu banyak**
   - Limit ke 3-4 elements dengan delay yang berbeda
   - Gunakan `reveal-fade` untuk text yang panjang

4. **Test di berbagai devices**
   - Desktop
   - Tablet
   - Mobile

---

## 📊 Performance

- Menggunakan IntersectionObserver API (efficient dan native)
- Hardware-accelerated transforms (GPU)
- Hanya animate pada element yang visible
- No javascript reflow/repaint yang berlebihan

---

## 🔄 Update Instructions

Untuk menambahkan animations ke component baru:

1. Import component di main section
2. Wrap content dengan className reveal-*
3. Tambahkan inline style untuk delay jika perlu

```jsx
<div className="sw center">
  <h2 className="reveal-up">Title</h2>
  <div className="reveal-left" style={{ animationDelay: '0.1s' }}>
    Content
  </div>
</div>
```

---

## ✨ Demo

Scroll melalui portfolio untuk melihat:
- Fade in & slide up animations
- Staggered card reveals
- Parallax effects pada background & side panels
- Smooth transitions antara sections

Enjoy! 🚀
