import {
  Heading,
  Kbd,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { language } from "../store/language";

export interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal = observer(({ isOpen, onClose }: GuideModalProps) => {
  return (
    <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{language.ui.guide.header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size={"lg"}>{language.ui.guide.playback.header}</Heading>
          <Text mt={4} lineHeight={7}>
            {language.ui.guide.playback.text1}
          </Text>
          <UnorderedList spacing={2}>
            <StortcutListItem
              keys={language.ui.guide.playback.space}
              descrition={language.ui.guide.playback.spaceDescription}
            />
            <StortcutListItem
              keys="w"
              descrition={language.ui.guide.playback.wDescription}
            />
          </UnorderedList>
          <Text mt={4}>{language.ui.guide.playback.text2}</Text>

          <Heading mt={8} size={"lg"}>
            {language.ui.guide.navigation.header}
          </Heading>
          <UnorderedList mt={4} spacing={2}>
            <StortcutListItem
              keys={language.ui.guide.navigation.wheelClickDrag}
              descrition={
                language.ui.guide.navigation.wheelClickDragDescription
              }
            />
            <StortcutListItem
              keys={language.ui.guide.navigation.wheel}
              descrition={language.ui.guide.navigation.wheelDescription}
            />
          </UnorderedList>

          <Heading mt={8} size={"lg"}>
            {language.ui.guide.samples.header}
          </Heading>

          <Heading mt={4} size={"md"}>
            {language.ui.guide.samples.addingSamples.header}
          </Heading>

          <Heading mt={2} size={"sm"}>
            {language.ui.guide.samples.addingSamples.micro}
          </Heading>
          <Text lineHeight={7}>
            {language.ui.guide.samples.addingSamples.microText}
          </Text>

          <Heading mt={2} size={"sm"}>
            {language.ui.guide.samples.addingSamples.file}
          </Heading>
          <Text lineHeight={7}>
            {language.ui.guide.samples.addingSamples.fileText}
          </Text>

          <Heading mt={2} size={"sm"}>
            {language.ui.guide.samples.addingSamples.freesound}
          </Heading>
          <Text lineHeight={7}>
            {language.ui.guide.samples.addingSamples.freesoundText}
          </Text>

          <Heading mt={2} size={"sm"}>
            {language.ui.guide.samples.addingSamples.youtube}
          </Heading>
          <Text lineHeight={7}>
            {language.ui.guide.samples.addingSamples.youtubeText}
          </Text>

          <Heading mt={2} size={"sm"}>
            {language.ui.guide.samples.addingSamples.copy}
          </Heading>
          <Text lineHeight={7}>
            {language.ui.guide.samples.addingSamples.copyText}
          </Text>

          <Heading mt={4} size={"md"}>
            {language.ui.guide.samples.changingSamples.header}
          </Heading>
          <UnorderedList mt={4} spacing={2}>
            <StortcutListItem
              keys="c"
              descrition={
                language.ui.guide.samples.changingSamples.cDescription
              }
            />
            <StortcutListItem
              keys="s"
              descrition={
                language.ui.guide.samples.changingSamples.sDescription
              }
            />
            <StortcutListItem
              keys="d"
              descrition={
                language.ui.guide.samples.changingSamples.dDescription
              }
            />
          </UnorderedList>

          <Text mt={2} lineHeight={7}>
            {language.ui.guide.samples.changingSamples.text1}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export interface StortcutListItemProps {
  keys: string;
  descrition: string;
}

export const StortcutListItem = ({
  descrition,
  keys,
}: StortcutListItemProps) => {
  return (
    <ListItem listStyleType={"none"}>
      <ListIcon as={() => <Kbd mr={2}>{keys}</Kbd>} />
      {descrition}
    </ListItem>
  );
};
