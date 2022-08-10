import { Box, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";

export const Mark = observer(({ mark }: any) => {
  const baseStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    transform: "translate(-50%, 0)",
    position: "absolute",
    alignItems: "center",
    justifyItems: "center",
  };

  return (
    <div style={{ ...baseStyle, left: mark.position }}>
      <Text fontSize={8}>{mark.value.toFixed(1)}</Text>
      <Box w={"1px"} h={2} bg="white"></Box>
    </div>
  );
});
