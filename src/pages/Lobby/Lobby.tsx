import React from "react";
import { LobbyStyled } from "./Lobby.styled";
import { Editor } from "../../common/editor/Editor";

export const Lobby = () => {
  return (
    <LobbyStyled>
      <Editor />
    </LobbyStyled>
  );
};
