import SearchTodoFromFolder from './components/Todo';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

function MainPage() {
  return (
    // TODO: remove app classname
    <div style={{padding: '100px'}}>
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

export default MainPage;
