import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

const subscriptionMock = () => () => {};

const mockedAPI: typeof window.main = {
  lib: {
    sha256sum: jest.fn(async x => x),
  },
  title: {
    close: jest.fn(),
    isMaximized: jest.fn(),
    maximize: jest.fn(),
    minimize: jest.fn(),
    onMaximized: jest.fn(subscriptionMock),
    onUnMaximized: jest.fn(subscriptionMock),
    restore: jest.fn(),
  },
  log: jest.fn(),
};

beforeAll(() => {
  window.main = mockedAPI;
});
