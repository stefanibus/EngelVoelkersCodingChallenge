import CssBaseline    from '@material-ui/core/CssBaseline';
import Button         from '@material-ui/core/Button';
import Checkbox       from '@material-ui/core/Checkbox';

import Box            from '@material-ui/core/Box';

import Container      from '@material-ui/core/Container';
import Header         from './components/Header';
import SimpleCard     from './components/SimpleCard';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import { spacing } from '@material-ui/system';


const theme = createMuiTheme({
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





const dummydata = {
mergedArrays: [
  {
    "type": "agent",
    "id": "1-agent",
    "createdAt": "2020-02-14T09:44:36.374Z",
    "name": "Clifford Prosacco",
    "shop": "Conroy, MacGyver and Kunde",
    "phone": "242-187-5121 x89848"
  },
  {
    "type": "agent",
    "id": "2-agent",
    "createdAt": "2020-02-14T01:01:04.863Z",
    "name": "Eliane Bins III",
    "shop": "Gorczany - Tremblay",
    "phone": "1-909-795-1463"
  },

  {
    "type": "shop",
    "id": "1-shop",
    "createdAt": "2020-02-14T03:42:30.055Z",
    "name": "Kris LLC",
    "address": "06832 Juliana Gateway"
  },
  {
    "type": "shop",
    "id": "2-shop",
    "createdAt": "2020-02-13T22:34:17.476Z",
    "name": "Toy - Kuhlman",
    "address": "0379 Marquardt Ports"
  },
  {
    "type": "property",
    "id": "1-property",
    "createdAt": "2020-02-13T22:02:40.647Z",
    "name": "Ritchie, Little and Crooks",
    "address": "98350 Herzog Burg"
  },
  {
    "type": "property",
    "id": "2-property",
    "createdAt": "2020-02-14T05:35:06.954Z",
    "name": "Tremblay - Lubowitz",
    "address": "504 Hills Ville"
  }
]
}
console.log(dummydata)


function App() {

  return (
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <Container maxWidth="xl">
          <Header/>
          <div    id="sortThis">Searchfield</div>
          <Checkbox  defaultChecked  />
          <Checkbox  defaultChecked  />
          <Checkbox  defaultChecked  />
          <div>Sort by Name</div>
          <div >
            <SimpleCard />
            <SimpleCard />

            <Box  my={ theme.spacing(2)}  >

              <Button variant="contained" color="primary">primary color</Button>
              <Button variant="contained" className="nix" color="secondary">secondary color</Button>
              <div>Image Pseudoelement: (Agent / Property / Shop ) </div>
              <div>Name: (Agent / Property / Shop )</div>
              <div>Adress: </div>
              <div>Telefone: </div>
            </Box>
          </div>
      </Container>
    </div>

   </ThemeProvider>
  );
}


export default App;