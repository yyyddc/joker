import React from "react";
import "./styles.css";
import {decrypt} from './utils';
import {address} from './config'

const goto = () => {
    window.open(decrypt(address))
};

export default function App() {
  return (
    <div className="App">
      <div className={'joker'} onClick={goto} />
    </div>
  );
}
