import { GetComplexItems} from "../../common/Services/CallService";
import { Carousel, makeStyles } from 'common-ui';

import React, {useEffect,useState, useRef } from 'react';
import ComplexSlide from '../ComplexSlide'
import './CC.css';
import '../../SimpleCarrousel/SC.css'
import {IconArrowLeft,IconArrowRight} from 'common-icons';

const deepCopy = (data) => JSON.parse(JSON.stringify(data));

const xxlDevice = window.matchMedia('(min-width: 981px) and (max-width: 1024px)');
const xlDevice = window.matchMedia('(min-width: 701px) and (max-width: 980px)');
const mDevice = window.matchMedia('(min-width: 481px) and (max-width: 700px)');
const sDevice = window.matchMedia('(max-width: 480px)');
// console.log("xxlDevice: " + xxlDevice.matches)
// console.log("xlDevice: " + xlDevice.matches)
// console.log("mDevice: " + mDevice.matches)
// console.log("sDevice: " + sDevice.matches)
let alignRight = <div><style>{" \.sc-mainwrapper .slick-track{\width: auto !important;\}\ "}</style></div>;
let breakpointVar = 4;

if(xxlDevice.matches){
    breakpointVar = 3;
}
if (xlDevice.matches) {
    breakpointVar = 2;
}
else if (mDevice.matches) {
    breakpointVar = 1;
}
else if (sDevice.matches) {
    breakpointVar = 0;
}

