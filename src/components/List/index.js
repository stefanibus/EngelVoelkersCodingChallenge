import React          from 'react';
import Box            from '@material-ui/core/Box';
import Button         from '@material-ui/core/Button';
import Checkbox       from '@material-ui/core/Checkbox';
import SimpleCard     from './SimpleCard';
import { useTheme }   from '@material-ui/core/styles';


const dummydata = {
mergedArray: [
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


function List() {

 const theme = useTheme();

  return (
    <>
      <div id="sortThis">Searchfield</div>
      <Checkbox  defaultChecked  />
      <Checkbox  defaultChecked  />
      <Checkbox  defaultChecked  />
      <div>Sort by Name</div>
            {dummydata?

              dummydata.mergedArray.map((dummy, index) => {
              return (
                <SimpleCard
                  key={index}
                  dummy={dummy}
                />
              );
            })
              :
              'no Data'
            }

      <Box my={theme.spacing(2)}>

      </Box>
    </>
  );
}

export default List
