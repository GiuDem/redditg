import React from "react"

class Recommendeds extends React.Component{
    shouldComponentUpdate(nextProps) {
        if(this.props.sr===nextProps.sr){
            return false;
        }else{
            return true;
        }
    }

    render(){
        let buttons=[];
        let subreddits=[
            "Photographs",
            "Generative",
            "HeavyMind",
            "ImaginaryLandscapes",
            "PrintMaking",
            "StreetArt",
            "Glitch_Art",
            "AccidentalWesAnderson",
            "Museum",
        ];

        subreddits=subreddits.map((sr,id)=>{
            return <button key={id} onClick={()=> this.props.search(sr)} className="recommended">{""+sr}</button>
        });

        for(let i=0;i<5;i++){
            const random=Math.floor(Math.random()*(subreddits.length));
            buttons.push(subreddits[random]);

            subreddits.splice(random,1);

        }
        return(
            <div className="sb">
                {buttons}
            </div>
        )
    }
}


export default Recommendeds;