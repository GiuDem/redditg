import React from "react"
import Recommendeds from "./components/Recommendeds";
import Postcard from "./components/Postcard";


class App extends React.Component{

  constructor(){
    super();
    this.state={
      images: [],
      charging:true,
      subreddit:"",
      condition:"",
      counter:0,
      searchFor:"top",
    }
    this.handleClick=this.handleClick.bind(this);
    this.handleKeyUp=this.handleKeyUp.bind(this);
    this.research=this.research.bind(this);
    this.changeSearch=this.changeSearch.bind(this);
  }

  research(sr=this.state.subreddit,next="",counter=this.state.counter,searchx=this.state.searchFor){
    document.getElementById("subreddit").value="";

    this.setState({counter: counter,searchFor:searchx});

    if(this.state.counter===0){
      const url=
          `https://www.reddit.com/r/${sr}/${searchx}/.json`
      this.setState({charging:true, condition:"...",subreddit:sr});
      fetch(url)
          .then(res=>res.json())
          .then(res=> {
            const results=res.data.children.reduce((result,id)=>{
              if(id.data.preview){//es image?
                result.push({
                  title: id.data.title,
                  urlFull: id.data.url,
                  urls:id.data.preview.images[0].resolutions,
                  id: id.data.id,
                  author: id.data.author,
                  link_publication: id.data.permalink,
                });
              }
              return result;
            },[]);
            const img= results;
            this.setState({
              images:img,
              counter: counter+1,
              charging: false,

            });
            console.log(this.state.images);
          }).catch(error=>{
        //console.log(error)
        this.setState({condition:"Search Subreddit"})
      });
    }else {

      const url =
          `https://www.reddit.com/r/${sr}/${searchx}/.json`


      this.setState({charging: true, condition: "...", subreddit: sr});
      fetch(url)
          .then(res => res.json())
          .then(res => {
            const results = res.data.children.reduce((result, id) => {
              if (id.data.preview) {//es image?
                result.push({
                  title: id.data.title,
                  urlFull: id.data.url,
                  urls: id.data.preview.images[0].resolutions,
                  id: id.data.id,
                  author: id.data.author,
                  link_publication: id.data.permalink,
                });
              }
              return result;
            }, []);

            console.log(this.state.counter);
            const  img = this.state.images;//stato precedente ovvero images è l'array allo stato precedente


            this.setState({
              images: results.concat(img),
              counter: counter+1,
              charging: false,
            });
            console.log(this.state.images);
          }).catch(error => {
        //console.log(error)
        this.setState({condition: "not found"})
      });
    }
  }

  changeSearch(searchx){
    this.research(undefined,undefined,undefined,searchx);
  }

  handleClick(){
    const subReddit=document.getElementById("subreddit").value;
    this.research(subReddit);
  }

  handleKeyUp(event){
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search").click();
    }
  }

  componentDidMount(){
    this.research(this.state.subreddit);
  }

  render(){
    const postcards=this.state.images.map(image=> <Postcard key={image.id} image={image} />);

    return(
        <div>
          <div className="top">
            <div className="recommendeds">
              <button className={this.state.searchFor==="top"?"selection":""} onClick={()=>this.changeSearch("top")}>Top</button>
              <button className={this.state.searchFor==="new"?"selection":""} onClick={()=>this.changeSearch("new")}>New</button>
              <button className={this.state.searchFor==="hot"?"selection":""} onClick={()=>this.changeSearch("hot")}>Hot</button>
            </div>
            <div className="register">
              <a href={"https://www.reddit.com/r/"+this.state.subreddit} className="prefix">r/</a>
              <input aria-label="search subreddit" placeholder={this.state.subreddit} spellCheck="false" onKeyUp={evt => this.handleKeyUp(evt)} id="subreddit"/>
              <button id="search" className="search" onClick={this.handleClick}><img alt=">" src="https://www.queryly.com/images/whitesearchicon.png"></img></button>

            </div>
            <Recommendeds sr={this.state.subreddit} search={this.research}/>

          </div>

          {!this.state.charging?
              <div className="container">
                {postcards}
              </div>
              :<h1 className="condition">{this.state.condition}</h1>}


        </div>)
  }
}

export default App;
