import Head from 'next/head'
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Error from "../components/Error";
import Loader from "../components/Loader";
import RaspberryApi from "../api/raspberry";

export default function Home() {
  const [ pins, setPins ] = useState( [] );
  const [ error, setError ] = useState("");
  const [ loading, setLoading ] = useState( true );

  useEffect( () => {
    async function fetchData() {
      const { data, error: e } = await RaspberryApi.getRpi();
      setLoading( false );
      setError( e );
      setPins( data.pins );
    }
    fetchData();
  }, [] );
  
  const toggle = async ( pin ) => {
    const { data } = await RaspberryApi.togglePin(pin);
    setPins( data.pins )
  }

  const toggleAll = async ( isActive ) => {
    const { data } = await RaspberryApi.toggleAll( isActive );
    setPins( data.pins );
  }

  const isAllDeactivated = pins.filter( ( { isActive } ) => isActive ).length === 0;

  return (
    <div className="container">
      <Head>
        <title>Lampi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Lampi
        </h1>
        <Error error={ error } />
        <Loader isShowing={ loading } />
        { !error && pins.length > 0 && (
          <React.Fragment>
            <Button className={ !isAllDeactivated && "active" } onClick={ () => toggleAll( isAllDeactivated) }>
              Alles { isAllDeactivated ? "inschakelen" : "uitschakelen" }
            </Button>
            <div className="button-group">
              { pins.map( pin => (
                  <Button className={ pin.isActive && "active" } onClick={ () => toggle( pin ) }>
                    { pin.name } { pin.isActive ? "uitschakelen" : "inschakelen" }
                  </Button>
                ) )
              }
            </div>
          </React.Fragment>
        ) }
      </main>
      <footer>
        
      </footer>

      <style jsx>{`
        .button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
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

      `}</style>
    </div>
  )
}
