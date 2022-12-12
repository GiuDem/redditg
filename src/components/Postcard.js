import React from "react";

class Postcard extends React.Component{
    constructor(){
        super();
        this.state={
            isZoom:false,
            imageError:false,
        }
        this.handleClick=this.handleClick.bind(this);
        this.handleError=this.handleError.bind(this);
    }

    handleClick(){
        this.setState(prev=>{
            return{isZoom : !prev.isZoom}
        })
    }
    handleError(){

        this.setState(prev=>{
            return{imageError : true}
        })
    }
    render(){
        let imgRes=this.props.image.urls.find((res) => res.height>=400 && res.width>=600);
        imgRes=imgRes?imgRes.url.replace(/&amp;/g, '&'):this.props.image.urlFull;
        if(this.state.imageError){
            imgRes=this.props.image.urls[this.props.image.urls.length-1].url.replace(/&amp;/g, '&');
        }
        const imgUrl=this.state.isZoom?this.state.imageError?imgRes :this.props.image.urlFull:imgRes;
        return(
            <div className={this.state.isZoom?"postcard zoom":"postcard"}>
                <div className="hover" onClick={this.handleClick}/>
                <img onClick={this.handleClick} onError={this.handleError} src={imgUrl}  alt=""/>
                <h3>{this.props.image.title}</h3>
                <a href={"https://reddit.com"+this.props.image.link_publication}>u/{this.props.image.author}</a>
            </div>

        )
    }

}

export default Postcard;