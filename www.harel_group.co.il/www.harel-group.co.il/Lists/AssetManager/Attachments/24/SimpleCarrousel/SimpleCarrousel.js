import { GetCarrouselItems, GetDetails } from "../common/Services/CallService";
import { Carousel, makeStyles } from 'common-ui';
import './SC.css';
import SimpleCard from './SimpleCard';
import { IconArrowLeft, IconArrowRight } from 'common-icons';
import React, { useEffect, useState, useRef, useCallback } from 'react';

const deepCopy = (data) => JSON.parse(JSON.stringify(data));
const xlDevice = window.matchMedia('(min-width: 701px) and (max-width: 980px)');
const mDevice = window.matchMedia('(min-width: 481px) and (max-width: 700px)');
const sDevice = window.matchMedia('(max-width: 480px)');

let alignRight = <div><style>{" \.sc-mainwrapper .slick-track{\width: auto !important; display: flex !important;justify-content: space-evenly !important;\}\ "}</style></div>;
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

const SimpleCarrousel = () => {
    const [simpleCarrousel, setSimpleCarrousel] = useState(null);
    const carouselRef = useRef(null);

    const isenter = ({ key }) => {
        return key === "Enter"
    };
    
    const leftArrowHandleKeyUp = (e) => {
        isenter(e) && carouselRef.current.slickPrev();
    };
    const rightArrowHandleKeyUp = (e) => {
        isenter(e) && carouselRef.current.slickNext();
    };

    const LeftArrow = ({ onClick, currentSlide }) => {
        const classes = useStyles();
        
        // Set aria-current on DOTS menu
        const dotsMenu = document.querySelector('.slick-dots')?.children;
        if(dotsMenu){
            Array.from(dotsMenu).map((element) => {
                element.firstChild?.setAttribute("aria-current","false");
            })
            
            const currentLI = document.querySelector('[slide-id="' + currentSlide + '"]');
            currentLI?.setAttribute("aria-current","true");
        }

        // Set TAB Navigation for Accessibility
        const remove = document.querySelectorAll('.slick-slide');
        Array.from(remove).map((element) => {
            element.firstChild?.firstChild.setAttribute("aria-hidden", true);
            element.firstChild?.firstChild.lastChild.setAttribute("tabIndex", -1);
        })

        let onScreenCards = [currentSlide+3, currentSlide+2, currentSlide+1, currentSlide];
        onScreenCards.forEach((cardno) => {
            displayedCardNav(cardno);
        })

        return (
            <span className={classes.leftArrow}  tabindex='0' role='button' aria-label='לשקופית הבאה'
                onClick={onClick} 
                onKeyUp={(e) => leftArrowHandleKeyUp(e)}
            >
                <IconArrowLeft />
            </span>
        );
    };
    
    const RightArrow = ({ onClick, currentSlide }) => {
        const classes = useStyles();

        // Set aria-current on DOTS menu
        const dotsMenu = document.querySelector('.slick-dots')?.children;
        if(dotsMenu){
            Array.from(dotsMenu).map((element) => {
                element.firstChild?.setAttribute("aria-current","false");
            })
            
            const currentLI = document.querySelector('[slide-id="' + currentSlide + '"]');
            currentLI?.setAttribute("aria-current","true");
        }

        // Set TAB Navigation for Accessibility
        const remove = document.querySelectorAll('.slick-slide');
        Array.from(remove).map((element) => {
            // element.firstChild?.firstChild.setAttribute("tabIndex", -1);
            element.firstChild?.firstChild.setAttribute("aria-hidden", true);
            element.firstChild?.firstChild.lastChild.setAttribute("tabIndex", -1);
        })

        let onScreenCards = [currentSlide+3, currentSlide+2, currentSlide+1, currentSlide];
        onScreenCards.forEach((cardno) => {
            displayedCardNav(cardno);
        })

        return (
            <span className={classes.rightArrow} tabindex='0' role='button' aria-label='לשקופית הקודמת'
                onClick={onClick}
                onKeyUp={(e) => rightArrowHandleKeyUp(e)}
            >
                <IconArrowRight />
            </span>
        );
    };

    //Get Carrousel Items from SP
    useEffect(() => {
        GetCarrouselItems().then(
            res => {
                
                if (res.status == 200) {
                    res.data.reverse();
                    const data = deepCopy(res.data);
                    if(data.length > 4){
                        const slices = data.length - breakpointVar;
                        setSimpleCarrousel([...data.slice(slices), ...data.slice(0, slices)]) ;
                    }else{
                        setSimpleCarrousel(data)
                    };
                }
            });
            
    }, [setSimpleCarrousel]);


    //Responsiveness Window Resize Handler Responsive
    useEffect(() => {

        const  debouncedHandleResize = debounce(function handleResize() {
            const xlDevice = window.matchMedia('(min-width: 701px) and (max-width: 980px)');
            const mDevice = window.matchMedia('(min-width: 481px) and (max-width: 700px)');
            const sDevice = window.matchMedia('(max-width: 480px)');

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
            
            breakpointVar > 1 ? alignRight = <div><style>{" \.sc-mainwrapper .slick-track{\width: auto !important; display: flex !important;justify-content: space-evenly !important;\}\ "}</style></div> : alignRight = "";

            GetCarrouselItems().then(
                res => {
                    if (res.status == 200) {
                        res.data.reverse();
                        const data = deepCopy(res.data);
                        if(data.length > 4){
                            const slices = data.length - breakpointVar;
                            setSimpleCarrousel([...data.slice(slices), ...data.slice(0, slices)]) ;
                       }else{
                            setSimpleCarrousel(data)
                        };
                    }
                });

          }, 500)

        window.addEventListener('resize', debouncedHandleResize)
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
          
      }
    })

    const displayedCardNav = (card) => {
        
        document.querySelector('[data-index="' + card + '"]')?.setAttribute("aria-hidden", false);
        document.querySelector('[data-index="' + card + '"]')?.firstChild?.firstChild.setAttribute("aria-hidden", false);
        document.querySelector('[data-index="' + card + '"]')?.firstChild?.firstChild.lastChild.setAttribute("tabIndex", 0);

    }
    
    const dotsRef = useCallback(() => {
        const dotsMenu = document.querySelector('.slick-dots').children;
        const dotsLength = dotsMenu.length;

            // Add Slide Numbers to DOTS Menu
            Array.from(dotsMenu).map((dots,index) => {
                const currentSLide = dotsMenu.length-1
                dots.lastChild.setAttribute("aria-label",`שקופית ${index+1} מתוך ${dotsLength}`);
                dots.lastChild.setAttribute("slide-id", currentSLide-index);
            });

      }, []);



    const carrouselSettings = (length = 0) => {
        return {
            dots: true,
            appendDots: dots => <ul ref={dotsRef} id="simpleUL" aria-label="כפתורי דפדןף קרוסלה">{dots.reverse()}</ul>,
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
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 3,
                        infinite: length > 3 ? true : false,
                        // dots: false,
                        arrows: false
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        // dots: false,
                        arrows: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        // dots: false,
                        arrows: false,
                        centerMode: true
                    }
                    
                },                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 1,
                        // dots: false,
                        arrows: false,
                        centerMode: true,
                        centerPadding: "35px"
                        
                    }
                },
            ]
        };
    };

    const hiddenText = {
        position: 'absolute',
        left: '-999px',
        width: 0,
        fontSize: '0px',
        clip: 'rect(0 0 0 0)'
    }

    return (
        simpleCarrousel !== null ?
            <div className='sc-mainwrapper' dir="rtl">
            <h2 className="hiddenText">קרוסלת מוצרים</h2>

                <Carousel ref={carouselRef} {...carrouselSettings(simpleCarrousel.length)}
                    arrows
                    nextArrow={<RightArrow />}
                    prevArrow={<LeftArrow />}>
                    {simpleCarrousel
                        .map(({ CarouseOrderDisplay, SimpleCarouselTicketsLookup }) => (
                            <SimpleCard key={CarouseOrderDisplay} 
                                id={CarouseOrderDisplay}
                                imgURL={SimpleCarouselTicketsLookup.TicketIcon.ImageUrl}
                                title={SimpleCarouselTicketsLookup.TicketTitle}
                                buttText={SimpleCarouselTicketsLookup.TicketActionButton.Text}
                                bodyText={SimpleCarouselTicketsLookup.TickeText}
                                buttonURL={SimpleCarouselTicketsLookup.TicketActionButton.NavigateUrl}
                                newWindow={SimpleCarouselTicketsLookup.TicketActionButton.Target}
                                style={{ width: 228 }}
                            />
                        ))}
                </Carousel>
             {breakpointVar > 1 &&  simpleCarrousel.length < 4 ? alignRight : null}
            </div>
        : null
        
    );
};

export default SimpleCarrousel;
