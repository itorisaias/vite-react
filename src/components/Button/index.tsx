import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import * as S from './styles';

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  as?: React.ElementType;
} & ButtonTypes;

export const Button = ({
  children,
  icon,
  size = 'medium',
  ...props
}: ButtonProps) => {
  return (
    <S.Wapper size={size} hasIcon={!!icon} {...props}>
      {!!icon && icon}
      {!!children && <span>{children}</span>}
    </S.Wapper>
  );
};

export default Button;
