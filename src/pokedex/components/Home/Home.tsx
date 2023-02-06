import React, { useEffect, useState, SyntheticEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PokemonCard from '../PokemonCard/PokemonCard';
import { POKEMON_RESULTS_PER_PAGE } from '../../constants';
import { pokemonService } from '../../services/pokemon.service';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('search') ?? '';
  const { data, error, isLoading } = pokemonService.useListAllPokemonQuery();

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSearchSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    if (target.search.value !== '') {
      searchParams.set('search', target.search.value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(`?${searchParams.toString()}`);
  };

  // TODO: See if React Router DOM has better way to set page title when setting search params
  useEffect(() => {
    document.title = (searchText) ? `${searchText} - ${t('pokedex_search')}` : t('pokedex_search');
  }, [searchText, t]);

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    );
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
      <Form onSubmit={handleSearchSubmit}>
        <Row>
          <Col xs="auto" sm={8} md={6}>
            <Form.Control placeholder={t('search_by_name_or_number') as string} name="search" defaultValue={searchText} />
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit">
              {t('search')}
            </Button>
          </Col>
        </Row>
      </Form>

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