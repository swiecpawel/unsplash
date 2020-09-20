import React, { useState } from "react";
import AutoSuggest from "react-autosuggest";
import { FiSearch } from "react-icons/fi";
import style from "./Search.module.css";
import { useHistory } from "react-router-dom";

const suggestionArray: string[] = [
  "island",
  "islands",
  "islands off coast of krabi",
  "islands of thailand",
  "islands of greece",
];

const lowerCasedSuggestions = suggestionArray.map((foto) => foto.toLowerCase());

const Search: React.FC = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const noSuggestions = "No suggestions";

  function getSuggestions(value: string): string[] {
    return lowerCasedSuggestions.filter((foto) =>
      foto.startsWith(value.trim().toLowerCase())
    );
  }

  return (
    <div className={style.Content}>
      <div className={style.Search}>
        <div className={style.iconBox}>
          <FiSearch size={30} />
        </div>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            setValue(value);
            getSuggestions(value).length < 1
              ? setSuggestions([noSuggestions])
              : setSuggestions(getSuggestions(value));
          }}
          onSuggestionSelected={(_, { suggestionValue }) =>
            suggestionValue !== ""
              ? history.push(suggestionValue)
              : console.log("No Suggestions")
          }
          getSuggestionValue={(suggestion) =>
            suggestion === noSuggestions ? "" : suggestion
          }
          shouldRenderSuggestions={(value) => value.trim().length > 2}
          renderSuggestion={(suggestion) =>
            suggestion === noSuggestions ? (
              <span>{noSuggestions}</span>
            ) : (
              <span> {suggestion} </span>
            )
          }
          inputProps={{
            placeholder: "Search a photo...",
            value: value,
            onKeyPress: (e) => {
              if (e.key === "Enter") history.push(`${value}`);
            },
            onChange: (_, { newValue, method }) => {
              setValue(newValue);
            },
          }}
          highlightFirstSuggestion={false}
        />
      </div>
    </div>
  );
};

export default Search;
