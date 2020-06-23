import React from "react";
import {Desktop, Mobile} from "../../images";
import {Hidden} from "@material-ui/core";

const About = () => {

    return (
        <div>
            <Hidden smDown>
                <img src={Desktop} alt='설명' width='950' height='700'/>
            </Hidden>
            <Hidden mdUp>
                <img src={Mobile} alt='설명' width='350' height='900'/>
            </Hidden>
        </div>
    );
}
export default About;