import Loading from "@components/common/Loading";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

const Destiny: NextPage = ({
  res,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [
    inventoryItems,
    equipSlots,
    socketCategories,
    itemCategories,
    plugSets,
    stats,
    sandboxPerks,
    talentGrids,
    collectibles,
  ] = res;

  return (
    <div>
      {res ? (
        <>
          <p>Testing Stuff</p>
          <button onClick={() => console.log(inventoryItems)}>Inventory</button>
          <button onClick={() => console.log(equipSlots)}>Slots</button>
          <button onClick={() => console.log(socketCategories)}>Sockets</button>
          <button onClick={() => console.log(itemCategories)}>ItemCats</button>
          <button onClick={() => console.log(plugSets)}>Plugs</button>
          <button onClick={() => console.log(stats)}>Stats</button>
          <button onClick={() => console.log(sandboxPerks)}>Perks</button>
          <button onClick={() => console.log(talentGrids)}>Talents</button>
          <button onClick={() => console.log(collectibles)}>
            Collectibles
          </button>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const headers: HeadersInit = new Headers();
  headers.set("X-API-KEY", process.env.BUNGIE_API_KEY || "");

  const getManifest = await fetch(
    "https://www.bungie.net/Platform/Destiny2/Manifest/",
    {
      method: "GET",
      headers: headers,
    }
  );
  const manifest = await getManifest.json();
  const data = manifest.Response.jsonWorldComponentContentPaths.en;
  const definitions = [
    data.DestinyInventoryItemDefinition,
    data.DestinyEquipmentSlotDefinition,
    data.DestinySocketCategoryDefinition,
    data.DestinyItemCategoryDefinition,
    data.DestinyPlugSetDefinition,
    data.DestinyStatDefinition,
    data.DestinySandboxPerkDefinition,
    data.DestinyTalentGridDefinition,
    data.DestinyCollectibleDefinition,
  ];

  const res = await Promise.all(
    definitions.map(async (key: string) => {
      const dataset = await fetch(`https://www.bungie.net${key}`);
      const json = await dataset.json();
      return json;
    })
  );

  return {
    props: {
      res,
    },
  };
};

export default Destiny;
