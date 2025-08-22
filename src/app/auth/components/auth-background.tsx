import React from "react";

export const AuthBackground: React.FC = () => {
  return (
    <>
      <img
        src={`${import.meta.env.BASE_URL}/assets/auth/bg.png`}
        className="w-full h-full object-cover absolute z-0"
        alt="Background"
      />
      <div className="fixed top-0 left-0 w-full h-full bg-white/60 dark:bg-black/60 backdrop-blur-xl z-10"></div>
    </>
  );
};

export default AuthBackground;
