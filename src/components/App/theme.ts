// TODO: move to src/theme
import {
  defineStyleConfig,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
    config,
    styles: {
      global: {
        "html, body, #root": {
          height: "100%",
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "purple",
    components: ["IconButton", "Button"],
  })
);

export default theme;
