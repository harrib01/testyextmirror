import React from 'react';

export type ComponentDefinitions = Record<string, React.CSSProperties | {'&:hover': React.CSSProperties}>;

export type ButtonConfig = React.CSSProperties & {variants: Record<string, React.CSSProperties | {'&:hover': React.CSSProperties} | {'&:focus': React.CSSProperties} | {'&:active': React.CSSProperties} | {'&:focus,&:hover': React.CSSProperties}>}

export type LinkConfig = React.CSSProperties & {variants: Record<string, React.CSSProperties | {'&:hover': React.CSSProperties} | {'&:focus': React.CSSProperties} | {'&:active': React.CSSProperties} | {'&:focus,&:hover': React.CSSProperties} | {'&:active,&:hover': React.CSSProperties} | {'&:active,&:focus,&:hover': React.CSSProperties} | {[key in ScreenSizeQuerys]: React.CSSProperties}>}

type ScreenSizeQuerys = '@screen sm'|'@screen md'|'@screen lg'|'@screen xl'|'@screen 2xl';

export type HeadingConfig = React.CSSProperties & {variants: Record<string, React.CSSProperties | {[key in ScreenSizeQuerys]: React.CSSProperties}>}
