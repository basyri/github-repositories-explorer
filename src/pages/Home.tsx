import { Container, Heading } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList/UserList";

export default function Home() {
  return (
    <Container maxW="xl" py={8}>
      <Heading textAlign={"center"} mb={6}>GitHub Repositories Explorer</Heading>
      <SearchBar />
      <UserList />
    </Container>
  );
}
