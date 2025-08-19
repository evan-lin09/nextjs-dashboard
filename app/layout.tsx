import '@/app/ui/global.css';
import { inter, lusitana } from '@/app/ui/fonts'
import Header from './components/layout/header';
import Sidebar from './components/layout/sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="h-screen bg-black text-white flex flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-gray-950 p-4 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
