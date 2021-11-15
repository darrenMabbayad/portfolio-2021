import { getManifest } from "utils/asyncHandlers";

interface Props {
  manifest: Array<string>;
}

const Destiny2 = ({ manifest }: Props) => {
  console.log(manifest);
  return (
    <div>
      <p>Testing Stuff</p>
    </div>
  );
};

export async function getStaticProps() {
  const manifest = await getManifest();

  return {
    props: {
      manifest,
    },
  };
}

export default Destiny2;
