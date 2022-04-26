import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('renders logo text', () => {
  render(<App />);
  const logoElement = screen.getByText(/WikiViews/i);
  expect(logoElement).toBeInTheDocument();
});

test('100 items loaded', async () => {
  render(<App />);
  await waitFor(() => {
    expect(
      screen.getByText('Wikipedia Articles by View Count:')
    ).toBeInTheDocument();
  });
  const allMoreInfoButtons = screen.queryAllByText(/More info/);
  expect(allMoreInfoButtons).toHaveLength(100);
});

test('change item count to 25', async () => {
  render(<App />);
  await waitFor(() => {
    expect(
      screen.getByText('Wikipedia Articles by View Count:')
    ).toBeInTheDocument();
  });
  fireEvent.click(screen.getByText(/Max Results/));
  act(() => {
    fireEvent.click(screen.getAllByRole('menuitem')[0]);
  });

  await waitFor(() => {
    const allMoreInfoButtons = screen.queryAllByText(/More info/);
    expect(allMoreInfoButtons).toHaveLength(25);
  });
});

test('open an in-depth info modal', async () => {
  render(<App />);
  await waitFor(() => {
    expect(
      screen.getByText('Wikipedia Articles by View Count:')
    ).toBeInTheDocument();
  });
  act(() => {
    fireEvent.click(screen.getAllByText(/More info/)[0]);
  });

  await waitFor(() => {
    const dialogBox = screen.getByRole('dialog');
    expect(dialogBox).toBeInTheDocument();
  });
});
