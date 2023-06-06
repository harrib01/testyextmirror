//@ts-check

const { styleguidePlugin, fontSizes} = require('./tailwindPlugin.cjs');

/** @type {import('tailwindcss/types/config').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./node_modules/@yext/search-ui-react/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Montserrat','Helvetica','sans-serif','system'",
        secondary: "'Roboto','Helvetica','sans-serif','system'",
      },
      colors: {
        "text": "black",
        "brand-primary": "#C59617",
        "brand-secondary": "#0C5ECB",
        "brand-gray": {
          100: "#EFEFEF",
          200: "#999999",
          300: "#4C4C4C",
          400: "#F7F7F7",
        }
      },
      /** @type {(theme: any) => import('./tailwind').ButtonConfig} */
      buttons: theme => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 12px 6px',
        fontWeight: theme('fontWeight.medium'),
        textTransform: 'uppercase',
        fontSize: '12px',
        lineHeight: '21px',
        variants: {
          primary: {
            backgroundColor: theme('colors.brand-primary'),
            color: "white",
            border: `2px solid ${theme('colors.brand-primary')}`,
            "&:focus,&:hover": {
              backgroundColor: "white",
              color: theme('colors.brand-primary'),
            }
          },
          primaryInv: {
            backgroundColor: "white",
            color: theme('colors.brand-primary'),
            border: `2px solid ${theme('colors.brand-primary')}`,
            '&:focus,&:hover': {
              backgroundColor: theme('colors.brand-primary'),
              color: 'white',
            }
          },
          secondary: {
            backgroundColor: "black",
            color: "white",
            border: "2px solid black",
            "&:focus,&:hover": {
              backgroundColor: "white",
              color: "black",
            }
          },
          secondaryInv: {
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            "&:focus,&:hover": {
              backgroundColor: "black",
              color: "white",
            }
          },
        }
      }),
      /** @type {(theme: any) => import('./tailwind').LinkConfig} */
      links: ({ theme }) => ({
        variants: {
          primary: {
            fontSize: "14px",
            lineHeight: "17px",
            textTransform: "uppercase",
            fontWeight: theme('fontWeight.medium'),
            color: theme('colors.brand-primary'),
            "&:active,&:focus,&:hover": {
              textDecoration: "underline",
            }
          },
          header: {
            color: 'black',
            fontSize: "20px",
            lineHeight: "15px",
            textTransform: "uppercase",
            fontWeight: theme('fontWeight.medium'),
            "&:focus,&:hover": {
              color: 'black',
            },
            "@screen lg": {
              fontSize: '12px',
              lineHeight: '15px',
            }
          },
          headerInv: {
            color: "white",
            fontSize: "20px",
            lineHeight: "15px",
            textTransform: "uppercase",
            fontWeight: theme('fontWeight.medium'),
            "&:focus,&:hover": {
              color: theme('colors.brand-primary'),
            },
            "@screen sm": {
              fontSize: '12px',
              lineHeight: '15px',
            }
          },
          footer: {
            color:  theme('colors.brand-primary'),
            fontSize: "14px",
            lineHeight: "17px",
            textTransform: "uppercase",
            fontWeight: theme('fontWeight.medium'),
            textDecoration: "underline",
            "&:focus,&:hover": {
              textDecoration: "none",
            },
            "@screen sm": {
              color: theme('colors.brand-primary'),
              fontSize: '12px',
              lineHeight: '20px',
            }
          },
          footerSecondary: {
            color: "white",
            fontSize: "12px",
            lineHeight: "18px",
            textTransform: "capitalize",
            fontFamily: theme('fontFamily.secondary'),
            fontWeight: theme('fontWeight.light'),
            "&:focus,&:hover": {
              textDecoration: "underline",
            },
          },
          breadcrumb: {
            color: theme('colors.brand-primary'),
            fontSize: "14px",
            lineHeight: "22px",
            textTransform: "capitalize",
            textDecoration: "underline",
            fontFamily: theme('fontFamily.secondary'),
            fontWeight: theme('fontWeight.light'),
            "&:active,&:focus,&:hover": {
              textDecoration: "none",
            },
            "&:focus": {
              fontWeight: theme('fontWeight.medium'),
            },
            "&:active": {
              color: "black",
            }
          },
          dir: {
            color: theme('colors.brand-primary'),
            fontSize: "16px",
            lineHeight: "24px",
            textTransform: "capitalize",
            textDecoration: "underline",
            fontFamily: theme('fontFamily.secondary'),
            fontWeight: theme('fontWeight.light'),
            "&:active,&:hover": {
              textDecoration: "none",
              fontWeight: theme('fontWeight.normal'),
            },
          },
          underline: {
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none"
            }
          },
          underlineInverse: {
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline"
            }
          }
        }
      }),
      /** @type {(theme: any) => import('./tailwind').HeadingConfig} */
      headings: ({ theme }) => ({
        variants: {
          sub: {
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: '500'
          },
          head: {
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: '100',
            '@screen sm': {
              fontSize: '26px',
              lineHeight: '32px',
            }
          },
          lead: {
            fontSize: '28px',
            lineHeight: '34px',
            fontWeight: '100',
            '@screen sm': {
              fontSize: '32px',
              lineHeight: '39px',
            }
          },
          locator: {
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: '100',
            '@screen sm': {
              fontSize: '32px',
              lineHeight: '39px',
            }
          },
          hours: {
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: '300',
          }
        }
      }),
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "2rem",
          xl: "3rem",
        },
      },
      fontWeight: {
        "bold": 700,
        "semibold": 600,
        "medium": 500,
        "normal": 400,
        "light": 300,
        "thin": 100
      },
      boxShadow: {
        "brand-shadow": "0 -1px 0 0 #CCC inset",
      },
      backgroundImage: {
        "location-hero": "url('/src/assets/images/heroImage.png')",
      },
    },
  },
  plugins: [
    styleguidePlugin(),
    fontSizes(),
  ],
};
