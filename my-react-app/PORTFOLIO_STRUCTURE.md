# Portfolio Project Structure

Portofolio Anda telah diubah dari HTML monolitik menjadi struktur React modular yang rapi dan scalable.

## 📁 Struktur Folder

```
src/
├── components/                    # React Components
│   ├── Navigation/               # Navigation bar
│   │   ├── Navigation.tsx
│   │   └── Navigation.css
│   ├── SocialBar/               # Social media links
│   │   ├── SocialBar.tsx
│   │   └── SocialBar.css
│   ├── Hero/                    # Hero section
│   │   ├── Hero.tsx
│   │   └── Hero.css
│   ├── Who/                     # Who am I section
│   │   ├── Who.tsx
│   │   └── Who.css
│   ├── About/                   # About me section
│   │   ├── About.tsx
│   │   └── About.css
│   ├── Projects/                # Projects showcase
│   │   ├── Projects.tsx
│   │   └── Projects.css
│   ├── Contact/                 # Contact form
│   │   ├── Contact.tsx
│   │   └── Contact.css
│   ├── Footer/                  # Footer
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   └── Background/              # Canvas & animations
│       ├── Background.tsx       # Canvas animations
│       ├── FloatingCode.tsx     # Floating code snippets
│       ├── Background.css
│       └── FloatingCode.css
├── utils/                       # Utility functions
│   ├── constants.ts            # Data & constants
│   └── animations.ts           # Animation helpers
├── styles/                      # Global styles
│   └── global.css              # Dark theme & base styles
├── App.tsx                      # Main app component
├── App.css                      # App-specific styles
├── main.tsx                     # Entry point
└── index.css                    # (deprecated - use global.css)
```

## 🎨 Files Overview

### Components
Setiap section dari portfolio adalah component terpisah dengan CSS-nya sendiri:
- **Navigation.tsx** - Navigation bar dengan smooth scroll
- **SocialBar.tsx** - Links ke social media (Instagram, LinkedIn, GitHub)
- **Hero.tsx** - Section utama dengan intro dan stats
- **Who.tsx** - Informasi tentang Anda
- **About.tsx** - Skills & tools yang digunakan
- **Projects.tsx** - Showcase web & video projects
- **Contact.tsx** - Formulir kontak
- **Footer.tsx** - Footer dengan copyright & links

### Background Effects
- **Background.tsx** - Canvas-based 3D cube & particle animations
- **FloatingCode.tsx** - Floating code snippets dengan typing animation

### Utilities
- **constants.ts** - Semua data (projects, tools, snippets, warna, etc)
- **animations.ts** - Functions untuk animations (scroll reveal, canvas drawing, etc)

### Styles
- **global.css** - CSS variables, theme, dan global styles
- Setiap component memiliki CSS-nya sendiri

## 🎯 Key Features

✅ **Modular** - Mudah untuk update/edit individual sections
✅ **Responsive** - Mobile-friendly design
✅ **Performance** - Optimized animations dengan React hooks
✅ **Dark Theme** - Modern dark theme dengan purple accent
✅ **Interactive** - Canvas animations, scroll reveals, hover effects
✅ **Scalable** - Easy to add new projects, tools, atau sections

## 🔄 How It Works

1. **App.tsx** - Main component yang mengimport semua sections
2. **useEffect** hooks - Setup scroll animations & nav scrolling
3. **Components** - Setiap component independent & reusable
4. **Animations** - Utility functions handle canvas & DOM animations
5. **Data** - Semua data di `constants.ts` untuk easy maintenance

## 📝 Mengubah Data

### Edit Projects
Buka `src/utils/constants.ts` dan edit `WEB_PROJECTS` atau `VIDEO_PROJECTS`:

```typescript
export const WEB_PROJECTS = [
  {
    id: 1,
    title: 'Project Name',
    desc: 'Project description',
    tags: ['React', 'Firebase'],
    icon: '🏛️',
    bgGradient: 'linear-gradient(...)',
  },
  // Add more...
];
```

### Edit Tools/Technologies
Edit `TOOLS_TECH` array di `constants.ts`.

### Edit Skills/About Cards
Edit `ABOUT_CARDS` array di `constants.ts`.

### Edit Colors
Modifikasi CSS variables di `src/styles/global.css`:

```css
:root {
  --purple: #7c6fcd;
  --purple2: #9d8fe0;
  /* dll */
}
```

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build untuk production
npm run build
```

## 📌 Tips

- Setiap component memiliki CSS scope-nya sendiri
- Data disentralisasi di `constants.ts` untuk maintenance mudah
- Animations di `animations.ts` reusable & testable
- Global styles di `global.css` untuk consistency
- Responsive breakpoints: 900px, 560px

## 🎨 Customization

Untuk customize lebih lanjut:
1. Edit content di `constants.ts`
2. Modify CSS di component CSS files
3. Add new components following existing pattern
4. Update animations di `animations.ts` jika diperlukan

---

**Happy coding! 🚀**
