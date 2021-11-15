export const getManifest = async () => {
  const headers: HeadersInit = new Headers();
  headers.set(
    "X-API-KEY",
    process.env.MABBAYAD_DARREN_PORTFOLIO_BUNGIE_API_KEY || ""
  );

  const res = await fetch(
    "https://www.bungie.net/Platform/Destiny2/Manifest/",
    {
      method: "GET",
      headers: headers,
    }
  );
  const manifest = await res.json();
  const { en: definition } = manifest.Response.jsonWorldComponentContentPaths;
  const data = [
    definition.DestinyInventoryItemDefinition,
    definition.DestinyEquipmentSlotDefinition,
    definition.DestinySocketCategoryDefinition,
    definition.DestinyItemCategoryDefinition,
    definition.DestinyPlugSetDefinition,
    definition.DestinyStatDefinition,
    definition.DestinySandboxPerkDefinition,
    definition.DestinyTalentGridDefinition,
    definition.DestinyCollectibleDefinition,
  ];
  return data;
};

export const getDestinyDefinitionsObject = async (definition: string) => {
  const res = await fetch(`https://www.bungie.net${definition}`);
  const data = res.json();
  return data;
};

export const mapDestinyDataTables = async (table: Array<string>) => {
  const mappedData = await Promise.all(
    table.map(async (key: string) => {
      const tableData = await getDestinyDefinitionsObject(key);
      return tableData;
    })
  );
  return mappedData;
};
