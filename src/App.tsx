import React, {useState} from 'react';

import './App.css';
import {HomeComponent} from "./components/HomeComponent";
import SocketComponent from "./components/Socket/SocketClient";
import {Subject} from "rxjs";

export const messageSubject = new Subject<string>()
function App() {


    const handleNewMessage = (message: string) => {
        // console.log(message)
        messageSubject.next(message)
    };
  return (
      <div>
          <SocketComponent onMessage={handleNewMessage} />
        <HomeComponent></HomeComponent>
      </div>
  );
}

export default App;