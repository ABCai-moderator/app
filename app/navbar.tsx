"use client";

import { Group, Container, Text } from "@mantine/core";
import classes from "./Navbar.module.css";

const links = [
  { link: "https://github.com/Vvaradinov/ABCAI-moderator", label: "Github" },
];

import Image from "next/image";

export default function Navbar() {
  const items = links.map((link) => {
    return (
      <a key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Group gap={5} visibleFrom="sm">
            <Image src="/icon-s.png" alt="" width={30} height={30} />
            <Text
              size="lg"
              fw={700}
              style={{
                fontFamily: "monospace",
              }}
            >
              ABC<span style={{ color: "#0489e5" }}>ai</span>++
            </Text>
          </Group>

          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
        </div>
      </Container>
    </header>
  );
}
