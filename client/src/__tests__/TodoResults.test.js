import renderer from 'react-test-renderer';
import TodoResults from "../components/TodoResults"

describe('todo results show correctly', () => {
    test('when there are no files', ()=>{
        const dummyFiles = []
        const tree = renderer
            .create(<TodoResults files={dummyFiles}/>)
            .toJSON();
            expect(tree).toMatchSnapshot()
    })

    test('when there are 2 files', ()=>{
        const dummyFiles = ['PositiveFile1.js','PositiveFile2.js']
        const tree = renderer
            .create(<TodoResults files={dummyFiles}/>)
            .toJSON();
            expect(tree).toMatchSnapshot()
    })
})
