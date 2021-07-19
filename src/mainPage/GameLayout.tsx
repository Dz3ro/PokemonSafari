import React, { useState } from "react";
import { IPropsGameLayout as IProps, clickable } from "./interfacesEnum";

const GameLayout: React.FC<IProps> = (props) => {
  const [btnClickedBall, setbtnClickedBall] = useState(false);
  const [btnClickedBait, setBtnClickedBait] = useState(false);
  const [btnClickedRock, setBtnClickedRock] = useState(false);
  const [btnClickedRun, setBtnClickedRun] = useState(false);

  const handleBtn = (funct: Function, btn: clickable) => {
    funct();
    if (btn === clickable.ballLeft) setbtnClickedBall(true);
    else if (btn === clickable.baitRight) setBtnClickedBait(true);
    else if (btn === clickable.rockUp) setBtnClickedRock(true);
    else if (btn === clickable.runDown) setBtnClickedRun(true);
  };
  const resetStyles = (btn: clickable) => {
    if (btn === clickable.ballLeft) setbtnClickedBall(false);
    else if (btn === clickable.baitRight) setBtnClickedBait(false);
    else if (btn === clickable.rockUp) setBtnClickedRock(false);
    else if (btn === clickable.runDown) setBtnClickedRun(false);
  };
  const {
    eventMsg,
    pokSeen,
    pokCaught,
    inPokFight,
    curPok,
    onClickDexAndMenu,
    onClickBallAndLeft,
    onClickBaitAndRight,
    onClickRockAndUp,
    onClickRunAndDown,
  } = props;
  const text1 = "Pokedex";
  const text2 = pokSeen.toString();
  const text3 = pokCaught.toString();
  const img = inPokFight
    ? curPok.img
    : "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-black-white-version-2/3/31/Red.png";
  const text4 = eventMsg;
  const text5 = inPokFight ? "Throw ball" : "Go left";
  const text6 = inPokFight ? "Throw bait" : "Go right";
  const text7 = inPokFight ? "Throw rock" : "Go up";
  const text8 = inPokFight ? "Run" : "Go down";

  return (
    <div className="gameLayout">
      <div onClick={onClickDexAndMenu} className="gamePokedex">
        {text1}
      </div>
      <div className="gamePokOwned">{text2}</div>
      <div className="gamePokSeen">{text3}</div>
      <div className="gameMainScreen">
        <img src={img} alt={"Pokemon front"}></img>
      </div>
      <div className="gameEventDesc">{text4}</div>
      <div
        onMouseDown={(e) => handleBtn(onClickBallAndLeft, clickable.ballLeft)}
        onMouseUp={() => resetStyles(clickable.ballLeft)}
        className={
          btnClickedBall
            ? "gameThrowBall hoverPointer clickedBtn"
            : "gameThrowBall hoverPointer"
        }
      >
        {text5}
      </div>
      <div
        onMouseDown={(e) => handleBtn(onClickBaitAndRight, clickable.baitRight)}
        onMouseUp={() => resetStyles(clickable.baitRight)}
        className={
          btnClickedBait
            ? "gameThrowBait hoverPointer clickedBtn"
            : "gameThrowBait hoverPointer"
        }
      >
        {text6}
      </div>
      <div
        onMouseDown={(e) => handleBtn(onClickRockAndUp, clickable.rockUp)}
        onMouseUp={() => resetStyles(clickable.rockUp)}
        className={
          btnClickedRock
            ? "gameThrowRock hoverPointer clickedBtn"
            : "gameThrowRock hoverPointer"
        }
      >
        {text7}
      </div>
      <div
        onMouseDown={(e) => handleBtn(onClickRunAndDown, clickable.runDown)}
        onMouseUp={() => resetStyles(clickable.runDown)}
        className={
          btnClickedRun
            ? "gameRun hoverPointer clickedBtn"
            : "gameRun hoverPointer"
        }
      >
        {text8}
      </div>
    </div>
  );
};

export default GameLayout;
