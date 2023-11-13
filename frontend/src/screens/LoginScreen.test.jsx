import App from '../App';
import { it, describe } from "vitest";
import { render, screen } from '@testing-library/react';


describe('App.jsx', () => {
    it("Check if page renders", () => {
        render(<App/>);
        screen.debug();
    });
});