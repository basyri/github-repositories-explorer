import { Box, Text } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import type { GitHubRepo } from "../../types/github";

interface Props {
  repo: GitHubRepo;
}

export default function RepoItem({ repo }: Props) {
  return (
    <Box
      p={2}
      borderBottom="1px solid #ddd"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text fontWeight="bold">{repo.name}</Text>
        <Text fontSize="sm">{repo.description || "No description"}</Text>
      </Box>
      <Box display="flex" alignItems="center" gap={1} color="gold">
        <AiFillStar />
        <Text>{repo.stargazers_count}</Text>
      </Box>
    </Box>
  );
}
