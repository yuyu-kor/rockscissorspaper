import { useState, useEffect } from "react";
import "./App.css";
import Box from "./component/Box";

// 1. 박스 2개 (타이틀,사진,결과)
// 2. 가위 바위 보 버튼이 있다
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다
// 5. 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다
// 6. 승패결과에 따라 테두리 색이 바뀐다 (이기면-초록,지면-빨강강,비기면-노랑)

const choice = {
  rock: {
    name: "Rock",
    img: "https://static.thenounproject.com/png/477918-200.png",
  },
  scissors: {
    name: "Scissors",
    img: "https://icon-icons.com/icons2/3246/PNG/512/hand_scissors_icon_198382.png",
  },
  paper: {
    name: "Paper",
    img: "https://static.thenounproject.com/png/477912-200.png",
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");

  // 승패 기록 저장 (useEffect를 사용해야 UI에 바로 업데이트)
  // return 되기 전에
  useEffect(() => {
    if (result === "win") setWinCount((prev) => prev + 1); // prev는 이전 값
    else if (result === "lose") setLoseCount((prev) => prev + 1);
  }, [result]); // result 값이 바뀔 때마다 실행됨

  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };

  const judgement = (user, computer) => {
    // user === computer tie
    // user === rock, computer === "scissors" user win
    // user === rock, computer === "paper" user lose
    // user === scissors, computer === "paper" user win
    // user === scissors, computer === "rock" user lose
    // user === paper, computer "rock" user win
    // user === paper, computer "scissors" user lose

    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "Rock")
      return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "win" : "lose";
  };

  const getComputerResult = (userResult) => {
    if (userResult === "win") return "lose";
    if (userResult === "lose") return "win";
    return "tie";
  };

  // reset 버튼 초기화
  const resetScore = () => {
    setWinCount(0);
    setLoseCount(0);
    setUserSelect(null);
    setComputerSelect(null);
    setResult("");
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); //객체의 키 값만 뽑아서 array로 만들어주는 함수

    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  return (
    <div>
      <div className="score-board">
        <span className="win">{winCount}</span>
        <span className="divider"> : </span>
        <span className="lose">{loseCount}</span>
      </div>
      <div className="main">
        <button className="reset-btn" onClick={resetScore}>
          <img src="https://i.pinimg.com/474x/86/16/9a/86169a7c0ea169c3aa1f5e8bf9555220.jpg" />
        </button>
      </div>
      <div className="main">
        <Box title="You" item={userSelect} result={result} />
        <Box
          title="Computer"
          item={computerSelect}
          result={result ? getComputerResult(result) : ""}
        />
      </div>
      <div className="main">
        <button className="icon-btn" onClick={() => play("scissors")}>
          <img
            src="https://icon-icons.com/icons2/3246/PNG/512/hand_scissors_icon_198382.png"
            className="icon-img"
          />
        </button>
        <button className="icon-btn" onClick={() => play("rock")}>
          <img
            src="https://static.thenounproject.com/png/477918-200.png"
            className="icon-img"
          />
        </button>
        <button className="icon-btn" onClick={() => play("paper")}>
          <img
            src="https://static.thenounproject.com/png/477912-200.png"
            className="icon-img"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
