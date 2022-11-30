import React from "react";
import { LobbyStyled } from "./Lobby.styled";
import { Editor } from "../../common/editor/Editor";
import { Canvas } from "../../common/canvas/Canvas";

export const Lobby = () => {
  return (
    <LobbyStyled>
        <Editor />
        <Canvas />
    </LobbyStyled>
  );
};
