import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import * as S from "./styles";

export type TextFieldProps = {
  label?: string;
  labelFor?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  iconPosition?: "rigth" | "left";
  initialValue?: string;
  error?: string;
  register?: UseFormRegister<any>;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
  children,
  icon,
  register,
  disabled = false,
  error,
  label = "",
  labelFor = "",
  iconPosition = "left",
  ...props
}: TextFieldProps) => {
  return (
    <S.Wrapper disabled={disabled} hasError={!!error}>
      {!!label && <S.Label htmlFor={labelFor}>{label}</S.Label>}
      <S.InputWrapper>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        <S.Input
          type="text"
          iconPosition={iconPosition}
          disabled={disabled}
          aria-invalid={!!error}
          {...register?.(labelFor)}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error id={`invalid_input_${labelFor}`}>{error}</S.Error>}
    </S.Wrapper>
  );
};

export default TextField;
