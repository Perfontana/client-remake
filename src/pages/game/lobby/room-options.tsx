import {
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import * as Yup from "yup";
import { BsClock, BsPerson } from "react-icons/bs";
import game from "../../../store/game";
import { language } from "../../../store/language";
import Room from "../../../types/Room";

export interface RoomOptionsProps {
  onSubmit: (room: Partial<Room>) => any;
}

export const RoomOptions = observer(({ onSubmit }: RoomOptionsProps) => {
  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      roundTime: Yup.number()
        .min(60, language.ui.validation.tooSmall(60))
        .max(180, language.ui.validation.tooBig(180))
        .required(language.ui.validation.required),
      maximumPlayers: Yup.number()
        .min(2, language.ui.validation.tooSmall(2))
        .max(16, language.ui.validation.tooBig(16))
        .required(language.ui.validation.required),
    });
  }, [language.currentLanguage]);

  if (!game.code) return <Spinner />;

  const initialValues = {
    maximumPlayers: game.maximumPlayers,
    roundTime: game.roundTime,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors, touched }) => {
        return (
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl
                isDisabled={!game.authorizedPlayer?.isOwner}
                isInvalid={!!errors.roundTime && touched.roundTime}
              >
                <InputGroup>
                  <InputLeftAddon
                    title={language.ui.lobby.roomOptions.roundTime}
                    children={<Icon as={BsClock} />}
                  />
                  <Field
                    as={Input}
                    id="roundTime"
                    name="roundTime"
                    type="number"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.roundTime}</FormErrorMessage>
              </FormControl>

              <FormControl
                isDisabled={!game.authorizedPlayer?.isOwner}
                isInvalid={!!errors.maximumPlayers && touched.maximumPlayers}
              >
                <InputGroup>
                  <InputLeftAddon
                    title={language.ui.lobby.roomOptions.playerCount}
                    children={<Icon as={BsPerson} />}
                  />
                  <Field
                    as={Input}
                    id="maximumPlayers"
                    name="maximumPlayers"
                    type="number"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.maximumPlayers}</FormErrorMessage>
              </FormControl>

              {game.authorizedPlayer?.isOwner && (
                <Button type="submit" w={"full"} colorScheme={"green"}>
                  {language.ui.lobby.roomOptions.save}
                </Button>
              )}
            </VStack>
          </form>
        );
      }}
    </Formik>
  );
});
