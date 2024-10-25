'use client';

import { useState } from 'react';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"

function loadContractABI() {
  const contractsPath = path.join(process.cwd(), '../../packages/contracts/target/near');
  const files = readdirSync(contractsPath);
  const abiFile = files.find(file => file.endsWith('_contract_abi.json'));
  
  if (!abiFile) {
    throw new Error('Contract ABI file not found');
  }

  const abiContent = readFileSync(path.join(contractsPath, abiFile), 'utf-8');
  return JSON.parse(abiContent);
}

export default function DebugPage() {
  const contractABI = loadContractABI();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, any>>({});

  const handleInputChange = (funcName: string, paramName: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [`${funcName}_${paramName}`]: value
    }));
  };

  const executeFunction = async (func: any) => {
    try {
      // Here you would integrate with your actual contract interaction logic
      // This is a placeholder for demonstration
      if (func.kind === 'view') {
        // Handle view function call
        console.log(`Calling view function: ${func.name}`);
      } else if (func.kind === 'call') {
        // Handle call function
        const functionArgs = func.params?.args.reduce((acc: any, arg: any) => ({
          ...acc,
          [arg.name]: inputs[`${func.name}_${arg.name}`]
        }), {});
        console.log(`Calling function: ${func.name} with args:`, functionArgs);
      }
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
      setResults(prev => ({
        ...prev,
        [func.name]: `Error: ${error}`
      }));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Contract Debug Interface
        </h1>
        
        {contractABI.body.functions.map((func: any) => (
          <Card key={func.name} className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{func.name}</span>
                <span className="text-sm bg-slate-200 px-2 py-1 rounded">
                  {func.kind}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Render inputs for function parameters if they exist */}
              {func.params?.args.map((arg: any) => (
                <div key={arg.name} className="space-y-2">
                  <label className="text-sm font-medium">
                    {arg.name} ({arg.type_schema.type})
                  </label>
                  <Input
                    type="text"
                    value={inputs[`${func.name}_${arg.name}`] || ''}
                    onChange={(e) => handleInputChange(func.name, arg.name, e.target.value)}
                    placeholder={`Enter ${arg.name}`}
                  />
                </div>
              ))}
              
              <Button 
                onClick={() => executeFunction(func)}
                className="w-full"
              >
                Execute {func.name}
              </Button>

              {/* Display results if any */}
              {results[func.name] && (
                <div className="mt-4 p-4 bg-slate-100 rounded">
                  <pre className="text-sm">
                    {JSON.stringify(results[func.name], null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
