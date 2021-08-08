import React from "react";
import renderer from "react-test-renderer";
import MainPage from "../MainPage";
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
      });
    });
  };
}

describe("Ensure main page renders correctly", () => {
  test("when no files are uploaded", () => {
    const tree = renderer.create(<MainPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("when 1 file is dropped and uploaded", async () => {
    render(<MainPage />);
    const fakeData = ["file1.txt"];

    // mock the fetch function, so that our test is done without calling the api
    const mockedFetchFunction = jest
      .spyOn(global, "fetch")
      .mockImplementation(setupFetchStub(fakeData));

    const inputElement = screen.getByTestId("upload-folder");
    const dummyFile = new File(["file"], "ping.json", {
      type: "application/json",
    });

    Object.defineProperty(inputElement, "files", {
      value: [dummyFile],
    });

    fireEvent.drop(inputElement);
    expect(await screen.findByTestId("results")).toBeInTheDocument();
    expect(mockedFetchFunction).toHaveBeenCalledTimes(1);
    const expectedMsgToUsers =
      "Out of the 1 file you uploaded, 1 file contained TODOs.";
    expect(
      await (
        await screen.findByTestId("msg-to-users")
      ).textContent
    ).toMatch(expectedMsgToUsers);
  });

  test("when 1000 (max limit) files are dropped and uploaded", async () => {
    render(<MainPage />);
    const fakeData = ["file1.txt", "file2.txt"];

    // mock the fetch function, so that our test is done without calling the api
    const mockedFetchFunction = jest
      .spyOn(global, "fetch")
      .mockImplementation(setupFetchStub(fakeData));

    const inputElement = screen.getByTestId("upload-folder");
    const dummyFile = new File(["file"], "ping.json", {
      type: "application/json",
    });

    Object.defineProperty(inputElement, "files", {
      value: Array(1000).fill(dummyFile),
    });

    fireEvent.drop(inputElement);

    expect(await screen.findByTestId("results")).toBeInTheDocument();
    expect(mockedFetchFunction).toHaveBeenCalledTimes(1);
    const expectedMsgToUsers =
      "Out of the 1000 files you uploaded, 2 files contained TODOs.";
    expect(
      await (
        await screen.findByTestId("msg-to-users")
      ).textContent
    ).toMatch(expectedMsgToUsers);
  });
});
