// import { useEffect, useRef } from "react"

// const Swiper = ({ images }) => {
//   const swiperRef = useRef(null)

//   useEffect(() => {
//     const swiperContainer = swiperRef.current
//     const params = {
//       navigation: true,
//       pagination: {
//         clickable: true
//       },
//       loop: true,
//       centerInsufficientSlides: true,
//       centeredSlides: true,
//       injectStyles: [
//         `
//             .swiper-button-next,
//             .swiper-button-prev {
//               background-color: white;
//               width: 50px;
//               height: 50px;
//               border-radius: 100%;
//               color: #62a744;
//             }
//             .swiper-button-next svg,
//             .swiper-button-prev svg {
//               width: 60%;
//               height: 60%;
//               position: absolute;
//               left: 50%;
//               top: 50%;
//               transform: translate(-50%, -50%);
//             }
//             .swiper-pagination-bullet {
//               width: 14px;
//               height: 14px;
//               background-color: #62a744;
//             }
//         `,
//       ],
//     }

//     Object.assign(swiperContainer, params)
//     swiperContainer.initialize()
//   }, [])

//   return (
//     <div data-block='gallery'>
//       <swiper-container ref={swiperRef} init='false'>
//         {images.map((img, i) => (
//           <swiper-slide key={i}>
//             <img src={img} alt='' />
//           </swiper-slide>
//         ))}
//       </swiper-container>
//     </div>
//   )
// }

// export default Swiper

import { useState, useEffect, useRef } from "react";

const Swiper = ({ images }) => {
  const [isActive, setIsActive] = useState(false);
  const [isGalleryClick, setIsGalleryClick] = useState(true);
  const swiperRef = useRef(null);

  const galleryClickHandler = () => {
    if (!isGalleryClick) return; 
    setIsActive(true);
    openPopup();
    setIsGalleryClick(false);
  };

  const closeHandler = () => {
    setIsActive(false);
    closePopup();
    setIsGalleryClick(true);
  };

  // useEffect(() => {
    // if (isActive) {
    //   openPopup();
    // } else {
    //   closePopup();
    // }
  // }, [isActive]);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      // zoom: {
      //   maxRatio: 2
      // },
      navigation: true,
      pagination: {
        clickable: true,
      },
      // loop: true,
      centerInsufficientSlides: true,
      centeredSlides: true,
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            background-color: rgb(232, 232, 232);
            width: 64px;
            height: 64px;
            border-radius: 100%;
            color: #000000;
            transition: all .5s ease;
          }
          .swiper-button-next:hover, 
          .swiper-button-prev:hover {
            color: #62a744;
          }
          .swiper-button-next.swiper-button-disabled, 
          .swiper-button-prev.swiper-button-disabled {
            pointer-events: all;
          }
          .swiper-button-next svg,
          .swiper-button-prev svg {
            width: 50%;
            height: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .swiper-pagination-bullet {
            width: 14px;
            height: 14px;
          }
          @media (max-width: 440px) {
            .swiper-button-next,
            .swiper-button-prev {
              width: 32px;
              height: 32px;
            }
            .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
            }
          }
        `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <div data-block="gallery" className={isActive ? 'active' : ''}>
      <swiper-container ref={swiperRef} init="false">
        {images.map((img, i) => (
          <swiper-slide onClick={galleryClickHandler} key={i}>
              <img src={img} alt=""/>
          </swiper-slide>
        ))}
      </swiper-container>
      {isActive && (
        <div className="zoom-close" onClick={closeHandler} style={closeButtonStyle}>
          <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="#000000"></path>
            <path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="#000000"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

const closeButtonStyle = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  zIndex: 1000000,
  padding: '10px',
  height: '20px',
  width: '20px'
};

let bodyOverflow = document.querySelector('body');
let scrollPosition = 0;

function closePopup() {
  bodyOverflow.style.removeProperty("overflow");
  bodyOverflow.style.removeProperty("position");
  bodyOverflow.style.removeProperty("top");
  bodyOverflow.style.removeProperty("width");
  window.scrollTo(0, scrollPosition);
}

function openPopup() {
  scrollPosition = window.scrollY;
  bodyOverflow.style.overflow = "hidden";
  bodyOverflow.style.position = "fixed";
  bodyOverflow.style.top = `-${scrollPosition}px`;
  bodyOverflow.style.width = "100%";
}

export default Swiper;
