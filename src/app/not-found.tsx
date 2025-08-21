import React from "react";
import { Link } from "react-router-dom";

// Props type
interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => (
  <div className="bg-muted/50 backdrop-blur-sm p-4 rounded-xl border border-muted hover:border-main transition-all duration-300">
    <div className="text-3xl font-bold text-main mb-1">{number}</div>
    <div className="text-muted-foreground">{label}</div>
  </div>
);

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted-foreground to-black text-muted flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-main animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full border-4 border-main animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full border-4 border-main"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full border-4 border-main animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="text-[200px] md:text-[280px] font-black leading-none bg-gradient-to-r from-main to-main-light bg-clip-text text-transparent">
          404
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          YOUR BODY CAN STAND ALMOST ANYTHING
        </h1>

        <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-10">
          It's your mind you have to convince. The page you're looking for has
          been moved or doesn't exist. Push past your limits and find your way
          back to your fitness journey.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
          <StatCard number="1200+" label="Active Members" />
          <StatCard number="12+" label="Expert Trainers" />
          <StatCard number="20+" label="Years Experience" />
          <StatCard number="45+" label="Fitness Classes" />
        </div>

        <Link
          to="/"
          className="inline-block bg-main hover:bg-main-dark text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-main/30"
        >
          RETURN TO HOME
        </Link>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground">
          <Link to="/classes" className="hover:text-main transition-colors">
            LIVE CLASSES
          </Link>
          <Link to="/trainers" className="hover:text-main transition-colors">
            PERSONAL TRAINERS
          </Link>
          <Link to="/online" className="hover:text-main transition-colors">
            ONLINE TRAINING
          </Link>
          <Link to="/programs" className="hover:text-main transition-colors">
            FITNESS PROGRAMS
          </Link>
          <Link to="/nutrition" className="hover:text-main transition-colors">
            NUTRITION PLANS
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <div className="absolute bottom-12 text-muted-foreground text-sm">
        © {new Date().getFullYear()} ELEVATE FITNESS. All rights reserved.
      </div>
    </div>
  );
};

export default NotFound;
