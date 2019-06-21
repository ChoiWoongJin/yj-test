import React, { useState, useEffect, createRef, useRef } from 'react';
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
// - useRef 해볼것 : 아래에서 진행(06/13)
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
    // 함수로 파라미터를 넘겨줄 때에는 '직전'의 state를 입력으로 받음
    // 파라미터로 현재(직전) 값을 넘겨받기 때문에 setCount의 파라미터 함수에는 count든 preCount든 상관없음
    window.setTimeout(() => setCount(preCount => {
      console.log("넘겨받은 값 : ", preCount);
      return preCount = preCount + 1;
    }), 3 * SECOND);
  }

  useEffect(() => {
    document.title = count;

    // 컴포넌트가 언마운트 되기 전이나, 업데이트 되기 전에 작업을 수행하려면 cleanup 함수를 반환해야함
    return () => {
      console.log("현재 화면 타이틀 : ", document.title);
      console.log("count : ", count);
    }
  }, [count]);
  // bug : empty array([]) 를 파라미터로 set할 수 없음.
  // - ESLint를 그면 set 가능
  // - empty array를 주면 마운트 될때만 useEffect가 동작

  return (
    <div>
      <p>{count}</p>
      <button onClick={decreseCount}>-1</button>
      <button onClick={increseCount}>+1</button>
    </div>
  )
}

//=======================
// Custom Hooks 연습
//=======================
const useUser = () => {
  const [nickname, setNickname] = useState('');
  const [isAdmin, setBeAdmin] = useState(false);

  const updateNickname = event => {
    const nickname = event.target.value;

    setNickname(nickname);
  };

  return [nickname, updateNickname]
}

const User = () => {
  const [nickname, setNickname] = useUser();

  return (
    <div>
      <label>{nickname}</label>
      <br />
      <input value={nickname} onChange={setNickname} />
    </div>
  )
}

//=======================
// useRef 연습
// 1. createRef
// 2. useRef
//=======================
// createRef 연습
const useReferenceWithCreateRef = () => {
  const [reference, setReference] = useState(() => createRef())

  return reference
}
const LoginCompWithCreateRef = () => {
  // const [idReference, setIdReference] = useState(() => createRef());
  // const [passwordReferenece, setPasswordReference] = useState(() => createRef());
  const idReference = useReferenceWithCreateRef();
  const passwordReferenece = useReferenceWithCreateRef();

  const requestToLogin = event => {
    event.preventDefault()

    const id = idReference.current.value;
    const password = passwordReferenece.current.value;

    // a AJAX logic
    alert("ID : " + id + " / PW : " + password);
  }

  return (
    <form onSubmit={requestToLogin}>
      <label>
        id:
        <input ref={idReference} type='text' />
      </label>
      <br />
      <label>
        password:
        <input ref={passwordReferenece} type='password' />
      </label>
      <br />
      <button type='submit'>로그인!</button>
    </form>
  )
}
// useRef 연습
const LoginCompWithUseRef = () => {

  const idReference = useRef();
  const passwordReferenece = useRef();

  const requestToLogin = event => {
    event.preventDefault()

    const id = idReference.current.value;
    const password = passwordReferenece.current.value;

    // a AJAX logic
    alert("ID : " + id + " / PW : " + password);
  }

  return (
    <form onSubmit={requestToLogin}>
      <label>
        id:
        <input ref={idReference} type='text' />
      </label>
      <br />
      <label>
        password:
        <input ref={passwordReferenece} type='password' />
      </label>
      <br />
      <button type='submit'>로그인!</button>
    </form>
  )
}


// Main
const App = () => (
  <div className="App">
    <header className="App-header">
      <PropsTest testText='React Props Test' />
      <PropsDestructuringTest testText='Success! Hello' />
      <User />
      <LoginCompWithCreateRef />
      <LoginCompWithUseRef />
      <Counter />
      <ButtonSample />
      <InputSample />
      <Animals />
    </header>
  </div>
)

export default App;
