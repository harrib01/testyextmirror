import { SchemaWrapper, LocalBusiness } from "@yext/schema-wrapper";

export function SchemaBuilder(data: any) {
  const json = {
    ...LocalBusiness(data),
    paymentAccepted: data.document.paymentOptions,
    makesOffer: data.document.services,
    carouselImages: data.document.c_imageCarousel,
    heroImage: data.document.c_heroImage,
  }
  return SchemaWrapper(json);
}
