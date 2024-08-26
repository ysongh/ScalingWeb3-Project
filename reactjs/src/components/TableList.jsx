import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

function TableList({ schemaList }) {
  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Registrant</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {schemaList.map(s => (
          <Tr key={s.id}>
            <Td>{s.id}</Td>
            <Td>{s.registrant}</Td>
            <Td>{s.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TableList;
