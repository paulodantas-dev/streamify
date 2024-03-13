import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Streamify - APP",
  description: "Streamify - APP",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={roboto.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
