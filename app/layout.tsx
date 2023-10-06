import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import Navbar from "./Navbar";

export const metadata = {
  title: "ABCAI Moderator",
  description: "An AI Based moderator using ABCI++",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ backgroundColor: "#f5f8fa" }}>
        <MantineProvider>
          <Navbar />
          <Container size="md">{children}</Container>
        </MantineProvider>
      </body>
    </html>
  );
}
