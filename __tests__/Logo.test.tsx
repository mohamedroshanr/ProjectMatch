import { render, screen } from '@testing-library/react';
import { Logo } from '@/components/Logo';

describe('Logo', () => {
  it('renders the logo text', () => {
    render(<Logo />);
    const heading = screen.getByText(/Project/i);
    expect(heading).toBeInTheDocument();
  });
});
