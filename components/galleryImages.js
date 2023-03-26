import Image from "next/future/image";
import { urlForImage } from "../lib/sanity";

export default function SkillsImage({ image: source }) {
  const image = source?.asset?._ref ? (
    <Image
      layout="responsive"
      width={2000}
      height={1000}
      src={urlForImage(source).height(1000).width(2000).url()}
      sizes="100vw"
      alt="gallery"
    />
  ) : (
    <div style={{ paddingTop: "50%", backgroundColor: "#ddd" }} />
  );
  return <div className="h-full w-100 object-contain p-3">{image}</div>;
}
