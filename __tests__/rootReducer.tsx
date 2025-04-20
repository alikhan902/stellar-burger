import { store, rootReducer } from '../src/services/store';

describe('rootReducer test', () => {
  test('should return the initial state', () => {
<<<<<<< HEAD
    const initialState = store.getState().store;
    expect(rootReducer.store(undefined, { type: 'action' })).toEqual(
      initialState
=======
    expect(rootReducer.store(undefined, { type: 'action' })).toEqual(
      store.getState().store
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
    );
  });
});
