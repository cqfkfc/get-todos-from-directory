import renderer from 'react-test-renderer';
import DisplayFileResults from "../components/DisplayFileResults"

describe('todo results show correctly', () => {
    test('when there are no files', ()=>{
        const dummyFiles = []
        const tree = renderer
            .create(<DisplayFileResults outputFiles={dummyFiles} inputFiles={dummyFiles}/>)
            .toJSON();
            expect(tree).toMatchSnapshot()
    })

    test('when there are 2 files', ()=>{
        const dummyFiles = ['PositiveFile1.js','PositiveFile2.js']
        const tree = renderer
            .create(<DisplayFileResults outputFiles={dummyFiles} inputFiles={dummyFiles}/>)
            .toJSON();
            expect(tree).toMatchSnapshot()
    })
})
