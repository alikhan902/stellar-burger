import { fetchIngredients } from '../src/slices/storeSlice';
import reducer, { initialState } from '../src/slices/storeSlice';
import { newInitialState } from './constructorReducer';

// Константы для тестов
const ingredients = newInitialState.constructorItems.ingredients;

describe('Ingredients reducer test', () => {
  test('Request', () => {
    const state = reducer(newInitialState, fetchIngredients.pending('pending'));
    expect(state.isLoading).toBeTruthy();
  });

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

  test('Failed', () => {
    const state = reducer(
      initialState,
      fetchIngredients.rejected(new Error('fetch rejected'), 'failed')
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});
