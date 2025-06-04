import { Accordion, Spinner, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hook";
import { useState } from "react";
import UserAccordionItem from "./UserAccordionItem";

export default function UserList() {
  const { users, loading, error } = useAppSelector((state) => state.users);
  const [openUser, setOpenUser] = useState<string | null>(null);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!users.length) return null;

  return (
    <Accordion
      allowMultiple
      onChange={(indexes) => {
        if (Array.isArray(indexes)) {
          const lastIndex = indexes[indexes.length - 1];
          setOpenUser(users[lastIndex]?.login ?? null);
        } else if (typeof indexes === "number") {
          setOpenUser(users[indexes]?.login ?? null);
        } else {
          setOpenUser(null);
        }
      }}
    >
      {users.map((user) => (
        <UserAccordionItem
          key={user.id}
          user={user}
          isOpen={openUser === user.login}
        />
      ))}
    </Accordion>
  );
}
