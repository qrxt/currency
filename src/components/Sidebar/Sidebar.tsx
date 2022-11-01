import React from "react";
import {
  Box,
  Divider,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import Logo from "components/Logo";
import { IconType } from "react-icons/lib";
import routes from "lib/routes";
import { map } from "lodash";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { motion, AnimateSharedLayout } from "framer-motion";

interface NavItemProps {
  text: string;
  icon: IconType;
  isCurrent: boolean;
  to: string;
}

function NavItem(props: NavItemProps) {
  const { text, icon, isCurrent, to } = props;
  const inactiveIconColor = useColorModeValue("black", "white");

  return (
    <ListItem p={3} position="relative">
      <Flex alignItems="center" as={motion.div}>
        <ListIcon
          as={icon}
          color={isCurrent ? "purple.500" : inactiveIconColor}
        />
        <Link as={RouterLink} to={to}>
          {isCurrent && <ActiveLine />}
          <Text fontWeight={isCurrent ? "medium" : "normal"}>{text}</Text>
        </Link>
      </Flex>
    </ListItem>
  );
}

function ActiveLine() {
  const activeLineStyles = css`
    height: 100%;
    width: 3px;
    right: 0;
    top: 0;
    position: absolute;
    background: #805ad5;
  `;

  return <motion.div layoutId="activeItem" css={activeLineStyles}></motion.div>;
}

function Sidebar() {
  const { pathname } = useLocation();
  const sidebarStyles = css`
    grid-area: sidebar;
  `;

  return (
    <Box as="aside" css={sidebarStyles}>
      <Box h={90}>
        <Flex justifyContent="center" alignItems="center" h="100%">
          <Logo />
        </Flex>
      </Box>
      <Divider mb="16" />

      <Box as={motion.div} layout>
        <VStack as="nav">
          <List w="100%" position="relative">
            <AnimateSharedLayout>
              {map(routes, (route) => {
                const isCurrent = pathname === route.url;

                return (
                  <NavItem
                    key={route.name}
                    to={route.url}
                    text={route.name}
                    icon={route.icon}
                    isCurrent={isCurrent}
                  />
                );
              })}
            </AnimateSharedLayout>
          </List>
        </VStack>
      </Box>
    </Box>
  );
}

export default Sidebar;
