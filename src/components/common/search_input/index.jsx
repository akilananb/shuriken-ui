"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Simulating an API call function
  const fetchSearchResults = async (query) => {
    // Replace this with your actual API call logic
    // For demonstration purposes, using a setTimeout to mimic async behavior
    const fakeApiCall = new Promise((resolve) => {
      setTimeout(() => {
        const results = [
          { label: "Result 1", value: "result 1" ,cat:"A"},
          { label: "Result 2", value: "result 2" ,cat:"A"},
          { label: "Result 3", value: "result 3" ,cat:"A"},
          { label: "Result 4", value: "result 4" ,cat:"A"},
          { label: "Result 5", value: "result 5" ,cat:"A"},
          { label: "Result 6", value: "result 6" ,cat:"A"},
          { label: "Result 7", value: "result 7" ,cat:"A"},
          { label: "Result 8", value: "result 8" ,cat:"A"},
          { label: "Result 9", value: "result 9" ,cat:"A"},
          { label: "Result 10", value: "result 10" ,cat:"B"},
          { label: "Result 11", value: "result 11" ,cat:"B"},
          { label: "Result 12", value: "result 12" ,cat:"B"},
          { label: "Result 13", value: "result 13" ,cat:"B"},
          { label: "Result 14", value: "result 14" ,cat:"B"},
          { label: "Result 15", value: "result 15" ,cat:"B"},
          { label: "Result 16", value: "result 16" ,cat:"B"},

          // Add more results as needed
        ];
        resolve(results);
      }, 1000);
    });

    return await fakeApiCall;
  };

  useEffect(() => {
    // Perform API call when searchTerm changes
    const performSearch = async () => {
      if (searchTerm) {
        const results = await fetchSearchResults(searchTerm);
        setSearchResults(results);
      } else {
        // Handle the case when the search term is empty
        setSearchResults([]);
      }
    };

    performSearch();
  }, [searchTerm]);

  const handleSearchChange = (event, value) => {
    setSearchTerm(value);
  };

  const handleSearchSelect = (event, value) => {
    console.log("Selected Value:", value);
  };

  const renderOption = (props, option) => (
    <li {...props}>
      <Paper sx={{ background: "red" }}>
        <Typography>`${option.label} --`</Typography>

        <Typography>{option.label}</Typography>
        {/* You can add more custom content for each option */}
      </Paper>
    </li>
  );

  const renderOptionV2 = (props, option, { selected, inputValue }) => {
    // const matches = match(option.name, inputValue);
    // const parts = parse(option.name, matches);
    return (
      <div>
        <Typography>{`${inputValue} -Search database`}</Typography>
        <Typography>{JSON.stringify(option)}</Typography>
      </div>

      // <li {...props}>
      //   <Typography>{inputValue}</Typography>
      //   <Typography>{option.label}</Typography>

      //   <Checkbox checked={selected} sx={{ ml: 2 * option.depth }} />
      //   <div>
      //     {parts.map((part, index) => (
      //       <span
      //         key={index}
      //         style={{
      //           fontWeight: part.highlight ? 700 : 400
      //         }}
      //       >
      //         {part.text}
      //       </span>
      //     ))}
      //   </div>
      // </li>
    );
  };

  
  const getOptionLabel = (option) => {
    return (
      <div>
        <Typography variant="subtitle1">{option.label}</Typography>
        <Typography variant="body2" color="textSecondary">
          {`Category:${option.cat}`}
        </Typography>
      </div>
    );
  };
  return (
    <Autocomplete
      id="search-autocomplete"
      fullWidth
      popupIcon={null}
      options={searchResults}
      groupBy={(option) => option.cat}

      getOptionLabel={getOptionLabel}
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
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          onChange={(e) => handleSearchChange(e, e.target.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <SearchIcon />
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={renderOptionV2}
    />
  );
};

export default SearchComponent;
