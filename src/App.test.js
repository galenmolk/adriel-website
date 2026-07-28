import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { seasonalGreeting } from './lib/season';

test('renders every service section by default', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Landscaping', level: 2 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Caregiving', level: 2 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Hair art & braiding', level: 2 })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Folkdance instruction', level: 2 })
  ).toBeInTheDocument();
});

test('a tab filters the page down to one service', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('tab', { name: 'Caregiving' }));

  expect(screen.getByRole('heading', { name: 'Caregiving', level: 2 })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Landscaping', level: 2 })).not.toBeInTheDocument();
});

test('"Ask about …" sets the contact form topic', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Ask about folkdance instruction' }));

  expect(screen.getByLabelText('What is this about?')).toHaveValue('Folkdance instruction');
});

// The client asked that no address be on the page for scrapers to find.
test('no email address is rendered on the page', () => {
  const { container } = render(<App />);
  expect(container.textContent).not.toMatch(/@\w+\.\w/);
});

test('the hero greeting follows the season', () => {
  const line = (m, d) => seasonalGreeting(new Date(2026, m - 1, d)).join(' ');
  expect(line(4, 15)).toBe('Happy, healthy spring to you!');
  expect(line(7, 27)).toBe('Happy summer to you!');
  expect(line(10, 3)).toBe('Happy, golden autumn to you!');
  expect(line(1, 9)).toBe('Happy, cozy winter to you!');
});

// Regression: this button used to point at #landscaping, which the tab filter
// can unmount — so it did nothing unless "Everything" was selected.
test('"See the work" targets a section that survives tab filtering', () => {
  const { container } = render(<App />);
  const target = screen
    .getByRole('link', { name: 'See the work' })
    .getAttribute('href')
    .slice(1);

  expect(container.querySelector(`#${target}`)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Caregiving' }));
  expect(container.querySelector(`#${target}`)).toBeInTheDocument();
});

test('choosing a service tab also aims the contact form at it', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('tab', { name: 'Folkdance instruction' }));
  expect(screen.getByLabelText('What is this about?')).toHaveValue('Folkdance instruction');
});

test('the Everything tab leaves the contact topic alone', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('tab', { name: 'Caregiving' }));
  fireEvent.click(screen.getByRole('tab', { name: 'Everything' }));
  expect(screen.getByLabelText('What is this about?')).toHaveValue('Caregiving');
});
