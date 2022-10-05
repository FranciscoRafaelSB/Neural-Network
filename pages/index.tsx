import { Button, Grid } from "@nextui-org/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import AnswerBtns from "../components/form/AnswerBtns";
import FinalOutputDesition from "../components/form/FinalOutputDesition";
import { neuralNetwork } from "../Database/SeedDatabase";
import ReactCanvasConfetti from "react-canvas-confetti";

const Home: NextPage = () => {
  //INITIALIZERS

  const initialDendrite = 0;
  const initialSector = 0;
  const initialNeuron = 0;
  const initialAxonWeight = 0;
  //Intial neurons
  const [sector, setSector] = useState<number>(initialSector);
  const [neuron, setNeuron] = useState<number>(initialNeuron);
  const [neuronArr, setNeuronArr] = useState<any>(null);
  //Intial dendrites
  const [dendrite, setDendrite] = useState<number>(initialDendrite);
  //Intitialize weight
  const [axonWeight, setAxonWeight] = useState<number>(initialAxonWeight);

  //Funciton to assign weight and get the soma
  const handleAssignWeight = (weight: number) => {
    //Guard clauses
    if (!neuralNetwork[sector].axon[neuron][dendrite]) return;
    // if (dendrite === neuronArr.length  ) return;
    //assign weight
    setAxonWeight(
      weight === 0
        ? axonWeight
        : neuralNetwork?.[sector]?.axon?.[neuron]?.[dendrite]?.weight! +
            axonWeight
    );

    setDendrite((dendrite) => dendrite + 1);
  };

  //Function to reset the network
  const handleReset = () => {
    setSector(initialSector);
    setNeuron(initialNeuron);
    setDendrite(initialDendrite);
    setAxonWeight(initialAxonWeight);

    setNeuronArr(neuralNetwork?.[0]?.axon?.[0]);
  };

  //LISTENERS which are pending if a certain dependenci change

  useEffect(() => {
    // if (neuralNetwork[sector]?.axon?.[neuron]?.length === dendrite) {
    if (neuronArr?.length === dendrite) {
      setDendrite(initialDendrite);
      setNeuron((neuron) => neuron + 1);
    }
  }, [sector, neuron, dendrite]);

  useEffect(() => {
    if (neuralNetwork?.[sector]?.axon?.length === neuron) {
      setNeuron(initialNeuron);
      setSector((sector) => sector + 1);
    }
  }, [sector, neuron, dendrite]);

  useEffect(() => {
    //Filter the AXON with the threshold
    const newAxon = neuralNetwork?.[sector]?.axon?.[neuron]?.filter(
      (dendrite) => {
        //Guard Clauses
        if (!dendrite.threshold) return dendrite;
        if (dendrite?.["threshold"] < axonWeight) return dendrite;
      }
    );
    //Set the new dendrites: []
    setNeuronArr(newAxon);
  }, [neuron]);

  useEffect(() => {
    //Set the weight to the initial state
    if (neuralNetwork.at(-1) === neuralNetwork?.[sector])
      return setAxonWeight(initialAxonWeight);
  }, [sector]);

  return (
    //HTML

    <>
      <Grid.Container className="reset-container">
        <Button auto className="btn reset" onPress={handleReset}>
          Reset
        </Button>
      </Grid.Container>

      <Grid.Container className="container">
        <>
          {neuronArr?.length > 0 && neuronArr !== null && (
            <Grid className="question">{neuronArr?.[dendrite]?.question}</Grid>
          )}
          {neuralNetwork[sector] && neuronArr?.length > dendrite ? (
            <AnswerBtns handleAssignWeight={handleAssignWeight} />
          ) : (
            <FinalOutputDesition axonWeight={axonWeight} />
          )}
        </>
      </Grid.Container>
    </>
  );
};;

export default Home;
