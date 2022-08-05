import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { ImageInput } from "./image-input";
import { language } from "../store/language";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

export interface PlayerData {
  name: string;
  avatar: File | null;
}

export interface JoinRoomFormProps {
  onSubmit: (data: PlayerData) => any;
  isLoading: boolean;
}

export const JoinRoomForm = observer(
  ({ onSubmit, isLoading }: JoinRoomFormProps) => {
    const validationSchema = useMemo(() => {
      return Yup.object().shape({
        name: Yup.string()
          .min(3, language.ui.validation.tooShort(3))
          .max(15, language.ui.validation.tooLong(15))
          .required(language.ui.validation.required),
      });
    }, [language.currentLanguage]);

    return (
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{ name: "", avatar: null }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <ImageInput
                  flex={{ w: "full" }}
                  onChange={(file) => setFieldValue("avatar", file)}
                  name={"avatar"}
                />

                <FormControl isInvalid={!!errors.name && touched.name}>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="name"
                    variant="filled"
                    placeholder={language.ui.mainPage.usernamePlaceholder}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <Button isLoading={isLoading} w="full" type="submit">
                  {language.ui.mainPage.createRoomBtn}
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    );
  }
);
