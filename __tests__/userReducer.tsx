import { mock } from 'node:test';
import reducer, { initialState } from '../src/slices/storeSlice';
import {
  getUser,
  updateUser,
  logOutUser,
  loginUser,
  registerNewUser
} from '../src/slices/storeSlice';

// Константы для mock данных
const mockUser = {
  email: 'test',
  password: 'test'
};

const mockLoggedInUser = {
  email: 'test',
  name: 'test'
};

const mockUpdatedUser = { ...mockLoggedInUser, name: 'updatedTest' };

const createUserState = (user = mockUser) => ({
  user,
  isLoading: false,
  error: null,
  isAuthenticated: true
});

describe('Get user', () => {
  test('Request', () => {
    const state = reducer(initialState, getUser.pending('pending'));
    expect(state.isLoading).toBeTruthy();
  });

  test('Success', () => {
    const state = reducer(
      initialState,
      getUser.fulfilled({ user: {} }, 'fulfilled')
    );
    expect(state.user).toEqual({});
  });

  test('Failed', () => {
    const state = reducer(
      initialState,
      getUser.rejected(new Error('fetch rejected'), 'failed')
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});

describe('Update user', () => {
  test('Request', () => {
    const state = reducer(
      initialState,
      updateUser.pending('pending', { ...mockUser, name: 'test' })
    );
    expect(state.isLoading).toBeTruthy();
  });

  test('Success', () => {
    const state = reducer(
      initialState,
      updateUser.fulfilled(mockUpdatedUser, 'fulfilled', mockUpdatedUser)
    );
    expect(state.user).toEqual(mockUpdatedUser);
  });

  test('Failed', () => {
    const state = reducer(
      initialState,
      updateUser.rejected(new Error('fetch rejected'), 'failed', {
        ...mockUser,
        name: 'test'
      })
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});

describe('Logout', () => {
  test('Request', () => {
    const state = reducer(initialState, logOutUser.pending('pending'));
    expect(state.isLoading).toBeTruthy();
  });

  test('Success', () => {
    const state = reducer(
      initialState,
      logOutUser.fulfilled(mockUser, 'fulfilled')
    );
    expect(state.user).toEqual({ email: '', name: '' });
  });

  test('Failed', () => {
    const state = reducer(
      initialState,
      logOutUser.rejected(new Error('fetch rejected'), 'failed')
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});

describe('Login', () => {
  test('Request', () => {
    const state = reducer(initialState, loginUser.pending('pending', mockUser));
    expect(state.isLoading).toBeTruthy();
  });

  test('Success', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(
        { name: 'test', email: 'test' },
        'fulfilled',
        mockUser
      )
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeFalsy();
    expect(state.isAuthenticated).toBeTruthy();
    expect(state.user).toEqual(mockLoggedInUser);
  });

  test('Failed', () => {
    const state = reducer(
      initialState,
      loginUser.rejected(new Error('fetch rejected'), 'failed', mockUser)
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});

describe('Register', () => {
  test('Request', () => {
    const state = reducer(
      initialState,
      registerNewUser.pending('pending', { ...mockUser, name: 'test' })
    );
    expect(state.isLoading).toBeTruthy();
  });

  test('Success', () => {
    const state = reducer(
      initialState,
      registerNewUser.fulfilled({ name: 'test', email: 'test' }, 'fulfilled', {
        ...mockUser,
        name: 'test'
      })
    );
    expect(state.user).toEqual(mockLoggedInUser);
  });

  test('Failed', () => {
    const state = reducer(
      initialState,
      registerNewUser.rejected(new Error('fetch rejected'), 'failed', {
        ...mockUser,
        name: 'test'
      })
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});
