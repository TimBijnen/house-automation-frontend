import { useEffect, useState } from "react";
import Head from 'next/head'
import socketIOClient from "socket.io-client";
import Section from "../components/Section";
import Error from "../components/Error";
import Loader from "../components/Loader";
import RaspberryApi from "../api/raspberry";

const { NEXT_PUBLIC_API_ENDPOINT } = process.env;
// const ENDPOINT = `${NEXT_PUBLIC_API_ENDPOINT}`;
const ENDPOINT = `http://localhost:3002`;

export default function Home() {
  const [ pins, setPins ] = useState( [] );
  const [ error, setError ] = useState("");
  const [ loading, setLoading ] = useState( true );
  const socket = socketIOClient(ENDPOINT);

  
  useEffect( () => {
    async function fetchData() {
      const { data, error: e } = await RaspberryApi.getRpi();
      setLoading( false );
      setError( e );
      setPins( data.pins );
    }
    socket.on("update", () => fetchData());
    fetchData();
  }, [] );
  
  const toggle = async ( pin ) => {
    const { data } = await RaspberryApi.togglePin(pin);
    socket.emit("update");
  }
  
  const toggleAll = async ( isActive ) => {
    const { data } = await RaspberryApi.toggleAll( isActive );
    socket.emit("update");
  }

  return (
    <div className="container">
      <Head>
        <title>lamPIe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          lamPIe
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
