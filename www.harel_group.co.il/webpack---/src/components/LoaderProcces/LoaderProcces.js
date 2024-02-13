
import React, { useEffect } from 'react';
import { Grid, Modal, Loader } from 'harelkit';

function LoaderProcces(props) {
    useEffect(() => {
        props.closeBtn(true);
        props.title("מעבירים אותך");
        props.icon();       
    }, []);

    return (
        <>
            <Modal.Body align="center" >
                <Grid alignItems="center" >
                    {/* <Grid.Col>
                       <Typography variant="h2" role="alert"></Typography>
                    </Grid.Col> */}
                  
                   <div  id="screenReaderOnly" role="alert">מעבירים אותך</div>
                    <Grid.Col xs={12} >
                        <Loader />
                    </Grid.Col>
                </Grid>
            </Modal.Body>
        </>

    );

}


export default LoaderProcces;