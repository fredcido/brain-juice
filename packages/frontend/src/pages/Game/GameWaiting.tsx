import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from '@material-ui/core/LinearProgress';

const GameWaiting = () => {
  return (
    <div className="p-2 flex w-full h-screen space-between space-x-3">
      <div className="w-1/4">
        <Skeleton variant="text" className="m-4" height={60} />
        <div className="mt-6">
          {(Array.from(Array(10).keys())).map(x => (
            <React.Fragment key={x}>
              <div className="flex space-between m-4">
                <Skeleton variant="circle" className="flex-shrink-0" height={40} width={40} />
                <Skeleton variant="text" className="w-full ml-4" height={40} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl">Just a second, we are checking the game. It should start in a second.</h2>
        <LinearProgress color="secondary" className="mt-10 w-10/12 h-20" />
      </div>
    </div>
  );
}

export default GameWaiting;
