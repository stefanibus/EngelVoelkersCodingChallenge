import React              from 'react';
import TextField          from '@material-ui/core/TextField';
import Autocomplete       from '@material-ui/lab/Autocomplete';
import { makeStyles }     from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    margin: '0 auto',
    marginTop: '1rem',
    width: '100%',
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderRadius: '99px',
    }
  }
});

function SearchForName({listOfNames, showSearchResult, setInputValue, inputValue}) {

  const classes = useStyles();

  // group listOfNames Entries, see https://material-ui.com/components/autocomplete/#grouped
  const options = listOfNames.map((option) => {
    const   typeGroup = option.type;
    return {
      typeGroup: /[0-9]/.test(typeGroup) ? '0-9' : typeGroup,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="combo-box-demo"
      // inputValue={inputValue?   inputValue.name : ''}
      options={options.sort((a, b) => -b.typeGroup)}
      groupBy={(option) => option.typeGroup}
      key={listOfNames}
      getOptionLabel={(option) => option.name}
      onChange={(event, newInputValue) => {
        setInputValue(newInputValue)
        showSearchResult(newInputValue);
      }}
      style={{ width: '100%', margin: '0 auto'  }}
      renderInput={(params) => <TextField {...params} label="Search for Name" variant="outlined" className={classes.root} />}
    />
  );
}

export default SearchForName
