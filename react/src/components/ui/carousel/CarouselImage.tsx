/* eslint-disable react/jsx-handler-names */
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@lib/utils/helper"; // Assuming you have this utility
import Button from "@components/ui/Button";
import { IconChevronLeft, IconChevronRight } from "@assets/icons";
import useMediaQuery from "@hooks/useMediaQuery";

interface CarouselProps {
  items: React.ReactNode[];
  className?: string;
  itemsPerView?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const CarouselImage: React.FC<CarouselProps> = ({ items, className, itemsPerView = { sm: 1, md: 1, lg: 1 } }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [load, setLoad] = useState(true);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerItemRef = useRef<HTMLDivElement | null>(null);
  const { isMinLg, isMinMd } = useMediaQuery();

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef?.current?.offsetWidth || 0;
        setItemWidth(containerWidth / handleGetItemsPerView());
      }
    };
    setTimeout(() => {
      handleResize();
    }, 100);

    setTimeout(() => {
      setLoad(false);
    }, 1500);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerItemRef.current) {
        const scrollLeft = containerItemRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / itemWidth);
        setCurrentIndex(newIndex);
      }
    };

    if (containerItemRef.current) {
      containerItemRef?.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerItemRef.current) {
        containerItemRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [itemWidth]);

  const handleGetItemsPerView = () => {
    if (isMinLg && itemsPerView.lg) {
      return Math.min(itemsPerView.lg, items.length); // Ensure itemsPerView doesn't exceed items.length
    } else if (isMinMd && itemsPerView.md) {
      return Math.min(itemsPerView.md, items.length);
    } else {
      return Math.min(itemsPerView.sm || 1, items.length);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      const scrollPosition = itemWidth * newIndex;
      containerItemRef.current?.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, items.length - handleGetItemsPerView());
      const scrollPosition = itemWidth * newIndex;
      containerItemRef.current?.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      return newIndex;
    });
  };

  const handleClickGroupItem = (group: number) => {
    const itemsPerViewCount = handleGetItemsPerView();
    const itemsLength = items?.length || 0;
    const isLastGroup = Math.ceil(itemsLength / itemsPerViewCount) === group + 1;
    let updateIndex = group * itemsPerViewCount;

    if (isLastGroup) {
      const stepBack = itemsLength % itemsPerViewCount === 0 ? 0 : itemsPerViewCount - (itemsLength % itemsPerViewCount);
      updateIndex -= stepBack;
    }

    setCurrentIndex(updateIndex);
    itemRefs.current[updateIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)} ref={containerRef}>
      <div ref={containerItemRef} style={{ width: `${itemWidth * handleGetItemsPerView()}px` }} className={`relative !snap-x  h-full flex gap-2 overflow-x-scroll scrollbar-hidden ${!load && "transition-left duration-500 ease-in-out"} `}>
        {items.map((item, index) => (
          <div ref={(el) => (itemRefs.current[index] = el)} style={{ width: `${itemWidth}px` }} key={index} className="!snap-start	 flex flex-shrink-0 h-full bg-primary-100 justify-center items-center">
            {item}
          </div>
        ))}
      </div>

      <Button label={<IconChevronLeft className="icon-white w-[2rem] h-[2rem]" />} variant="transparent" onClick={handlePrev} className="absolute top-1/2 left-2 transform -translate-y-1/2" disabled={currentIndex === 0} />

      <Button label={<IconChevronRight className="icon-white w-[2rem] h-[2rem]" />} variant="transparent" onClick={handleNext} className="absolute top-1/2 right-2 transform -translate-y-1/2" disabled={currentIndex >= items.length - handleGetItemsPerView()} />

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2">
        {Array.from({ length: Math.ceil(items.length / handleGetItemsPerView()) }).map((_, group) => {
          let isCurrentGroup = group * handleGetItemsPerView() === currentIndex;
          const isSpecialCase = items?.length % handleGetItemsPerView() !== 0;
          const lastGroupIndex = Math.ceil(items.length / handleGetItemsPerView()) - 1;

          if (isSpecialCase && group === lastGroupIndex) {
            const stepBack = items?.length % handleGetItemsPerView() === 0 ? 0 : handleGetItemsPerView() - (items.length % handleGetItemsPerView());
            const updateIndex = lastGroupIndex * handleGetItemsPerView() - stepBack;
            if (updateIndex === currentIndex) {
              isCurrentGroup = true;
            }
          }
          return <Button key={group} label="" variant="transparent" className={`h-3 w-3 !p-0 rounded-full ${isCurrentGroup ? "bg-white" : "bg-white/30"}`} onClick={() => handleClickGroupItem(group)} />;
        })}
      </div>
    </div>
  );
};

export default CarouselImage;
