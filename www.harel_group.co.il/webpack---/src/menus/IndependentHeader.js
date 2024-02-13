import React from 'react';
import { DefaultTheme,createGenerateClassName,StylesProvider } from 'common-ui';
import { ThemeProvider } from '@material-ui/styles';
import Navigation from './Navigation';
import ShortcutsSpriteSVG from '../common/Icons/ShortcutsIcons';
const generateClassName = createGenerateClassName({ seed: 'CH' });

function IndependentHeader() {
    return (
        <React.Fragment>
            <ShortcutsSpriteSVG />
            <StylesProvider generateClassName={generateClassName}>
            <ThemeProvider theme={DefaultTheme}>
                <Navigation />
            </ThemeProvider>
            </StylesProvider>
        </React.Fragment>
    );
}

export default IndependentHeader;