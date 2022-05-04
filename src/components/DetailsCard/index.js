import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Meal from '../Meal';
import { getFoodsByIngredient } from '../../services/fetchFoods';
import './DetailsCard.css';

const DetailsCard = ({ food }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    const foodKeys = Object.keys(food);
    const ingredientsList = foodKeys
      .reduce((acc, key) => {
        if (key.includes('strIngredient') && food[key]) {
          acc = [...acc, { ingredient: food[key] }];
        }
        return acc;
      }, []);
    const measuresList = foodKeys
      .reduce((acc, key) => {
        if (key.includes('strMeasure') && food[key]) {
          acc = [...acc, { measure: food[key] }];
        }
        return acc;
      }, []);
    setIngredients(ingredientsList);
    setMeasures(measuresList);
  }, []);

  useEffect(() => {
    const getTwoDrinks = async () => {
      const recommendedList = await getFoodsByIngredient('sage');
      console.log('oi', recommendedList);
      const [one, two] = recommendedList;
      const recTwoDrinks = [one, two];
      setRecommended(recTwoDrinks);
    };
    getTwoDrinks();
  }, []);

  console.log('lintin', recommended);

  return (
    <section className="container-details">
      <Meal
        food={ food }
        titleTestId="recipe-title"
        imgTestId="recipe-photo"
      />

      <p data-testid="recipe-category">
        {food.strCategory}
      </p>
      <div className="buttons">
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>
      <ul>
        {
          ingredients
            && ingredients.map((item, index) => (
              <li
                key={ uuidv4() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item.ingredient} - ${measures[index].measure}`}
              </li>
            ))
        }
      </ul>

      <section>
        <h4>Instructions</h4>

        <article data-testid="instructions">
          {food.strInstructions}
        </article>
      </section>

      <section>
        <h4>Video</h4>
        <iframe
          data-testid="video"
          width={ 600 }
          height={ 400 }
          title={ `${food.strMeal}'s video` }
          src={ food.strYoutube }
          frameBorder="0"
          allowFullScreen
        />
      </section>

      <section>
        {
          recommended && recommended.map((rec, index) => (
            <section
              key={ uuidv4() }
              data-testid={ `${index}-recomendation-card` }
            >
              <h4>{rec.strMeal}</h4>
              <img src={ rec.strMealThumb } alt="" />
            </section>

          ))
        }
      </section>
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>

    </section>
  );
};

DetailsCard.propTypes = {
  food: PropTypes.shape(PropTypes.shape).isRequired,
};

export default DetailsCard;
