import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DDOSSimulation = () => {
  const [serverHealth, setServerHealth] = useState(100);
  const [attackWaves, setAttackWaves] = useState(0);
  const [attackSpeed, setAttackSpeed] = useState(1);

  const startDDOSAttack = () => {
    const damageAmount = 10 * attackSpeed;
    setServerHealth(prevHealth => Math.max(0, prevHealth - damageAmount));
    setAttackWaves(prev => prev + 1);
  };

  const incrementAttackSpeed = () => {
    setAttackSpeed(prev => Math.min(5, prev + 0.5));
  };

  const resetSimulation = () => {
    setServerHealth(100);
    setAttackWaves(0);
    setAttackSpeed(1);
  };

  const isServerDown = serverHealth <= 0;

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>DDOS Attack Simulation</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="w-full h-[300px] border rounded-lg overflow-hidden flex flex-col justify-center items-center">
          <div 
            className="w-48 h-48 bg-blue-500 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300"
            style={{
              transform: `scale(${1 + (5 - serverHealth/20)/10})`,
              backgroundColor: `rgb(33, 150, 243, ${serverHealth/100})`
            }}
          >
            <span className="text-white font-bold text-lg">Server</span>
          </div>
          
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4">
            <div 
              className="h-full bg-green-500 transition-all duration-300" 
              style={{ width: `${serverHealth}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p>Server Health: {serverHealth}%</p>
          <p>Attack Speed: {attackSpeed}x</p>
          <p>Attack Waves: {attackWaves}</p>
          {isServerDown && (
            <p className="text-red-500 font-bold mt-2">
              Server Overwhelmed! DDOS Attack Successful
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button 
          onClick={startDDOSAttack} 
          disabled={isServerDown}
          variant={isServerDown ? "destructive" : "default"}
        >
          Launch Attack
        </Button>
        <Button 
          onClick={incrementAttackSpeed}
          disabled={isServerDown}
        >
          Increase Attack Speed
        </Button>
        <Button 
          onClick={resetSimulation}
          variant="outline"
        >
          Reset Simulation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DDOSSimulation;
