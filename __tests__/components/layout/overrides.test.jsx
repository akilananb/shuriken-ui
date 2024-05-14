import { getByTestId, render, screen } from '@testing-library/react';
import Overrides from '@/components/layout/overrides';

jest.mock('../../../src/components/layout/overrides', () => ({
  __esModule: true,
  default: jest.fn(),
  getOverrideIntialData: jest.fn(),
}));

jest.mock("../../../src/components/layout/overrides/override_content", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mocked-override-content" />,
  };
});

describe('Overrides component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders OverrideContent with initial data', async () => {
    const mockOverrideData = {
      content: [{ id: 1, name: 'Override 1' }, { id: 2, name: 'Override 2' }],
      totalElements: 2,
      totalPages: 1,
    };

    // Mock the resolved value of getOverrideIntialData
    jest.mock('../../../src/components/layout/overrides', () => ({
      __esModule: true,
      default: jest.fn(),
      getOverrideIntialData: jest.spyOn(Overrides, 'getOverrideIntialData'),
    }));

    // Render the component
    render(<Overrides />);

  });

});
