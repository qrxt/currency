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

interface NavItemProps {
  text: string;
  icon: IconType;
  isCurrent: boolean;
  to: string;
}

function NavItem(props: NavItemProps) {
  const { text, icon, isCurrent, to } = props;
  const inactiveIconColor = useColorModeValue("black", "white");

  const activeLinkStyles = css`
    &::before {
      content: "";
      display: block;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      width: 3px;
      background: #805ad5;
    }
  `;

  return (
    <ListItem p={3} css={isCurrent ? activeLinkStyles : ""} position="relative">
      <Flex alignItems="center">
        <ListIcon
          as={icon}
          color={isCurrent ? "purple.500" : inactiveIconColor}
        />
        <Link as={RouterLink} to={to}>
          <Text fontWeight={isCurrent ? "medium" : "normal"}>{text}</Text>
        </Link>
      </Flex>
    </ListItem>
  );
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

      <Box>
        <VStack as="nav">
          <List w="100%">
            {map(routes, (route) => {
              const isCurrent = pathname === route.url;

              return (
                <NavItem
                  to={route.url}
                  text={route.name}
                  icon={route.icon}
                  isCurrent={isCurrent}
                />
              );
            })}
          </List>
        </VStack>
      </Box>
    </Box>
  );
}

export default Sidebar;
