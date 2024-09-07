import { createContext, useContext, useState } from "react";

const PlayersContext = createContext();

function PlayersProvider({ children }) {
  const p1InitialState = { id: 1, name: "", totalScore: 0, currScore: 0, wins: 0, lost: false };
  const p2InitialState = { id: 2, name: "", totalScore: 0, currScore: 0, wins: 0, lost: false };

  const [player1, setPlayer1] = useState(p1InitialState);
  const [player2, setPlayer2] = useState(p2InitialState);
  const allPlayers = [player1, player2];

  // const [players, setPlayers] = useState(() =>
  //   Array.from({ length: 3 }, (_, i) => generatePlayers(i))
  // );

  // function generatePlayers(i) {
  //   return { id: i + 1, name: "", totalScore: 0, currScore: 0, wins: 0, lost: false };
  // }

  function handlePlayer(name, id) {
    if (id === 1) setPlayer1({ ...player1, name: name });
    if (id === 2) setPlayer2({ ...player2, name: name });
  }

  function handleCurrScore(currScore, id) {
    // update curr score
    if (id === 1)
      setPlayer1({
        ...player1,
        currScore: Number(currScore),
      });

    if (id === 2)
      setPlayer2({
        ...player2,
        currScore: Number(currScore),
      });
  }

  function handleTotalScore() {
    // update total score
    setPlayer1({
      ...player1,
      totalScore: player1.totalScore + player1.currScore,
    });
    setPlayer2({
      ...player2,
      totalScore: player2.totalScore + player2.currScore,
      lost: player2.totalScore >= 200 ? true : false,
    });
  }

  function handleResetCurr() {
    // reset curr score
    setPlayer1({
      ...player1,
      currScore: 0,
    });
    setPlayer2({
      ...player2,
      currScore: 0,
    });
  }

  function handleReset() {
    setPlayer1(p1InitialState);
    setPlayer2(p2InitialState);
    // allPlayers = [];
  }

  return (
    <PlayersContext.Provider
      value={{
        player1,
        player2,
        allPlayers,
        handlePlayer,
        handleCurrScore,
        handleTotalScore,
        handleResetCurr,
        handleReset,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

function usePlayersContext() {
  const context = useContext(PlayersContext);
  if (context === undefined) throw new Error("PlayersContext was used outside the PlayersProvider");
  return context;
}

export { PlayersProvider, usePlayersContext };
