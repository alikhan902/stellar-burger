import { mock } from 'node:test';
import reducer, { initialState } from '../src/slices/storeSlice';
import {
  getUser,
  updateUser,
  logOutUser,
  loginUser,
  registerNewUser
} from '../src/slices/storeSlice';

<<<<<<< HEAD
// Константы для mock данных
=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
const mockUser = {
  email: 'test',
  password: 'test'
};

const mockLoggedInUser = {
  email: 'test',
  name: 'test'
};

<<<<<<< HEAD
const mockUpdatedUser = { ...mockLoggedInUser, name: 'updatedTest' };

const createUserState = (user = mockUser) => ({
  user,
  isLoading: false,
  error: null,
  isAuthenticated: true
});

=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
describe('Get user', () => {
  test('Request', () => {
    const state = reducer(initialState, getUser.pending('pending'));
    expect(state.isLoading).toBeTruthy();
  });
<<<<<<< HEAD

=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Success', () => {
    const state = reducer(
      initialState,
      getUser.fulfilled({ user: {} }, 'fulfilled')
    );
    expect(state.user).toEqual({});
  });
<<<<<<< HEAD

=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
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
<<<<<<< HEAD
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

=======
      updateUser.pending('pending', {
        ...mockUser,
        name: 'test'
      } as any)
    );
    expect(state.isLoading).toBeTruthy();
  });
  test('Success', () => {
    const state = reducer(
      initialState,
      updateUser.fulfilled(
        mockLoggedInUser,
        'fulfilled',
        mockLoggedInUser as any
      )
    );
    expect(state.user).toEqual(mockLoggedInUser);
  });
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Failed', () => {
    const state = reducer(
      initialState,
      updateUser.rejected(new Error('fetch rejected'), 'failed', {
        ...mockUser,
        name: 'test'
<<<<<<< HEAD
      })
=======
      } as any)
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
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
<<<<<<< HEAD

=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Success', () => {
    const state = reducer(
      initialState,
      logOutUser.fulfilled(mockUser, 'fulfilled')
    );
    expect(state.user).toEqual({ email: '', name: '' });
  });
<<<<<<< HEAD

=======
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
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
<<<<<<< HEAD
    const state = reducer(initialState, loginUser.pending('pending', mockUser));
    expect(state.isLoading).toBeTruthy();
  });

=======
    const state = reducer(
      initialState,
      loginUser.pending('pending', mockUser as any)
    );
    expect(state.isLoading).toBeTruthy();
  });
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Success', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(
        { name: 'test', email: 'test' },
        'fulfilled',
<<<<<<< HEAD
        mockUser
=======
        mockUser as any
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
      )
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeFalsy();
    expect(state.isAuthenticated).toBeTruthy();
    expect(state.user).toEqual(mockLoggedInUser);
  });
<<<<<<< HEAD

  test('Failed', () => {
    const state = reducer(
      initialState,
      loginUser.rejected(new Error('fetch rejected'), 'failed', mockUser)
=======
  test('Failed', () => {
    const state = reducer(
      initialState,
      loginUser.rejected(new Error('fetch rejected'), 'failed', mockUser as any)
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});

describe('Register', () => {
  test('Request', () => {
    const state = reducer(
      initialState,
<<<<<<< HEAD
      registerNewUser.pending('pending', { ...mockUser, name: 'test' })
    );
    expect(state.isLoading).toBeTruthy();
  });

=======
      registerNewUser.pending('pending', {
        ...mockUser,
        name: 'test'
      } as any)
    );
    expect(state.isLoading).toBeTruthy();
  });
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Success', () => {
    const state = reducer(
      initialState,
      registerNewUser.fulfilled({ name: 'test', email: 'test' }, 'fulfilled', {
        ...mockUser,
        name: 'test'
<<<<<<< HEAD
      })
    );
    expect(state.user).toEqual(mockLoggedInUser);
  });

=======
      } as any)
    );
    expect(state.user).toEqual(mockLoggedInUser);
  });
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
  test('Failed', () => {
    const state = reducer(
      initialState,
      registerNewUser.rejected(new Error('fetch rejected'), 'failed', {
        ...mockUser,
        name: 'test'
<<<<<<< HEAD
      })
=======
      } as any)
>>>>>>> 3bb5da954f60b8a8781a98c2ae498e087130c235
    );
    expect(state.error).toEqual('fetch rejected');
    expect(state.isLoading).toBeFalsy();
  });
});
