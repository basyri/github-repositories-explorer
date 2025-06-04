import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchRepos } from "../../store/repo/repo.action";
import type { GitHubUser } from "../../types/github";
import RepoList from "./RepoList";

interface Props {
  user: GitHubUser;
  isOpen: boolean;
}

export default function UserAccordionItem({ user, isOpen }: Props) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.repos);

  useEffect(() => {
    if (isOpen) dispatch(fetchRepos(user.login));
  }, [isOpen, user.login, dispatch]);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {user.login}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        {isOpen ? (
          loading ? (
            <Spinner />
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <RepoList />
          )
        ) : (
          <Text>Open this accordion to load repositories.</Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
