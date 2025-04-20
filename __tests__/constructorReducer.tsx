// Constants for ingredients
const optional = {
  name: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_large: '',
  image_mobile: ''
};

const ingredient = {
  _id: '1234',
  type: 'bun',
  ...optional
};
const ingredient2 = {
  _id: '5678',
  type: 'main',
  ...optional
};
const ingredient3 = {
  _id: '9012',
  type: 'main',
  ...optional
};

// Constants for initial state
const newInitialState = {
  ...initialState,
  isLoading: false,
  constructorItems: {
    ...initialState.constructorItems,
    ingredients: [ingredient, ingredient2]
  }
};

describe('constructorReducer test', () => {
  let state;

  beforeEach(() => {
    state = reducer(newInitialState, addIngredient(ingredient3));
  });

  test('should add ingredients', () => {
    expect(state.constructorItems.ingredients).toContainEqual(ingredient3);
  });

  test('should move item down', () => {
    const state2 = reducer(state, moveItemDown(1));
    expect(state2.constructorItems.ingredients[1]).toEqual(ingredient3);
  });

  test('should move item up', () => {
    const state3 = reducer(state, moveItemUp(0));
    expect(state3.constructorItems.ingredients[1]).toEqual(ingredient2);
  });

  test('should delete ingredients', () => {
    const state4 = reducer(state, deleteItem(2));
    expect(state4.constructorItems.ingredients.length).toEqual(2);
  });
});
