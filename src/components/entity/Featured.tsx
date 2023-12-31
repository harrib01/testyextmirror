import React from "react";
import { CardComponent } from "src/models/cardComponent";

interface FeaturedProps<ProfileType> {
  title: string;
  items: ProfileType[];
  CardComponent: CardComponent<ProfileType>;
  itemsToShow?: number;
}

const Featured = <ProfileType,>(props: FeaturedProps<ProfileType>) => {
  const { title, items, CardComponent, itemsToShow = 3} = props;
  if (!items.length) {
    return null;
  }

  return (
    <div className="FeaturedProduct py-8 sm:py-16 bg-brand-gray-100">
      <div className="container">
        <div className="pb-2 m-4 Heading Heading--head">
          {title}
        </div>
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <>
            {i < itemsToShow && (
              <li className="bg-white" key={i}>
                <CardComponent profile={item} />
              </li>
            )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export {
  Featured,
  FeaturedProps,
}
