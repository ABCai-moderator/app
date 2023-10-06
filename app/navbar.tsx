"use client";

import { Menu, Group, Center, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMenu.module.css";

const links = [
  { link: "https://github.com/Vvaradinov/ABCAI-moderator", label: "Github" },
];

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);

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
