/* eslint-disable react/jsx-handler-names */

import { IconCart, IconLove } from "@assets/icons";
import CardIntroComponent from "@components/cards/CardIntroComponent";
import CardVariantComp from "@components/cards/CardVariantComp";
import Button from "@components/ui/Button";
import Image from "@components/ui/Image";
import { useState } from "react";

const CardIntroImage = () => {
  const [showImageWithSkeleton, setShowImageWithSkeleton] = useState(false)
  const [showImageWithBlur, setShowImageWithBlur] = useState(false)

  const listExample = [
    {
      title: "How Image Access",
      component: <div className="flex flex-col gap-2">
        <CardVariantComp
          title={"Access image from folder assets/images by providing only the image name example : image.png"}
          withBorder={false}
          Component={<div>
            <Image src={"c1.webp"} className="h-[10rem] w-[10rem] object-cover  " customeClassName={{ container: "" }} />
          </div>}
          customeClass={{ container: "!gap-8 [&>p]:!text-left" }}
        />
        <CardVariantComp
          title={"Access image from url "}
          withBorder={false}
          Component={<Image src={"https://i.pinimg.com/564x/c1/31/c8/c131c80be697650f1311229b81405aa2.jpg"} className="h-[10rem] w-[10rem] object-cover" />}
          customeClass={{ container: "!gap-8 [&>p]:!text-left" }}
        />
      </div>
    },
    {
      title: "Image with Overlay",
      component: <div className="flex flex-col gap-2">
        <CardVariantComp
          title={""}
          withBorder={false}
          Component={<Image
            src={"https://i.pinimg.com/564x/c1/31/c8/c131c80be697650f1311229b81405aa2.jpg"}
            className="h-[10rem] w-[10rem] object-cover"
            withOverlay={true}
            overlayContent={<div className="text-white items-end flex w-full h-full p-3 gap-3">
              <Button label={<IconLove className="icon-error-fill w-[1.1rem]" />} variant={"plain"} />
              <Button label={<IconCart className="icon-gray-fill w-[1.1rem]" />} variant={"plain"} />
            </div>}
          />}
          customeClass={{ container: "!gap-8 [&>p]:!text-left" }}
        />
      </div>
    },
    {
      title: "When load Image",
      component: <div className="flex flex-col gap-2  ">
        <CardVariantComp
          title={"Use Skeleton"}
          withBorder={false}
          Component={
            <div className="flex flex-col gap-4 items-center    mx-auto">
              <Button label={showImageWithSkeleton ? "Hide Image" : "Show Image"} onClick={() => setShowImageWithSkeleton(!showImageWithSkeleton)} />
              {
                showImageWithSkeleton && <Image
                  src={"https://i.pinimg.com/564x/c1/31/c8/c131c80be697650f1311229b81405aa2.jpg"}
                  className="h-[10rem] w-[10rem] object-cover"
                  timeoutLoadImage={3600 * 5}
                  withSkeleton={true}
                />
              }
            </div>
          }
          customeClass={{ container: "!gap-8  [&>p]:!text-left " }}
        />
        <CardVariantComp
          title={"Use Blur"}
          withBorder={false}
          Component={
            <div className="flex flex-col gap-4 items-center    mx-auto">
              <Button label={showImageWithBlur ? "Hide Image" : "Show Image"} onClick={() => setShowImageWithBlur(!showImageWithBlur)} />
              {
                showImageWithBlur && <Image
                  src={"https://i.pinimg.com/564x/c1/31/c8/c131c80be697650f1311229b81405aa2.jpg"}
                  className="h-[10rem] w-[10rem] object-cover"
                  timeoutLoadImage={3600 * 5}
                />
              }
            </div>
          }
          customeClass={{ container: "!gap-8  [&>p]:!text-left " }}
        />
      </div>
    }

  ]
  return (
    <CardIntroComponent
      title={'Image'}
      subTitle="Component Image is a component used to display images with additional features such as loading states, overlays, and skeleton loading. "
      listExample={listExample}
      displayCodeBase={displayCodeBase}
    />
  );
}

const displayCodeBase = `import { cn, getAssetURL } from '@lib/utils/helper';
import React, { HTMLProps, useState } from 'react';

interface TProps extends Omit<Partial<HTMLProps<HTMLImageElement>>, ""> {
    src: string;
    alt?: string;
    withOverlay?: boolean;
    overlayContent?: React.ReactNode;
    customeClassName?: {
        container?: string;
        image?: string;
        containerOverlay?: string;
    };
    withSkeleton?: boolean;
    timeoutLoadImage?: number;

}

const Image = (props: TProps) => {
    const { src, alt, className, timeoutLoadImage = 0, withSkeleton, customeClassName, withOverlay, overlayContent, ...attrs } = props;
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleLoad = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, timeoutLoadImage)
    };

    return (
        <div className={cn({
            "relative group overflow-hidden": true,
            [customeClassName?.container || ""]: customeClassName?.container
        })}>
            <img
                src={src?.includes('http') ? src : getAssetURL({ name: src })}
                alt={alt || src.replace('-', ' ')}
                onLoad={handleLoad}
                className={cn({
                    '': true,
                    'clear-effect': !isLoading,
                    'blur-effect': isLoading,
                    [className || '']: className,
                    [customeClassName?.image || '']: customeClassName?.image

                })}
                {...attrs}
            />
            {
                isLoading && withSkeleton && <div role="status" className=" absolute top-0 left-0 border h-full w-full border-gray-400 rounded shadow animate-pulse  ">
                    <div className="flex items-center justify-center h-full w-full mb-4 bg-gray-400 rounded ">
                        <svg className="w-10 h-10 text-gray-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>
                </div>
            }
            {(withOverlay && overlayContent) && (
                <div className={cn({
                    "absolute top-0 left-0 bg-black/30 flex justify-center items-center transition-all duration-300 transform translate-y-[50%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 w-full h-full": true,
                    [customeClassName?.containerOverlay || ""]: customeClassName?.containerOverlay
                })}>
                    {overlayContent && overlayContent}
                </div>
            )}



        </div>
    );
};

export default Image;`;

export default CardIntroImage;