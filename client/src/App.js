import './App.css';
import SearchTodoFromFolder from './components/SearchTodoFromFolder';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

function App() {
  return (
    // TODO: remove app classname
    <div className="App">
      <header className="App-header">
        {/* TODO: beautify this page */}

        <Card variant="outlined">
          <CardHeader 
          title={<Typography variant="h2">Welcome!</Typography>}
          />
          <CardContent>
          <SearchTodoFromFolder />

          </CardContent>
        </Card>


      </header>
    </div>
  );
}

export default App;
