# Pokédex

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

To install dependencies:
```
npm install
```

To run app in development mode (view at [http://localhost:3000](http://localhost:3000)):
```
npm start
```

To run tests:
```
npm run test
```

To run SCSS linters:
```
npm run lint:scss
```

To build production assets:
```
npm run build
```

## Features

* This application uses [Pokemon API](https://pokeapi.co/docs/v2) to request Pokémon data
* API data is cached in session storage to reduce API calls
* Ability to search for Pokémon by name or number
* Ability to view a Pokémon detail page
* Ability to see browser history of each page visited (including search results)
* Ability to bookmark pages (including pages with search results)
* Uses @reduxjs/toolkit to help manage Redux state
  * RTK Query helps with loading API data
* Internationalization support
* Ability to deploy to Github Pages
* Shoutout to pokenode-ts for complete set of interface entries to help build out models

## Incomplete Features (TODOs)

* Would like to implement a more creative and complete UI
* Pokémon detail page UI is incomplete
* Data collected for abilities, moves, species, sprites and types, but not added to UI
* Unable to see Pokémon evolutions
* Minimal Jest tests setup

## Design

### API

[Pokemon API](https://pokeapi.co/docs/v2)

## Considerations

### Use GraphQL

GraphQL endpoint is still in beta. Consider it for future iterations.

[PokeAPI GraphiQL interface](https://beta.pokeapi.co/graphql/console/)

[PokeAPI GraphQL Endpoint](https://beta.pokeapi.co/graphql/v1beta)

#### Example Query

```
query samplePokeAPIquery {
  pokemon_v2_pokemon {
    id
    name
    order
    is_default
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemonmoves {
      pokemon_v2_move {
        name
      }
    }
    pokemon_v2_pokemonspecy {
      name
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}
```
