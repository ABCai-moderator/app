"use client";

import { Group, Container } from "@mantine/core";
import classes from "./navbar.module.css";

const links = [
  { link: "https://github.com/Vvaradinov/ABCAI-moderator", label: "Github" },
];

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
          ABCAI Moderator
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
        </div>
      </Container>
    </header>
  );
}
