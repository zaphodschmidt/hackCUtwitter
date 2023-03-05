import "./App.css";
import axios from "axios";
import * as React from "react";

function App() {
  const rootId = "1632076515587538944";
  const [allCircles, setAllCircles] = React.useState([]);
  const bkey ="AAAAAAAAAAAAAAAAAAAAANGeZwEAAAAApoX9dvz8dwBZ5c3E2CZekQBWu1c%3DelLizFIyqg74Ko5Xi9ytArSqUK6S1SHFBVBRlzJu92mrXJmKnE";
  axios.defaults.headers.common["Authorization"] = `Bearer ${bkey}`;
  //quote_tweets

  function tweetApiHandler(tweetId) {
    var tweetJson = { tweetObjects: [] };
    function addQuoteTweets(arr) {
      //arr.includes is full of users
      //arr.data is full of other stuff
      for (let i = 0; i < arr.data.length; i++) {
        var userData = arr.includes.users[i];
        var tweetObj = {
          user_id: userData.id,
          user_name: userData.username,
          tweet_id: arr.data[i].id,
          tweet_type: "tweet",
        };
        tweetJson.tweetObjects.push(tweetObj);
      }
    }
    function addRetweets(arr) {
      for (let j = 0; j < arr.length; j++) {
        var userData = arr[j];
        var tweetObj = {
          user_id: userData.id,
          user_name: userData.username,
          tweet_id: -1,
          tweet_type: "retweet",
        };
        tweetJson.tweetObjects.push(tweetObj);
      }
    }
    Promise.all([
      axios.get(`tweets/${tweetId}/retweeted_by`),
      axios.get(`tweets/${tweetId}/quote_tweets?expansions=author_id`)
    ])
    .then(function (responses) {
      const retweetResponse = responses[0];
      const quoteTweetResponse = responses[1];
      addRetweets(retweetResponse.data.data);
      addQuoteTweets(quoteTweetResponse.data);
      const circleDivs = tweetJson.tweetObjects.map((info) => {
        if(info.tweet_type==="retweet"){
          return (
            <button  className="circle" >{info.user_name}</button>
          )
        }
        else{
          return(
            <button className="circle" id={info.tweet_id} onClick={()=> {document.getElementById(info.tweet_id).style.pointerEvents = 'none'; tweetApiHandler(info.tweet_id);}}>{info.user_name}</button>
          )
        }
      });
      setAllCircles(prevAllCircles => {
        return [...prevAllCircles, ...circleDivs];
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className="App">
        <button className="circle"key="root" id = {rootId} onClick={()=> {document.getElementById(rootId).style.pointerEvents = 'none'; tweetApiHandler(rootId);}}>ROOT</button>
        {allCircles}
    </div>
  );
}

export default App;
