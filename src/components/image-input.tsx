import { FiFile } from "react-icons/fi";
import {
  Flex,
  FlexProps,
  FormLabel,
  Icon,
  Image,
  Input,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { language } from "../store/language";

export interface ImageInputProps {
  flex: FlexProps;
  onChange: (file: File) => void;
  name: string;
}

export const ImageInput = ({ flex, onChange, name }: ImageInputProps) => {
  const [isMouseOver, { on, off }] = useBoolean(false);
  const [src, setSrc] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (file) {
      setSrc(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <Flex
      onMouseEnter={on}
      onMouseLeave={off}
      rounded={"md"}
      background="gray.100"
      p={2}
      position="relative"
      align="center"
      justify="center"
      {...flex}
    >
      <Input
        onChange={handleChange}
        zIndex={-2}
        opacity={0}
        position="absolute"
        type={"file"}
        name={name}
        id={name}
      ></Input>
      <FormLabel
        zIndex={2}
        m={0}
        _hover={{ cursor: "pointer" }}
        htmlFor={name}
        top={0}
        bottom={0}
        left={0}
        right={0}
        position="absolute"
      ></FormLabel>

      {src && <Image src={src} />}

      <VStack
        rounded={"md"}
        align={"center"}
        justify="center"
        w={"full"}
        h="full"
        position={src ? "absolute" : "initial"}
        opacity={!src || isMouseOver ? 1 : 0}
        backgroundColor={src && isMouseOver ? "#0000006e" : "transparent"}
        color={src && isMouseOver ? "#e0e0e0" : "initial"}
        transition={"background-color 0.2s"}
        spacing={2}
      >
        <Icon as={FiFile} />
        <Text>{language.ui.imageInput.placeholder}</Text>
      </VStack>
    </Flex>
  );
};
