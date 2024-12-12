import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../components/Main';
import MainBoxThree from '../../components/Main';
import { MemoryRouter } from 'react-router-dom';

test('renders Home component', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const homeElement = screen.getByTestId('Home');
  expect(homeElement).toBeInTheDocument();
});

test('checks if divs in MainBoxThree are open on app launch', () => {
  render(
    <MemoryRouter>
      <MainBoxThree />
    </MemoryRouter>
  );

  const box1 = screen.getByTestId('box-1');
  const box2 = screen.getByTestId('box-2');
  const box3 = screen.getByTestId('box-3');
  const box4 = screen.getByTestId('box-4');
  const box5 = screen.getByTestId('box-5');
  const box6 = screen.getByTestId('box-6');

  expect(box1).toBeInTheDocument();
  expect(box2).toBeInTheDocument();
  expect(box3).toBeInTheDocument();
  expect(box4).toBeInTheDocument();
  expect(box5).toBeInTheDocument();
  expect(box6).toBeInTheDocument();

  expect(box1).toBeVisible();
  expect(box2).toBeVisible();
  expect(box3).toBeVisible();
  expect(box4).toBeVisible();
  expect(box5).toBeVisible();
  expect(box6).toBeVisible();
});
