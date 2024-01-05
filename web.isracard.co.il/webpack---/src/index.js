import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createGenerateClassName, StylesProvider } from "@mui/styles";
import { StyledEngineProvider } from "@mui/material";

let appClassName = "online-banking-app";

const cacheRtl = createCache({
    key: `css-${appClassName}`,
    prepend: true,
    stylisPlugins: [rtlPlugin],
});


const generatedClassName = createGenerateClassName({
    //seed: "FooterMain",
    productionPrefix: `jss-${appClassName}`,
});
const theme = createTheme({
    ...window.theme,
});

ReactDOM.render(
    <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
            <StylesProvider generateClassName={generatedClassName}>
                    <App />
                </StylesProvider>
            </StyledEngineProvider>
        </ThemeProvider>
    </CacheProvider>,
    document.getElementById("Digital.SiteContainer.OnlineBankingModal")
);
