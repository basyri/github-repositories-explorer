import { Input, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchUsers } from "../store/user/user.action";
import { clearUsers } from "../store/user/user.slice";
import { useAppDispatch } from "../store/hook";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      dispatch(clearUsers());
      setQuery("");
      return;
    }
    dispatch(fetchUsers(trimmed));
  };

  useEffect(() => {
    if (query.trim() === "") {
      dispatch(clearUsers());
    }
  }, [query, dispatch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Flex gap={2} mb={4}>
      <Input placeholder="Enter username" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
      <Button onClick={handleSearch} colorScheme="blue">
        Search
      </Button>
    </Flex>
  );
}
