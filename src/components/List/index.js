import React, { useState, useEffect }   from "react";
import Box                              from '@material-ui/core/Box';
import Checkbox                         from '@material-ui/core/Checkbox';
import SimpleCard                       from './SimpleCard';
import { useTheme }                     from '@material-ui/core/styles';
import all_data                         from  '../../assets/dummydata.js';
import SearchForName                    from './SearchForName';
import FormControlLabel                 from '@material-ui/core/FormControlLabel';
import SortByAlphaIcon                  from '@material-ui/icons/SortByAlpha';
import { makeStyles }                   from '@material-ui/core/styles';
import Api                              from '../../api/index';

function List() {

  // state variable
  const [checkedAgents, setCheckedAgents] = useState(true);
  const [checkedShops, setCheckedShops] = useState(true);
  const [checkedProperties, setCheckedProperties] = useState(true);
  const [full_data, setFull_data] = useState(all_data); //
  const [resultList, setResultList] = useState( all_data );  //
  const [filteredList, setFilteredList] = useState( all_data ); //
  const [inputValue, setInputValue]   = useState('')
  const [listOfNames, setListOfNames] = useState([]);
  const [sorting, setSorting] = useState(false);

  // toggle State
  const updateAgents = () => {setCheckedAgents(t => !t); };
  const updateShops = () => {setCheckedShops(t => !t); };
  const updateProperties = () => {setCheckedProperties(t => !t); };
  const toggleSort = () => { setSorting(s => !s); };


  useEffect( () => {
    Api.getAllData(setFull_data);
  }, []);

  useEffect(() => {
        setResultList(full_data)
        setFilteredList(full_data)
  }, [full_data]);



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
      setFilteredList(full_data)
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
       let result =    full_data.mergedArray.filter(function (item) {
              return  (item.type ===   agents()   || item.type ===  shops()   || item.type ===  properties()  );
            });
     await setFilteredList({'mergedArray' :  result})
      }
      fetchData();
    }
  }, [checkedAgents, checkedShops , checkedProperties, full_data.whenToUpdateProp]);





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

  // sort the resultList
      const sortResult  = (sorting) => {
           if (sorting){
              let sorted = resultList.mergedArray.sort((a, b) => a.name.localeCompare(b.name))
           } else {
              let sorted = resultList.mergedArray.sort((b, a) => a.name.localeCompare(b.name))
           }
          toggleSort()
        };


    const useStyles = makeStyles((ev_theme) => ({
      sorting: {
        textAlign: 'right',
        maxWidth: '645px',
        margin: '0 auto',

      }
    }));

    // theme
    const theme = useTheme();
    const classes = useStyles();



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

       <div  onClick={() => {sortResult(sorting)}}  className={classes.sorting}  >Sort by Name  <SortByAlphaIcon /> </div>
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