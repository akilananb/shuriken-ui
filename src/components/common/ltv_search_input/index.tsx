"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderGroupParams,
  AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import SearchService, { SearchRes } from "@/services/search_services";
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchRes[]>([]);
  const searchService = new SearchService();

  useEffect(() => {
    // Perform API call when searchTerm changes
    const performSearch = async () => {
      if (searchTerm && searchTerm.trim().length >= 3) {
        const _results = await searchService.fetchSearch(searchTerm);
        const results = _results?.sort((a, b) =>
          b.category.localeCompare(a.category)
        );

        setSearchResults(results);
      } else {
        // Handle the case when the search term is empty
        setSearchResults([]);
      }
    };

    performSearch();
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchSelect = (_, selectedValue) => {
    /*TODO
    Call second API and display LTV calculation in UI 
    */
    if (!selectedValue) {
      setSearchTerm("");
    }
    console.log("Selected Value:--", selectedValue);
  };

  const renderOption = (
    props,
    option: SearchRes,
    state: AutocompleteRenderOptionState
  ) => {
    const { index, inputValue, selected } = state;

    // const regex = new RegExp(`(${inputValue})`, "gi");
    const regex = new RegExp(`(${inputValue.replace(/\s+/g, "\\s+")})`, "gi");

    return (
      <div {...props} key={index}>
        <div className="w-full flex flex-row">
          {option.value1
            .split(regex)
            .map((part, index) =>
              regex.test(part) ? (
                <div className="text-lg text-nomura-dark-grey">{part}</div>
              ) : (
                <div className="text-lg text-nomura-off-grey">{part}</div>
              )
            )}
          <div className="text-lg pl-4 text-nomura-dark-grey">
            {option.value2}
          </div>
        </div>
      </div>
    );
  };

  const renderGroup = (params: AutocompleteRenderGroupParams) => [
    <li key={params.key}>
      <div className="text-lg pl-4 pt-2 text-noumura-grey">{params.group}</div>
    </li>,
    params.children,
  ];

  const handleAutocompleteBlur = () => {
    // // Clear the searchTerm on blur if no option is selected
    // if (!searchResults.find((option) => option.value1 === searchTerm)) {
    //   setSearchTerm("");
    // }
    // console.log("handleAutocompleteBlur opened");
    // setSearchTerm("");
  };
  return (
    <div>
      <Autocomplete
        id="search-autocomplete"
        fullWidth
        popupIcon={null}
        options={searchResults}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.value1}
        onBlur={handleAutocompleteBlur} // onBlur event listener
        onChange={handleSearchSelect}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D1D3D4",
            },
            "&:hover fieldset": {
              borderColor: "#D1D3D4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D1D3D4",
            },
          },
        }}
        isOptionEqualToValue={(option, value) => option.value1 === value.value1}
        renderGroup={renderGroup}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            variant="outlined"
            onChange={(e) => handleSearchChange(e.target.value)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIcon color="disabled" />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        // ListboxComponent={(props) => (
        //   <ul {...props} style={{ padding: 0 }}>
        //     <ListSubheader>{`${searchTerm} -Search database`}</ListSubheader>
        //     {props.children}
        //   </ul>
        // )}
        // ListboxComponent={(props) => {
        //   const { children, ...other } = props;
        //   return <List {...other}>{children}</List>;
        // }}
        renderOption={renderOption}
        noOptionsText={
          <Typography variant="body2" color="textSecondary">
            ----No matching options-----
          </Typography>
        }
        filterOptions={(options, { inputValue }) =>
          inputValue.length < 3 ? [] : options
        }
      />
    </div>
  );
};

export default SearchComponent;
