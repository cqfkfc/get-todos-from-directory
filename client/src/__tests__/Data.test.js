import { fetchData } from '../utils/Data';

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


describe('fetchData', ()=>{
  test('works with no files', async()=>{
    const dummyInputFiles = []
    const expectedOutput = []
    const spy = jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(expectedOutput))

    const json = await fetchData(dummyInputFiles)
    expect(spy).toHaveBeenCalledTimes(1);
    expect(json).toEqual({ data: expectedOutput })
    })

    test('works with 2 files', async()=>{
      const file = new File(['TODO Exist'], "file.txt", { type: "application/txt" });
      const dummyInputFiles = [file, file]
      const expectedOutput = ['file1.txt', 'file2.txt']

      const spy = jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(expectedOutput))
    
      const json = await fetchData(dummyInputFiles)
      expect(spy).toHaveBeenCalledTimes(1);
      expect(json).toEqual({ data: expectedOutput })
    })
    
    test('works with 2 file types', async()=>{
      const textFile = new File(['TODO Exist'], "file.txt", { type: "application/txt" });
      const imgFile = new File(['TODO Exist'], "file.jpg", { type: "image/jpg" });
      const dummyInputFiles = [textFile, imgFile]
      const expectedOutput = ['file1.txt', 'file2.txt']

      const spy = jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(expectedOutput))

      const json = await fetchData(dummyInputFiles)

      // should work even if an image is uploaded. For nodeJS, it will not contain TODOs text.
      expect(spy).toHaveBeenCalledTimes(1);
      expect(json).toEqual({ data: expectedOutput })
    })

  })

