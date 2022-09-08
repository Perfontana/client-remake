import { useTab, useMultiStyleConfig, Button, Box } from "@chakra-ui/react";
import { forwardRef, Ref } from "react";
import Player from "../../../types/Player";
import { PlayerAvatar } from "../lobby/player-avatar";

export interface ResultsTabProps {
  player: Player;
}

export const ResultsTab = forwardRef(
  (props: ResultsTabProps, ref: Ref<HTMLElement> | undefined) => {
    const player = props.player;

    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];

    const styles = useMultiStyleConfig("Tabs", tabProps);

    return (
      <Button
        __css={styles.tab}
        {...tabProps}
        bg={isSelected ? "teal" : "white"}
      >
        <Box as="span" mr="2">
          <PlayerAvatar player={player} />
        </Box>
      </Button>
    );
  }
);
