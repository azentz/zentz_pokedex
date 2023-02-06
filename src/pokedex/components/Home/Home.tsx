import React, { useCallback, useEffect, useState, useMemo, SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { pokemonService } from '../../services/pokemon.service';
import PokemonCard from '../PokemonCard/PokemonCard';

import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RESULTS_PER_PAGE = 21;

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading } = pokemonService.useListAllPokemonQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('search') ?? '';

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
    // window.history.replaceState(null, target.search.value, '?');
    setSearchParams(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    document.title = (searchText) ? `${searchText} - Pokédex Search` : 'Pokédex Search';
  }, [searchText]);

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error || !data) {
    return (
      <Alert variant="danger">
        Sorry, there was an error while loading this page. Please try again.
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

  const pagedResults = filteredResults.slice(0, page * RESULTS_PER_PAGE);

  return (
    <>
      <Form onSubmit={handleSearchSubmit}>
        <Row>
          <Col xs="auto" sm={8} md={6}>
            <Form.Control placeholder="Search by Name on Number" name="search" defaultValue={searchText} />
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {filteredResults.length === 0 && (
        <Alert variant="secondary" className="mt-2">
          No results.
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
      {(page * RESULTS_PER_PAGE < filteredResults.length) && (
        <Row className="g-2 mt-0">
          <Col className="text-center">
            <Button type="button" onClick={() => handleLoadMore()}>
              Load More
            </Button>        
          </Col>
        </Row>
      )}
    </>
  );
}

export default Home;