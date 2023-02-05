import React, { useCallback, useEffect, useState } from 'react';
import { pokemonService } from '../../services/pokemon.service';

const Home: React.FC = () => {
  const { data, error, isLoading } = pokemonService.useListAllPokemonQuery();
  const pokemon = pokemonService.useGetPokemonByIdQuery(1);

  return (
    <>
      <div>Home</div>
      {isLoading && (
        <div>Loading...</div>
      )}
      {error && (
        <div>{ JSON.stringify(error) }</div>
      )}
      {data && (
        <div>{ JSON.stringify(data) }</div>
      )}
    </>
  );
}

export default Home;