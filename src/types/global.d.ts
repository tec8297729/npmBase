declare module '*.css';
declare module '*.less' {
  const content: any;
  export default content;
}
declare module '*.scss' {
  const content: any;
  export default content;
}
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';

// declare module 'react-redux' {
//   interface connect {
//     <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
//       mapStateToProps: null | undefined,
//       mapDispatchToProps: (dispatch: Dispatch) => TDispatchProps,
//     ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;

//     <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
//       mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
//       mapDispatchToProps: (dispatch: Dispatch) => TDispatchProps,
//     ): InferableComponentEnhancerWithProps<
//       TStateProps & TDispatchProps,
//       TOwnProps
//     >;
//   }
// }
