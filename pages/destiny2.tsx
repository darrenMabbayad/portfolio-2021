import { getDestinyDefinitionsObject, getManifest } from "utils/asyncHandlers";

interface Props {
  dataAsArr: Array<Object>;
}

const Destiny2 = ({ dataAsArr }: Props) => {
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
  ] = dataAsArr;

  return (
    <div>
      <p>Testing Stuff</p>
      <button onClick={() => console.log(inventoryItems)}>Inventory</button>
      <button onClick={() => console.log(equipSlots)}>Slots</button>
      <button onClick={() => console.log(socketCategories)}>Sockets</button>
      <button onClick={() => console.log(itemCategories)}>ItemCats</button>
      <button onClick={() => console.log(plugSets)}>Plugs</button>
      <button onClick={() => console.log(stats)}>Stats</button>
      <button onClick={() => console.log(sandboxPerks)}>Perks</button>
      <button onClick={() => console.log(talentGrids)}>Talents</button>
      <button onClick={() => console.log(collectibles)}>Collectibles</button>
    </div>
  );
};

export async function getStaticProps() {
  const manifest = await getManifest();
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

  const dataAsArr = await Promise.all(
    definitions.map(async (key: string) => {
      const dataset = await getDestinyDefinitionsObject(key);
      return dataset;
    })
  );

  return {
    props: {
      dataAsArr,
    },
  };
}

export default Destiny2;
