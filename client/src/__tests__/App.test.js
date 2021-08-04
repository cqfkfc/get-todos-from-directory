import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
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
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


test('results are loaded when files are uploaded', async() => {
  render(<App/>)
  const fakeData = ['file1.txt', 'file2.txt']
  const spy = jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(fakeData))

  const inputEl = screen.getByTestId("upload-folder");
  const file = new File(["file"], "ping.json", {
      type: "application/json",
  });
  Object.defineProperty(inputEl, "files", {
      value: [file],
  });
  fireEvent.drop(inputEl);
  expect(await screen.findByTestId("results")).toBeInTheDocument();
  expect(await (await screen.findByTestId("msg-to-users")).textContent).toMatch('Out of the 1 file you uploaded, 2 files contained TODOS.');

})
