/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    margin: '0 auto',
    marginTop: '1rem',
    width: '100%',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderRadius: '99px',
    },
  },
})

function SearchForName({
  listOfNames,
  showSearchResult,
  setInputValue,
  inputValue,
}: {
  listOfNames: unknown
  showSearchResult: unknown
  setInputValue: unknown
  inputValue: unknown
}): JSX.Element {
  const classes = useStyles()

  // group listOfNames Entries,
  // see https://material-ui.com/components/autocomplete/#grouped
  const options = listOfNames.map((option) => {
    const typeGroup = option.type
    return {
      typeGroup: /[0-9]/.test(typeGroup) ? '0-9' : typeGroup,
      ...option,
    }
  })

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        groupBy={(option) => option.typeGroup}
        value={inputValue}
        // key={listOfNames} workaround not needed anymore, see
        // previous commit on this line for explanation
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option: unknown, value: unknown): string => {
          let selectVal: string
          if (option.name === value.name) {
            // console.log('we do have a value: value.name: ', value.name)
            selectVal = option.name === value.name
          }
          if (value.name === ' ' || value.name === undefined) {
            // console.log('we do not have a value: empty value', value.name)
            selectVal = true
          }
          return selectVal
        }}
        onChange={(_event, newInputValue) => {
          setInputValue(newInputValue)
          showSearchResult(newInputValue)
        }}
        options={options.sort((a, b) => -b.typeGroup)}
        style={{ width: '100%', margin: '0 auto' }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Search for Name"
            variant="outlined"
            className={classes.root}
          />
        )}
      />
    </>
  )
}

// eslint-disable-next-line react/forbid-prop-types
SearchForName.propTypes = {
  listOfNames: PropTypes.array,
  showSearchResult: PropTypes.func,
  setInputValue: PropTypes.func,
  inputValue: PropTypes.object,
}

export default SearchForName
