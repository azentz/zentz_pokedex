import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IMAGE_PLACEHOLDER, IMAGE_NOT_AVAILABLE } from '../../constants';
import { pokemonService } from '../../services/pokemon.service';

import styles from './PokemonDetail.module.scss';

type PokemonDetailParams = {
  pokemonName: string;
};

const PokemonDetail: React.FC = () => {
  const { t } = useTranslation();
  const { pokemonName } = useParams<PokemonDetailParams>();
  const { data, error, isLoading } =  pokemonService.useGetPokemonByNameQuery(pokemonName || '');

  // TODO: See if React Router DOM has better way to set page title when setting search params
  useEffect(() => {
    document.title = `${t('title_pokemon')} - ${pokemonName}`;
  }, [t, pokemonName]);

  if (isLoading) {
    return (
      <>
        <Card.Img variant="top" src={IMAGE_PLACEHOLDER} className={styles.image} />
        <Card.Body>
          <Card.Title>{pokemonName}</Card.Title>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </>
    );
  }

  if (error && 'originalStatus' in error && error.originalStatus === 404) {
    return (
      <Alert variant="secondary">
        {t('not_found')}
      </Alert>
    );
  }

  if (error || !data) {
    return (
      <Alert variant="danger">
        {t('loading_pokemon_error')}
      </Alert>
    );
  }

  const paddedId = data.id.toString().padStart(4, '0');

  return (
    <>
      <Card.Img variant="top" src={data.sprite || IMAGE_NOT_AVAILABLE} className={styles.image} />
      <Card.Title>
        <span className="text-capitalize">{data.name}</span>
        {' '}
        <span className="fs-6 font-monospace">#{paddedId}</span>
      </Card.Title>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  );
}

export default PokemonDetail;
