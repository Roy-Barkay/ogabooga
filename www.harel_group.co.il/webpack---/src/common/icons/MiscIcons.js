import React from 'react';
import MSvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from 'common-ui';

const useStyles = makeStyles(theme => ({
  mainDown: {
    color: theme.palette.primary.main,
  },
  small: {
    width: '8px'
  },
  smallUp: {
    width: '8px',
    transform: 'rotate(180deg)'
  },
}));
export function LeftIcon(props) {
  return (
    <MSvgIcon {...props} id="DownIcon" width="8" height="4" viewBox="0 0 8 4">
      <path fill="none" fillRule="evenodd" stroke="#052f58" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M 4 6 L 0 2 l 4 -4" />
    </MSvgIcon>
  );
}
export function ArrowIcon(props) {
  let classes = useStyles();

  let use = null;
  switch (props.type) {
    case 'small':
      use = classes.small;
      break;
    case 'smallUp':
      use = classes.smallUp;
      break;
    default:
      use = classes.mainDown;
      break;
  }

  return (
    <MSvgIcon className={use} {...props} viewBox="0 0 11 6" >
      <path d="M8.28412817,3.54455656 L3.75827398,8.27423497 C3.47037499,8.57525501 3.00359612,8.57525501 2.71583689,8.27423497 C2.42805437,7.97348273 2.42805437,7.48569151 2.71583689,7.1849636 L6.72051912,2.99992088 L2.71595336,-1.18497578 C2.42817084,-1.48584975 2.42817084,-1.97359228 2.71595336,-2.27434452 C3.00373588,-2.57521849 3.47049146,-2.57521849 3.75839045,-2.27434452 L8.28424464,2.45540692 C8.4281359,2.60585608 8.5,2.80282762 8.5,2.99989654 C8.5,3.19706283 8.42799613,3.39418044 8.28412817,3.54455656 Z" transform="translate(5.500000, 3.000000) rotate(-270.000000) translate(-5.500000, -3.000000)"></path>
    </MSvgIcon>
  );
}

export function MagnyfingGlassIcon(props) {
  return (
    <MSvgIcon {...props} viewBox="0 0 20 20" >
      <path d="M19.755102,18.5795918 L14.9469388,13.7714286 C16.1387755,12.3183673 16.8571429,10.4571429 16.8571429,8.42857143 C16.8571429,3.7755102 13.0816327,-1.13686838e-13 8.42857143,-1.13686838e-13 C3.77142857,-1.13686838e-13 0,3.7755102 0,8.42857143 C0,13.0816327 3.77142857,16.8571429 8.42857143,16.8571429 C10.4571429,16.8571429 12.3142857,16.1428571 13.7673469,14.9510204 L18.5755102,19.755102 C18.9020408,20.0816327 19.4285714,20.0816327 19.755102,19.755102 C20.0816327,19.4326531 20.0816327,18.9020408 19.755102,18.5795918 Z M8.42857143,15.1795918 C4.70204082,15.1795918 1.67346939,12.1510204 1.67346939,8.42857143 C1.67346939,4.70612245 4.70204082,1.67346939 8.42857143,1.67346939 C12.1510204,1.67346939 15.1836735,4.70612245 15.1836735,8.42857143 C15.1836735,12.1510204 12.1510204,15.1795918 8.42857143,15.1795918 Z" fillRule="nonzero" />
    </MSvgIcon>
  );
}

export function YellowArrowIcon(props) {
  return (
    <MSvgIcon {...props} viewBox="0 0 8 12" >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <polyline stroke="#F7B207" strokeWidth="2" transform="translate(3.000000, 6.000000) scale(1, -1) rotate(-270.000000) translate(-3.000000, -6.000000) " points="-1 4 3 8 7 4" />
      </g>
    </MSvgIcon>
  );
}

