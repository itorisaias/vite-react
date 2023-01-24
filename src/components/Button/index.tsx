import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import * as S from "./styles";

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  minimal?: boolean;
  icon?: React.ReactNode;
  as?: React.ElementType;
} & ButtonTypes;

const Button: React.ForwardRefRenderFunction<
  S.WrapperProps,
  ButtonProps
> = (
  {
    children,
    icon,
    size = "medium",
    fullWidth = false,
    minimal = false,
    ...props
  },
  ref
) => {
  return (
    <S.Wrapper
      size={size}
      hasIcon={!!icon}
      fullWidth={fullWidth}
      minimal={minimal}
      ref={ref}
      {...props}
    >
      {!!icon && icon}
      {!!children && <span>{children}</span>}
    </S.Wrapper>
  );
};

export default forwardRef(Button)
