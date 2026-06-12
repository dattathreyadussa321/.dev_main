declare module "@splinetool/react-spline" {
  import * as React from "react";

  interface SplineProps {
    scene: string;
    style?: React.CSSProperties;
    className?: string;
    onLoad?: (spline: unknown) => void;
    onError?: () => void;
  }

  const Spline: React.ComponentType<SplineProps>;
  export default Spline;
}
