import CssBaseline    from '@material-ui/core/CssBaseline';
import Container      from '@material-ui/core/Container';
import Header         from './components/Header';
import List           from './components/List';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';


const ev_theme = createMuiTheme({
  spacing: 8,
  typography: {
    fontFamily: [
      ' Inter ',
      ' sans-serif ',
    ].join(','),
  },
  palette: {
    neutral: {
      main: '#666',
    },
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#000000',
    },
  },
});


function App() {

  return (
   <ThemeProvider theme={ev_theme}>
    <CssBaseline />
    <div className="App">
      <Container maxWidth="xl">
          <Header/>
            List test <List/>
      </Container>
    </div>
   </ThemeProvider>
  );
}

export default App;