const ComplexCategory = () => {  
    const width = window.innerWidth;
    const [CurrentCategoryName,SetCurrentCategoryName]= useState(); 
    const [CardListItems, setCardListItems] = useState(null);
    const [ClickedItem, setClickedItem] = useState(1);  
    const [CategoryListDistinct,SetcategoryListDistinct]=useState(null)
    const sliderRef = useRef();
    const useStyles = makeStyles(theme => ({
        leftArrow: {
            cursor: 'pointer',
            position: 'absolute',
            top: 'calc(6% + 0px)',
            zIndex: '10',
            left: '-27px'
        },
        rightArrow: {
            cursor: 'pointer',
            position: 'absolute',
            top: 'calc(6% + 0px)',
            zIndex: '10',
            right: '-27px'
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
    const onLeftClick = () =>{
        //console.log("left clicked");
        //console.log(ClickedItem);
        //console.log(sliderRef);
    }
    const onRightClick = () =>{
        //console.log("Right clicked")
        //console.log(ClickedItem);
        //console.log(sliderRef);
    }
    const LeftArrow = ({onClick}) => {
        const classes = useStyles();
        return (
            <span className={classes.leftArrow} onClick={()=>{onClick();onLeftClick();}}>
                <IconArrowLeft />
            </span>
        );
    };
    
    const RightArrow = ({onClick}) => {
        const classes = useStyles();
        return (
            <span className={classes.rightArrow} onClick={()=>{onClick();onRightClick();}}>
                <IconArrowRight />
            </span>
        );
    };

    
    useEffect(() => {
         
        GetComplexItems().then(
            res => {
                if (res.status == 200) {
                    setCardListItems(res.data)
                    var categoryList = res.data!=null?res.data.map(item => item.ComplexCarouselCategoriesLookup):null;
   
                    const items = categoryList!=null?[...new Map(categoryList.map(c => [c.CategoryTitle,c])).values()]:null;
                    if(items != null){
                 
                        const data = deepCopy(items.reverse());
                        SetcategoryListDistinct(data);
                        onChangeCategory(data[data.length-1]);
                        if(data.length > 5){
                            const slices = data.length - breakpointVar;
                            console.log(slices)
                            SetcategoryListDistinct([...data.slice(slices), ...data.slice(0, slices)]);

                        }else{
                            SetcategoryListDistinct(data);
                        };
                        //console.log("onChangeCategory ClickedItem="+ClickedItem+"; CategoryOrderDisplay="+action.CategoryOrderDisplay+"; CategoryListDistinct.length="+CategoryListDistinct.length+";");
                        sliderRef.current.slickGoTo(data.length - 1); 
                        console.log(sliderRef);
                    }
                }
            });
   
    }, [setCardListItems,SetcategoryListDistinct,SetCurrentCategoryName]);

     //Resize Handler
     useEffect(() => {

        const  debouncedHandleResize = debounce(function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            const xxlDevice = window.matchMedia('(min-width: 981px) and (max-width: 1024px)');
            const xlDevice = window.matchMedia('(min-width: 701px) and (max-width: 980px)');
            const mDevice = window.matchMedia('(min-width: 481px) and (max-width: 700px)');
            const sDevice = window.matchMedia('(max-width: 480px)');

            let breakpointVar = 4;
            if(xxlDevice.matches){
                breakpointVar = 3;
            }
            if (xlDevice.matches) {
            breakpointVar = 2;
            }
            else if (mDevice.matches) {
            breakpointVar = 1;
            }
            else if (sDevice.matches) {
            breakpointVar = 0;
            }
            
            breakpointVar > 1 ? alignRight = <div><style>{" \.sc-mainwrapper .slick-track{\width: auto !important;\}\ "}</style></div> : alignRight = "";
            
           

            if(CategoryListDistinct != null){
                const data = CategoryListDistinct.sort(function(a, b){return b.CategoryOrderDisplay- a.CategoryOrderDisplay});
                const firstIndex = data.length-1;
                onChangeCategory(data[firstIndex]); 
                if(data.length > 5){
                    const slices = data.length - breakpointVar;
                    //console.log(slices)
                    SetcategoryListDistinct([...data.slice(slices), ...data.slice(0, slices)]);

                }else{
                    SetcategoryListDistinct(data);
                };
                sliderRef.current.slickGoTo(firstIndex); 
                console.log(sliderRef);

            }
        })       
                

        window.addEventListener('resize', debouncedHandleResize)
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
          
      }
    })

    const onChangeCategory = (action) => {
        setClickedItem(action.CategoryOrderDisplay);
        SetCurrentCategoryName(action.CategoryName);
    }
    var settings = (length) => {
        return {
            speed: 500,
            centerMode: false,
            slidesToShow:  length<5?length:5,
            slidesToScroll: 1,
            rtl:true,
            rows: 1,
            dots: false,
            //currentSlide:0,
            infinite: true,
            //initialSlide:1,
            prevArrow: <IconArrowLeft/>,         
            nextArrow: <IconArrowRight/>,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        //rtl:true,
                        //currentSlide:0,
                        //arrows: true,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 4,
                        infinite: length > 3 ? true : false,
                        //dots: false,

                    }
                },
                {
                    breakpoint: 980,
                    settings: {
                        //rtl:true,
                        //currentSlide:0,
                        //arrows: true,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 3,
                        infinite: length > 3 ? true : false,
                        //dots: false,

                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        //rtl:true,
                        //currentSlide:0,
                        //arrows: true,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 2,
                        //dots: false,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        //rtl:true,
                        //currentSlide:0,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 1,
                        //dots: false,
                        //arrows: true,
                        centerMode: true
                    }
                    
                },                {
                    breakpoint: 360,
                    settings: {
                        //rtl:true,
                        //currentSlide:0,
                        slidesToScroll: 1,
                        //initialSlide:0,
                        slidesToShow: 1,
                        //dots: false,
                        //arrows: true,
                        centerMode: true,
                        centerPadding: "35px"
                        
                    }
                },
            ]
           
        }
    };
  

    
    
    if(CardListItems!=null&&CurrentCategoryName!=null)
    {// SetCurrentCategoryName(categoryListDistinct[categoryListDistinct.length-2])
    var cardsList1=CardListItems.filter(item => item.ComplexCarouselCategoriesLookup.CategoryName ==CurrentCategoryName).map(item => item.ComplexCarouselTicketsLookup);
    var cardsList2=CardListItems.filter(item => item.ComplexCarouselCategoriesLookup.CategoryName ==CurrentCategoryName).map(item => item.ComplexCarouselTicketsLookup);
    if(cardsList1.length>4 &&width>900)
    {
        
        const data = deepCopy(cardsList1);
        cardsList1=[...data.slice(3), ...data.slice(0,3)];
        //cardsList1.reverse();
    }

    }
   
  
    return (
        <div className="sc-mainwrapper" dir="rtl">
              
             {CategoryListDistinct!=null?  <Carousel {...settings(CategoryListDistinct.length)} 
             ref={(e)=>{sliderRef.current=e;return sliderRef;}} 
              arrows prevArrow={<LeftArrow />} nextArrow={<RightArrow />}>          
                {CategoryListDistinct.length>1?CategoryListDistinct//.reverse()            
                    .map((action,index) => (
                        <div>
                           
                         <div  className={action.CategoryOrderDisplay==ClickedItem?'CategoryDivActive':'CategoryDiv'}   
                            onClick={() => {onChangeCategory(action)}}  > 
                          <img className="cc-icon" src={action.CategoryIcon.ImageUrl} />
                         <div className="categoryTitle">{ action.CategoryName}  </div>  
                       
                    </div> 
                    </div>
                    )):null}                 
             </Carousel>:null}
              <br/>
              <br/>
              <div className="sc-slide">
               {(cardsList1 && cardsList1.length) && <ComplexSlide  listItems={cardsList1} listItems2={cardsList2}/>}  
              </div>                  
               
        </div>
    );
}


export default ComplexCategory;