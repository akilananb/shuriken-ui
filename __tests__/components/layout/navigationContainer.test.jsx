import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavBar from '@/components/layout/navbar';

describe('NavigationContainer', () => {
    it("renders without crashing", () => {
        render(<NavBar showDrawer={() => { }} />);
    });


});