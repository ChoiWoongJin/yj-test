import React, { useState, useEffect } from 'react';
import ProTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React!
//         </a>
//       </header>
//     </div>
//   );
// }

//=============
// props 활용
//=============
const PropsTest = props => (
  <h1>{props.testText}</h1>
)

const PropsDestructuringTest = ({ testText }) => (
  <h1>{testText}</h1>
)

PropsDestructuringTest.proTypes = {
  testText: ProTypes.string
}

//============================
// map 함수 이용 : 반복컴포넌트
//============================
const Animal = ({ name }) => (
  <li>
    <span>{name}</span>
  </li>
)

const Animals = () => {
  const animalList = ['dog', 'cat', 'tiger'];

  return (
    <ol>
      {animalList.map((animal, index) => (
        <Animal key={index} name={animal} />
      ))}
    </ol>
  )
}

//============
// 이벤트 연습
//============
const ButtonSample = () => {
  return (
    <>
      <button onClick={onClickEvent} name='버튼임'>click1!</button>
      <button onClick={onClickEvent2} name='버튼임'>click2!</button>
    </>
  )
}

const onClickEvent = event => {
  alert('button!');
}

function onClickEvent2(event) {
  alert('button2!');
  alert(event.target.name);
}

const InputSample = () => (
  <input type='text' onChange={onChangeEvent} />
)

const onChangeEvent = event => {
  alert(event.target.value);
}

//=======================
// Hooks
// - useState 연습
// - useEffect 연습
// - useRef 해볼것
// - useMemo 해볼것
// - useReducer 해볼것
//=======================
const SECOND = 1000;
const Counter = () => {
  // count, setCount에 비구조화 할당
  const [count, setCount] = useState(() => {
    let value = 0;
    for (let index = 0; index < 1000000; index += 1) {
      value += 1;
    }
    return value;
  });

  const decreseCount = () => setCount(count - 1);
  // 함수로 setCount의 파라미터를 세팅하면, 실행될 때 값을 넘겨받기 때문에 Timeout 설정을 해도 정상적으로 동작
  const increseCount = () => {
    // 파라미터로 현재 값을 넘겨받기 때문에 setCount의 파라미터 함수에는 count든 preCount든 상관없음
    window.setTimeout(() => setCount(preCount => {
      console.log("넘겨받은 값 : ", preCount);
      return preCount = preCount + 1;
    }), 3 * SECOND);
  }

  useEffect(() => {
    document.title = count;

    return () => {
      console.log("현재 화면 타이틀 : ", document.title);
      console.log("count : ", count);
    }
  }, [count]);
  // bug : empty array([]) 를 파라미터로 set할 수 없음.

  return (
    <div>
      <p>{count}</p>
      <button onClick={decreseCount}>-1</button>
      <button onClick={increseCount}>+1</button>
    </div>
  )
}

const App = () => (
  <div className="App">
    <header className="App-header">
      <PropsTest testText='React Props Test' />
      <PropsDestructuringTest testText='Success! Hello' />
      <Counter />
      <ButtonSample />
      <InputSample />
      <Animals />
    </header>
  </div>
)

export default App;
