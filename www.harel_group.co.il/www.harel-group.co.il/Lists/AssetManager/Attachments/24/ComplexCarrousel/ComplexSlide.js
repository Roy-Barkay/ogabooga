import ComplexCard from './ComplexCard';
import { Carousel, makeStyles } from 'common-ui';
import {IconArrowLeft,IconArrowRight} from 'common-icons';
import { useEffect ,useState, useRef} from 'react';

// Test checking
const ComplexSlide = ({listItems,listItems2}) => {
    const width = window.innerWidth;
    const deepCopy = (data) => JSON.parse(JSON.stringify(data));

    const [initData,setInitData] = useState([]);
    const [dataToShow,setDataToShow] = useState([]);
    const sliderRef = useRef();
    const xlDevice = window.matchMedia('(min-width: 701px) and (max-width: 980px)');
    const mDevice = window.matchMedia('(min-width: 481px) and (max-width: 700px)');
    const sDevice = window.matchMedia('(max-width: 480px)');
    console.log("xlDevice: " + xlDevice.matches)
    console.log("mDevice: " + mDevice.matches)
    console.log("sDevice: " + sDevice.matches)
    let alignRight = <div><style>{" \.cc-mainwrapper .slick-track{\width: auto !important;\}\ "}</style></div>;
    let breakpointVar = 3;

    if (xlDevice.matches) {
        breakpointVar = 2;
    }
    else if (mDevice.matches) {
        breakpointVar = 1;
    }
    else if (sDevice.matches) {
    breakpointVar = 0;
}

    function debounce(fn, ms) {
        let timer
        return _ => {
          clearTimeout(timer)
          timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
          }, ms)
        };
      }

    const mobileSettings = {
        slidesToScroll: 1,
        slidesToShow: 1,
        dots: false,
        rtl: true,
        arrows: false,
        infinite: true,
        centerMode: true,
        variableWidth: false,
        initialSlide: 0,
        variableWidth: true
    };

    const settings = (length) => {
        return {
            dots: true,
            rtl: true,
            slidesToScroll: 1,
            infinite: length > 4 ? true : false,
            slidesToShow: 4,
            slidesPerRow: 1,
            rows: 1,
            centerMode: false,
            useTransform: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        //rtl:true,
                        //currentSlide:0,
                        //arrows: true,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 3,
                        infinite: length > 3 ? true : false,
                        //dots: false,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 3,
                        infinite: length > 3 ? true : false,
                        arrows: false,
                        //rtl:true,
                        slidesToScroll: 1,
                        //initialSlide:0,

                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        arrows: false,
                        //rtl:true,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        //rtl:true,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 1,
                        arrows: false,
                    }

                },                {
                    breakpoint: 360,
                    settings: {
                        //rtl:true,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 1,
                        arrows: false,

                    }
                },
            ]



        };
    };
  
    useEffect(() => {
          sessionStorage.setItem("claerData", JSON.stringify(listItems2));
                 
            const data = deepCopy(listItems2.reverse());
            if(data.length > 4){
                const slices = data.length - breakpointVar;
                console.log(slices)
                setDataToShow([...data.slice(slices), ...data.slice(0, slices)]);

            }else{
                setDataToShow(data);
            };
            
            if(sliderRef && sliderRef.current){
                    sliderRef.current.slickGoTo(data.length - 1);
                }    

   },[listItems2,setDataToShow]);

   useEffect(() => {

    const  debouncedHandleResize = debounce(function handleResize() {
        console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
        const xlDevice = window.matchMedia('(min-width: 701px) and (max-width: 980px)');
        const mDevice = window.matchMedia('(min-width: 481px) and (max-width: 700px)');
        const sDevice = window.matchMedia('(max-width: 480px)');

        let breakpointVar = 3;

        if (xlDevice.matches) {
        breakpointVar = 2;
        }
        else if (mDevice.matches) {
        breakpointVar =1;
        }
        else if (sDevice.matches) {
        breakpointVar = 0;
        }
        breakpointVar > 1 ? alignRight = <div><style>{" \.cc-mainwrapper .slick-track{\width: auto !important;\}\ "}</style></div> : alignRight = "";
        let claerData = sessionStorage.getItem("claerData");
        console.log("claerData",claerData)
        let claerDatare =  JSON.parse(claerData);
        claerDatare.reverse()
        const data = deepCopy(claerDatare);

        if(data.length > 4){
               const slices = data.length - breakpointVar;
                console.log(slices)
                setDataToShow([...data.slice(slices), ...data.slice(0, slices)]);
                console.log("slice",dataToShow);
        }
        else{
            setDataToShow(data);
        };



      }, 500)

    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
        window.removeEventListener('resize', debouncedHandleResize)

  }

},[setDataToShow])


    const useStyles = makeStyles(theme => ({
        leftArrow: {
            cursor: 'pointer',
            position: 'absolute',
            top: 'calc(100% + 8px)',
            zIndex: '10',
            left: '0'
        },
        rightArrow: {
            cursor: 'pointer',
            position: 'absolute',
            top: 'calc(100% + 8px)',
            zIndex: '10',
            right: '0'
        }
    }));

    const LeftArrow = ({onClick}) => {
        const classes = useStyles();
        return (
            <span className={classes.leftArrow} onClick={onClick}>
                <IconArrowLeft />
            </span>
        );
    };

    const RightArrow = ({onClick}) => {
        const classes = useStyles();
        return (
            <span className={classes.rightArrow} onClick={onClick}>
                <IconArrowRight />
            </span>
        );
    };
    
    return (
        (dataToShow && dataToShow.length) && (
            <div className='cc-mainwrapper' dir="rtl">
            <Carousel {...settings(dataToShow.length)} 
            ref={(e)=>{sliderRef.current=e;return sliderRef;}} 
            arrows prevArrow={<LeftArrow />} nextArrow={<RightArrow />}>

                {dataToShow.length >0 ?
                    dataToShow.map((card)  => (
                        <ComplexCard title={card.TicketTitle} bodyText={card.TickeText} moreinfoURL={card.TicketMoreInfoLink.NavigateUrl} moreinfoText={card.TicketMoreInfoLink.Text}  newWindowMI={card.TicketMoreInfoLink.Target} buttText={card.TicketActionButton.Text}  buttonURL={card.TicketActionButton.NavigateUrl} newWindowBtn={card.TicketActionButton.Target} />
                    )):null}
            </Carousel>
            {/* {breakpointVar > 1 &&  dataToShow.length < 4 ? alignRight : null} */}
        </div>
        )
    );
}

export default ComplexSlide;