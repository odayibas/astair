import  React, {Component} from 'react'
import YouTube from 'react-youtube';


class Landing extends  Component {


    render() {
        const opts = {
            width : '100%', display : 'flex',justifyContent : 'center', alignItems : 'center',

            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
              loop : 1,
              playlist : "RpF21VuUxXg",

            }
          };
    
        return(
            <div>               
                 <div style={{hegiht: '100%', width : '100%', display : 'flex',justifyContent : 'center', alignItems : 'center'}}>
                    <img height={500} src="/assets/image.png"/>
                    <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"> 
                       <h1 className="h1-responsive font-weight-bold">
                            Welcome to ASTAiR!{" "}
                        </h1>
                        <hr className="hr-light" />
                        <h4 className="mb-4">
                            Watch our video to learn more
                        </h4> 
                        <YouTube
                            videoId="RpF21VuUxXg"
                            opts={opts}
                        />
                   </div> 
                </div>                  
              </div>
        )
    }
}

export default Landing