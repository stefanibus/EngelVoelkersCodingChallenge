import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import SimpleCard from "./SimpleCard";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import spinnerLoadingData from "../../assets/dummydata.js";
import SearchForName from "./SearchForName";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import Api from "../../api/index";

function List() {
    // state variable
    const [checkedAgents, setCheckedAgents] = useState(true);
    const [checkedShops, setCheckedShops] = useState(true);
    const [checkedProperties, setCheckedProperties] = useState(true);
    const [fullData, setFullData] = useState(spinnerLoadingData);
    const [resultList, setResultList] = useState(spinnerLoadingData);
    const [filteredList, setFilteredList] = useState(spinnerLoadingData);
    const [inputValue, setInputValue] = useState({
        typeGroup: "sometype",
        name: " ",
        type: "sometype",
        "index: ": 0,
    });
    const [listOfNames, setListOfNames] = useState([]);
    const [sorting, setSorting] = useState(false);

    // toggle State
    const updateAgents = () => {
        setCheckedAgents((t) => !t);
    };
    const updateShops = () => {
        setCheckedShops((t) => !t);
    };
    const updateProperties = () => {
        setCheckedProperties((t) => !t);
    };
    const toggleSort = () => {
        setSorting((s) => !s);
    };

    useEffect(() => {
        Api.getAllData(spinnerLoadingData).then(setFullData); // equals to ==>  Api.getAllData().then( (res) => setFullData(res) );
    }, []);

    useEffect(() => {
        setResultList(fullData);
        setFilteredList(fullData);
    }, [fullData]);

    useEffect(() => {
        // refresh the Autocomplete-Dropdown Content -->  ListOfNames
        setListOfNames(
            filteredList.mergedArray.map((generalName, index) => {
                return {
                    name: generalName.name,
                    type: generalName.type,
                    "index: ": index,
                };
            })
        );
        // refresh Resultlist because the filtered List has changed
        setResultList(filteredList);
    }, [filteredList]);

    useEffect(() => {
        if (checkedAgents && checkedShops && checkedProperties) {
            setFilteredList(fullData);
        } else if (!checkedAgents && !checkedShops && !checkedProperties) {
            setFilteredList({ mergedArray: [] });
        }
        // only some types are selected --> Show a filtered list ;
        else {
            let result = fullData.mergedArray.filter(function (item) {
                return (
                    item.type === (checkedAgents && "agent") ||
                    item.type === (checkedShops && "shop") ||
                    item.type === (checkedProperties && "property")
                );
            });
            setFilteredList({ mergedArray: result });
            setInputValue({
                typeGroup: " ",
                name: " ",
                type: " ",
                "index: ": 0,
            });
        }
    }, [checkedAgents, checkedShops, checkedProperties]);

    // apply Iputfield-Data from Autocomplete Dropdown
    const showSearchResult = (passedNameValue) => {
        if (passedNameValue === null) {
            // if Empty --> show all
            setResultList(filteredList);
        } else {
            // if filtervalue exists --> show that single Entry
            const result = filteredList.mergedArray.filter(
                (item) => item.name === passedNameValue.name
            );
            setResultList({ mergedArray: result });
        }
    };

    // sort the resultList
    const sortResult = (sorting) => {
        // console.log('sort will always be performed (this  might be improoved further )')
        resultList.mergedArray.sort((a, b) => a.name.localeCompare(b.name));
        if (sorting) {
            //  console.log('reverse the array on every second click ')
            resultList.mergedArray.reverse();
        }
        toggleSort();
    };

    const useStyles = makeStyles({
        sorting: {
            textAlign: "right",
            maxWidth: "645px",
            margin: "0 auto",
            justifyContent: "flex-end",
            alignItems: "center",
            display: "flex",
            "& p": {
                cursor: "pointer",
                marginRight: ".5em",
            },
        },
    });

    // theme
    const theme = useTheme();
    const classes = useStyles();

    return (
        <>
            <Box id="sortThis">
                <SearchForName
                    listOfNames={listOfNames}
                    showSearchResult={showSearchResult}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                />
            </Box>
            <FormControlLabel
                control={<Checkbox name="agents" />}
                label="Agents"
                checked={checkedAgents}
                onChange={(e) => {
                    updateAgents(e);
                }}
            />
            <FormControlLabel
                control={<Checkbox name="shops" />}
                label="Shops"
                checked={checkedShops}
                onChange={(e) => {
                    updateShops(e);
                }}
            />
            <FormControlLabel
                control={<Checkbox name="properties" />}
                label="Properties"
                checked={checkedProperties}
                onChange={(e) => {
                    updateProperties(e);
                }}
            />
            <div
                onClick={() => {
                    sortResult(sorting);
                }}
                className={classes.sorting}
            >
                <p>Sort by Name:</p> <SortByAlphaIcon />
            </div>
            {resultList
                ? resultList.mergedArray.map((dummy, index) => {
                      return <SimpleCard key={index} dummy={dummy} />;
                  })
                : "no Data"}
            <Box my={theme.spacing(2)}></Box>{" "}
        </>
    );
}

export default List;
