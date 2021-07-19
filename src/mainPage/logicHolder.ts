import { resObj, pokObj } from "./interfacesEnum";

const logicHolder = {
  createPokObj: (responseObj: resObj): pokObj => {
    const pokObj = {
      id: responseObj.id,
      name: responseObj.name,
      img: responseObj.sprites.other["official-artwork"].front_default,
    };
    return pokObj;
  },
  getRandomNumber: (): number => {
    const max = 151;
    const min = 1;
    return Math.floor(Math.random() * (max - min) + min);
  },
  chanceHappened: (percentageChance: number): boolean => {
    const chance = percentageChance / 100;
    const d = Math.random();
    return chance >= d;
  },
};

export default logicHolder;
