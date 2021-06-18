import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Header from './components/Header'

const theme = createMuiTheme({
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
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <Container maxWidth="xl">
          <Header/>
          <div>Searchfield</div>
          <Checkbox  defaultChecked  />
          <Checkbox  defaultChecked  />
          <Checkbox  defaultChecked  />
          <div>Sort by Name</div>
          <div>CARDS
            <Button variant="contained" color="primary">primary To Go</Button>
            <Button variant="contained" className="nix" color="secondary"> Button</Button>

            <div>(Agent / Property / Shop )-Image Pseudoelement  </div>
            <div>(Agent / Property / Shop )-Name</div>
            <div>Adress: </div>
            <div>Telefone: </div>
          </div>
      </Container>
    </div>

   </ThemeProvider>
  );
}


export default App;