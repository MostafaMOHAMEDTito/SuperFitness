
import AuthBackground from './components/auth-background';
import AuthContent from './components/auth-content';

export default function AuthLayout() {
  return (
    <div className="relative lg:overflow-hidden max-h-screen">
      <AuthBackground />
      <AuthContent />
    </div>
  );
}
