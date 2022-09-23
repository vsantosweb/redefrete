import { render } from '@testing-library/react';

import Teste from './teste';

describe('Teste', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Teste />);
    expect(baseElement).toBeTruthy();
  });
});
