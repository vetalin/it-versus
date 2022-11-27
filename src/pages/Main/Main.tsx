import React from "react";
import { MainStyled } from "./Main.styled";
import { Button } from "@mui/material";

export const Main = () => {
  return (
    <MainStyled>
      <a data-testid={"create-lobby-button"} href={"/lobby"}>
        <Button variant={"contained"}>Создать лобби</Button>
      </a>
    </MainStyled>
  );
};
