import LoginScreen from './LoginScreen';
import { it, describe, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {Form, Container} from 'react-bootstrap';

describe('LoginScreen.jsx', () => {
    it("Check if page renders", () => {
        <BrowserRouter>
        render(<LoginScreen/>);
        </BrowserRouter>
        screen.debug();
    });

    it("Check that it is the Login Screen", () => {
        const message=
        <BrowserRouter>
        <div>
            <Container>
                <Form.Group>
                    <Form.Label>Sign in</Form.Label>
                    <Form.Label selected>Sign in</Form.Label>
                </Form.Group>
            </Container>
        </div>
        </BrowserRouter>
      
        expect(message).toBeVisible();
    });
});