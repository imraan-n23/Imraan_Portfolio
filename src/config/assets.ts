export const assets = {
  heroFace: {
    flat: '/assets/hero-face.png' as string | null,
    layers: null as { base: string; eyes: string; lids: string; mouth: string } | null,
  },

  frame: {
    video: null as string | null,
    poster: null as string | null,
    image: '/assets/profile.jpeg' as string | null,
    fit: 'cover' as 'cover' | 'contain',
    position: '50% 50%',
    key: null as { low: number; high: number } | null,
  },

  nameCutout: {
    src: '/assets/profile-cutout.png' as string | null,
    width: 1254,
    height: 1254,
    sticker: true,
  },

  avatar: '/assets/avatar.webp' as string | null,

  studio: [
    '/assets/projects/project-01.webp',
    '/assets/projects/project-02.webp',
    '/assets/projects/project-03.webp',
    '/assets/projects/project-04.webp',
    '/assets/projects/project-05.webp',
    '/assets/projects/project-06.webp',
  ] as (string | null)[],

  signature: null as string | null,
} as const
