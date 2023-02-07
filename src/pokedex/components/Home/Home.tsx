import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import PokemonCard from '../PokemonCard/PokemonCard';
import SearchBar from '../SearchBar/SearchBar';
import { POKEMON_RESULTS_PER_PAGE } from '../../constants';
import { pokemonService } from '../../services/pokemon.service';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search') ?? '';
  const { data, error, isLoading } = pokemonService.useListAllPokemonQuery();

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // TODO: See if React Router DOM has better way to set page title when setting search params
  useEffect(() => {
    document.title = (searchText) ? `${t('title_pokedex_search')} - ${searchText}` : t('title_pokedex_search');
  }, [searchText, t]);

  if (isLoading) {
    return (<LoadingSpinner />);
  }

  if (error || !data) {
    return (
      <Alert variant="danger">
        {t('loading_error')}
      </Alert>
    );
  }

  const filteredResults = data.results.filter(result => {
    if (result.name.includes(searchText)) {
      return true;
    }

    if (result.id.toString().includes(searchText)) {
      return true;
    }

    return false
  });

  const pagedResults = filteredResults.slice(0, page * POKEMON_RESULTS_PER_PAGE);

  return (
    <>
      <SearchBar />

      {filteredResults.length === 0 && (
        <Alert variant="secondary" className="mt-2">
          {t('no_results')}
        </Alert>
      )}

      <Row xs={1} md={2} lg={3} className="g-2 mt-0">
        {pagedResults.map((result) => {
          return (
            <Col key={result.id}>
              <PokemonCard pokemonName={result.name}/>
            </Col>
          );
        })}
      </Row>

      {(page * POKEMON_RESULTS_PER_PAGE < filteredResults.length) && (
        <Row className="g-2 mt-0">
          <Col className="text-center">
            <Button type="button" onClick={() => handleLoadMore()}>
              {t('load_more')}
            </Button>        
          </Col>
        </Row>
      )}
    </>
  );
}

export default Home;