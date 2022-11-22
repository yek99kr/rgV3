import Image from "next/image";
// import Vimeo from "@u-wave/react-vimeo";

const DetailMedia = ({ slice }) => {
  // https://images.prismic.io/realgoodweb/75952b89-745d-4209-85c4-7e66facb4fcb_SKOHTitle.webp?auto=compress,format
  return (
    <>
      {slice.primary.media.link_type === "Web" ? (
        <>
          <div className="col-start-3 md:p-0 w-[94vw] md:w-[96vw] aspect-video">
            <iframe
              className="w-[100%] h-[100%]"
              src={`${slice.primary.media.url.slice(
                6
              )}?quality=1080p&loop=1&autoplay=1&muted=1?background=1${
                slice.primary.controls === false ? "&controls=0" : ""
              }`}
              allowFullScreen
              allow="autoplay; fullscreen"
              frameBorder="0"
            ></iframe>
          </div>
        </>
      ) : (
        slice.primary.media.url && (
          <>
            <div className="relative col-start-3 md:p-0 w-[94vw] md:w-[96vw] aspect-video">
              <Image
                src={slice.primary.media.url}
                alt={slice.primary.media.alt}
                priority={true}
                loading="eager"
                layout="fill"
                objectFit="cover"
              ></Image>
            </div>
          </>
        )
      )}
    </>
  );
};

export default DetailMedia;
