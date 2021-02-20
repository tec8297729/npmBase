declare module "*.css";
declare module "*.less" {
  const content: any;
  export default content;
}
declare module "*.scss" {
  const content: any;
  export default content;
}
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";
