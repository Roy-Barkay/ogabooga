import { createStyles, makeStyles } from 'common-ui';

const PersonalConnectStyles = makeStyles(theme => createStyles({
    root: {
        '& .CH-MuiButton-contained': {
            borderRadius: '20px',
            backgroundColor: '#F7B207',
            width: '212px',
            height: '39px',
            fontSize: '18px',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '0.89',
            letterSpacing: 'normal',
            textAlign: 'center',
            marginTop:'30px',
            '& span': {
                color: '#003e7a',
            },
            '& svg': {
                width:'30px',
                height :'30px',
            },
        },
        '& .CH-MuiFormLabel-root.Mui-error':
        {
            color: '#fff',
        },
        '& .CH-MuiCircularProgress-root':
        {
            position:'absolute',
            left:'20px',
            top:'5px',
            width:'30px',
            height:'30px',              

        },
        
        '& button[disabled][disabled].Mui-disabled':{
            backgroundColor:'#94918b',
        },
        '& .CH-MuiInput-underline.Mui-error:after':
        {
            borderBottom: '1px solid #fff',
        },
        '& .CH-MuiInput-underline:after': {
            borderBottom: '1px solid #fff',
        },
        '& .CH-MuiInput-underline:before': {
            borderBottomColor: '#fff',

        },
        '& .CH-MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '1px solid #fff',
        },
        '& .CH-MuiFormHelperText-root.Mui-error': {
            backgroundColor: '#fff',

            marginTop: '3px',
            height: '26px',
            fontSize: '13px',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '26px',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#db0000',
            paddingRight:'7px',
        },
        '&::before': {
            borderBottomColor: '#fff',
        },
        '& .CH-MuiFormLabel-root.Mui-focused': {

            color: '#fff',
        },
        '& button[disabled][disabled]':{
            border:'none',
            backgroundColor: '#F7B207',
            //backgroundColor:'transparent',
        },
        '& input[type=text]:focus':{
            border:'none',           
        },
        '& input': {
            backgroundColor:'transparent',
            border:'none',
            fontSize: '18px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#fff',
        },
        '& label': {
            '& span': {
                display: 'none',
            },

            fontSize: '18px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#fff',
        },
        padding: '14px',
        
        '& > div': {
            textAlign: 'center',
            color: '#f3f3f3',
            marginBottom: '20px',
            fontSize: '1.1875rem',
            '& button': {
                backgroundColor: 'transparent',
            },
        },
        '& button': {
            borderRadius: '20px',
            backgroundColor: '#F7B207',
            '& svg': {
                width: '212px',
                height: '36px',
            },
           
        },
       
    },
    textSendCode:{
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#fff',
        marginRight: '7px'
    },
   
    combinedShape: {
        width: '96px',
        height: '96px',
        padding: '9px 21px 9px 20px !important',
        borderRadius: '12px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-end',
        cursor:'pointer',
        textDecoration: 'none',
        // '&:hover': {
        //     width: '100px',
        //     height: '100px',
        //     padding: '2px',
        //     borderRadius: '14px',
        //     boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        //     border: '2px solid #2d72c6',
        //     outline: 'solid 3px #fbd983',
        //     textDecoration: 'none',
        //     '& span':{fontWeight: 'bold'}
        //   },
      },
      selectedLinkOption:{
        backgroundColor: '#fff',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-end',
        cursor:'pointer',
        width: '100px',
        height: '100px',
        padding: '9px 21px 9px 20px !important',
        borderRadius: '14px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        border: '2px solid #2d72c6',
        outline: 'solid 3px #fbd983',
        textDecoration: 'none',
        '& span':{fontWeight: 'bold'}
      },
    spanCustom:{
        width: '26px',
        height: '20px',
        fontSize: '16px',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.25',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: '#003c7f',
    },
    phoneIcon:{
        height: '55px',
        width: '55px !important',
        margin: '0 0 3px',
        objectFit: 'contain'
    },
    mailIcon:{
        height: '40px',
        width: '40px',
        margin: '0 0 10px',
        objectFit: 'contain'
    },
    combineOptions:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: '15px'
    },
    customDivOtpOptions:{
        marginBottom: '0px !important',
        textAlign: 'right !important'
    }
}));

export default PersonalConnectStyles;