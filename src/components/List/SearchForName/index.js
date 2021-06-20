 /* eslint-disable no-use-before-define */
import React        from 'react';
import TextField    from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles }     from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    margin: '0 auto',
    marginTop: '1rem',
    width: '100%',
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      // borderColor: "green",
      borderRadius: '99px',
    }
  }
});

function SearchForName({listOfNames}) {

  const classes = useStyles();

  return (
    <Autocomplete
      id="combo-box-demo"
      options={listOfNames}
      getOptionLabel={(option) => option}
      style={{ width: '100%', margin: '0 auto'  }}
      renderInput={(params) => <TextField {...params} label="Search by Name" variant="outlined" className={classes.root} />}
    />
  );
}

export default SearchForName