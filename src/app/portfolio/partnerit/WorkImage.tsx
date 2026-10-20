// Responsive WebP variants are generated before deployment, avoiding on-demand conversion.
import imageAssets from "./image-assets.json";
import styles from "./page.module.css";

export default function WorkImage({ file, width, height, alt, caption, sizes }: {
  file: string; width: number; height: number; alt: string; caption: string; sizes?: string;
}) {
  const src = `/portfolio/partnerit/source/${file}`;
  const asset = imageAssets[file as keyof typeof imageAssets];
  return (
    <figure className={styles.workImage}>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`${alt} 크게 보기`}>
        <img
          src={asset?.src ?? src}
          srcSet={asset && "srcSet" in asset ? asset.srcSet : undefined}
          sizes={sizes ?? "(max-width: 767px) calc(100vw - 40px), (max-width: 1296px) calc(100vw - 96px), 1200px"}
          width={width}
          height={height}
          alt={alt}
          loading="eager"
          fetchPriority="low"
          decoding="async"
        />
      </a>
      <figcaption><span>{caption}</span><a href={src} target="_blank" rel="noreferrer">화면 크게 보기 <span aria-hidden="true">↗</span></a></figcaption>
    </figure>
  );
}
