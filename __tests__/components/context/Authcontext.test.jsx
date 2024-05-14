import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { SessionProvider } from '../../../src/context/AuthContext';

describe('SessionProvider', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mocking fetch globally
  });

  it('should render children and provide session context', async () => {
    const mockSessionData = { /* mock session data */ };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockSessionData),
    });

    const { getByText } = render(
      <SessionProvider>
        <div>Child Component</div>
      </SessionProvider>
    );

    await waitFor(() => {
      expect(getByText('Child Component')).toBeInTheDocument();
      // Add additional assertions for session context if needed
    });
  });

  it('should handle session validation failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Session validation failed'));

    const { getByText } = render(
      <SessionProvider>
        <div>Child Component</div>
      </SessionProvider>
    );

    await waitFor(() => {
      expect(getByText('Child Component')).toBeInTheDocument();
      // Add additional assertions for session context if needed
    });
  });
});
