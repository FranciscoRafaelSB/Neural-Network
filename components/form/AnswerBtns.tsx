import { Grid, Button } from "@nextui-org/react";
import React from "react";

interface Props {
  handleAssignWeight: (weight: number) => void;
}

const AnswerBtns = ({ handleAssignWeight }: Props) => {
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

export default AnswerBtns;
