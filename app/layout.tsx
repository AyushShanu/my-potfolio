import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { MainLayout } from '@/components/layout/main-layout';
import { Toaster } from '@/components/ui/toaster';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { CustomCursor } from '@/components/ui/custom-cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Futuristic Developer Portfolio',
  description: 'An interactive 3D portfolio showcasing frontend development, design, and AI integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <div className="bg-noise" />
            <CustomCursor />
            <MainLayout>
              {children}
            </MainLayout>
            <Toaster  />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}