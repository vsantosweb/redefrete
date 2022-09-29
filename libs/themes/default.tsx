import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { extendTheme, withDefaultProps, ChakraProvider } from "@chakra-ui/react";
import GlobalStyles, { ViewPort } from "./GlobalStyles";

export type ThemeProps = {
  defaultContainer: any
  colors: any
  fonts: any
  defaultRadius: string
}

export const theme: ThemeProps = {
  defaultContainer: {
    width: "980px",
    spacing: ".9em",
  },

  colors: {
    primary: "#191919",
    secondary: "#ff1a2d",
    text: "#333",
    background: "#fff",
    error: "#ee2728",
    success: "#10d08e",
    warning: "#ffA214",
    info: "#28abeb",
  },

  fonts: {
    body: "Helvetica Neue, Helvetica, Arial, sans-serif",
    heading: "Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  defaultRadius: "12px",
};

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px) translateX(-10px)',
}

const variantOutlined = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
      boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
    }
  }
});

const variantFilled = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
    }
  }
});

const variantFlushed = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
    },
    borderBottom: 'solid 2px'
  }
});

// Chakra theme extension
const charkaExtendThemeConfig = {

  config: {
    useSystemColorMode: true,
  },
  colors: {
    primary: {
      50: theme.colors.primary,
      100: theme.colors.primary,
      500: theme.colors.primary, // you need this
    },
    secondary: {
      50: theme.colors.secondary,
      100: theme.colors.secondary,
      500: theme.colors.secondary, // you need this
    }
  },
  components: {
    // Steps,
    Alert: {
      defaultProps: {
        borderRadius: theme.defaultRadius,
      },
    },
    Input: {
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed
      }
    },
    FormLabel: {
      baseStyle: {
        // margin: 0
      }
    }
  },
};

export const chakraTheme = extendTheme(withDefaultProps({
  defaultProps: {
    variant: 'outline',
  },
  components: ['Input', 'NumberInput', 'PinInput', 'Select'],
}), charkaExtendThemeConfig);

const Theme = ({ children }: any) => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
};

export default Theme;
