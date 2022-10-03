import { Button, Grid } from "@nextui-org/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// const neuralNetwork: NeuralNetwork = [
//   //dendrite 1
//   [
//     { threshold: 5, denied: 2 },
//     { question: "Is the weather hot?", weight: 4 }, //0
//     { question: "Is it raining?", weight: 2 }, //1
//     { question: "Is it cloudy?", weight: 3 }, //2
//   ],
//   //dendrite 2
//   [
//     {
//       threshold: 2,
//       denied: "No worries, it's not an earquake.",
//       granted: "You are a good person",
//     },
//     { question: "Are you sleep?", weight: 4 }, //0
//     { question: "Are you hungry?", weight: 2 }, //1
//     { question: "Are you thristy?", weight: 3 }, //2
//   ],

//   //dendrite 3 - 1
//   [
//     { threshold: 5, denied: 2 },
//     { question: "Is the weather hot?", weight: 4 }, //0
//     { question: "Is it raining?", weight: 2 }, //1
//     { question: "Is it cloudy?", weight: 3 }, //2
//   ],
// ];
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

const neuralNetwork: NeuralNetwork = [
  //sector 0  //neuralNetwork[sector].neuron[0][dendrite]
  {
    sector: "a",
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

  //sector 2
  {
    sector: "b",
    axon: [
      [
        // { threshold: 5, denied: 2 },
        { question: "Are you a football player?", weight: 1, threshold: 12 }, //0
        { question: "Do you have good memory?", weight: 2, threshold: 8 }, //1
        { question: "Is your body system working correctly?", weight: 5 },
      ],
    ],
  },
];

const Home: NextPage = () => {
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
  const [axonWeight, setAxonWeight] = useState<number>(initialAxonWeight);
  const [isShowingQuestionary, setIsShowingQuestionary] =
    useState<boolean>(true);

  //Funciton to assign weight and get the soma
  const handleAssignWeight = (weight: number) => {
    //Guard clauses
    if (!neuralNetwork[sector].axon[neuron][dendrite]) return;
    setAxonWeight(
      weight === 0
        ? axonWeight
        : neuralNetwork?.[sector]?.axon?.[neuron]?.[dendrite]?.weight! +
            axonWeight
    );
    setDendrite((dendrite) => dendrite + 1);
  };

  const handleReset = () => {
    setSector(initialSector);
    setNeuron(initialNeuron);
    setDendrite(initialDendrite);
    setAxonWeight(initialAxonWeight);
    console.log({
      initialSector,
      initialNeuron,
      initialDendrite,
      initialAxonWeight,
    });

    console.log(neuralNetwork);
    console.log(neuralNetwork[sector]?.axon[neuron]);
    setNeuronArr(neuralNetwork?.[sector]?.axon?.[neuron]);
  };

  useEffect(() => {
    if (neuralNetwork[sector]?.axon?.[neuron]?.length === dendrite) {
      setDendrite(initialDendrite);
      setNeuron((neuron) => neuron + 1);
    }
  }, [sector, neuron, dendrite]);

  useEffect(() => {
    console.log({ sector, neuron, dendrite });
    if (neuralNetwork?.[sector]?.axon?.length === neuron) {
      setNeuron(initialNeuron);
      setSector((sector) => sector + 1);
    }
  }, [sector, neuron, dendrite]);

  useEffect(() => {
    console.log({ axonWeight });
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
    setAxonWeight(initialAxonWeight);
  }, [sector]);

  // //threshold
  // const showOutput = () => {
  //   return (
  //     <div>
  //       <h2>
  //         {axonWeight < 5
  //           ? "Keep trying until your dreams comes true"
  //           : "You are a good person"}
  //       </h2>
  //     </div>
  //   );
  // };

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
    <>
      <Grid.Container className="reset-container">
        <Button className="btn reset" onPress={handleReset}>
          Reset
        </Button>
      </Grid.Container>

      <Grid.Container className="container">
        {/* {isShowingQuestionary && ( */}
        <>
          <Grid className="question">
            {/* {neuralNetwork[sector]?.axon[neuron]?.[dendrite]?.question} */}
            {neuronArr?.length > 0 &&
              neuronArr !== null &&
              neuronArr?.[dendrite]?.question}
          </Grid>

          {
            neuralNetwork[sector]?.axon[neuron]?.length > dendrite &&
              showAnswers()
            // : showOutput()
          }
        </>
        {/* // )} */}
      </Grid.Container>
    </>
  );
};

export default Home;
