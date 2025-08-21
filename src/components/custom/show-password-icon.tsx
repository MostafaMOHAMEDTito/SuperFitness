import type { Dispatch, SetStateAction } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export type ShowPasswordType = {
    password: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
};
  
export default function ShowPasswordIcon ({
    isShow,
    setShow,
    field,
  }: {
    isShow: boolean;
    setShow: Dispatch<SetStateAction<ShowPasswordType>>;
    field: string;
  }) {
    return (
      <>
        {!isShow ? (
          <FaRegEye
            onClick={() => {
              setShow((prev) => {
                return { ...prev, [field]: true };
              });
            }}
            className="absolute end-5 top-5"
          />
        ) : (
          <FaRegEyeSlash
            onClick={() => {
              setShow((prev) => {
                return { ...prev, [field]: false };
              });
            }}
            className="absolute end-5 top-5"
          />
        )}
      </>
    );
  };