import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { login } from '../../features/user/userSlice';
import Login from '../../components/Login';
import '@testing-library/jest-dom/extend-expect';

// Utility function to render component with Redux store
const renderWithStore = (ui: React.ReactElement, store: ReturnType<typeof configureStore>) =>
  render(<Provider store={store}>{ui}</Provider>);

describe('Login Component', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
  });

  test('renders the Login button and related UI components', () => {
    renderWithStore(<Login />, store);

    // Check if the Typography text "Login" is rendered
    expect(screen.getByText('Login', { selector: 'h4' })).toBeInTheDocument();
    // Check if the Username input field is rendered
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    // Check if the Login button is rendered
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('updates username input on change', () => {
    renderWithStore(<Login />, store);

    // Find the username input field
    const input = screen.getByLabelText('Username');
    // Simulate user typing into the input field
    fireEvent.change(input, { target: { value: 'testuser' } });

    // Check if the input field value is updated
    expect(input).toHaveValue('testuser');
  });

  test('dispatches login action on button click', () => {
    // Mock dispatch function
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    renderWithStore(<Login />, store);

    // Find the username input field
    const input = screen.getByLabelText('Username');
    // Simulate user typing into the input field
    fireEvent.change(input, { target: { value: 'testuser' } });

    // Find the Login button and simulate click
    const button = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(button);

    // Check if the mock dispatch function was called with the expected action
    expect(mockDispatch).toHaveBeenCalledWith(login('testuser'));
  });
});
