import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Announcement from '@/components/layout/announcement';


describe('Announcement component', () => {
  test('renders without crashing with announcement data', () => {
    const testData = {
      size: 1,
      payLoad: [
        { id: 1, message: 'Test Announcement', lastModifiedAt: '2024-04-05' }
      ]
    };

    render(<Announcement data={testData} statementClass="test-class" />);

    expect(screen.getByText('Test Announcement')).toBeInTheDocument();
  });

  test('renders without crashing without announcement data', () => {
    const testData = {
      size: 0,
      payLoad: []
    };

    render(<Announcement data={testData} statementClass="test-class" />);

    expect(screen.queryByText('Test Announcement')).not.toBeInTheDocument();
  });

  test('opens modal when clicked', () => {
    const testData = {
      size: 1,
      payLoad: [{ id: 1, message: 'Test Announcement', lastModifiedAt: '2024-04-05' }]
    };

    render(<Announcement data={testData} statementClass="test-class" />);
    fireEvent.click(screen.getByText('Test Announcement'));

    expect(screen.getByText('Announcement')).toBeInTheDocument();
  });
});
