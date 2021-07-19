import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import getPokemonData from "../api/apiCaller";
import { pokemonDataAdded } from "../store/pokemonData";
import { pokemonSeenAdded } from "../store/pokemonsSeen";
import { pokemonCaughtAdded } from "../store/pokemonCaught";
import { pokObj, ThrownItem, ActionBtn } from "./interfacesEnum";
import logicHolder from "./logicHolder";
import GameLayout from "./GameLayout";
import GameRules from "./GameRules";

const rule1 =
  "Throwing rocks makes the Pokémon easier to catch, but more likely to run away.";
const rule2 =
  "Throwing bait makes the Pokémon more likely to stay but slightly harder to capture.";
const rules = [rule1, rule2];

const PokemonSafari: React.FC = () => {
  const dispatch = useDispatch();
  const [inPokFight, setInPokFight] = useState(false);
  const [curPok, setCurPok] = useState({ id: 0, name: "", img: "" });
  const [catchChance, setCatchChance] = useState(50);
  const [runChance, setRunChance] = useState(50);
  const [eventMsg, setEventMsg] = useState("");

  const pokData: Array<pokObj> = useSelector(
    (state: RootStateOrAny) => state.entities.data
  );
  const pokSeen: Array<Number> = useSelector(
    (state: RootStateOrAny) => state.entities.seen
  );
  const pokCaught: Array<Number> = useSelector(
    (state: RootStateOrAny) => state.entities.caught
  );

  const handleClickDexAndMenu = () => {
    console.log("dex");
  };

  const meetPokemon = async () => {
    setCatchChance(50);
    setRunChance(50);
    let rnd = logicHolder.getRandomNumber();
    const seen = pokSeen.includes(rnd);
    let pokemon: pokObj;

    if (seen) {
      const index = pokData.findIndex((x) => x.id === rnd);
      pokemon = pokData[index];
      startBattle(pokemon);
    } else {
      const response = await getPokemonData(rnd);
      pokemon = logicHolder.createPokObj(response);
      dispatch(pokemonDataAdded(pokemon));
      dispatch(pokemonSeenAdded(rnd));
      startBattle(pokemon);
    }
  };

  const startBattle = (pokemon: pokObj) => {
    setCurPok(pokemon);
    setInPokFight(true);
    handleMsgChange(true, null, null, null, pokemon.name);
  };

  const handleClickActionBtn = (button: ActionBtn) => {
    if (!inPokFight) {
      meetPokemon();
      return;
    }

    let caught = logicHolder.chanceHappened(catchChance);
    const runAway = logicHolder.chanceHappened(runChance);

    if (button === ActionBtn.BallAndLeft) {
      handleMsgChange(true, ThrownItem.pokeBall, false, false);
    } else if (button === ActionBtn.BaitAndRight) {
      caught = logicHolder.chanceHappened(0);
      setCatchChance(catchChance - 15 < 0 ? 0 : catchChance - 15);
      setRunChance(runChance + 15 > 100 ? 100 : runChance + 15);
      handleMsgChange(true, ThrownItem.bait, false, false);
    } else if (button === ActionBtn.RockAndUp) {
      caught = logicHolder.chanceHappened(0);
      setCatchChance(catchChance + 15 > 100 ? 100 : catchChance + 15);
      setRunChance(runChance - 15 < 0 ? 0 : runChance - 15);
      handleMsgChange(true, ThrownItem.rock, false, false);
    } else if (button === ActionBtn.RunAndDown) {
      caught = logicHolder.chanceHappened(0);
      setInPokFight(false);
      handleMsgChange(true, null, false, false);
    }

    if (caught) {
      dispatch(pokemonCaughtAdded(curPok.id));
      setInPokFight(false);
      handleMsgChange(false, ThrownItem.pokeBall, true, false);
    } else if (runAway) {
      setInPokFight(false);
      setEventMsg(`fight has ended`);
    }
  };

  const handleClickBallAndLeft = () => {
    handleClickActionBtn(ActionBtn.BallAndLeft);
  };

  const handleClickBaitAndRight = () => {
    handleClickActionBtn(ActionBtn.BaitAndRight);
  };

  const handleClickRockAndUp = () => {
    handleClickActionBtn(ActionBtn.RockAndUp);
  };

  const handleClickRunAndDown = () => {
    handleClickActionBtn(ActionBtn.RunAndDown);
  };

  const handleMsgChange = (
    inPokFight: boolean,
    thrownItem: ThrownItem | null,
    caught: boolean | null,
    escaped: boolean | null,
    pokemonName?: string
  ): void => {
    if (caught) setEventMsg(`${curPok.name} was caught`);
    else if (escaped) setEventMsg(`${curPok.name} has escaped`);
    else if (thrownItem === ThrownItem.pokeBall)
      setEventMsg(`${curPok.name} dodged the ball`);
    else if (thrownItem === ThrownItem.bait)
      setEventMsg(`${curPok.name} ate the bait`);
    else if (thrownItem === ThrownItem.rock)
      setEventMsg(`${curPok.name} got hit with rock`);
    else if (!inPokFight)
      setEventMsg(`you are currently looking for pokemon  `);
    else if (inPokFight && thrownItem === null)
      setEventMsg(`${pokemonName} has appeared`);
  };

  return (
    <div className="projectContaner">
      <h1>Pokemon Safari</h1>
      <GameLayout
        eventMsg={eventMsg}
        pokSeen={pokSeen.length}
        pokCaught={pokCaught.length}
        inPokFight={inPokFight}
        curPok={curPok}
        onClickDexAndMenu={handleClickDexAndMenu}
        onClickBallAndLeft={handleClickBallAndLeft}
        onClickBaitAndRight={handleClickBaitAndRight}
        onClickRockAndUp={handleClickRockAndUp}
        onClickRunAndDown={handleClickRunAndDown}
      />
      <GameRules rules={rules} />
    </div>
  );
};

export default PokemonSafari;
