// react
import {
  FC,
  useCallback,
  useMemo,
  useState,
} from "react";

// local imports
// components
import {
  Button,
  Container,
  GalleryLine,
  Image,
  Window,
} from "@compositions/Gallery/style";

// images
import noImg from "@assets/noImg.jpg";

type GalleryProps = {
  gameName?: string;
  images: Screenshot[];
}

const Gallery: FC<GalleryProps> = ({ gameName, images }) => {
  const [currentScreenshotIdx, setCurrentScreenshotIdx] = useState(0);

  const hasImages = useMemo(() => images.filter(image => !image.is_deleted).length > 0, [images]);

  const prevScreenshot = useCallback(() => setCurrentScreenshotIdx(
    prev => ((prev - 1 > -1) ? prev - 1 : images.length - 1),
  ), [images.length]);
  const nextScreenshot = useCallback(() => setCurrentScreenshotIdx(
    prev => ((prev + 1 < images.length) ? prev + 1 : 0),
  ), [images.length]);

  return hasImages && (
    <Container>
      <Button
        $left
        disabled={!currentScreenshotIdx}
        onClick={prevScreenshot}
      >
        {"<"}
      </Button>
      <Window>
        <GalleryLine $count={images.length} $currentScreenshotIdx={currentScreenshotIdx}>
          {images.map(image => (
            <Image
              alt={gameName ?? ""}
              height={image.height}
              key={image.id}
              sizes="100vw"
              src={image.image ?? noImg}
              width={image.width}
            />
          ))}
        </GalleryLine>
      </Window>
      <Button
        $right
        disabled={images.length - 1 === currentScreenshotIdx}
        onClick={nextScreenshot}
      >
        {">"}
      </Button>
    </Container>
  );
};

export default Gallery;
