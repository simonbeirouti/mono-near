'use client';

import React, { useState, useEffect } from 'react';
import { CircleDollarSign, Users, Coins } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";

const ProjectFlow = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: <CircleDollarSign className="w-16 h-16" />,
      title: "NFT Collection",
      description: "Join our community by minting unique NFTs that grant governance rights",
      details: [
        "Limited collection of unique digital assets",
        "Each NFT grants voting power",
        "Fair distribution through randomized minting",
        "Be part of project funding"
      ]
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: "DAO Formation",
      description: "Participate in a decentralized autonomous organization",
      details: [
        "Community-driven governance",
        "Transparent fund management",
        "Voting on project proposals",
        "Structured sub-accounts"
      ]
    },
    {
      icon: <Coins className="w-16 h-16" />,
      title: "Token Launch",
      description: "Access our native token with clear distribution mechanics",
      details: [
        "Fair token distribution",
        "50% Treasury allocation",
        "20% Community rewards",
        "10% Team allocation",
        "20% Public pool"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white p-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Project Name</h1>
        <p className="text-xl text-blue-200">Building the future of decentralized communities</p>
        
        <Alert className="mt-8 bg-blue-900/50 border-blue-400">
          <AlertTitle>Join Our Community</AlertTitle>
          <AlertDescription>
            Be part of the next generation of decentralized governance
          </AlertDescription>
        </Alert>
      </div>

      {/* Flow Animation */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="flex justify-between items-stretch gap-4 relative">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className={`flex-1 transition-all duration-500 bg-black/50 border-blue-400/50 ${
                index === activeStep ? 'scale-105 z-10 border-blue-400' : 'opacity-50'
              }`}
            >
              <CardHeader>
                <div className={`mb-4 transition-colors duration-500 ${
                  index === activeStep ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {step.icon}
                </div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription className="text-blue-200">
                  {step.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className={`transition-all duration-500 ${
                  index === activeStep ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0'
                } overflow-hidden`}>
                  <ul className="text-sm space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-900/50">
                          {detail}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-600/20 -z-10">
            <div 
              className="absolute top-0 h-full bg-blue-400 transition-all duration-500"
              style={{ width: `${(activeStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Join the Community
        </Button>
      </div>
    </div>
  );
};

export default ProjectFlow;