import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Picorules Atlas',
  description: 'Explore composable clinical phenotypes through shared findings and authored Picorules ruleblocks.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
