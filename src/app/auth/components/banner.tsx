export default function BannerAuth() {
  return (
    <div className="relative w-full md:w-1/2 bg-[#242424]/20 border-b-4 md:border-b-0 md:border-r-4 border-[#ff4100]/20 flex flex-col justify-center items-center z-50">
      {/* Logo img */}
      <img
        src={`${import.meta.env.BASE_URL}/assets/auth/fit1.png`}
        alt="Logo"
        className="w-32 md:w-fit mb-4 md:mb-6"
      />

      {/* Character img */}
      <img
        src={`${import.meta.env.BASE_URL}/assets/auth/dannble.png`}
        alt="People"
        className="w-4/5 mb-4 md:mb-6"
      />
    </div>
  );
}
