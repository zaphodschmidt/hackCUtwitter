import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const rootId = "1632247034043326464";
const bkey ="AAAAAAAAAAAAAAAAAAAAANGeZwEAAAAApoX9dvz8dwBZ5c3E2CZekQBWu1c%3DelLizFIyqg74Ko5Xi9ytArSqUK6S1SHFBVBRlzJu92mrXJmKnE";
axios.defaults.headers.common["Authorization"] = `Bearer ${bkey}`;
const pi = Math.PI;

function radToDeg(radians)
{
  return radians * (180/pi);
}
function degToRad(deg)
{
  return pi * deg/180;
}

function getNodeXY(node)
{
  let nStyle = node.style;
  if(nStyle == undefined)
  {
    // console.log("ALERT!!!!");
    // console.log(node);
    nStyle = node.props.style;
  }
  return({
    x: parseInt(nStyle.left) + parseInt(nStyle.width)/2,
    y: parseInt(nStyle.top) - parseInt(nStyle.height)/2
  });
}


function App() {
  var call = true;
  const totalWidth = window.screen.width;
  const totalHeight = window.screen.height;
  // const iteractions = 7;
  
  const InitialCircleCenter = { x: totalWidth / 2, y: totalHeight / 2 };
  // const circleCenter = [];
  // const theta = [];
  const L = 50;

  
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
    var nStyle = node.props.style;
    if(nStyle === undefined)
    {
      nStyle = node.style;
    }
    var nRadius = parseInt(nStyle.width)/2;
    console.log("LENGTHERHEHERER");
    console.log(fucked.length);
    for(let i = 0; i < fucked.length; i++)
    {
      var currNode = fucked[i];
      var currStyle = currNode.props.style;
      if(currStyle === undefined)
      {
        currStyle = currNode.style;
      }
      var currRadius = parseInt(currStyle.width)/2;
      var nCenter = getNodeXY(node);
      var cCenter = getNodeXY(currNode);
      if(nCenter === cCenter)
      {
        console.log("PASDSSSSSSS");
        continue;
      }
      // console.log("CURRNODE:");
      // console.log(currNode);
      var powes =   Math.pow(nCenter.x - cCenter.x, 2)+ Math.pow(nCenter.y - cCenter.y, 2);
      // console.log(cCenter.y);
      var distBetween = Math.sqrt(powes);
      //collision
        console.log("HERE");
        console.log(distBetween);
        console.log(nRadius + currRadius);
        console.log(nRadius);
        console.log(currStyle.width);
      if(distBetween < nRadius + currRadius)
      {
        console.log("TRUEURE");
        return true;
      }
    }
    return false;
  }
  function adjustPosition(node, origRads, origLen, root)
  {
    let nRadius = parseInt(node.props.style.width)/2;
    let colliding = nodeCollides(node);
    let rootXY = getNodeXY(root);
    let inc = degToRad(5.0);
    let currRads = origRads;
    let currLen = origLen;
    // console.log(colliding);
    while(colliding === true)
    {
      currRads += inc;
      //if over 2pi rads, reset to 0;
      if(currRads >= 2 * pi)
      {
        currRads = 0;
      }
      console.log("ASD11111");
      // currRads -= (2*pi*Math.floor(currRads/(2*pi)));
      if(Math.abs(origRads - currRads) <= 0.01)
      {
        //They are about equal, we can say rotating was unsuccessful and increase length of line
        //get new x and y of the node now
        console.log("CURRLEN:");
        console.log(currLen);
        currLen += 1.0;
        console.log(currLen);
      }
      let newX = currLen * Math.cos(currRads) + rootXY.x;
      let newY = currLen * Math.sin(currRads) + rootXY.y;
      node.props.style.left = newX - nRadius;
      node.props.style.top = newY + nRadius;
      colliding = nodeCollides(node);
    }
    return {currRads, currLen};
  }


  //quote_tweets

  
  function processNewNodes(arr, root, oldLen) {
    let linesArray = [];
    console.log(arr);
    // setFucked((prevCirc) => {
    //   return [...prevCirc, ...arr];
    // });

    // setFucked((prevCirc) => {
    //   const updatedCirc = [...prevCirc, ...arr];
    //   return updatedCirc;
    // }, () => {});

      // code to execute after state has been updated
      
    console.log(root.style);
    const rootRadius = parseInt(root.style.width) / 2;
    const it = arr.length;
    const rootStyle = root.style;
    var rootCenter = {
      x: parseInt(rootStyle.left) + parseInt(rootStyle.width) / 2,
      y: parseInt(rootStyle.top) + parseInt(rootStyle.height) / 2,
    };
    // const updatedfucked = arr.map((circle, i) => {
    //   const currCenter = {
    //     x: L * Math.cos((i * 2 * Math.PI) / it) + rootCenter.x,
    //     y: L * Math.sin((i * 2 * Math.PI) / it) + rootCenter.y,
    //   };
    //   var currRadius = 5;
    //   circle.props.style.width = currRadius * 2;
    //   circle.props.style.height = currRadius * 2;
    //   circle.props.style.left = currCenter.x - currRadius;
    //   circle.props.style.top = currCenter.y - currRadius;

      
    //   let currEndPoint = { x: currCenter.x, y: currCenter.y };
    //   let currLineAngle = Math.atan2(
    //     currEndPoint.y - rootCenter.y,
    //     currEndPoint.x - rootCenter.x
    //   );
    //   //{currRads, currLen}
    //   var lineData = adjustPosition(circle,currLineAngle, L, root);
    //   //update angle and len if they have changed
    //   currLineAngle = lineData.currRads;
    //   currEndPoint = getNodeXY(circle);
    //   // console.log("got it"); 
    //   linesArray.push(<line
    //     x1={rootCenter.x + circleRadius2 * Math.cos(currLineAngle)}
    //     y1={rootCenter.y + circleRadius2 * Math.sin(currLineAngle)}
    //     x2={currEndPoint.x - circleRadius2 * Math.cos(currLineAngle)}
    //     y2={currEndPoint.y - circleRadius2 * Math.sin(currLineAngle)}
    //     stroke="black"
    //     strokeWidth="2"
    //   />);
    //   return circle;
    // });

    for(let k = 0; k < arr.length - oldLen; k++)
    {
      let ci = k + oldLen;
      let circle = arr[ci];
      // console.log(fucked);
      const currCenter = {
        x: L * Math.cos((k * 2 * Math.PI) / it) + rootCenter.x,
        y: L * Math.sin((k * 2 * Math.PI) / it) + rootCenter.y,
      };
      var currRadius = 5;
      console.log("BEFORE");
      let cStyle;
      try
      {
        cStyle = circle.props.style;
      }
      catch(error){
        console.log("ASDASDAHELLOOO"); 
        if(cStyle === undefined)
        {
          console.log(circle);
          console.log(fucked);
          cStyle = circle.style;
        }
      }
      console.log("AFTER");
      cStyle.width = currRadius * 2;
      cStyle.height = currRadius * 2;
      cStyle.left = currCenter.x - currRadius;
      cStyle.top = currCenter.y - currRadius;

      
      let currEndPoint = { x: currCenter.x, y: currCenter.y };
      let currLineAngle = Math.atan2(
        currEndPoint.y - rootCenter.y,
        currEndPoint.x - rootCenter.x
      );
      //{currRads, currLen}
      var lineData = adjustPosition(circle,currLineAngle, L, root);
      //update angle and len if they have changed
      currLineAngle = lineData.currRads;
      currEndPoint = getNodeXY(circle);
      // console.log("got it"); 
      // <line
      //   x1={rootCenter.x + InitialCircleRadius * Math.cos(currLineAngle)}
      //   y1={rootCenter.y + InitialCircleRadius * Math.sin(currLineAngle)}
      //   x2={currEndPoint.x - currRadius * Math.cos(currLineAngle)}
      //   y2={currEndPoint.y - currRadius * Math.sin(0)}
      //   stroke="black"
      //   strokeWidth="2"
      // />
      linesArray.push(<line
        x1={rootCenter.x}
        y1={rootCenter.y}
        x2={rootCenter.x + (lineData.currLen * Math.cos(currLineAngle))}
        y2={rootCenter.y + (lineData.currLen * Math.sin(currLineAngle))}
        stroke="black"
        strokeWidth="0.5"
      />);
    }
    setFucked2((prevLine) => {
      return [...prevLine, ...linesArray];
    });
    // setFucked((prevCirc) => {
    //   return [...prevCirc, ...updatedfucked];
    // });
    // setFucked2((prevLine) => {
    //   return [...prevLine, ...linesArray];
    // });
  }
  

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
      // setAllCircles(prevAllCircles => {
      //   return [...prevAllCircles, ...circleDivs];
      // });
      // processNewNodes(circleDivs, rootNode)

      // setAllCircles(prevAllCircles => {
      //   return [...prevAllCircles, ...circleDivs];
      // });
      // setFucked((prevCirc) => {
      //   return [...prevCirc, ...circleDivs];
      // });
      let lenOld = fucked.length;
      function myFunc(){return new Promise((resolve) => {
        setFucked((prevCirc) => {
          const updatedCirc = [...prevCirc, ...circleDivs];
          resolve(updatedCirc);
          return updatedCirc;
        });
      })};
      async function theAwait()
      {
          const newCirc = await myFunc();
          console.log(newCirc);
          processNewNodes(circleDivs, rootNode, lenOld);
      }
      theAwait();
      // this.setState({ allCircles: newValue }, () => {
      //   // do something after state has been updated
      // });


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