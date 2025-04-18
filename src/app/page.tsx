'use client';

import {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {generateFinancialTips} from '@/ai/flows/generate-financial-tips';
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";

const personaData = [
  {
    name: 'Innovator',
    description: 'Tech-savvy and always looking for the next big thing.',
    image: 'https://picsum.photos/id/237/200/300',
  },
  {
    name: 'Traditionalist',
    description: 'Values stability and proven investment strategies.',
    image: 'https://picsum.photos/id/238/200/300',
  },
  {
    name: 'Adventurer',
    description: 'Willing to take risks for high returns.',
    image: 'https://picsum.photos/id/239/200/300',
  },
  {
    name: 'Athlete',
    description: 'Focused on long-term financial health and performance.',
    image: 'https://picsum.photos/id/240/200/300',
  },
  {
    name: 'Artist',
    description: 'Seeks creative and unconventional financial solutions.',
    image: 'https://picsum.photos/id/241/200/300',
  },
];

export default function Home() {
  const [age, setAge] = useState<number>(25);
  const [income, setIncome] = useState<number>(50000);
  const [goals, setGoals] = useState<string>('Retire early and travel the world.');
  const [tips, setTips] = useState<string>('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoLoaded(true);
  }, []);

  const handleGenerateTips = async () => {
    setIsGenerating(true);
    try {
      const result = await generateFinancialTips({
        age: age,
        income: income,
        financialGoals: goals,
      });
      setTips(result.financialTips);
    } catch (error) {
      console.error('Failed to generate financial tips:', error);
      setTips('Failed to generate financial tips. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-4 neon-glow">Welcome to the Financial Multiverse</h1>
        <p className="text-lg text-muted-foreground mb-8">Explore the cosmos of financial possibilities.</p>
        {/* Placeholder for Interactive 3D Hero */}
        <div className="w-full h-64 rounded-lg shadow-md mb-8 overflow-hidden relative">
          {videoLoaded && (
            <video
              src="/finance_abstract.mp4"
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
            />
          )}
          <div className="absolute inset-0 bg-secondary opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center text-foreground glassmorphism">
            Interactive 3D Model Here (Coming Soon)
          </div>
        </div>
        <Button className="glassmorphism">Embark on Your Financial Journey</Button>
      </section>

      {/* Animated Concept Cards Section */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-foreground text-center mb-8">Key Financial Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example Card */}
          <Card className="text-foreground hover:scale-105 transition-transform glassmorphism">
            <CardHeader>
              <CardTitle>Diversification</CardTitle>
              <CardDescription>Spread your investments to reduce risk.</CardDescription>
            </CardHeader>
            <CardContent>
              Learn how diversifying your portfolio can help you weather market fluctuations.
            </CardContent>
          </Card>
          {/* Add more cards here */}
          <Card className="text-foreground hover:scale-105 transition-transform glassmorphism">
            <CardHeader>
              <CardTitle>Compound Interest</CardTitle>
              <CardDescription>Make your money work for you!</CardDescription>
            </CardHeader>
            <CardContent>
              Understand the exponential power of compound interest.
            </CardContent>
          </Card>
          <Card className="text-foreground hover:scale-105 transition-transform glassmorphism">
            <CardHeader>
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>Assess your risk tolerance.</CardDescription>
            </CardHeader>
            <CardContent>
              Minimize potential losses by learning your risk profile.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Persona Cards Section */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-foreground text-center mb-8">Find Your Financial Persona</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {personaData.map((persona, index) => (
            <Card
              key={index}
              className="text-foreground p-4 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer glassmorphism"
            >
              <img src={persona.image} alt={persona.name} className="w-full h-32 object-cover rounded-md mb-2" />
              <CardTitle className="text-xl font-semibold">{persona.name}</CardTitle>
              <CardDescription>{persona.description}</CardDescription>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Financial Advisor Section */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-foreground text-center mb-8">AI Financial Advisor</h2>
        <div className="max-w-3xl mx-auto glassmorphism p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-muted-foreground text-sm font-bold mb-2" htmlFor="age">
              Age:
            </label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground text-sm font-bold mb-2" htmlFor="income">
              Annual Income:
            </label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground text-sm font-bold mb-2" htmlFor="goals">
              Financial Goals:
            </label>
            <Textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </div>
          <Button className="glassmorphism" onClick={handleGenerateTips} disabled={isGenerating}>
            {isGenerating ? 'Generating Tips...' : 'Get Personalized Tips'}
          </Button>
          {tips && (
            <div className="mt-8 p-4 bg-secondary rounded-lg text-foreground">
              <h3 className="text-xl font-semibold mb-2">Your Personalized Financial Tips:</h3>
              <p>{tips}</p>
            </div>
          )}
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Chatbot</h2>
        <p className="text-lg text-muted-foreground">Coming Soon: Your Personalized AI Assistant</p>
      </section>

      {/* Informational Footer */}
      <footer className="text-muted-foreground py-6 text-center glassmorphism">
        <p>
          <a href="#" className="hover:text-primary mx-2">Terms of Service</a>
          <a href="#" className="hover:text-primary mx-2">Privacy Policy</a>
          <a href="#" className="hover:text-primary mx-2">Contact Information</a>
        </p>
      </footer>
    </div>
  );
}
