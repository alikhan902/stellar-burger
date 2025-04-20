<<<<<<< HEAD
// Constants for mock data
const mockFeed = {
=======
import { fetchFeed } from '../src/slices/storeSlice';
import reducer, { initialState } from '../src/slices/storeSlice';

export const mockFeed = {
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  orders: [
    {
      _id: '1234',
      ingredients: [],
      status: 'done',
      name: 'test',
      createdAt: 'test',
      updatedAt: 'test'
    }
  ],
  total: 10,
  totalToday: 10
};

describe('Feed reducer test', () => {
  test('Request', () => {
    const state = reducer(initialState, fetchFeed.pending('pending'));
    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeFalsy();
  });
<<<<<<< HEAD

=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Success', () => {
    const state = reducer(
      initialState,
      fetchFeed.fulfilled(mockFeed, 'fulfilled')
    );
    expect(state.orders).toEqual(mockFeed.orders);
    expect(state.total).toEqual(mockFeed.total);
    expect(state.totalToday).toEqual(mockFeed.totalToday);
  });
<<<<<<< HEAD

=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Failed', () => {
    const state = reducer(
      initialState,
      fetchFeed.rejected(new Error('fetch rejected'), 'failed')
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});
