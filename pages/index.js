import Head from 'next/head'
import { useEffect, useState } from "react";
import fetch from "cross-fetch";

export default function Home() {
  const [ gardenLights, setGardenLights ] = useState( {} );

  useEffect( () => {
    async function fetchData() {
      const data = await fetch( "http://www.bezigebijnen.nl/api/lighting" ).then(response => response.json());
      setGardenLights( data );
    }
    fetchData();
  }, [] );
  const activate = async ( key, value ) => {
    const result = await fetch( "http://www.bezigebijnen.nl/api/lighting", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify( { [key]: value }) }).then(response => response.json());
    console.log(result);
    setGardenLights( { ...gardenLights, ...result } );
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Huize Bijnen
        </h1>
        <div className="button-group">
          <button onClick={ () => activate( "gardenLightsBack", !gardenLights.gardenLightsBack ) }>
            Tuinlampen achter { gardenLights.gardenLightsBack ? "uitschakelen" : "inschakelen" }

          </button>
          <button onClick={ () => activate( "gardenLightsFront", !gardenLights.gardenLightsFront ) }>
            Tuinlampen voor { gardenLights.gardenLightsFront ? "uitschakelen" : "inschakelen" }
          </button>
        </div>
      </main>
      <footer>
        
      </footer>

      <style jsx>{`
        .button-group {
          display: grid;
          grid-template-rows: 1fr 1fr;
        }
        button {
          height: 60px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
