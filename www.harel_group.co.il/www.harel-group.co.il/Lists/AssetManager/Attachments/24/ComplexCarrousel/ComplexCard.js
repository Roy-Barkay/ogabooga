import '../ComplexCarrousel/ComplexCategory/CC.css';
import { Button } from 'common-ui';


const ComplexCard = ({ title, bodyText, moreinfoURL,moreinfoText,newWindowMI, buttText, buttonURL, newWindowBtn}) => {
 
    const mql = window.matchMedia('(max-width: 980px)');
    var openNewBtn;
    var openNewMI;

    if (newWindowBtn) {
        openNewBtn = "_blank";
    } else {
        openNewBtn = "_self";
    };
    if (newWindowMI) {
        openNewMI = "_blank";
    } else {
        openNewMI = "_self";
    };
    const bgIMage = "/PublishingImages/ServiceCenters/BG_Desktop.png";
    return (
        <div  className="card" style={{ backgroundImage:`url(${bgIMage})` }}>
            
            <div className="cardTitle">
                {title}
            </div>
            <div className="cardBody">
               <div className="cardBodyTxt"> {bodyText} </div>
             
               { mql.matches?null:<a href={moreinfoURL} target={openNewMI}> {"<  "+moreinfoText} </a>}
            </div>
            <div className="cardFirstBtn">
             { mql.matches?
                <Button
                onClick={()=> window.open(moreinfoURL, openNewMI)}
                variant='outlined'
              
                content={moreinfoText}
               />
              :null
               }
            </div>
            <div className="secondBtn">
            <Button
                onClick={()=> window.open(buttonURL, openNewBtn)}
               // fullWidth={true}
                content={buttText}
            /></div>
        </div>
    );
}

export default ComplexCard;