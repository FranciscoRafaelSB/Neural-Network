import type { NextPage } from "next";
import { useEffect, useState } from "react";

type NeuralNetwork = {
  threshold?: number;
  denied?: string;
  granted?: string;
  question?: string;
  weight?: number;
}[][];

const neuralNetwork: NeuralNetwork = [
  //Neuron 1
  [
    { threshold: 5, denied: "Keep trying until your dreams comes true" },
    { question: "Do you have a car?", weight: 4 }, //0
    { question: "Do you have a house?", weight: 2 }, //1
    { question: "Do you have a job?", weight: 3 }, //2
  ],
  //Neuron 2
  [
    {
      threshold: 2,
      denied: "Keep trying until your dreams comes true",
      granted: "You are a good person",
    },
    { question: "Do you have a car?", weight: 4 }, //0
    { question: "Do you have a house?", weight: 2 }, //1
    { question: "Do you have a job?", weight: 3 }, //2
  ],
];

const Home: NextPage = () => {
  //Intial neuron network
  const [neuron, setNeuron] = useState<number>(1);
  const [weightNeuron, setWeightNeuron] = useState<number>(0);

  //Funciton to assign weight
  const handleAssignWeight = (weight: number) => {
    //Guard clauses
    if (!neuralNetwork[0][neuron]) return;
    setWeightNeuron(
      weight === 0
        ? weightNeuron
        : neuralNetwork?.[0]?.[neuron]?.weight! + weightNeuron
    );
    setNeuron((neuron) => neuron + 1);
  };

  //threshold (funcion que destermnina si es 0 o 1)
  const showOutput = () => {
    return (
      <div>
        <h2>
          {weightNeuron < 5
            ? "Keep trying until your dreams comes true"
            : "You are a good person"}
        </h2>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="question">{neuralNetwork?.[0]?.[neuron]?.question}</div>

      {neuralNetwork[0].length > neuron ? (
        <div className="btn-container">
          <button className="btn btn-red" onClick={() => handleAssignWeight(0)}>
            No
          </button>
          <button
            className="btn btn-green"
            onClick={() => handleAssignWeight(1)}
          >
            Yes
          </button>
        </div>
      ) : (
        showOutput()
      )}
    </div>
  );
};

export default Home;
