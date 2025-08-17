import React, { useState, useEffect } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // ランダムにポケモンを取得する関数
  const fetchRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 151) + 1; 
    // 1〜151 の間でランダムな数字 (初代ポケモン図鑑)

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTPエラー: " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setErrorMessage(null); // 成功したらエラーメッセージを消す
      })
      .catch((error) => {
        console.error("エラー発生:", error);
        setErrorMessage(error.message);
      });
  };

  // 最初の1回だけ呼ぶ
  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  if (errorMessage) {
    return <p style={{ color: "red" }}>エラー: {errorMessage}</p>;
  }

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: "150px" }}
      />
      <br />
      <button onClick={fetchRandomPokemon} style={{ marginTop: "20px" }}>
        ランダムでポケモン表示
      </button>
    </div>
  );
}

export default App;
