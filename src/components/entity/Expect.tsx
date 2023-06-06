import React from "react";
import "src/components/entity/About.css";
import { LocationProfile } from "src/types/entities";
import "src/components/entity/Expect.css";
import Markdown from "src/components/entity/Markdown";

type ExpectProps = {
  profile: LocationProfile;
  promoParagraph?: string;
  promoTitle?: string;
  type?: string;
};

const Expect = (props: ExpectProps) => {
  const { profile } = props;

  return (
    <div className="Expect py-8 sm:py-16">
      <div className="container">
        <div className="block md:flex">
          <div className="Expect-contentRight flex flex-col gap-8">
            <h2 className="Heading Heading--head uppercase tracking-[1.4px]">
              {props.promoTitle ? props.promoTitle : "What to Expect"}
            </h2>
            {props.promoParagraph && (
              <div className="font-secondary font-light">
                <Markdown>
                  {props.promoParagraph}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export {
  Expect,
};
