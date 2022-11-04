import { RichText } from "prismic-reactjs";
import { useState } from "react";

const DetailMainText = ({ slice }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  let credits = [];
  slice.items.forEach((element) => {
    let match = credits.find((r) => r.creditTitle == element.creditTitle);
    if (match) {
    } else {
      credits.push({ creditTitle: element.creditTitle, creditPerson: [] });
    }
  });

  credits.map((item) => {
    slice.items.map((e) => {
      if (e.creditTitle == item.creditTitle) {
        item.creditPerson.push({
          creditName: e.creditName,
          creditLink: e.creditLink.url ? e.creditLink.url : null,
        });
      }
    });
  });

  return (
    <>
      {slice.variation !== "noReadMore" ? (
        <div className="text col-start-3 relative leading-5 md:leading-7 md:text-[22px] text-left w-[90vw] mt-[3.5vw] mb-[3.5vw] md:mt-[40px] md:mb-[40px] lg:mt-[50px] lg:mb-[50px]">
          <div className="flex w-[100%] justify-between">
            <div className="hidden sm:block text-2xl md:text-3xl">Info</div>

            <div className="w-[100%] sm:w-[75%]">
              <div>
                {slice.primary.summary ? (
                  <RichText render={slice.primary.summary} />
                ) : null}
              </div>

              <div className={`${isReadMore ? "hidden" : "block"}`}>
                {slice.primary.moreInfo.map((t, i) => (
                  <div key={i} className={`mt-5`}>
                    {t.text}
                  </div>
                ))}

                {slice.items[0].creditTitle && (
                  <div className={`mt-5`}>
                    {credits.map((credit, i) => {
                      return (
                        <div key={i} className="md:text-[18px] ">
                          <span className="italic uppercase">
                            {credit.creditTitle} -
                          </span>{" "}
                          {credit.creditPerson.map((person, i) => {
                            return (
                              <a
                                href={person.creditLink && person.creditLink}
                                key={i}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <span
                                  className={
                                    person.creditLink &&
                                    "thumbcursor duration-100 hover:opacity-50"
                                  }
                                >
                                  {person.creditName}
                                  {i !== credit.creditPerson.length - 1 &&
                                    ","}{" "}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div
                onClick={() => {
                  setIsReadMore(!isReadMore);
                }}
                className="thumbcursor block mt-5 underline"
              >
                {isReadMore ? "Read more" : "Show less"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text col-start-3 relative leading-5 md:leading-7 md:text-[22px] text-left w-[90vw] mt-[3.5vw] mb-[3.5vw] md:mt-[40px] md:mb-[40px] lg:mt-[50px] lg:mb-[50px]">
          <div className="flex w-[100%] justify-between">
            <div className="hidden sm:block text-2xl md:text-3xl">Info</div>

            <div className="w-[100%] sm:w-[75%]">
              <div className={`mt-0`}>{slice.primary.moreInfo[0].text}</div>
              {slice.primary.moreInfo.slice(1).map((t, i) => (
                <div key={i} className={`mt-5`}>
                  {t.text}
                </div>
              ))}
              {slice.items[0].creditTitle && (
                <div className={`mt-5`}>
                  {credits.map((credit, i) => {
                    return (
                      <div key={i} className="md:text-[18px] ">
                        <span className="italic uppercase">
                          {credit.creditTitle} -
                        </span>{" "}
                        {credit.creditPerson.map((person, i) => {
                          return (
                            <a
                              href={person.creditLink && person.creditLink}
                              key={i}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span
                                className={
                                  person.creditLink &&
                                  "thumbcursor duration-100 hover:opacity-50"
                                }
                              >
                                {person.creditName}{" "}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{``}</style>
    </>
  );
};

export default DetailMainText;