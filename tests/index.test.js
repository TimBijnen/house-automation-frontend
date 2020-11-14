import { render, cleanup, waitFor, screen } from "@testing-library/react";
import App from "../pages/index";
import { createServer } from "miragejs"

import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

jest.mock('socket.io-client');

const DATA = [
    { data : { pins: [ {name: "test"} ] } },
    { data : { pins: [ {name: "test2"} ] } }
]


const { NEXT_PUBLIC_API_ENDPOINT } = process.env;

describe("App", () => {
    let socket;
    let server;
    
    beforeEach(() => {
        server = createServer()
        server.logging = false;

        socket = new MockedSocket();
        socketIOClient.mockReturnValue(socket);
    });
    
    afterEach(() => {
        server.shutdown();
        jest.restoreAllMocks();
    });

    it("Can listen to websocket updates", async () => {
        server.get(`${ NEXT_PUBLIC_API_ENDPOINT }/rpi`, () => ( DATA[0] ) )
        render(<App />);
        expect(socketIOClient.connect).toHaveBeenCalled();
        await waitFor(() => expect( screen.getByText("test inschakelen") ).toBeInTheDocument());
        server.get(`${ NEXT_PUBLIC_API_ENDPOINT }/rpi`, () => ( DATA[1] ) )
        socket.socketClient.emit('update');
        await waitFor(() => expect( screen.getByText("test2 inschakelen") ).toBeInTheDocument());
    });
    
    it("Loads and renders data from the API", async () => {
        server.get(`${ NEXT_PUBLIC_API_ENDPOINT }/rpi`, () => ( DATA[0] ) )
        render(<App />);
        await waitFor(() => expect( screen.getByTestId("section") ).toBeInTheDocument());
    });
    
    it("Renders an error if it is returned from the API call", async () => {
        render(<App />);
        await waitFor(() => expect( screen.getByTestId("error") ).toBeInTheDocument());
    });

    it("Renders an error if the server can't be reached", async () => {
        render(<App />);
        server.shutdown();
        await waitFor(() => expect( screen.getByTestId("error") ).toBeInTheDocument());
    });

    it("Renders an error if it is can't handle returned data", async () => {
        server.get(`${ NEXT_PUBLIC_API_ENDPOINT }/rpi`, () => null )
        render(<App />);
        server.shutdown();
        await waitFor(() => expect( screen.getByTestId("error") ).toBeInTheDocument());
    });

    // it("Renders an error if it is can't handle returned data", async () => {
    //     server.get(`${ NEXT_PUBLIC_API_ENDPOINT }/rpi`, () => null )
    //     render(<App />);
    //     server.shutdown();
    //     await waitFor(() => expect( screen.getByTestId("error") ).toBeInTheDocument());
    // });
});


