export type MenuOption = { text: string; link: string };
export type DropdownPicture = { imageUrl?: string; imageLabel?: string; imageLink?: string };

export const DropdownMenuOptions = {
  ourProducts: [
    { text: "Quartz Designs", link: "/quartz-countertops/quartz-colors" },
    { text: "New Designs", link: "/quartz-countertops/new-designs" },
    { text: "Inspiration Gallery", link: "/inspiration-gallery-residential" },
    { text: "Finishes and Edges", link: "/quartz-countertops/finishes-edge-profiles" },
    { text: "Frequently Asked Questions", link: "/quartz-countertops/faq" },
  ],
  kitchensAndBaths: [
    { text: "Cambria Kitchens & Baths", link: "/quartz-countertops/kitchens-baths" },
    { text: "Kitchen Countertops", link: "/quartz-countertops/kitchens-baths/kitchen-countertops" },
    { text: "Kitchen Backsplashes", link: "/quartz-countertops/kitchens-baths/kitchen-backsplash" },
    { text: "Bathroom Vanities", link: "/quartz-countertops/kitchens-baths/bathroom-vanities" },
    { text: "Shower Walls", link: "/quartz-countertops/kitchens-baths/bathroom-shower-walls" },
    {
      text: "Kitchens & Baths Inspiration Gallery",
      link: "/inspiration-gallery-residential",
    },
  ],
  uniqueInstalls: [
    { text: "Cambria Unique Installations", link: "/unique-installs" },
    { text: "Fireplaces", link: "/unique-installs/quartz-fireplaces" },
    { text: "Furniture", link: "/unique-installs/quartz-furniture" },
    { text: "Wall Cladding", link: "/unique-installs/quartz-wall-cladding" },
    { text: "Custom Applications", link: "/unique-installs/quartz-custom" },
  ],
  planningAndCare: [
    { text: "What to Expect", link: "/quartz-countertops/product-expectation" },
    { text: "Project Planning Tools", link: "/quartz-countertops/planning/tools" },
    { text: "Finance by Cambria", link: "/finance-by-cambria" },
    { text: "Product Care", link: "/quartz-countertops/faq/product-care" },
    { text: "Warranty", link: "/warranty" },
  ],
  trendsAndArticles: [
    { text: "Cambria Style Magazine", link: "/cambria-style" },
    { text: "Cambria Style Blog", link: "/cambria-style/blog" },
    { text: "Cambria Collaborators", link: "/collaborators" },
  ],
  whyCambria: [
    { text: "The Cambria Difference", link: "/quartz-countertops/why-cambria" },
    { text: "All About Quartz", link: "/quartz-countertops" },
    { text: "Sustainability", link: "/quartz-countertops/why-cambria/sustainability" },
    { text: "Our Company", link: "/about-us" },
  ],
  commercial: [
    { text: "Cambria Commercial Resources", link: "/professionals/commercial" },
    { text: "Commercial Gallery", link: "/inspiration-gallery-commercial" },
    { text: "Order Professional Samples", link: "/professionals/samples" },
    { text: "Case Studies & Partnerships", link: "/professionals/case-studies" },
  ],
  whereToBuy: [
    { text: "Order a Sample", link: "https://shop.cambriausa.com/collections/samples.html" },
    { text: "Find a Professional", link: "/dealer-locator" },
  ],
};

export const DropdownPictureOptions = {
  ourProducts: {
    imageUrl:
      "https://s7d9.scene7.com//is/image/cambriacompanyllc/crop-windsor-brass-satin-ridge-kitchen-modern-001-23",
    imageLabel: "New Designs",
    imageLink: "/quartz-countertops/new-designs",
  },
  kitchensAndBaths: {
    imageUrl:
      "https://s7d9.scene7.com//is/image/cambriacompanyllc/crop-skara-brae-carrick-kitchen-eymeric-widing-cs24-002-22",
    imageLabel: "Kitchen & Bath Inspiration",
    imageLink: "/quartz-countertops/kitchens-baths",
  },
  uniqueInstalls: {
    imageUrl:
      "https://s7d9.scene7.com//is/image/cambriacompanyllc/crop-brittanicca-living-room-henke-dpdsm-cs16-004-17",
    imageLabel: "Fireplaces",
    imageLink: "/unique-installs/quartz-fireplaces",
  },
  planningAndCare: {
    imageUrl: "https://s7d9.scene7.com//is/image/cambriacompanyllc/crop-brittanicca-kitchen-lee-001-21",
    imageLabel: "What to Expect",
    imageLink: "/quartz-countertops/planning",
  },
  trendsAndArticles: {
    imageUrl: "https://s7d9.scene7.com//is/image/cambriacompanyllc/crop-brittanicca-gold-warm-entertaining",
    imageLabel: "Cambria Style Blog",
    imageLink: "/cambria-style/blog",
  },
  whyCambria: {
    imageUrl: "https://s7d9.scene7.com//is/image/cambriacompanyllc/crop-2-cambria-mine-a-drone-008-23",
    imageLabel: "The Cambria Difference",
    imageLink: "/quartz-countertops/why-cambria",
  },
  commercial: {
    imageUrl: "https://s7d9.scene7.com//is/image/cambriacompanyllc/crop-seacourt-salon-dodd-001-23",
    imageLabel: "Commercial Resources",
    imageLink: "/professionals/commercial/technical-resources",
  },
  whereToBuy: {
    imageUrl: "https://s7d9.scene7.com//is/image/cambriacompanyllc/crop-3x3-samples-006-23",
    imageLabel: "Order a Sample",
    imageLink: "https://shop.cambriausa.com/collections/samples.html",
  },
};