import React, { Component } from 'react';

class DownButton extends Component {
    state = {
        components: [],
        chosenComponent: 1
    }

    componentDidMount() {
        let children = Array.from(document.getElementById("rohm").children).filter(x => x.className !== "rohm-nav" && x.className !== "down");
        this.setState({components: children})

    }
    
    handleDown = () => {
        let elementPosition = document.getElementsByClassName(this.state.components[this.state.chosenComponent].className)[0].offsetTop;
        window.scrollTo({
            top: elementPosition - ((window.innerWidth/100 *0.83) * 5.625), 
            behavior: "smooth"  
        });
        if((this.state.chosenComponent+1) === this.state.components.length){
            this.setState({chosenComponent: 0})
        }
        else {
            this.setState({chosenComponent: this.state.chosenComponent+1})

        }
    }


    handleClass = (chosenComponent) => {
        if(this.state.components.length > 0 && this.state.components[chosenComponent].className === "stories") return "down black"
        return  chosenComponent === 0? "down up": "down"
    }

    render() {

        const {chosenComponent} = this.state;
        return <button className={this.handleClass(chosenComponent)} onClick={this.handleDown}>
                    <img src="down-arrow.svg" alt="down" />
                </button>;
    }
}
 
export default DownButton;