export function OrangeAirBalloonIcon(props) {
  return (
    <MSvgIcon {...props} viewBox="0 0 57 73" >
      <g fill="none" fillRule="evenodd">
        <path fill="#CA8356" d="M31.476 62.993l.785 2.61h.409l-.726-2.61 1.277-2.863-.412-.13zM24 60.13l1.232 2.863-.73 2.798H25l.688-2.827L24.411 60z" />
        <path fill="#CA8356" d="M25.35 63.168h6.472v-.34H25.35z" />
        <g transform="translate(0 .838)">
          <mask id="orangeballoon1" fill="#fff">
            <path d="M1.173 21.048l-.067.002S.71 32.254 10.638 42.57c9.927 10.314 12.616 15.936 12.616 15.936H33.85s2.69-5.622 12.616-15.936C56.392 32.254 56 21.05 56 21.05 56 10 43.726 1.044 28.586 1.044c-15.14 0-27.411 8.955-27.413 20.004z" />
          </mask>
          <path fill="#F7B207" d="M-1.688 62.154h61.412V-1.693H-1.688z" mask="url(#orangeballoon1)" />
        </g>
        <g transform="translate(6.868 1.838)">
          <mask id="orangeballoon2" fill="#fff">
            <path d="M.158 20.048l-.054.002s-.313 11.204 7.587 21.52c7.9 10.314 10.042 15.936 10.042 15.936h8.435s2.14-5.622 10.04-15.936c7.9-10.316 7.588-21.52 7.588-21.52C43.796 9 34.026.044 21.976.044 9.928.044.16 8.999.159 20.048z" />
          </mask>
          <path fill="#FED998" d="M-2.686 61.154h50.202V-2.693H-2.686z" mask="url(#orangeballoon2)" />
        </g>
        <g transform="translate(14.412 1.838)">
          <mask id="orangeballoon3" fill="#fff">
            <path d="M.164 20.048l-.037.002S-.09 31.254 5.402 41.57c5.495 10.314 6.984 15.936 6.984 15.936h5.864s1.489-5.622 6.983-15.936c5.494-10.316 5.277-21.52 5.277-21.52C30.51 9 23.717.044 15.336.044 6.958.044.166 8.999.164 20.048z" />
          </mask>
          <path fill="#F7B207" d="M-2.722 61.154h37.03V-2.693h-37.03z" mask="url(#orangeballoon3)" />
        </g>
        <g transform="translate(21.794 .838)">
          <mask id="orangeballoon4" fill="#fff">
            <path d="M.702 20.81l-.017.002s-.1 11.296 2.449 21.698c2.552 10.4 3.243 16.07 3.243 16.07H9.1s.69-5.67 3.24-16.07c2.552-10.402 2.45-21.698 2.45-21.698C14.79 9.67 11.637.638 7.746.638 3.856.638.704 9.668.702 20.81z" />
          </mask>
          <path fill="#FED998" d="M-2.137 62.258h20.69V-2.121h-20.69z" mask="url(#orangeballoon4)" />
        </g>
        <g transform="translate(23.47 64.544)">
          <mask id="orangeballoon5" fill="#fff">
            <path d="M1.071 1.058v2.805c0 1.005.874 1.82 1.954 1.82h4.22c1.08 0 1.954-.815 1.954-1.82V1.058H1.071z" />
          </mask>
          <path fill="#CA8356" d="M-1.638 8.458h14.45V-1.717h-14.45z" mask="url(#orangeballoon5)" />
        </g>
        <mask id="orangeballoon6" fill="#fff">
          <path d="M20.38 57.154c1.96 2.275 2.652 3.468 2.652 3.468h10.479s.692-1.193 2.652-3.468H20.38z" />
        </mask>
        <path fill="#D76627" d="M18 63.671h22.281V55H18z" mask="url(#orangeballoon6)" />
      </g>
    </MSvgIcon>
  );
}

