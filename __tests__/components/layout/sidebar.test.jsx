import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BrandLogoFull from "@/components/common/brand_logo_full";
import Footer from "@/components/layout/sidebar/Footer";

  const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe('Sidebar', () => {
    it("renders without crashing", () => {
        render(<BrandLogoFull />);
    });
    it("renders without crashing", () => {
        render(<Footer />);
    });
});
