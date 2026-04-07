import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { ThemeWrapper } from "./Theme";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "LockerPass",
  description: "A full-stack password manager app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeWrapper>
            {children}
            <Toaster richColors position="bottom-left" />
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
