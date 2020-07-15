import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../Styles/SmallRecipe.css';
import emptyFav from '../Images/fav.png';
import fullFav from '../Images/fav-full.png';
import AuthContext from '../Context/authContext';
import FavoriteContext from '../Context/favoriteContext';

const SmallRecipe = ({ r }) => {
  console.log(r);
  const { connected } = useContext(AuthContext);
  const { favorite, handleSubmitFavorite } = useContext(FavoriteContext);
  const history = useHistory();

  const handleSubmit = (event, recipe_id) => { // eslint-disable-line
    event.preventDefault();
    handleSubmitFavorite(recipe_id);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div key={r.slug} className='small-recipe-global-container'>
        <span
          className='small-recipe-favorite-icon'
          onClick={connected ? (event) => handleSubmit(event, r.id) : () => history.push('/login')}
          style={connected && favorite

            ? favorite.map(fav => fav.recipe_id).find(favId => favId === r.id)

              ? {

                backgroundImage: `url(${fullFav})`
              }
              : { backgroundImage: `url(${emptyFav})` }
            : { backgroundImage: `url(${emptyFav})` }}
        />
        <Link to={`/recettes/${r.slug}`} key={r.slug} className='link-recette'>
          <div className='small-recipe-container'>
            <>
              <div
                className='small-reciper-banner-image'
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${r.image}')`
                }}
              />
              <div className='small-recipe-content-container'>
                <h1 className='small-recipe-title'>{capitalizeFirstLetter(r.name)}</h1>
                {r.intro ? <p className='small-recipe-intro'>{r.intro}</p>
                  : <p className='small-recipe-intro'>{r.content.replace(/<\/?[^>]+(>|$)/g, '').replace('&#8217;', "'").slice(1, 157)}...</p>}
                <button className='read-more'>
                  <p>Lire la suite</p>
                </button>
              </div>
            </>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SmallRecipe;
