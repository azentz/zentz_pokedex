import React, { SyntheticEvent } from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IMAGE_PLACEHOLDER, IMAGE_NOT_AVAILABLE } from '../../constants';
import { pokemonService } from '../../services/pokemon.service';

import styles from './PokemonCard.module.scss';

const PokemonCard: React.FC<{ pokemonName: string }> = ({ pokemonName }) => {
  const { t } = useTranslation();
  const { data, error, isLoading } =  pokemonService.useGetPokemonByNameQuery(pokemonName);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className={styles.card}>
        <Card.Img variant="top" src={IMAGE_PLACEHOLDER} title={pokemonName} className={styles.image} />
        <Card.Body>
          <Card.Title>{pokemonName}</Card.Title>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{t('loading_pokemon_error')}</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  const handleGoToDetails = (event: SyntheticEvent, pokemonName: string) => {
    event.preventDefault();
    navigate(`/pokemon/${pokemonName}`);
  };

  const paddedId = data.id.toString().padStart(4, '0');

  // TODO: Need to sort types

  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src={data.sprite || IMAGE_NOT_AVAILABLE} title={data.name} className={styles.image} onClick={(e) => handleGoToDetails(e, data.name)} />
      <Card.Body>
        <Card.Title>
          <span className="text-capitalize">{data.name}</span>
          {' '}
          <span className="fs-6 font-monospace">#{paddedId}</span>
        </Card.Title>
        <div>
          {data.types.map((type) => {
            return (
              <div className={`${styles.type} ${styles[`type-${type.type.name}`]}`} key={type.type.id}>{type.type.name}</div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
