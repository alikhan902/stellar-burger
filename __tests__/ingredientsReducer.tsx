import { fetchIngredients } from '../src/slices/storeSlice';
import reducer, { initialState } from '../src/slices/storeSlice';
import { newInitialState } from './constructorReducer';

<<<<<<< HEAD
// Константы для тестов
const ingredients = newInitialState.constructorItems.ingredients;

=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
describe('Ingredients reducer test', () => {
  test('Request', () => {
    const state = reducer(newInitialState, fetchIngredients.pending('pending'));
    expect(state.isLoading).toBeTruthy();
  });
<<<<<<< HEAD

  test('Success', () => {
    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(ingredients, 'fulfilled')
    );
    expect(state.ingredients).toEqual(ingredients);
  });

=======
  test('Success', () => {
    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(
        newInitialState.constructorItems.ingredients,
        'fulfilled'
      )
    );
    expect(state.ingredients).toEqual(
      newInitialState.constructorItems.ingredients
    );
  });
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Failed', () => {
    const state = reducer(
      initialState,
      fetchIngredients.rejected(new Error('fetch rejected'), 'failed')
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});
