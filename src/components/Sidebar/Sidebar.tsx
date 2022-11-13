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
  Hide,
  Show,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerContent,
  CloseButton,
  DrawerOverlay,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import Logo from "components/Logo";
import { IconType } from "react-icons/lib";
import { FiMenu as IconMenu } from "react-icons/fi";
import { useRoutes } from "../../lib/hooks/useRoutes";
import map from "lodash/map";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import StatusBar from "components/StatusBar";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

interface NavItemProps {
  text: string;
  icon: IconType;
  isCurrent: boolean;
  to: string;
  onItemClick?: () => void;
}

function NavItem(props: NavItemProps) {
  const { text, icon, isCurrent, to, onItemClick = () => null } = props;
  const inactiveIconColor = useColorModeValue("black", "whiteAlpha.900");

  return (
    <ListItem p={3} position="relative" onClick={onItemClick}>
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
    @media (min-width: 630px) {
      height: 100%;
      width: 3px;
      right: 0;
      top: 0;
      position: absolute;
      background: #805ad5;
    }
  `;

  return <motion.div layoutId="activeItem" css={activeLineStyles}></motion.div>;
}

interface NavMenuProps {
  onItemClick?: () => void;
}

export function NavMenu(props: NavMenuProps) {
  const { onItemClick } = props;
  const { pathname } = useLocation();
  const routes = useRoutes();

  return (
    <Box as={motion.div} layout>
      <VStack as="nav">
        <List w="100%" position="relative">
          {map(routes, (route) => {
            const isCurrent = pathname === route.url;

            return (
              <NavItem
                key={route.name}
                to={route.url}
                text={route.name}
                icon={route.icon}
                isCurrent={isCurrent}
                onItemClick={onItemClick}
              />
            );
          })}
        </List>
      </VStack>
    </Box>
  );
}

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const [baseCurrencyCookie] = useCookies(["base-currency"]);
  const baseCurrency = baseCurrencyCookie["base-currency"];

  const sidebarStyles = css`
    grid-area: sidebar;
  `;

  return (
    <Box as="aside" css={sidebarStyles}>
      <Hide above="630px">
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerOverlay />
          <DrawerContent>
            <Box p={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <StatusBar baseCurrency={baseCurrency} variant="ghost" />
                <CloseButton
                  display={{ base: "flex", md: "none" }}
                  onClick={onClose}
                  size="lg"
                />
              </Flex>
            </Box>
            <Divider />
            <Flex py={6}>
              <NavMenu onItemClick={onClose} />
            </Flex>
          </DrawerContent>
        </Drawer>
      </Hide>

      <Box h={90}>
        <Flex
          justifyContent={[
            "space-between",
            "space-between",
            "center",
            "center",
          ]}
          alignItems="center"
          h="100%"
          px={6}
        >
          <Link as={RouterLink} to={"/"} title={t("common.home")}>
            <Logo />
          </Link>
          <Hide above="630px">
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              variant="outline"
              aria-label="open menu"
              icon={<IconMenu />}
            />
          </Hide>
        </Flex>
      </Box>
      <Divider mb={[0, 0, 16, 16]} />

      <Show above="630px">
        <NavMenu />
      </Show>
    </Box>
  );
}

export default Sidebar;
