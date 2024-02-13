import React from 'react';
import { DefaultTheme,createGenerateClassName ,StylesProvider} from 'common-ui';
import { ThemeProvider } from '@material-ui/styles';
import Footer from './Footer';
const generateClassName = createGenerateClassName({ seed: 'CF' });

function IndependentFooter() {
    return (
        <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={DefaultTheme} >
            <Footer />
        </ThemeProvider>
        </StylesProvider>
    );
}

export default IndependentFooter;