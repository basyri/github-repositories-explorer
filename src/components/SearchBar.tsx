import { Input, Button, Flex, FormControl, FormLabel, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchUsers } from "../store/user/user.action";
import { clearUsers } from "../store/user/user.slice";
import { useAppDispatch } from "../store/hook";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

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

  const bgColor = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.50", "gray.700");

  return (
    <MotionFlex
      gap={{ base: 3, md: 4 }}
      mb={8}
      justifyContent="center"
      alignItems="center"
      maxW="640px"
      mx="auto"
      p={{ base: 4, md: 6 }}
      bg={bgColor}
      boxShadow="xl"
      borderRadius="2xl"
      flexDirection={{ base: "column", md: "row" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <FormControl id="search" flex="1" w="100%">
        <FormLabel srOnly>Search GitHub User</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" w="3rem" color="gray.500">
            <FaSearch />
          </InputLeftElement>
          <MotionInput
            pl="3rem" // padding kiri supaya teks input tidak nempel icon
            placeholder="Type a GitHub username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            size="lg"
            variant="filled"
            rounded="xl"
            bg={inputBg}
            _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
            focusBorderColor="blue.400"
            autoComplete="off"
            whileFocus={{ scale: 1.02, boxShadow: `0 0 8px rgba(59, 130, 246, 0.6)` }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </InputGroup>
      </FormControl>

      <MotionButton
        onClick={handleSearch}
        colorScheme="blue"
        size="lg"
        rounded="xl"
        boxShadow="md"
        w={{ base: "100%", md: "auto" }}
        mt={{ base: 3, md: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(59,130,246,0.7)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Search
      </MotionButton>
    </MotionFlex>
  );
}
