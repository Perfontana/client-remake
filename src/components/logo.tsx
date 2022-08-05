import { Box, HStack, Text, TextProps } from "@chakra-ui/react";
import { useState } from "react";

export const Logo = ({ fontSize }: TextProps) => {
  return (
    <HStack>
      <Text fontSize={fontSize}>M</Text>
      <Text fontSize={fontSize}>E</Text>
      <Text fontSize={fontSize}>W</Text>
      <Text fontSize={fontSize}>L</Text>
    </HStack>
  );
};
