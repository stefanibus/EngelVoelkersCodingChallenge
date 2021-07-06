import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    root: {
        maxWidth: 645,
        margin: "0 auto",
        marginTop: "1rem",
        width: "100%",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderRadius: "99px",
        },
    },
});

function SearchForName({
    listOfNames,
    showSearchResult,
    setInputValue,
    inputValue,
}) {
    const classes = useStyles();

    // group listOfNames Entries, see https://material-ui.com/components/autocomplete/#grouped
    const options = listOfNames.map((option) => {
        const typeGroup = option.type;
        return {
            typeGroup: /[0-9]/.test(typeGroup) ? "0-9" : typeGroup,
            ...option,
        };
    });

    return (
        <>
            <Autocomplete
                id="combo-box-demo"
                groupBy={(option) => option.typeGroup}
                value={inputValue}
                // key={listOfNames}  // workaround not needed anymore, see previous commit on this line for explanation
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => {
                    if (option.name === value.name) {
                        // console.log("we do have a value: value.name: ", value.name);
                        return option.name === value.name;
                    } else if (value.name === " " || value.name === undefined) {
                        // console.log("we do not have a value: empty value", value);
                        return true;
                    }
                }}
                onChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    showSearchResult(newInputValue);
                }}
                options={options.sort((a, b) => -b.typeGroup)}
                style={{ width: "100%", margin: "0 auto" }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for Name"
                        variant="outlined"
                        className={classes.root}
                    />
                )}
            />
        </>
    );
}

SearchForName.propTypes = {
    listOfNames: PropTypes.array,
    showSearchResult: PropTypes.func,
    setInputValue: PropTypes.func,
    inputValue: PropTypes.object,
};

export default SearchForName;
