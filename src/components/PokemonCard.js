import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import pokeball from '../media/pokeball.png';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex: '',
    imageLoading: true,
    toManyRequests: false,
  };

  componentDidMount() {
    const { name, url } = this.props;

    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({ name, imageUrl, pokemonIndex });
  }

  render() {
    const {
      name,
      pokemonIndex,
      imageLoading,
      imageUrl,
      toManyRequests,
    } = this.state;
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${pokemonIndex}`}>
          <Card className="card">
            {/* <h5 className="card-header">{pokemonIndex}</h5> */}
            {imageLoading ? (
              <img
                src={pokeball}
                style={{ width: '5em', height: '5em' }}
                className="poke card-img-top rounded mx-auto d-block mt-2"
                alt=""
              />
            ) : null}
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              src={imageUrl}
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              style={
                // eslint-disable-next-line no-nested-ternary
                toManyRequests
                  ? { display: 'none' }
                  : imageLoading
                    ? null
                    : { display: 'block' }
              }
            />
            {toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  To Many Requests
                </span>
              </h6>
            ) : null}
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {name
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
              </h6>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