export function CloudIcon(props) {
  return (
    <MSvgIcon {...props} viewBox="0 0 25 12">
      <path fill="#FFF" fillRule="evenodd" stroke="#D3D4DB" strokeLinejoin="round" d="M.749 8.638c0-2.847 3.202-3.533 4.889-2.212-.307-2.627 2.403-3.11 3.7-1.825-.29-1.534 2.35-3.753 4.763-3.22 2.246.494 3.626 2.817 3.148 4.675 3.615-1.864 7.97 1.227 6.015 4.42-.16.262-1 .824-1.377.824H3.212C2.423 11.3.75 10.283.75 8.638z" />
    </MSvgIcon>
  );
}

export function BlueAirBalloonIcon(props) {
  return (
    <MSvgIcon {...props} viewBox="0 0 29 38">
      <g fill="none" fillRule="evenodd" >
        <path fill="#CA8356" d="M16.686 32.222l.312 1.853.18-.048-.3-1.788.51-1.708-.171-.081zM12.337 30.53l.512 1.71-.302 1.787.18.048.311-1.853-.53-1.772zM13.05 32.355h2.9v-.185h-2.9z" />
        <g>
          <mask id="blueballoon1" fill="#fff">
            <path d="M.037 11.267L0 11.268s-.205 6.303 4.958 12.105c5.163 5.802 6.562 8.965 6.562 8.965h5.511s1.4-3.163 6.563-8.965c5.162-5.802 4.958-12.105 4.958-12.105 0-6.215-6.384-11.254-14.26-11.254C6.42.014.038 5.05.038 11.267z" />
          </mask>
          <path fill="#4A8FE1" d="M-2.677 35.031h33.908v-37.71H-2.677z" mask="url(#blueballoon1)" />
        </g>
        <g transform="translate(2.9)">
          <mask id="blueballoon2" fill="#fff">
            <path d="M.03 11.267l-.03.001s-.174 6.303 4.24 12.105c4.412 5.802 5.608 8.965 5.608 8.965h4.713s1.196-3.163 5.61-8.965c4.413-5.802 4.237-12.105 4.237-12.105C24.408 5.053 18.952.014 12.22.014S.03 5.05.03 11.267z" />
          </mask>
          <path fill="#FEFEFE" d="M-2.712 35.031H27.12v-37.71H-2.712z" mask="url(#blueballoon2)" />
        </g>
        <g transform="translate(7.25)">
          <mask id="blueballoon3" fill="#fff">
            <path d="M.02 11.267l-.02.001s-.117 6.303 2.833 12.105c2.949 5.802 3.747 8.965 3.747 8.965H9.73s.798-3.163 3.747-8.965c2.95-5.802 2.832-12.105 2.832-12.105 0-6.215-3.646-11.254-8.144-11.254C3.667.014.02 5.05.02 11.267z" />
          </mask>
          <path fill="#4A8FE1" d="M-2.718 35.031h21.745v-37.71H-2.718z" mask="url(#blueballoon3)" />
        </g>
        <g transform="translate(11.6)">
          <mask id="blueballoon4" fill="#fff">
            <path d="M.01 11.267l-.01.001s-.051 6.303 1.25 12.105c1.301 5.802 1.654 8.965 1.654 8.965h1.388s.355-3.163 1.656-8.965 1.25-12.105 1.25-12.105C7.198 5.053 5.588.014 3.604.014 1.62.014.01 5.05.01 11.267z" />
          </mask>
          <path fill="#FEFEFE" d="M-2.7 35.031h13.497v-37.71H-2.7z" mask="url(#blueballoon4)" />
        </g>
        <g transform="translate(11.6 32.625)">
          <mask id="blueballoon5" fill="#fff">
            <path d="M0 .015v1.45C0 2.821 1.01 3.92 2.26 3.92h1.37c1.249 0 2.26-1.098 2.26-2.454V.015H0z" />
          </mask>
          <path fill="#CA8356" d="M-2.945 6.847H8.834V-3.89H-2.945z" mask="url(#blueballoon5)" />
        </g>
        <path fill="#003E7A" d="M10.5 30c1.019 1.92 1.38 2.928 1.38 2.928h5.444s.36-1.007 1.379-2.928H10.5z" />
      </g>
    </MSvgIcon>
  );
}
export function CloseIcon(props) {
  return (
    <MSvgIcon {...props} width="87" height="32" viewBox="0 0 17 17">
      <g id="x-gray" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons/20/Menu" fill="#98A4B1">
          <g id="Group">
            <path d="M0.425,10 C-0.362005769,10 -1,9.32842712 -1,8.5 C-1,7.67157288 -0.362005769,7 0.425,7 L16.575,7 C17.3620058,7 18,7.67157288 18,8.5 C18,9.32842712 17.3620058,10 16.575,10 L0.425,10 Z" id="Rectangle-8" transform="translate(8.500000, 8.500000) rotate(-315.000000) translate(-8.500000, -8.500000) " />
            <path d="M0.425,10 C-0.362005769,10 -1,9.32842712 -1,8.5 C-1,7.67157288 -0.362005769,7 0.425,7 L16.575,7 C17.3620058,7 18,7.67157288 18,8.5 C18,9.32842712 17.3620058,10 16.575,10 L0.425,10 Z" id="Rectangle-8-Copy" transform="translate(8.500000, 8.500000) scale(-1, 1) rotate(-315.000000) translate(-8.500000, -8.500000) " />
          </g>
        </g>
      </g>
    </MSvgIcon>
  );

}
export function SearchBlueIcon(props) {
  return (
    <MSvgIcon {...props} width="19px" height="19px" viewBox="0 0 19 19">
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Elements/Header/Intern-Page/Closed" transform="translate(-77.000000, -42.000000)" fill="#003f80" fillRule="nonzero">
          <g id="magnifying-glass" transform="translate(77.000000, 42.000000)">
            <path d="M18.0582737,16.2224815 L12.2844885,10.5528078 C13.0753175,9.41119929 13.470933,8.13853439 13.470933,6.73548325 C13.470933,5.82341623 13.2938677,4.95112522 12.9397372,4.11881129 C12.5858413,3.28636332 12.1074233,2.56885362 11.5046843,1.96611464 C10.9019453,1.36337566 10.1845362,0.884957672 9.35225573,0.531028219 C8.51970723,0.176998236 7.64748325,0 6.73541623,0 C5.82341623,0 4.95112522,0.176998236 4.11881129,0.531028219 C3.28636332,0.884957672 2.56885362,1.36337566 1.96611464,1.96611464 C1.36330864,2.56885362 0.884957672,3.28649735 0.530994709,4.11881129 C0.176998236,4.95122575 0,5.82341623 0,6.73548325 C0,7.64748325 0.176998236,8.51947266 0.530994709,9.35202116 C0.884924162,10.1843351 1.36330864,10.9017443 1.96611464,11.5044832 C2.56885362,12.1074233 3.28649735,12.5856402 4.11881129,12.9397707 C4.95122575,13.2937337 5.82341623,13.4706984 6.73541623,13.4706984 C8.13876896,13.4706984 9.4112328,13.0750494 10.5529083,12.2842875 L16.3266935,17.9444444 C16.5563019,18.1867531 16.8429439,18.3079912 17.1876582,18.3079912 C17.5193037,18.3079912 17.8064818,18.1867866 18.0486564,17.9444444 C18.2909316,17.7021693 18.4121697,17.4151252 18.4121697,17.0834797 C18.4121697,16.7456349 18.2942825,16.4584903 18.0582737,16.2224815 Z M9.76348677,9.76321869 C8.92477249,10.602067 7.91549383,11.0214744 6.73541623,11.0214744 C5.55553968,11.0214744 4.54626102,10.6019665 3.70747972,9.76321869 C2.86869841,8.92450441 2.44932451,7.91535979 2.44932451,6.73528219 C2.44932451,5.55540564 2.86879894,4.54595944 3.70747972,3.70734568 C4.54609347,2.86853086 5.55553968,2.44919048 6.73541623,2.44919048 C7.91535979,2.44919048 8.92463845,2.86869841 9.76348677,3.70734568 C10.6023351,4.54595944 11.021709,5.55540564 11.021709,6.73528219 C11.021709,7.91535979 10.6022011,8.92450441 9.76348677,9.76321869 Z" id="Shape" />
          </g>
        </g>
      </g>
    </MSvgIcon>
  );
}
export function SearchIcon(props) {
  return (
    <MSvgIcon {...props} width="19px" height="19px" viewBox="0 0 19 19">
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Elements/Header/Intern-Page/Closed" transform="translate(-77.000000, -42.000000)" fill="#fff" fillRule="nonzero">
          <g id="magnifying-glass" transform="translate(77.000000, 42.000000)">
            <path d="M18.0582737,16.2224815 L12.2844885,10.5528078 C13.0753175,9.41119929 13.470933,8.13853439 13.470933,6.73548325 C13.470933,5.82341623 13.2938677,4.95112522 12.9397372,4.11881129 C12.5858413,3.28636332 12.1074233,2.56885362 11.5046843,1.96611464 C10.9019453,1.36337566 10.1845362,0.884957672 9.35225573,0.531028219 C8.51970723,0.176998236 7.64748325,0 6.73541623,0 C5.82341623,0 4.95112522,0.176998236 4.11881129,0.531028219 C3.28636332,0.884957672 2.56885362,1.36337566 1.96611464,1.96611464 C1.36330864,2.56885362 0.884957672,3.28649735 0.530994709,4.11881129 C0.176998236,4.95122575 0,5.82341623 0,6.73548325 C0,7.64748325 0.176998236,8.51947266 0.530994709,9.35202116 C0.884924162,10.1843351 1.36330864,10.9017443 1.96611464,11.5044832 C2.56885362,12.1074233 3.28649735,12.5856402 4.11881129,12.9397707 C4.95122575,13.2937337 5.82341623,13.4706984 6.73541623,13.4706984 C8.13876896,13.4706984 9.4112328,13.0750494 10.5529083,12.2842875 L16.3266935,17.9444444 C16.5563019,18.1867531 16.8429439,18.3079912 17.1876582,18.3079912 C17.5193037,18.3079912 17.8064818,18.1867866 18.0486564,17.9444444 C18.2909316,17.7021693 18.4121697,17.4151252 18.4121697,17.0834797 C18.4121697,16.7456349 18.2942825,16.4584903 18.0582737,16.2224815 Z M9.76348677,9.76321869 C8.92477249,10.602067 7.91549383,11.0214744 6.73541623,11.0214744 C5.55553968,11.0214744 4.54626102,10.6019665 3.70747972,9.76321869 C2.86869841,8.92450441 2.44932451,7.91535979 2.44932451,6.73528219 C2.44932451,5.55540564 2.86879894,4.54595944 3.70747972,3.70734568 C4.54609347,2.86853086 5.55553968,2.44919048 6.73541623,2.44919048 C7.91535979,2.44919048 8.92463845,2.86869841 9.76348677,3.70734568 C10.6023351,4.54595944 11.021709,5.55540564 11.021709,6.73528219 C11.021709,7.91535979 10.6022011,8.92450441 9.76348677,9.76321869 Z" id="Shape" />
          </g>
        </g>
      </g>
    </MSvgIcon>
  );
}
export function CloseBlueIconWithShadow(props) {
  return (
    <MSvgIcon {...props} width="88px" height="88px" viewBox="0 0 88 88">
      <defs>
        <circle id="path-1" cx="26" cy="26" r="26" />
        <filter x="-51.9%" y="-51.9%" width="203.8%" height="203.8%" filterUnits="objectBoundingBox" id="filter-2">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation="9" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0.243137255   0 0 0 0 0.537254902  0 0 0 0.2 0" type="matrix" in="shadowBlurOuter1" />
        </filter>
      </defs>
      <g id="Desktop" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="1.2-desktop-search-inside-page-open" transform="translate(-22.000000, -23.000000)">
          <g id="Group-3" transform="translate(40.000000, 41.000000)">
            <g id="Group-4">
              <g id="Oval">
                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlinkHref="#path-1" />
                <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1" />
              </g>
              <g id="Icons/20/Close" transform="translate(15.000000, 15.000000)" fill="#003E7A">
                <g id="Group" transform="translate(2.200000, 2.200000)">
                  <path d="M0.4675,11 C-0.398206345,11 -1.1,10.2612698 -1.1,9.35 C-1.1,8.43873016 -0.398206345,7.7 0.4675,7.7 L18.2325,7.7 C19.0982063,7.7 19.8,8.43873016 19.8,9.35 C19.8,10.2612698 19.0982063,11 18.2325,11 L0.4675,11 Z" id="Rectangle-8" transform="translate(9.350000, 9.350000) rotate(-315.000000) translate(-9.350000, -9.350000) " />
                  <path d="M0.4675,11 C-0.398206345,11 -1.1,10.2612698 -1.1,9.35 C-1.1,8.43873016 -0.398206345,7.7 0.4675,7.7 L18.2325,7.7 C19.0982063,7.7 19.8,8.43873016 19.8,9.35 C19.8,10.2612698 19.0982063,11 18.2325,11 L0.4675,11 Z" id="Rectangle-8-Copy" transform="translate(9.350000, 9.350000) scale(-1, 1) rotate(-315.000000) translate(-9.350000, -9.350000) " />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </MSvgIcon>
  );
}
export function CloseBlueIcon(props) {
  return (
    <MSvgIcon {...props} width="15px" height="15px" viewBox="0 0 15 15">
      <g id="Home-page" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="1.2-mobile-search-inside-page-open" transform="translate(-33.000000, -33.000000)" fill="#003E7A">
          <g id="Icons/20/Close" transform="translate(30.000000, 30.000000)">
            <g id="Group" transform="translate(2.000000, 2.000000)">
              <path d="M0.425,10 C-0.362005769,10 -1,9.32842712 -1,8.5 C-1,7.67157288 -0.362005769,7 0.425,7 L16.575,7 C17.3620058,7 18,7.67157288 18,8.5 C18,9.32842712 17.3620058,10 16.575,10 L0.425,10 Z" id="Rectangle-8" transform="translate(8.500000, 8.500000) rotate(-315.000000) translate(-8.500000, -8.500000) " />
              <path d="M0.425,10 C-0.362005769,10 -1,9.32842712 -1,8.5 C-1,7.67157288 -0.362005769,7 0.425,7 L16.575,7 C17.3620058,7 18,7.67157288 18,8.5 C18,9.32842712 17.3620058,10 16.575,10 L0.425,10 Z" id="Rectangle-8-Copy" transform="translate(8.500000, 8.500000) scale(-1, 1) rotate(-315.000000) translate(-8.500000, -8.500000) " />
            </g>
          </g>
        </g>
      </g>
    </MSvgIcon>
  );
}
export function ConnectButton(props) {
  return (
    <MSvgIcon {...props} width="212" height="39" viewBox="0 0 212 39">     
   <g fill="none" fillRule="evenodd">
        <rect width="212" height="39" fill="#F7B207" rx="19.5"/>
        <text fill="#003E7A" font-family="MFProtocolHarel-Bold, MFProtocolHarel" font-size="18" font-weight="bold">
            <tspan x="79.5" y="29">התחבר</tspan>
        </text>
    </g>
    </MSvgIcon>
  );
}