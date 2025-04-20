import { store, rootReducer } from '../src/services/store';

describe('rootReducer test', () => {
  test('should return the initial state', () => {
    const initialState = store.getState().store;
    expect(rootReducer.store(undefined, { type: 'action' })).toEqual(
      initialState
    );
  });
});
