export const getManifest = async () => {
  const headers: HeadersInit = new Headers();
  headers.set("X-API-KEY", "3301013992064ded9a6575808b2dac27" || "");

  const res = await fetch(
    "https://www.bungie.net/Platform/Destiny2/Manifest/",
    {
      method: "GET",
      headers: headers,
    }
  );
  const manifest = await res.json();
  return manifest;
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
