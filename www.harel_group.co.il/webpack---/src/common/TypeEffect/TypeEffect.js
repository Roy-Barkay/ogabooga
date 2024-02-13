import React, { useState, useEffect } from 'react';
import useStyles, { maxSizeStyles } from './TypeEffect.style';
import clsx from 'clsx';

const config = { charDelay: 100, deleteDelay: 50, delaySteps: 20 };

const TypeEffect = React.forwardRef((props, ref) => {
    const [currentString, setCurrentString] = useState(0);
    const typing = props.strings.map(i => <TypeEffectSingleString string={i} finish={() => setCurrentString(i => (i + 1) % props.strings.length)} />);

    const classes = maxSizeStyles(props.maxWidth);
    return (
        <div ref={ref} className={clsx(classes.root, props.className)}>
            {typing[currentString]}
        </div>
    );
});

function TypeEffectSingleString(props) {

    const [keyFrames, setKeyFrames] = useState({});
    const [typingNow, setTypingNow] = useState(true);

    let divi = React.createRef();

    useEffect(() => {
        if (!keyFrames[props.string]) {
            let frames = { '0%': { width: 0 } };
            let step = 100 / (props.string.length + config.delaySteps);
            let current = step;
            for (let i = 1; i <= config.delaySteps; i++) {
                frames[current + '%'] = { width: '0px' };
                current += step;
            }
            for (let i = 1; i <= props.string.length; i++) {
                divi.current.innerHTML = props.string.substring(0, i).replace(/\s/g, '&nbsp;');
                if (i === props.string.length) current = 100;
                frames[current + '%'] = { width: divi.current.offsetWidth + 'px' };
                current += step;
            }

            //console.log(frames);
            setKeyFrames(k => { return { ...k, [props.string]: frames } });
        }
    }, [props, keyFrames, divi]);

    const classes = useStyles(config, keyFrames[props.string], props.string.length);

    return (
        <div ref={divi}
            className={clsx(classes.typewriterText, typingNow ? classes.typingAnimation : classes.deletingAnimation)}
            onAnimationEnd={(e) => setTypingNow(s => {
                if (!s)
                    props.finish();
                return !s;
            })}>{keyFrames[props.string] && props.string}</div>
    );
}

export default (TypeEffect);
