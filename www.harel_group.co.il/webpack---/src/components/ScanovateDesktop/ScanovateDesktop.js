import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Typography, Loader, Grid } from 'harelkit';
import IconPerson from '../../common/icons/Person';
import { ResourceContext } from '../../common/context/ResourceContext';
import { isReturnScanovate } from '../../common/Utility';

function ScanovateDesktop(props) {
    const resources = useContext(ResourceContext);
      useEffect(() => {
        props.icon(<IconPerson/>)
        props.title("צילום וידאו")
        props.closeBtn(false);

    }, []);
   
    const onMyFrameLoad = (e) => {
         
            document.querySelector('html').style.position='fixed important';
           
        if(document.querySelector('#modal > div:first-of-type > div:first-of-type')){
            document.querySelector('#modal > div:first-of-type > div:first-of-type').style.position='absolute';
            document.querySelector('#modal > div:first-of-type > div:first-of-type').style.marginBottom='-200px';
         }
        if (e.currentTarget.contentWindow.document) {
            var src = e.currentTarget.contentWindow.document.querySelector('img').src;
            if (isReturnScanovate(src)) {
                var sdata = { "id": "ScanovateIframe", "source": window.location.origin + src.substring(src.indexOf('?'), src.lenght) }
                window.postMessage(sdata, '*');
            }
        }
    }   
    return (
        <>
            <Modal.Body>
                <Grid justify="center">
                    <Grid.Col xs={12}>
                        <Typography variant="h3" align="center" role="heading" aria-level="2">
                            {resources['ScanovateDesktopText']}
                        </Typography>

                    </Grid.Col>
                    <Grid.Col xs={12}>                      
                    </Grid.Col>
                    <Grid.Col>
                        <Typography variant="h5">1. לסרוק את הקוד המופיע בעמוד זה בעזרת מצלמת הטלפון הנייד</Typography>
                        <Typography variant="h5">2. להמשיך לפי ההוראות שיופיעו בטלפון שלך</Typography>
                    </Grid.Col>
                    <Grid.Col>
                    <iframe src={props.link} id="scanovateIfrm"  scrolling='no' frameBorder="0"  onLoad={onMyFrameLoad} >
      </iframe>
                    </Grid.Col>
                </Grid>
            </Modal.Body>
        </>
    );
}
export default ScanovateDesktop;
ScanovateDesktop.displayName = 'ScanovateDesktop';