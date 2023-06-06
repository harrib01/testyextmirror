import React from "react";
import { Image } from '@yext/pages/components';
import type { Image as ImageType, ComplexImage as ComplexImageType } from "@yext/types";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useBreakpoint } from "src/common/useBreakpoints";
import "src/components/entity/Gallery.css";
import c from "classnames";

const defaultFields: string[] = [
  'c_gallerySection',
  'photoGallery',
];

type GalleryProps = {
  images: (ImageType | ComplexImageType)[];
  hideArrows?: boolean;
};

const Gallery = (props: GalleryProps) => {
  const arrowSVG = (
    <svg className="md:h-[60px]" viewBox="0 0 68 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="81" transform="translate(0 0.273926)" fill="white" fill-opacity="0.9" />
      <rect x="19.6655" y="39.6084" width="35" height="2" rx="1" transform="rotate(45 19.6655 39.6084)" fill="currentColor" />
      <rect x="43" y="16.2739" width="2" height="35" rx="1" transform="rotate(45 43 16.2739)" fill="currentColor" />
    </svg>
  );
  const showControls = !props.hideArrows;
  const isXlBp = useBreakpoint("xl");
  const isMdBp = useBreakpoint("md");

  return (
    <div className="Gallery py-8 sm:py-16">
      <div className="container">
        <CarouselProvider
          className="relative"
          naturalSlideWidth={100}   // Sets fixed aspect ratio for slides, required but disabled with `isIntrensicHeight`
          naturalSlideHeight={100}  // Sets fixed aspect ratio for slides, required but disabled with `isIntrensicHeight`
          totalSlides={props.images.length}
          visibleSlides={isXlBp ? 3 : isMdBp ? 2 : 1}
          isIntrinsicHeight={true}
          infinite={props.images.length > 3 ? true : false}
        >
          <Slider>
            {props.images.map((image, idx) => (
              <Slide className="" index={idx} key={idx}>
                <Image className="m-auto w-full h-full object-cover" image={image} />
              </Slide>
            ))}
          </Slider>


          {showControls && (
            <div className={c(
              {"hidden": isXlBp && props.images.length <= 3},
              {"hidden": isMdBp && props.images.length <= 2},
              {"hidden": props.images.length == 1},
            )}>
              {!props.hideArrows && (
                <div className="absolute left-0 top-1/2  w-full flex justify-between">
                  <ButtonBack className="Gallery-button w-10 h-10 text-brand-gray-300 disabled:text-brand-gray-200 disabled:cursor-default">
                    {arrowSVG}
                  </ButtonBack>
                  <ButtonNext className="Gallery-button w-10 h-10 rotate-180 text-brand-gray-300 disabled:text-brand-gray-200 disabled:cursor-default">
                    {arrowSVG}
                  </ButtonNext>
                </div>
              )}
            </div>
          )}
        </CarouselProvider>
      </div>
    </div>
  );
};

export {
  Gallery,
  defaultFields,
};
