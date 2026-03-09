export interface ApiCharacter {
  _id: string;
  name: string;
  race: string;
  gender: string;
  birth: string;
  death: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
}

export interface Character extends ApiCharacter {
  powerChange: number;
  powerLevel: number;
  isFavorite: boolean;
}