import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Guerra Logística Mecânica',
    short_name: 'GuerraLog',
    description: 'Gestão de Oficina PWA',
    start_url: '/',
    display: 'standalone',
    background_color: '#05070a',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
