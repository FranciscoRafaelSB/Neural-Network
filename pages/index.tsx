import { Button, Grid } from "@nextui-org/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

//Type or architecture of the network
type Axon = (
  | {
      question: string;
      weight: number;
      threshold: number;
    }
  | {
      question: string;
      weight: number;
      threshold?: undefined;
    }
)[][];

type NeuralNetwork = {
  sector: string;
  axon: Axon;
}[];

//The data of the network
const neuralNetwork: NeuralNetwork = [
  //sector 0  //neuralNetwork[sector].neuron[0][dendrite]
  {
    sector: "y",
    axon: [
      //1 ---->  neuron
      [
        // { threshold: 5, denied: 2 },
        { question: "Can you walk?", weight: 1 }, //1 ---> dendrite
        { question: "Can you kick things?", weight: 2 }, //2
        { question: "Can you feel your legs?", weight: 5 }, //3
      ],
      //2 ---->  neuron
      [
        // { threshold: 5, denied: 2 },
        { question: "Can you remember the first time you walk?", weight: 1 }, //1
        { question: "Have you studyed another language?", weight: 2 }, //2
      ],
      [
        // { threshold: 5, denied: 2 },
        { question: "Is your stomach conftable right now?", weight: 1 }, //1
        { question: "Do you have a headache?", weight: 2 }, //2
        { question: "Can you breath correctly in this moment?", weight: 5 }, //3
      ],
    ],
  },

  //sector 1
  {
    sector: "x",
    axon: [
      [
        // { threshold: 5, denied: 2 },
        { question: "Are you a football player?", weight: 1, threshold: 12 }, //0
        { question: "Do you have good memory?", weight: 2, threshold: 8 }, //1
        { question: "Is your body system working correctly?", weight: 6 },
      ],
    ],
  },

  //sector 2
  {
    sector: "output",
    axon: [
      [
        { question: "Are you alive?", weight: 5, threshold: 5 }, //0
      ],
    ],
  },
];

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
    if(neuralNetwork.at(-1) === neuralNetwork?.[sector] ) return setAxonWeight(initialAxonWeight);
  }, [sector]);


  //threshold

  const showOutput = () => {
    return (
      <div>
        <h2>{ axonWeight > 4 ? `Keep trying until your dreams comes true. You are a good person.` : 'You are doing well, keep trying.'}</h2>
      </div>
    );
  };

  //BUTTONS

  const showAnswers = () => {
    return (
      <Grid.Container className="btn-container">
        <Button
          shadow
          color="success"
          className="btn btn-green"
          onPress={() => handleAssignWeight(1)}
        >
          Yes
        </Button>
        <Button
          shadow
          color="error"
          className="btn btn-red"
          onPress={() => handleAssignWeight(0)}
        >
          No
        </Button>
      </Grid.Container>
    );
  };

  return (
    //HTML

    <>
      <Grid.Container className="reset-container">
        <Button className="btn reset" onPress={handleReset}>
          Reset
        </Button>
      </Grid.Container>

      <Grid.Container className="container">
        <>
          {neuronArr?.length > 0 && neuronArr !== null && (
            <Grid className="question">{neuronArr?.[dendrite]?.question}</Grid>
          )}
          {neuralNetwork[sector] &&
          neuronArr?.length  > dendrite
            ? showAnswers()
            : showOutput()}
        </>
      </Grid.Container>
    </>
  );
};;

export default Home;
