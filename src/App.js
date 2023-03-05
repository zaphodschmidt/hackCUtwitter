import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const rootId = "1632247034043326464";
const bkey ="AAAAAAAAAAAAAAAAAAAAANGeZwEAAAAApoX9dvz8dwBZ5c3E2CZekQBWu1c%3DelLizFIyqg74Ko5Xi9ytArSqUK6S1SHFBVBRlzJu92mrXJmKnE";
axios.defaults.headers.common["Authorization"] = `Bearer ${bkey}`;





function App() {
  var call = true;
  const totalWidth = window.screen.width;
  const totalHeight = window.screen.height;
  // const iteractions = 7;
  
  const InitialCircleCenter = { x: totalWidth / 2, y: totalHeight / 2 };
  // const circleCenter = [];
  // const theta = [];
  const L = 120;

  
  const InitialCircleRadius = 40;
  const circleRadius2 = 10;
  
  const [fucked, setFucked] = useState([
    <div
      key="fug"
      style={{
        width: `${2 * InitialCircleRadius}px`,
        height: `${2 * InitialCircleRadius}px`,
        left: `${InitialCircleCenter.x}px`,
        top: `${InitialCircleCenter.y}px`,
        fontSize: `${InitialCircleRadius/6}px`
      }}
      className="circle"
      id = {rootId} 
      onClick={()=> {document.getElementById(rootId).style.pointerEvents = 'none'; console.log("ASD111SDASD"); tweetApiHandler(rootId);}}
      >Root
    </div>
  ]);
  const [fucked2, setFucked2] = useState([]);
  const [allCircles, setAllCircles] = React.useState([]);


  function nodeCollides(node)
  {
    for(let i = 0; i < fucked.length; i++)
    {
      var currNode = fucked[i];
      
      // var distBetween = 
    }
  }
  function adjustPosition(node)
  {

  }


  //quote_tweets

  function tweetApiHandler(tweetId) {
    const rootNode = document.getElementById(String(tweetId));
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
      console.log("ASDASDASDASDASDASDASD");
      const circleDivs = tweetJson.tweetObjects.map((info) => {
        if(info.tweet_type==="retweet"){
          return (
            <div
              key="fug"
              style={{
                width: `${2 * InitialCircleRadius}px`,
                height: `${2 * InitialCircleRadius}px`,
                left: `${InitialCircleCenter.x}px`,
                top: `${InitialCircleCenter.y}px`,
                backgroundColor: "blue",
                fontSize: `${InitialCircleRadius/6}px`
              }}
              className="circle"
              >{info.user_name}
            </div>
          )
        }
        else{
          return(
            <div
              key="fug"
              style={{
                width: `${2 * InitialCircleRadius}px`,
                height: `${2 * InitialCircleRadius}px`,
                left: `${InitialCircleCenter.x}px`,
                top: `${InitialCircleCenter.y}px`,
                fontSize: `${InitialCircleRadius/6}px`
              }}
              className="circle"
              id = {info.tweet_id} 
              onClick={()=> {document.getElementById(info.tweet_id).style.pointerEvents = 'none'; tweetApiHandler(info.tweet_id);}}
              >{info.user_name}
            </div>
            // <button className="circle" id={info.tweet_id} onClick={()=> {document.getElementById(info.tweet_id).style.pointerEvents = 'none'; tweetApiHandler(info.tweet_id);}}>{info.user_name}</button>
            // <button  id = {info.tweet_id} onClick={()=> {document.getElementById(info.tweet_id).style.pointerEvents = 'none'; tweetApiHandler(info.tweet_id);}}>{info.user_name}</button>
          )
        }
      });
      // console.log("After circlDivs declared");
      setAllCircles(prevAllCircles => {
        return [...prevAllCircles, ...circleDivs];
      });
      processNewNodes(circleDivs, rootNode);
    })
    .catch(function (error) {
      console.log("help!!!");
      console.log(error);
    });

  }

  
  // // const lineEndPoint1 = {x: circleCenter1.x, y: circleCenter1.y};
  // // const lineEndPoint2 = {x: circleCenter2.x, y: circleCenter2.y};

  // // const lineAngle1 = Math.atan2(lineEndPoint1.y - InitialCircleCenter.y, lineEndPoint1.x - InitialCircleCenter.x);
  // // const lineAngle2 = Math.atan2(lineEndPoint2.y - InitialCircleCenter.y, lineEndPoint2.x - InitialCircleCenter.x);

  var linesArray = [];
  function processNewNodes(arr, root) {
    console.log(root.style);
    const rootRadius = parseInt(root.style.width) / 2;
    const it = arr.length;
    const rootStyle = root.style;
    var rootCenter = {
      x: parseInt(rootStyle.left) + parseInt(rootStyle.width) / 2,
      y: parseInt(rootStyle.top) + parseInt(rootStyle.height) / 2,
    };
    const updatedfucked = arr.map((circle, i) => {
      const currCenter = {
        x: L * Math.cos((i * 2 * Math.PI) / it) + rootCenter.x,
        y: L * Math.sin((i * 2 * Math.PI) / it) + rootCenter.y,
      };
      var currRadius = 5;
      circle.props.style.width = currRadius * 2;
      circle.props.style.height = currRadius * 2;
      circle.props.style.left = currCenter.x - currRadius;
      circle.props.style.top = currCenter.y - currRadius;
      const currEndPoint = { x: currCenter.x, y: currCenter.y };
      const currLineAngle = Math.atan2(
        currEndPoint.y - rootCenter.y,
        currEndPoint.x - rootCenter.x
      );
      linesArray.push(<line
        x1={rootCenter.x + rootRadius * Math.cos(currLineAngle)}
        y1={rootCenter.y + rootRadius * Math.sin(currLineAngle)}
        x2={currEndPoint.x - circleRadius2 * Math.sin(0)}
        y2={currEndPoint.y - circleRadius2 * Math.sin(0)}
        stroke="black"
        strokeWidth="2"
      />);
      return circle;
    });
    setFucked((prevCirc) => {
      return [...prevCirc, ...updatedfucked];
    });
    setFucked2((prevLine) => {
      return [...prevLine, ...linesArray];
    });
  }

  // function handleAddNodes() {
  //   var newNodes = [];
  //   for (let j = 0; j < 5; j++) {
  //     newNodes.push(
  //       <div
  //         id={fucked.length + j}
  //         key={fucked.length + j}
  //         style={{
  //           left: `${InitialCircleCenter.x}px`,
  //           top: `${InitialCircleCenter.y}px`,
  //           width: `${2 * InitialCircleRadius}px`,
  //           height: `${2 * InitialCircleRadius}px`,
  //         }}
  //         className="circle"
  //       ></div>
  //     );
  //   }
  //   processNewNodes(newNodes, fucked[0]);
  // }

  return (
    <div>
      <svg width={totalWidth} height={totalHeight}>
        {fucked2}
      </svg>
      {fucked}
    </div>
  );
}
export default App;
