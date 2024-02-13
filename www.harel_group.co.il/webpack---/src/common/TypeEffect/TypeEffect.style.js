import { createStyles, makeStyles } from 'common-ui';

const TypeEffectStyles = (config, animation, steps) => makeStyles(theme => createStyles({
    root: {

        [theme.breakpoints.up('md')]: {

        },
    },
    hidden: {
        position: 'absolute',
        visibility: 'hidden',
        whiteSpace: 'nowrap',
    },
    typewriterText: {
        display: 'inline-block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderLeft: '1px solid black',
        boxSizing: 'border-box',
        width: 0,
    },
    typingAnimation: {
        animation: `$typing ${(steps + config.delaySteps)*config.charDelay}ms steps(1, end), $blink 1s step-end infinite`,
        width: 'auto',
    },
    deletingAnimation: {
        animation: `$typing ${(steps)*config.deleteDelay}ms steps(1, end) 5s 1 reverse, $blink 1s step-end infinite`,
        width: 'auto',
    },
    '@keyframes blink': {
        'from, to': {
            borderColor: 'transparent',
        },
        '50%': {
            borderColor: 'black',
        },
    },
    '@keyframes typing': animation,
}))();

export default TypeEffectStyles;

export const maxSizeStyles = (width) => makeStyles(theme => createStyles({
    root: {
        display: 'inline-block',
        maxWidth: width ? `${width}px` : undefined,
        overflow: 'hidden',
        
        [theme.breakpoints.up('md')]: {

        },
    },
}))();
