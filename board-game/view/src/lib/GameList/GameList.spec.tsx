import { render } from '@testing-library/react';

import GameList from './GameList';

describe('GameList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameList />);
    expect(baseElement).toBeTruthy();
  });
});
