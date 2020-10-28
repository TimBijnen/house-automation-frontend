import Head from 'next/head'
import { useEffect, useState } from "react";
import fetch from "cross-fetch";

export default function Home() {
  const { NEXT_PUBLIC_API_ENDPOINT: baseUrl } = process.env;
  const [ pins, setPins ] = useState( [] );

  useEffect( () => {
    async function fetchData() {
      const { data } = await fetch( `${ baseUrl }/rpi/` ).then(response => response.json());
      setPins( data.pins );
    }
    fetchData();
  }, [] );
  const toggle = async ( pin ) => {
    const { data } = await fetch(
      `${ baseUrl }/rpi/${ pin.number }`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify( { isActive: !pin.isActive } )
      }
    ).then(response => response.json());
    setPins( data.pins )
  }
  const toggleAll = async ( isActive ) => {
    const { data } = await fetch(
      `${ baseUrl }/rpi`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify( { isActive } )
      }
    ).then(response => response.json());
    setPins( data.pins )
  }

  const isAllDeactivated = pins.filter( ( { isActive } ) => isActive ).length === 0;

  return (
    <div className="container">
      <Head>
        <title>Huize Bijnen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Huize Bijnen
        </h1>
        <button className={ !isAllDeactivated && "active" } onClick={ () => toggleAll( isAllDeactivated) }>
          Alles { isAllDeactivated ? "inschakelen" : "uitschakelen" }
        </button>
        <div className="button-group">
          { pins.map( pin => (
              <button className={ pin.isActive && "active" } onClick={ () => toggle( pin ) }>
                { pin.name } { pin.isActive ? "uitschakelen" : "inschakelen" }
              </button>
            ) )
          }
        </div>
      </main>
      <footer>
        
      </footer>

      <style jsx>{`
        .button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        button {
          height: 60px;
          background-color: red;
        }
        button.active {
          background-color: green;
          color: white;
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
