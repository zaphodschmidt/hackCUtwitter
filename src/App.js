import "./App.css";
import React, { useState, useEffect } from "react";

var call = true;
function App() {
  const totalWidth = window.screen.width;
  const totalHeight = window.screen.height;
  const iteractions = 7;

  const InitialCircleCenter = { x: totalWidth / 2, y: totalHeight / 2 };
  const circleCenter = [];
  const theta = [];
  const L = 60;

  const InitialCircleRadius = 20;
  const circleRadius2 = 10;
  const [fucked, setFucked] = useState([
    <div
      key="fug"
      style={{
        width: `${2 * InitialCircleRadius}px`,
        height: `${2 * InitialCircleRadius}px`,
        left: `${InitialCircleCenter.x}px`,
        top: `${InitialCircleCenter.y}px`,
      }}
      className="circle"
    ></div>,
  ]);
  const [fucked2, setFucked2] = useState([]);
  // const lineEndPoint1 = {x: circleCenter1.x, y: circleCenter1.y};
  // const lineEndPoint2 = {x: circleCenter2.x, y: circleCenter2.y};

  // const lineAngle1 = Math.atan2(lineEndPoint1.y - InitialCircleCenter.y, lineEndPoint1.x - InitialCircleCenter.x);
  // const lineAngle2 = Math.atan2(lineEndPoint2.y - InitialCircleCenter.y, lineEndPoint2.x - InitialCircleCenter.x);

  var linesArray = [];
  function processNewNodes(arr, root) {
    const rootRadius = parseInt(root.props.style.width) / 2;
    const it = arr.length;
    const rootStyle = root.props.style;
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
      console.log(rootRadius);
      console.log(rootCenter.x + rootRadius * Math.cos(currLineAngle));
      console.log("ASDASDASDY*Y!DH!@D!@D");
      linesArray.push(<line
        x1={rootCenter.x + rootRadius * Math.cos(currLineAngle)}
        y1={rootCenter.y + rootRadius * Math.sin(currLineAngle)}
        x2={currEndPoint.x - circleRadius2 * Math.sin(currLineAngle)}
        y2={currEndPoint.y - circleRadius2 * Math.sin(currLineAngle)}
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

  function handleAddNodes() {
    var newNodes = [];
    for (let j = 0; j < 5; j++) {
      newNodes.push(
        <div
          id={fucked.length + j}
          key={fucked.length + j}
          style={{
            left: `${InitialCircleCenter.x}px`,
            top: `${InitialCircleCenter.y}px`,
            width: `${2 * InitialCircleRadius}px`,
            height: `${2 * InitialCircleRadius}px`,
          }}
          className="circle"
        ></div>
      );
    }
    processNewNodes(newNodes, fucked[0]);
  }

  return (
    <div>
      <svg width="1000px" height="1000px">
        {fucked2}
      </svg>
      {fucked}
      <button onClick={handleAddNodes}>Add Nodes</button>
    </div>
  );
}
export default App;
