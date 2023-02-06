import React, { useCallback, useEffect, useState } from 'react';

import { pokemonService } from '../../services/pokemon.service';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Pokemon } from 'pokenode-ts';

import styles from './PokemonCard.module.scss';

const placeholderImage = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22200%22%20height%3D%22200%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20dy%3D%2214%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3ELoading...%3C%2Ftext%3E%20%3C%2Fsvg%3E";

const imageNotAvailable = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22200%22%20height%3D%22200%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20dy%3D%2214%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EImage N/A%3C%2Ftext%3E%20%3C%2Fsvg%3E";


const PokemonCard: React.FC<{ pokemonName: string }> = ({ pokemonName }) => {
  const { data, error, isLoading } =  pokemonService.useGetPokemonByNameQuery(pokemonName);

  if (isLoading) {
    return (
      <Card style={{ flexDirection: 'row' }}>
        <Card.Img variant="top" src={ placeholderImage } style={{ width: '30%' }} />
        <Card.Body>
          <Card.Title>{ pokemonName }</Card.Title>
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
          <Card.Title>Error while loading Pokemon</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  const paddedId = data.id.toString().padStart(4, '0');

  // TODO: Need to sort types

  return (
    <Card style={{ flexDirection: 'row' }}>
      <Card.Img variant="top" src={ data.sprite || imageNotAvailable } style={{ width: '30%' }} />
      <Card.Body>
        <Card.Title>
          <span className="text-capitalize">{ data.name }</span>
          {' '}
          <span className="fs-6 font-monospace">#{ paddedId }</span>
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
