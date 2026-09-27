import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Picorules Atlas',
  description: 'A structured clinical assessment scaffold generated from Picorules collections.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
