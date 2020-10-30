import { useEffect, useState } from "react";
import Head from 'next/head'
import socketIOClient from "socket.io-client";
import Section from "../components/Section";
import Error from "../components/Error";
import Loader from "../components/Loader";
import RaspberryApi from "../api/raspberry";

const { NEXT_PUBLIC_API_ENDPOINT } = process.env;
const ENDPOINT = `${NEXT_PUBLIC_API_ENDPOINT}/socket`;

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

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("updatePins", data => setPins(data.pins));
  }, []);
  
  const toggle = async ( pin ) => {
    const { data } = await RaspberryApi.togglePin(pin);
    setPins( data.pins )
  }

  const toggleAll = async ( isActive ) => {
    const { data } = await RaspberryApi.toggleAll( isActive );
    setPins( data.pins );
  }

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
          <Section title="TEST" pins={ pins } toggle={ toggle } toggleAll={ toggleAll } />
        ) }
      </main>
      <footer>
        
      </footer>

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
