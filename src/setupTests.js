// src/setupTests.js
import '@testing-library/jest-dom'; // for RTL matchers

// Polyfill TextEncoder / TextDecoder for Jest
import { TextEncoder, TextDecoder } from 'util';

window.TextEncoder = TextEncoder;
window.TextDecoder = TextDecoder;

