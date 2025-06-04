import {  Text } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hook";
import RepoItem from "./RepoItem";

export default function RepoList() {
  const { repos } = useAppSelector((state) => state.repos);

  if (!repos.length) {
    return <Text>No repositories found.</Text>;
  }

  return (
    <>
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </>
  );
}
