"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderGroupParams,
  AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import SearchService, { LTVSearch } from "@/services/search_services";
import { Response } from "@/_utils/Response";
import { debounce } from "@mui/material/utils";

import LTVCalculationView from "./ltv_calculator_view";
import { LTVSearchInputProps, NoDataFoundOption } from "./types";
const SearchComponent: React.FC<LTVSearchInputProps> = (
  props: LTVSearchInputProps
) => {
  const { onSelect } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Response<LTVSearch[]>>(
    new Response().applyLoader("UNKNOWN")
  );
  const searchService = new SearchService();

  const performSearch = async () => {
    console.log("CALLED", searchTerm);
    if (searchTerm && searchTerm.trim().length >= 3) {
      setSearchResults(new Response().applyLoader("LOADING"));

      const _results = await searchService.fetchSearch(searchTerm);
      const results = _results?.payLoad?.sort((a, b) =>
        b.securityType.localeCompare(a.securityType)
      );

      setSearchResults(new Response(results).applyLoader("LOADED"));
    } else {
      // Handle the case when the search term is empty
      setSearchResults(new Response([]).applyLoader("LOADED"));
    }
  };

  useEffect(() => {
    // Perform API call when searchTerm changes

    performSearch();
  }, [searchTerm]);

  const deBounceOnChangeListener = debounce((event) => {
    setSearchTerm(event.target.value);
  }, 400 ?? 0);

  const handleSearchSelect = (_, selectedValue) => {
    /*TODO
    Call second API and display LTV calculation in UI 
    */
    if (!selectedValue) {
      setSearchTerm("");
    }
    console.log("Selected Value:--", selectedValue);
    onSelect?.(selectedValue);
  };

  const renderOption = (
    props,
    option: LTVSearch,
    state: AutocompleteRenderOptionState
  ) => {
    const { index, inputValue, selected } = state;

    // const regex = new RegExp(`(${inputValue})`, "gi");
    const regex = new RegExp(`(${inputValue.replace(/\s+/g, "\\s+")})`, "gi");

    return (
      <div {...props} key={index}>
        <div className="w-full flex flex-row">
          {option.isin
            .split(regex)
            .map((part, index) =>
              regex.test(part) ? (
                <div className="text-lg text-nomura-dark-grey">{part}</div>
              ) : (
                <div className="text-lg text-nomura-off-grey">{part}</div>
              )
            )}
          <div className="text-lg pl-4 text-nomura-dark-grey">
            {option.securityName}
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

  const renderNoMatchOption = () => {
    const _searchResults = searchResults.getResponse() ?? [];

    let type: NoDataFoundOption = "UNKNOWN";
    if (searchTerm.length < 3) type = "LESS_THAN_3_CHAR";
    else if (searchResults.isLoading()) type = "LOADING";
    else if (_searchResults.length == 0) type = "NO_MATCH";
    switch (type) {
      case "LESS_THAN_3_CHAR":
        return "Please enter at least 3 characters for wildcard search.";
      case "LOADING":
        return "Loading...";
      case "NO_MATCH":
        return "No asset matches the search criteria. Please enter asset ISIN / Ticker only to start the search.";
      default:
        return "";
    }
  };
  return (
    <>
      <Autocomplete
        id="search-autocomplete"
        fullWidth
        popupIcon={null}
        options={searchResults.getResponse() ?? []}
        groupBy={(option) => option.securityType}
        getOptionLabel={(option) => option.isin}
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
        isOptionEqualToValue={(option, value) => option.isin === value.isin}
        renderGroup={renderGroup}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              placeholder="Search"
              variant="outlined"
              onChange={deBounceOnChangeListener}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon color="disabled" />
                    {params.InputProps.startAdornment}
                    <LTVCalculationView
                      className="absolute right-0 mr-4"
                      searchKey={""}
                      loading="LOADING"
                    />
                  </>
                ),
              }}
            />
          </>
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
            {renderNoMatchOption()}
          </Typography>
        }
        filterOptions={(options, { inputValue }) =>
          inputValue.length < 3 ? [] : options
        }
      />
    </>
  );
};

export default SearchComponent;
