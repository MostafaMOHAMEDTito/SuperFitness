type RobotProps = {
    className?: string;
};

export default function Robot({
    className = "",
}: RobotProps) {
    return <>
        {/* Robot Positioned Bottom-Right, Half Out */}
        <div className={className} >
            <img
                src="/assets/robot.png"
                alt="Robot"
                width={136}
                height={144}
                className="drop-shadow-[0_0_24px_#FF4100]" 
            />
            <button className="bg-main hover:bg-main-hover font-bold py-2 px-4 rounded-full shadow-[0_0_16px_#FF4100] text-white">
                Hey ask me
            </button>
        </div>
    </>
}
