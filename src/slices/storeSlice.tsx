import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  getIngredientsApi,
  getOrdersApi,
  getFeedsApi,
  orderBurgerApi,
  getUserApi,
  registerUserApi,
  logoutApi,
  updateUserApi,
  loginUserApi,
  resetPasswordApi
} from '@api';
import { TIngredient, TOrder } from '../utils/types';

// Константы для повторяющихся строк
const INGREDIENTS_PATH = 'ingredients/getAll';
const ORDERS_PATH = 'orders/createOrder';
const USER_ORDERS_PATH = 'user/orders';
const FEED_PATH = 'user/feed';
const USER_PATH = 'user/getUser';
const LOGIN_PATH = 'user/login';
const REGISTER_PATH = 'user/register';
const LOGOUT_PATH = 'user/logout';
const UPDATE_PATH = 'user/update';
const RESET_PASSWORD_PATH = 'user/resetPassword';

interface StoreState {
  isLoading: boolean;
  ingredients: TIngredient[];
  constructorItems: {
    bun: Partial<TIngredient>;
    ingredients: TIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isModalOpen: boolean;
  isAuthenticated: boolean;
  userOrders: TOrder[];
  user: {
    name: string;
    email: string;
  };
  orders: TOrder[];
  total: number;
  totalToday: number;
  isInit: boolean;
  error: string | undefined;
}

export const initialState: StoreState = {
  isLoading: true,
  ingredients: [],
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  isModalOpen: false,
  isAuthenticated: false,
  userOrders: [],
  user: {
    name: '',
    email: ''
  },
  orders: [],
  total: 0,
  totalToday: 0,
  isInit: false,
  error: undefined
};

// Асинхронные действия
export const fetchIngredients = createAsyncThunk(
  INGREDIENTS_PATH,
  getIngredientsApi
);
export const createNewOrder = createAsyncThunk(ORDERS_PATH, orderBurgerApi);
export const fetchUsersOrders = createAsyncThunk(
  USER_ORDERS_PATH,
  getOrdersApi
);
export const fetchFeed = createAsyncThunk(FEED_PATH, getFeedsApi);
export const getUser = createAsyncThunk(USER_PATH, getUserApi);
export const loginUser = createAsyncThunk(LOGIN_PATH, loginUserApi);
export const registerNewUser = createAsyncThunk(REGISTER_PATH, registerUserApi);
export const logOutUser = createAsyncThunk(LOGOUT_PATH, logoutApi);
export const updateUser = createAsyncThunk(UPDATE_PATH, updateUserApi);
export const resetPassword = createAsyncThunk(
  RESET_PASSWORD_PATH,
  resetPasswordApi
);

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        // Генерируем уникальный id для ингредиента
        state.constructorItems.ingredients.push({
          ...ingredient,
          dragId: uuidv4()
        });
      }
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    moveItemUp: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = [...state.constructorItems.ingredients];
        [ingredients[index], ingredients[index - 1]] = [
          ingredients[index - 1],
          ingredients[index]
        ];
        state.constructorItems.ingredients = ingredients;
      }
    },
    moveItemDown: (state, action) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredients = [...state.constructorItems.ingredients];
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
        state.constructorItems.ingredients = ingredients;
      }
    },
    deleteItem: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== action.payload
        );
    },
    resetOrder: (state) => {
      state.constructorItems = {
        bun: { price: 0 },
        ingredients: []
      };
      state.orderRequest = false;
      state.orderModalData = null;
    },
    init: (state) => {
      state.isInit = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectIsLoading: (state) => state.isLoading,
    selectOrderModalData: (state) => state.orderModalData,
    selectIsModalOpen: (state) => state.isModalOpen,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUserOrders: (state) => state.userOrders,
    selectUser: (state) => state.user,
    selectError: (state) => state.error,
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectIsInit: (state) => state.isInit
  },
  extraReducers: (builder) => {
    const pendingHandler = (state: StoreState) => {
      state.isLoading = true;
      state.error = undefined;
    };

    const rejectedHandler = (state: StoreState, action: any) => {
      state.isLoading = false;
      state.error = action.error.message;
    };

    builder
      .addCase(fetchIngredients.pending, pendingHandler)
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, rejectedHandler)

      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.isLoading = false;
      })
      .addCase(createNewOrder.rejected, rejectedHandler)

      .addCase(fetchFeed.pending, pendingHandler)
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, rejectedHandler)

      .addCase(getUser.pending, pendingHandler)
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, rejectedHandler)

      .addCase(loginUser.pending, pendingHandler)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, rejectedHandler)

      .addCase(fetchUsersOrders.pending, pendingHandler)
      .addCase(fetchUsersOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload.orders;
      })
      .addCase(fetchUsersOrders.rejected, rejectedHandler)

      .addCase(registerNewUser.pending, pendingHandler)
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerNewUser.rejected, rejectedHandler)

      .addCase(logOutUser.pending, pendingHandler)
      .addCase(logOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
      })
      .addCase(logOutUser.rejected, rejectedHandler)

      .addCase(resetPassword.pending, pendingHandler)
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, rejectedHandler)

      .addCase(updateUser.pending, pendingHandler)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, rejectedHandler);
  }
});

// Экспорт селекторов
export const {
  selectIngredients,
  selectIsLoading,
  selectOrderModalData,
  selectIsModalOpen,
  selectIsAuthenticated,
  selectUserOrders,
  selectUser,
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectConstructorItems,
  selectOrderRequest,
  selectIsInit,
  selectError
} = storeSlice.selectors;

// Экспорт действий
export const {
  addIngredient,
  openModal,
  closeModal,
  moveItemUp,
  moveItemDown,
  resetOrder,
  deleteItem,
  init,
  setError
} = storeSlice.actions;

export default storeSlice.reducer;
