//`https://pokeapi.co/api/v2/pokemon/${randomId}`
//{pokemon.sprites.front_default}
import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchRandomPokemon = (): void => {
    const randomId = Math.floor(Math.random() * 151) + 1
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTPエラ-:" + res.text);
        }
        return res.json()
      })
      .then((data) => {
        setPokemon(data)
        setErrorMessage(null)
      })
      .catch((error) => {
        console.error('エラー発生:', error)  //?
        setErrorMessage(error.message)
      })
  }
  
  useEffect(() => {
    fetchRandomPokemon()
  }, [])

  if (errorMessage) {
    return <p style={{ color: 'red' }}>エラー発生</p>
  }
  if (!pokemon) return <h1>loading...</h1>

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{
          display: "block",
          margin: '0px,auto',
          width: '250px'
        }} />
      <button
        style={{ marginTop: '30px', }}
        onClick={() => { fetchRandomPokemon() }}
      >ランダムでポケモンを生成</button>
    </div>
  )

}
export default App