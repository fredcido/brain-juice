import React, { useState } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";

import Game from '../../models/Game';
import Player from '../../models/Player';

import SpinningWheel from '../../components/SpinnngWheel';

interface GameMagicProps {
  players: Player[];
  game: Game;
}

const options = [
  'MERGE IT',
  'BOOST IT',
  'MUTATE',
  'DISRUPT'
];

const GameMagic: React.FC<GameMagicProps> = ({ players }) => {
  const [selectedItem, setSelectedItem] = useState(-1);

  const onSelectItem = (item: number) => setSelectedItem(item);

  const drawUpdate = (...args: any) => console.log(args);

  return (
    <div className="p-4 flex flex-col w-full h-screen">
      <div className="flex-grow flex items-center justify-between">
        <div className="flex flex-col items-center justify-between flex-grow">
          {selectedItem > -1 && (<h4 className="text-2xl">Item Selected: {options[selectedItem]}</h4>)}
          <SpinningWheel items={options} onSelectItem={onSelectItem} />
        </div>
        <div className="">
          <ReactSketchCanvas
            width="700"
            height="500"
            strokeWidth={4}
            strokeColor="red"
            onUpdate={drawUpdate}
          />
        </div>
      </div>
      <div className="h-48 p-2 w-full">
        <ul className="flex justify-between">
          {players.map(player => (
            <li className="flex flex-col items-center justify-between h-20" key={player.id}>
              <span className="h-12 w-12 bg-gray-200 rounded-full"></span>
              <span>{player.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GameMagic;