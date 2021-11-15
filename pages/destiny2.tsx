interface Props {
  data: any;
}

const Destiny2 = ({ data }: Props) => {
  console.log(data);
  return (
    <div>
      <p>Testing Stuff</p>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/d2manifest");
  const data = await res.json();
  // const manifestComponents =
  //   manifest.Response.jsonWorldComponentContentPaths.en;
  // const definitions = [
  //   manifestComponents.DestinyInventoryItemDefinition,
  //   manifestComponents.DestinyEquipmentSlotDefinition,
  //   manifestComponents.DestinySocketCategoryDefinition,
  //   manifestComponents.DestinyItemCategoryDefinition,
  //   manifestComponents.DestinyPlugSetDefinition,
  //   manifestComponents.DestinyStatDefinition,
  //   manifestComponents.DestinySandboxPerkDefinition,
  //   manifestComponents.DestinyTalentGridDefinition,
  //   manifestComponents.DestinyCollectibleDefinition,
  // ];

  // const data = await mapDestinyDataTables(definitions);

  return {
    props: {
      data,
    },
  };
}

export default Destiny2;
