import React from 'react';
import useStyles from './Footer.style';
import FooterHorizontalMenu from './FooterHorizontalMenu';
import FooterBottomMenu from './FooterBottomMenu';
import { OrangeAirBalloonIcon, CloudIcon } from '../common/Icons/MiscIcons';
import { BackgroundOne, BackgroundTwo, BackgroundTop } from './FooterBackground';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

class Footer extends React.Component {
    render() {
        const classes = this.props.classes;
        const isDesktop = window.innerWidth >= process.env.REACT_APP_WIDTH;

        return (
            <div className={classes.root} role="contentinfo">

                <div className={classes.top}>
                    <BackgroundTop classes={classes} />
                </div>
                <BackgroundOne className={classes.background} />
                <BackgroundTwo className={classes.background} />
                <FooterHorizontalMenu></FooterHorizontalMenu>
                {isDesktop ? null : <div className={classes.animationBox}>
                    <OrangeAirBalloonIcon className={classes.orangeBalloon} />
                    <CloudIcon className={classes.cloud} />
                </div>}
                <FooterBottomMenu></FooterBottomMenu>
                <div className={classes.disclaimer}>&#169; כל הזכויות שמורות להראל ביטוח ופיננסים.<br role="presentation"/>
                    הראל הינה קבוצת חברות הביטוח והפיננסים מהגדולות ומהמובילות בישראל. הראל מציעה ביטוחי בריאות, ביטוחי חיים, ביטוח אלמנטרי, מוצרי חיסכון פנסיוני ושירותים פיננסים נוספים.</div>

            </div>
        );
    }
}

export default withWidth()(useStyles(Footer));