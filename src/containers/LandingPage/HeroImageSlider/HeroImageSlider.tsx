import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import css from './HeroImageSlider.module.scss';

interface SliderElement {
  id: string;
  imageURL: string;
  alt: string;
  title: string;
  text: string;
  cta: string;
  link: string;
}

interface Props {
  sliderData: SliderElement[];
  /** In seconds */
  slideInterval?: number;
  infinite?: boolean;
}

const HeroImageSlider: FC<Props> = ({ sliderData, slideInterval, infinite = false }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rootWidth, setRootWidth] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);

  const slide = (direction: -1 | 1): void => {
    if (direction > 0) {
      if (currentIndex >= sliderData.length - 1) {
        infinite && setCurrentIndex(0);
        return;
      }
      setCurrentIndex(currentIndex + 1);
    }
    if (direction < 0) {
      if (currentIndex < 1) {
        infinite && setCurrentIndex(sliderData.length - 1);
        return;
      }
      setCurrentIndex(currentIndex - 1);
    }
  };
  const slideCallback = useCallback(slide, [currentIndex, sliderData.length, infinite]);

  const keyHandlerCallback = useCallback(
    (event: KeyboardEvent) => {
      if (mouseOver && sliderData.length > 1) {
        if (event.code === 'ArrowRight') slideCallback(1);
        if (event.code === 'ArrowLeft') slideCallback(-1);
      }
    },
    [mouseOver, sliderData.length, slideCallback]
  );

  useEffect(() => {
    // Adjust the width of the root container when the viewport is resized by the user
    // Needed to correctly slide to previous/next elements
    const imageRefCurrent = sliderRef.current;
    setRootWidth(imageRefCurrent.clientWidth);
    const resizeHandler = () => {
      setRootWidth(imageRefCurrent.clientWidth);
    };
    window.addEventListener('resize', resizeHandler);

    // Control slide behavior with arrow keys
    window.addEventListener('keydown', keyHandlerCallback);

    // Automatically slide to next element
    // The slideInterval prop must be set on the component
    const timer = slideInterval ? setInterval(() => slideCallback(1), slideInterval * 1000) : null;

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('keydown', keyHandlerCallback);
      timer && clearInterval(timer);
    };
  }, [slideCallback, keyHandlerCallback, slideInterval]);

  return (
    <motion.div
      className={css.root}
      ref={sliderRef}
      onPanEnd={(e, pointInfo) => {
        if (pointInfo.velocity.x > 100) {
          slide(-1);
        } else if (pointInfo.velocity.x < 100) {
          slide(1);
        }
      }}
      onHoverStart={() => setMouseOver(true)}
      onHoverEnd={() => setMouseOver(false)}
    >
      <div className={css.imagesContainer} style={{ left: -currentIndex * rootWidth }}>
        {sliderData.map(item => (
          <div key={item.id} className={css.sliderItem}>
            <img src={item.imageURL} alt={item.alt} className={css.image} />
            <div className={css.sliderItemContent}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link to={item.link}>{item.cta}</Link>
            </div>
          </div>
        ))}
      </div>
      {sliderData.length > 1 && (
        <div className={css.controls}>
          <div className={css.controlItem} onClick={() => slide(-1)}>
            <IoIosArrowBack />
          </div>
          <div className={css.controlItem} onClick={() => slide(1)}>
            <IoIosArrowForward />
          </div>
          <div className={css.controlLinks}>
            {sliderData.map((item, index) => (
              <span
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                style={{ width: index === currentIndex ? 36 : 18 }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HeroImageSlider;
