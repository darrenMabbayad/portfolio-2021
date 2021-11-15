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
  const manifest = await fetch(`${process.env.BASE_URL}/api/d2manifest`);
  const data = await manifest.json();
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
