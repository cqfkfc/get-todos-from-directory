import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from '../MainPage';
import { render, screen, fireEvent } from "@testing-library/react";

afterEach(() => {
  global.fetch.mockClear();
});

function setupFetchStub(data) {
  return function fetchStub(_url) {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve({
            data,
          }),
      })
    })
  }
}

test('Ensure App Snapshot renders correctly', () => {
  const tree = renderer
    .create(<MainPage/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


test('results are loaded when files are uploaded', async() => {
  render(<MainPage/>)
  const fakeData = ['file1.txt', 'file2.txt']
  
  // mock the fetch function, so that our test is done without calling the api
  jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(fakeData))

  const inputElement = screen.getByTestId("upload-folder");
  const dummyFile = new File(["file"], "ping.json", {
      type: "application/json",
  });

  Object.defineProperty(inputElement, "files", {
      value: [dummyFile],
  });
  
  fireEvent.drop(inputElement);
  expect(await screen.findByTestId("results")).toBeInTheDocument();
  expect(await (await screen.findByTestId("msg-to-users")).textContent).toMatch('Out of the 1 file you uploaded, 2 files contained TODOS.');

})
