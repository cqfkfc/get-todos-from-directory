import { fetchData } from '../utils/data';

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
  test('works with 2 files', async()=>{
    const file = new File(['TODO Exist'], "file.txt", { type: "application/txt" });
    const dummyFiles = [file, file]

    const fakeData = ['file1.txt', 'file2.txt']
    const spy = jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(fakeData))
  

    const json = await fetchData(dummyFiles)
    expect(spy).toHaveBeenCalledTimes(1);
    expect(json).toEqual({ data: fakeData })
    global.fetch.mockClear()
    })

    test('when there are no files', async()=>{
      const dummyFiles = []
  
      const fakeData = []
      const spy = jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(fakeData))
    
  
      const json = await fetchData(dummyFiles)
      expect(spy).toHaveBeenCalledTimes(1);
      expect(json).toEqual({ data: fakeData })
      global.fetch.mockClear()
      })
  
  })

