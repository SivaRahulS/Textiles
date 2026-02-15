import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Custom Clothing App",
};

export default function RootLayout({ children }) {
  console.log("layout RENDERED");
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
