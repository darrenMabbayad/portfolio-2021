import { getManifest, mapDestinyDataTables } from "utils/asyncHandlers";

interface Props {
  data: any;
}

const Destiny2 = ({ data }: Props) => {
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
  ] = data;

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
  const manifestComponents =
    manifest.Response.jsonWorldComponentContentPaths.en;
  const definitions = [
    manifestComponents.DestinyInventoryItemDefinition,
    manifestComponents.DestinyEquipmentSlotDefinition,
    manifestComponents.DestinySocketCategoryDefinition,
    manifestComponents.DestinyItemCategoryDefinition,
    manifestComponents.DestinyPlugSetDefinition,
    manifestComponents.DestinyStatDefinition,
    manifestComponents.DestinySandboxPerkDefinition,
    manifestComponents.DestinyTalentGridDefinition,
    manifestComponents.DestinyCollectibleDefinition,
  ];

  const data = await mapDestinyDataTables(definitions);

  return {
    props: {
      data,
    },
  };
}

export default Destiny2;
