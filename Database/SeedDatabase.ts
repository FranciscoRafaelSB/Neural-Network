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

export { neuralNetwork };
