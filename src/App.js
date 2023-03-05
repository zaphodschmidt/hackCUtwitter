import logo from './logo.svg';
import './App.css';

function App() {

const totalWidth = 1000;
const totalHeight = 1000;
const levelInteractions = 5;
const circleCenter = [];

circleCenter[1] = {x: totalWidth/2, y:totalHeight/2}
  for (let i = 1; i < levelInteractions; i++) {

  }

  const circleCenter1 = {x: 200, y: 200};
  const circleCenter2 = {x: 500, y:500};
  
  const circleRadius1 = 40;
  const circleRadius2 = 90;

  const lineEndPoint = {x: circleCenter2.x, y: circleCenter2.y};
  const lineLength = Math.sqrt(Math.pow(lineEndPoint.x - circleCenter1.x, 2) + Math.pow(lineEndPoint.y - circleCenter1.y, 2));
  const lineAngle = Math.atan2(lineEndPoint.y - circleCenter1.y, lineEndPoint.x - circleCenter1.x);
  
  return (
      <svg width="100vw" height="100vh">
        <circle cx={circleCenter1.x} cy={circleCenter1.y} r={circleRadius1} fill="red" />
        <circle cx={circleCenter2.x} cy={circleCenter2.y} r={circleRadius2} fill="red" />
        <line x1={circleCenter1.x + circleRadius1 * Math.cos(lineAngle)} y1={circleCenter1.y + circleRadius1 * Math.sin(lineAngle)} x2={lineEndPoint.x - circleRadius2 * Math.sin(lineAngle)} y2={lineEndPoint.y - circleRadius2 * Math.sin(lineAngle)} stroke="black" strokeWidth="2" />
      </svg>
  );}
export default App;
