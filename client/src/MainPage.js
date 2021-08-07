import SearchTodoFromFolder from "./components/Todo";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";

function MainPage() {
  return (
    // TODO: beautify page
    <div style={{ padding: "100px" }}>
      <header className="App-header">
        <Card variant="outlined">
          <CardHeader title={<Typography variant="h3">Welcome!</Typography>} />
          <CardContent>
            <SearchTodoFromFolder />
          </CardContent>
        </Card>
      </header>
    </div>
  );
}

export default MainPage;
