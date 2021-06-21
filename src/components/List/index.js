import React, { useState, useEffect }   from "react";
import Box                              from '@material-ui/core/Box';
import Checkbox                         from '@material-ui/core/Checkbox';
import SimpleCard                       from './SimpleCard';
import { useTheme }                     from '@material-ui/core/styles';
import all_data                         from  '../../assets/dummydata.js';
import SearchForName                    from './SearchForName';
import FormControlLabel                 from '@material-ui/core/FormControlLabel';

function List() {

  const [checkedAgents, setCheckedAgents] = useState(true);
  const updateAgents = (e) => {setCheckedAgents(!checkedAgents); };
  const [checkedShops, setCheckedShops] = useState(true);
  const updateShops = () => {setCheckedShops(!checkedShops)};
  const [checkedProperties, setCheckedProperties] = useState(true);
  const updateProperties = () => setCheckedProperties(!checkedProperties);
  const [resultList, setResultList] = useState(all_data);
  const [filteredList, setFilteredList] = useState(all_data);
  const [inputValue, setInputValue]   = useState('')
  const [listOfNames, setListOfNames] = useState([]);
  const theme = useTheme();


  useEffect(() => {
   // refresh the Autocomplete-Dropdown Conten -->  ListOfNames
      setListOfNames(filteredList.mergedArray.map((generalName, index) =>
        {return ({'name':generalName.name,'type': generalName.type,'index ': index})}));
   // refresh Resultlist if the filtered List has changed
      setResultList(filteredList)
  }, [filteredList]);


  useEffect(  () => {
 // all Three Checkboxes are checked
    if ((!checkedAgents === false) &&  (!checkedShops === false) &&  (!checkedProperties === false) )  {
 // Show the full list if all types are selected
      setFilteredList(all_data)
    }
 // none of the three checkboxes are selected
    else if ((!checkedAgents === true) &&  (!checkedShops === true) &&  (!checkedProperties === true) ) {
      setFilteredList({'mergedArray' :  [] }) // console.log('empty array --> nothing is selected  ')
    }
    else {
 // Show a filtered list if only some types are selected
      async function fetchData() {
       let agents     =  () => {if (checkedAgents)     { return 'agent' } else {return  'ExcludeAgentData' }}
       let shops      =  () => {if (checkedShops)      { return 'shop' } else {return  'ExcludeShopData' }}
       let properties =  () => {if (checkedProperties) { return 'property' } else {return  'ExcludePropertyData' }}
       // filter
       let result =    all_data.mergedArray.filter(function (item) {
              return  (item.type ===   agents()   || item.type ===  shops()   || item.type ===  properties()  );
            });
     await setFilteredList({'mergedArray' :  result})
      }
      fetchData();
    }
  }, [checkedAgents, checkedShops , checkedProperties, filteredList.whenToUpdateProp]);

  // apply Iputfield-Data from Autocomplete Dropdown
  const showSearchResult = (passedNameValue) => {
    if (passedNameValue === null) {
       // if Empty --> show all
       setResultList(filteredList)
    }
    else {
      // if filtervalue exists --> show that one Entry
      const result =  filteredList.mergedArray.filter( item => item.name  ===  passedNameValue.name )
      setResultList({'mergedArray' :  result})
    }
  }

  return (
    <>
      <Box id="sortThis">
        <SearchForName
            listOfNames={listOfNames}
            showSearchResult={showSearchResult}
            inputValue={inputValue}
            setInputValue={setInputValue}
             />
      </Box>

      <FormControlLabel control={
        <Checkbox name="agents" />} label="Agents"  checked={checkedAgents} onChange={(e) => { updateAgents(e)}}
      />

      <FormControlLabel control={
        <Checkbox name="shops" />} label="Shops"  checked={checkedShops} onChange={(e) => { updateShops(e)}}
      />

      <FormControlLabel control={
        <Checkbox name="properties" />} label="Properties"  checked={checkedProperties} onChange={(e) => { updateProperties(e)}}
      />

      {/*<div>Sort by Name</div>*/}
            {resultList? resultList.mergedArray.map((dummy, index) => {
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