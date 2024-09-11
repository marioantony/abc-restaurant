
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

test('renders login form and handles successful login', async () => {
    render(<Login />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Secure1234!' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Verify if successful login redirects or shows token
    const tokenDisplay = await screen.findByText(/Token:/i);
    expect(tokenDisplay).toBeInTheDocument();
});
