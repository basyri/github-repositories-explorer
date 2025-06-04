import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
import type { GitHubRepo } from "../../types/github";

interface Props {
  repo: GitHubRepo;
}

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function RepoItem({ repo }: Props) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgHover = useColorModeValue("gray.100", "gray.700");
  const starColor = useColorModeValue("yellow.400", "yellow.300");
  const titleGradient = useColorModeValue("linear(to-r, blue.500, teal.400)", "linear(to-r, blue.300, teal.200)");

  return (
    <MotionBox
      p={4}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      initial={{ y: 0, boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px" }}
      whileHover={{
        y: -4,
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 8px 15px -3px",
        backgroundColor: bgHover,
        transition: { duration: 0.3 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Box maxW="70%">
        <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }} noOfLines={1} bgGradient={titleGradient} bgClip="text" userSelect="none" letterSpacing="wide">
          {repo.name}
        </Text>
        <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} noOfLines={2} mt={1} userSelect="none" opacity={0.85} lineHeight="short">
          {repo.description || "No description"}
        </Text>
      </Box>

      <MotionFlex
        alignItems="center"
        gap={2}
        color={starColor}
        fontWeight="semibold"
        minW="60px"
        justifyContent="flex-end"
        userSelect="none"
        initial={{ scale: 1, color: starColor }}
        whileHover={{
          scale: 1.2,
          color: useColorModeValue("yellow.500", "yellow.400"),
          transition: { duration: 0.4, yoyo: Infinity },
        }}
      >
        <AiFillStar size={22} />
        <Text fontSize="md">{repo.stargazers_count}</Text>
      </MotionFlex>
    </MotionBox>
  );
}
