
import React  from 'react';


export const LoaderPopup = () => {
        return <div className="loader">
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="render-lines.json"
                        style={{width: "15rem", height: "auto", margin: "0 auto 0 "}}
                    ></lottie-player>
                    <h2>טוען...</h2>
                </div>
}
 
export default LoaderPopup;