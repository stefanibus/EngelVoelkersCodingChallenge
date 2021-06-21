 /* eslint-disable no-use-before-define */
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

  return (
    <Autocomplete
      id="combo-box-demo"
      // inputValue={inputValue?   inputValue.name : ''}
      options={listOfNames}
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
