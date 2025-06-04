import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Text, Spinner, Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchRepos } from "../../store/repo/repo.action";
import type { GitHubUser } from "../../types/github";
import RepoList from "./RepoList";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  user: GitHubUser;
  isOpen: boolean;
}

const MotionAccordionPanel = motion(AccordionPanel);

export default function UserAccordionItem({ user, isOpen }: Props) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.repos);

  useEffect(() => {
    if (isOpen) dispatch(fetchRepos(user.login));
  }, [isOpen, user.login, dispatch]);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBg = useColorModeValue("blue.50", "blue.900");
  const expandedBg = useColorModeValue("blue.100", "blue.700");
  const expandedColor = useColorModeValue("blue.900", "blue.100");

  return (
    <AccordionItem
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      mb={4}
      boxShadow="md"
      overflow="hidden"
      _hover={{ boxShadow: "lg", borderColor: "blue.400" }}
      transition="box-shadow 0.3s ease, border-color 0.3s ease"
    >
      <h2>
        <AccordionButton
          _expanded={{ bg: expandedBg, color: expandedColor, fontWeight: "bold" }}
          _hover={{ bg: hoverBg }}
          py={5}
          fontSize={{ base: "md", md: "lg" }}
          letterSpacing="wider"
          transition="background-color 0.2s ease"
        >
          <Box flex="1" textAlign="left" userSelect="none">
            {user.login}
          </Box>
          <AccordionIcon boxSize={{ base: 5, md: 6 }} />
        </AccordionButton>
      </h2>

      <AnimatePresence initial={false}>
        {isOpen && (
          <MotionAccordionPanel
            bg={bgColor}
            pt={5}
            pb={7}
            borderTop="1px solid"
            borderColor={borderColor}
            roundedBottom="lg"
            minH="100px"
            position="relative"
            initial={{ opacity: 0, scale: 0.95, height: 0 }}
            animate={{ opacity: 1, scale: 1, height: "auto" }}
            exit={{ opacity: 0, scale: 0.95, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {loading ? (
              <Flex justifyContent="center" py={6}>
                <Spinner size="xl" thickness="5px" speed="0.8s" emptyColor={useColorModeValue("gray.200", "gray.700")} color="blue.500" />
              </Flex>
            ) : error ? (
              <Text color="red.500" fontWeight="semibold" fontSize="md" textAlign="center" userSelect="none">
                {error}
              </Text>
            ) : (
              <RepoList />
            )}
          </MotionAccordionPanel>
        )}
      </AnimatePresence>

      {!isOpen && (
        <AccordionPanel bg={bgColor} pt={5} pb={7} borderTop="1px solid" borderColor={borderColor} roundedBottom="lg" minH="100px" position="relative">
          <Text fontStyle="italic" color={useColorModeValue("gray.500", "gray.400")} textAlign="center" userSelect="none">
            Open this accordion to load repositories.
          </Text>
        </AccordionPanel>
      )}
    </AccordionItem>
  );
}
