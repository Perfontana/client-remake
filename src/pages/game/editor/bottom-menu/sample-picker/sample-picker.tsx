import { Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { searchSample } from "../../../../../api/samples";

export const SamplePicker = observer(() => {
  const [search, setSearch] = useState("");
  const [samples, setSamples] = useState<any>([]);

  const searchSamples = async () => {
    const res = await searchSample({ query: search });

    console.log(res);

    setSamples(res.data.results);
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button onClick={searchSamples}>Search</button>

      {samples.map((sample) => (
        <SampleSearchResult key={sample.id} sample={sample} />
      ))}
    </>
  );
});

export const SampleSearchResult = observer(({ sample }: any) => {
  const [_, dragRef] = useDrag(
    () => ({
      type: "url-sample",
      item: { name: sample.name, url: sample.previews["preview-hq-mp3"] },
    }),
    []
  );

  return <Text ref={dragRef}>{sample.name}</Text>;
});
