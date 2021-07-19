import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const getPokemonData = async (id: Number) => {
  const idStr = id.toString();
  const response = await axios.get(`${baseUrl}/${idStr}`);
  return response.data;
};

export default getPokemonData;
