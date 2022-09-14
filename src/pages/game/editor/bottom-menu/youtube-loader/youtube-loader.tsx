import {
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { isErrorResponse } from "../../../../../api/config";
import { downloadFromYoutube } from "../../../../../api/samples";
import { language } from "../../../../../store/language";
import { Sample } from "../../../../../store/sample";
import tracks from "../../../../../store/tracks";

var youtubeLinkRegexp =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

export const YoutubeLoader = observer(() => {
  const toast = useToast();

  const [isLoading, { on, off }] = useBoolean(false);

  const { isOpen, onToggle, onClose } = useDisclosure();
  const [link, setLink] = useState("");

  const loadFromYoutube = async (e: FormEvent) => {
    e.preventDefault();

    on();

    let videoId = link;

    const match = link.match(youtubeLinkRegexp);
    if (match && match[2].length == 11) {
      videoId = match[2];
    }

    const { data } = await downloadFromYoutube(videoId);

    off();

    setLink("");

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
        <Tooltip
          placement="top-end"
          label={language.ui.editor.bottomMenu.youtube.tooltipText}
        >
          <Button
            isLoading={isLoading}
            colorScheme={"red"}
            onClick={onToggle}
            leftIcon={<FaYoutube />}
          >
            Youtube
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
              <Input
                placeholder={language.ui.editor.bottomMenu.youtube.placeholder}
                type="text"
                onChange={(e) => setLink(e.target.value)}
                value={link}
              />
              <InputRightElement>
                <IconButton
                  colorScheme={"red"}
                  isLoading={isLoading}
                  aria-label="Search"
                  icon={<FaYoutube />}
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
