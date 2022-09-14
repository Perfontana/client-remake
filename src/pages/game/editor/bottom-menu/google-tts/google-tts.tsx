import {
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  Tooltip,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { FaGoogle, FaYoutube } from "react-icons/fa";
import { isErrorResponse } from "../../../../../api/config";
import { downloadFromYoutube, googletts } from "../../../../../api/samples";
import { Sample } from "../../../../../store/sample";
import tracks from "../../../../../store/tracks";

import codes, { by639_1, by639_2T, by639_2B } from "iso-language-codes";

const codeList = Object.keys(by639_1);

const LanguageSelect = ({ onChange, value }: any) => {
  return (
    <Select
      onChange={(e) => {
        console.log(e.target.value);
        onChange(e.target.value);
      }}
      value={value}
    >
      {codeList.map((code) => (
        <option value={code} selected={value === code}>
          {by639_1[code].nativeName}
        </option>
      ))}
    </Select>
  );
};

export const GoogleTTS = observer(() => {
  const toast = useToast();

  const [isLoading, { on, off }] = useBoolean(false);

  const { isOpen, onToggle, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("");

  const loadFromYoutube = async (e: FormEvent) => {
    e.preventDefault();

    on();

    const { data } = await googletts(text, voice);

    off();

    setText("");

    if (isErrorResponse(data)) {
      return toast({ status: "error", title: data.message });
    }

    const newTrack = tracks.addTrack();

    await Sample.loadFromUrl(data.name, data.url, newTrack);
  };

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Tooltip placement="top-end" label="Load sound from youtube">
          <Button
            isLoading={isLoading}
            colorScheme={"green"}
            onClick={onToggle}
            leftIcon={<FaGoogle />}
          >
            Google Translate
          </Button>
        </Tooltip>
      </PopoverTrigger>

      <PopoverContent>
        <HStack
          p={3}
          pt={5}
          bg={"white"}
          w={"full"}
          zIndex={2}
          position={"sticky"}
          top={0}
          boxShadow="1px 1px 10px #00000050"
        >
          <PopoverCloseButton zIndex={4} top={"0"} left={"0"} />
          <form onSubmit={loadFromYoutube} style={{ width: "100%" }}>
            <InputGroup>
              <InputLeftElement>
                <LanguageSelect
                  onChange={(e: string) => setVoice(e)}
                  value={voice}
                />
              </InputLeftElement>
              <Input
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />

              <InputRightElement>
                <IconButton
                  colorScheme={"blue"}
                  isLoading={isLoading}
                  aria-label="Search"
                  icon={<FaGoogle />}
                  type="submit"
                />
              </InputRightElement>
            </InputGroup>
          </form>
        </HStack>
      </PopoverContent>
    </Popover>
  );
});
