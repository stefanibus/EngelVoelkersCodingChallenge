import React          from 'react';
import Box            from '@material-ui/core/Box';
import Checkbox       from '@material-ui/core/Checkbox';
import SimpleCard     from './SimpleCard';
import { useTheme }   from '@material-ui/core/styles';
import dummy_data     from  '../../assets/dummydata.js';
import SearchForName  from './SearchForName';


function List() {

 const theme = useTheme();



    const NameList = dummy_data.mergedArray
    ? dummy_data.mergedArray.map((generalName, index) => {
        return( generalName.name);
      })
    : ['listOfNames has no data'];


  return (
    <>
      <Box id="sortThis">
        <SearchForName listOfNames={NameList} />
      </Box>
      <Checkbox  defaultChecked  />
      <Checkbox  defaultChecked  />
      <Checkbox  defaultChecked  />
      <div>Sort by Name</div>
            {dummy_data? dummy_data.mergedArray.map((dummy, index) => {
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
