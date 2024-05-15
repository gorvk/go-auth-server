import { InputBase, IconButton, SxProps, Theme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  padding: "2px 6px",
  display: "flex",
  boxShadow: "none",
}));

const inputBaseSxProps: SxProps<Theme> = {
  flex: 1,
  color: "inherit",
};

export const SearchBar = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const filterSearchTerm = (
    event: React.FormEvent<HTMLFormElement>
  ): string => {
    event.preventDefault();
    if (!formRef.current) return "";
    const formData = new FormData(formRef.current);
    const searchTerm = formData.get("input-search")?.toString();
    if (!searchTerm) return "";
    return searchTerm;
  };

  const navigateToSearchResult: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const searchTerm = filterSearchTerm(event);
    if (!searchTerm) return;
    navigate({ pathname: "/search-product", search: `?q=${searchTerm}` });
  };

  return (
    <SearchContainer onSubmit={navigateToSearchResult} ref={formRef}>
      <InputBase
        sx={inputBaseSxProps}
        placeholder="Search Products"
        name="input-search"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </SearchContainer>
  );
};
