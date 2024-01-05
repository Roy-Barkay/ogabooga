export const hexToRgbA = (hex) => { //hexToRgbA('#fbafff') -> rgba(251,175,255,1)
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
    }
    throw new Error('Bad Hex -> ', hex);
}


export const openErrorModal = () => {
    dispatchEvent(new Event('openErrorModal'));
};

export const openOnlineBankingModal = () => {
    dispatchEvent(new Event('openOnlineBankingModal'));
};

export const getAnimationDefaultOptions = (animationData) => {
    return {
        loop: 1,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
};

