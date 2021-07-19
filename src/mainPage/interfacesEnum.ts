export interface resObj {
  id: number;
  name: string;
  sprites: any;
}

export interface pokObj {
  id: number;
  name: string;
  img: string;
}

export enum ThrownItem {
  pokeBall,
  bait,
  rock,
}

export enum ActionBtn {
  BallAndLeft,
  BaitAndRight,
  RockAndUp,
  RunAndDown,
}

export interface IPropsGameLayout {
  inPokFight: boolean;
  pokSeen: number;
  pokCaught: number;
  curPok: pokObj;
  eventMsg: string;
  onClickDexAndMenu: () => void;
  onClickBallAndLeft: () => void;
  onClickBaitAndRight: () => void;
  onClickRockAndUp: () => void;
  onClickRunAndDown: () => void;
}

export enum clickable {
  ballLeft,
  baitRight,
  rockUp,
  runDown,
}
