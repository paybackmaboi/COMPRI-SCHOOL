import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Monitor, UserPlus, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const result = await login(loginEmail, loginPassword);
    
    if (result.success) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (registerPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const result = await register(registerEmail, registerPassword, registerName);
    
    if (result.success) {
      setSuccess('Registration successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setError(result.error || 'Registration failed');
    }
    
    setIsLoading(false);
  };

  const PasswordRequirements = () => (
    <div className="mt-2 space-y-1">
      <p className="text-xs text-blue-200/80 font-medium">Password requirements:</p>
      <ul className="text-xs space-y-1">
        <li className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span className="text-blue-100/90">At least 4 characters long</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span className="text-blue-100/90">Numbers or letters allowed</span>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-3deg); }
        }

        @keyframes float-device {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.02); }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }

        .animate-float-device {
          animation: float-device 12s ease-in-out infinite;
        }
      `}</style>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Device Background Images */}
        <div className="absolute top-20 left-10 opacity-20 animate-float-slow">
          <div className="w-48 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-700">
            {/* Laptop Design */}
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-1">
              {/* Laptop Screen */}
              <div className="w-full h-full bg-white rounded-sm opacity-95 shadow-inner">
                {/* Laptop Header/Title Bar */}
                <div className="w-full h-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-t-sm flex items-center px-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                {/* Laptop Content */}
                <div className="p-3 space-y-2">
                  <div className="w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                  <div className="w-5/6 h-1 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-1 bg-gray-300 rounded"></div>
                  <div className="w-full h-1 bg-gray-300 rounded"></div>
                  <div className="w-4/5 h-1 bg-gray-300 rounded"></div>
                  {/* Mini charts/graphs */}
                  <div className="flex gap-1 mt-2">
                    <div className="w-3 h-8 bg-blue-400 rounded-sm"></div>
                    <div className="w-3 h-12 bg-green-400 rounded-sm"></div>
                    <div className="w-3 h-6 bg-yellow-400 rounded-sm"></div>
                    <div className="w-3 h-10 bg-purple-400 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-32 right-20 opacity-25 animate-float-reverse">
          <div className="w-24 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl transform -rotate-12 hover:rotate-6 transition-transform duration-700">
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-0.5">
              {/* Smartphone Screen */}
              <div className="w-full h-full bg-white rounded-lg opacity-95 shadow-inner">
                {/* Phone Status Bar */}
                <div className="w-full h-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-t-lg flex items-center justify-between px-2">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  <div className="w-3 h-2 bg-white/60 rounded-sm"></div>
                </div>
                {/* Phone Content - Mobile App Interface */}
                <div className="p-2 space-y-2">
                  {/* App Icons Row */}
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  </div>
                  {/* Text Lines */}
                  <div className="space-y-1">
                    <div className="w-full h-0.5 bg-gray-300 rounded"></div>
                    <div className="w-4/5 h-0.5 bg-gray-300 rounded"></div>
                    <div className="w-full h-0.5 bg-gray-300 rounded"></div>
                    <div className="w-3/5 h-0.5 bg-gray-300 rounded"></div>
                  </div>
                  {/* Mini Graph */}
                  <div className="flex gap-0.5 mt-1">
                    <div className="w-1 h-4 bg-cyan-400 rounded-sm"></div>
                    <div className="w-1 h-6 bg-blue-400 rounded-sm"></div>
                    <div className="w-1 h-3 bg-green-400 rounded-sm"></div>
                    <div className="w-1 h-5 bg-purple-400 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 left-20 opacity-15 animate-float-slow">
          <div className="w-40 h-28 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-lg transform rotate-6 hover:-rotate-3 transition-transform duration-700">
            {/* Tablet Design */}
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-blue-900 rounded-lg p-1">
              <div className="w-full h-full bg-white rounded-sm opacity-90 shadow-inner">
                {/* Tablet Header */}
                <div className="w-full h-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-t-sm flex items-center px-1.5">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                {/* Tablet Content - Dashboard Interface */}
                <div className="p-2 space-y-1.5">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center">
                    <div className="w-2 h-1 bg-green-500 rounded"></div>
                    <div className="w-8 h-0.5 bg-gray-300 rounded"></div>
                  </div>
                  {/* Dashboard Cards */}
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-full h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm"></div>
                    <div className="w-full h-3 bg-gradient-to-br from-green-500 to-green-600 rounded-sm"></div>
                  </div>
                  {/* Chart Area */}
                  <div className="w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-sm"></div>
                  {/* Data Rows */}
                  <div className="space-y-0.5">
                    <div className="w-full h-0.5 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-0.5 bg-gray-300 rounded"></div>
                    <div className="w-5/6 h-0.5 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Floating Devices - Smartwatch */}
        <div className="absolute top-1/3 right-1/3 opacity-10 animate-float-device">
          <div className="w-36 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl transform rotate-3 hover:rotate-12 transition-transform duration-700">
            <div className="w-full h-full bg-gradient-to-br from-green-900 to-teal-900 rounded-lg p-0.5">
              {/* Smartwatch Design */}
              <div className="w-full h-full bg-white rounded-md opacity-95 shadow-inner">
                {/* Watch Header */}
                <div className="w-full h-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-t-md flex items-center justify-center">
                  <div className="w-6 h-0.5 bg-white/60 rounded-sm"></div>
                </div>
                {/* Watch Face */}
                <div className="p-1.5 space-y-1">
                  {/* Time Display */}
                  <div className="text-center">
                    <div className="text-[3px] font-bold text-gray-800">12:45</div>
                    <div className="text-[2px] text-gray-600">MON DEC 25</div>
                  </div>
                  {/* Heart Rate */}
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="text-[2px] text-gray-600">♥ 72 BPM</div>
                  </div>
                  {/* Mini Progress Ring */}
                  <div className="relative w-3 h-3 mx-auto">
                    <div className="absolute inset-0 border-2 border-gray-300 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-full" style={{clipPath: 'polygon(50% 0%, 50% 100%, 100% 50%)'}}></div>
                  </div>
                  {/* Steps */}
                  <div className="text-center">
                    <div className="text-[2px] font-bold text-gray-800">8,547</div>
                    <div className="text-[1px] text-gray-600">STEPS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sparkle Effects */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-40 delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce opacity-35 delay-2000"></div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Moving Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-blue-500/10 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8 relative overflow-hidden">
            {/* Card Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-2xl"></div>
            {/* Logo + Title */}
            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Monitor className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-3">
            System Monitor AI
          </h1>
              <p className="text-sm sm:text-base text-blue-100/80 mt-2">
            Secure access to your system analytics
          </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">System Online</span>
              </div>
        </div>

            {/* Error/Success Messages */}
            {error && (
              <Alert className="mb-6 border-red-300/50 bg-red-500/10 backdrop-blur-sm">
                <AlertCircle className="h-4 w-4 text-red-300" />
                <AlertDescription className="text-red-100">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-300/50 bg-green-500/10 backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <AlertDescription className="text-green-100">{success}</AlertDescription>
              </Alert>
            )}

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-sm border border-white/10 p-1">
                <TabsTrigger
                  value="login"
                  className="flex items-center gap-2 data-[state=active]:bg-white/15 data-[state=active]:text-white transition-all duration-300"
                >
                  <Shield className="w-4 h-4" />
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="flex items-center gap-2 data-[state=active]:bg-white/15 data-[state=active]:text-white transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-6 mt-8 relative z-10">
                <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
                    <Label htmlFor="loginEmail" className="text-blue-100/90 font-medium">Email Address</Label>
                    <div className="relative group">
            <Input
                        id="loginEmail"
              type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="admin@system.com"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:bg-white/15 transition-all duration-300 h-12 px-4"
              required
                        disabled={isLoading}
            />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
          </div>

          <div className="space-y-2">
                    <Label htmlFor="loginPassword" className="text-blue-100/90 font-medium">Password</Label>
                    <div className="relative group">
            <Input
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:bg-white/15 transition-all duration-300 h-12 px-4 pr-12"
              required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/70 hover:text-white transition-colors duration-200"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
          </div>

          <Button
            type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
            Secure Login
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-6 mt-8 relative z-10">
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="registerName" className="text-blue-100/90 font-medium">Full Name</Label>
                    <div className="relative group">
                      <Input
                        id="registerName"
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:bg-white/15 transition-all duration-300 h-12 px-4"
                        required
                        disabled={isLoading}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail" className="text-blue-100/90 font-medium">Email Address</Label>
                    <div className="relative group">
                      <Input
                        id="registerEmail"
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="admin@system.com"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:bg-white/15 transition-all duration-300 h-12 px-4"
                        required
                        disabled={isLoading}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerPassword" className="text-blue-100/90 font-medium">Password</Label>
                    <div className="relative group">
                      <Input
                        id="registerPassword"
                        type={showPassword ? "text" : "password"}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:bg-white/15 transition-all duration-300 h-12 px-4 pr-12"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/70 hover:text-white transition-colors duration-200"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <div className="relative z-10">
                      <PasswordRequirements />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-blue-100/90 font-medium">Confirm Password</Label>
                    <div className="relative group">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:bg-white/15 transition-all duration-300 h-12 px-4 pr-12"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/70 hover:text-white transition-colors duration-200"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 mr-2" />
                        Create Account
                      </>
                    )}
          </Button>
        </form>
              </TabsContent>
            </Tabs>

        {/* Footer */}
            <div className="mt-8 text-center relative z-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-300 font-medium">256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-300" />
                  <span className="text-xs text-blue-300 font-medium">Enterprise Security</span>
                </div>
              </div>
              <p className="text-xs text-blue-200/70">
                Protected by advanced encryption & secure authentication
              </p>
              <p className="text-xs text-blue-300/50 mt-2">
                © 2024 System Monitor AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
