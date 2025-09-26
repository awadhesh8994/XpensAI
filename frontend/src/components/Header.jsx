import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function Header() {
    const {user, logoutUser} = useAuthContext();
    useNavigate();
    const displayName = user?.username || "Guest";
    const initial = displayName?.charAt(0)?.toUpperCase() || "G";
    
    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/60">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/30 to-transparent"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    {/* Brand */}
                    <Link to={"/"} className="flex items-center gap-3 min-w-0 group">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-white grid place-items-center shadow-lg group-hover:shadow-xl group-hover:shadow-indigo-500/30 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                                <span className="text-base font-black drop-shadow-sm">₹</span>
                            </div>
                            {/* Animated ring */}
                            <div className="absolute inset-0 rounded-2xl ring-2 ring-indigo-400/20 group-hover:ring-indigo-400/40 group-hover:scale-110 transition-all duration-300"></div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-indigo-400/10 blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="min-w-0 leading-tight">
                            <div className="text-lg sm:text-xl font-black text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 tracking-tight">
                                XpensaAI
                            </div>
                            <div className="hidden sm:block text-xs text-gray-500 font-semibold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                Track smarter, spend better
                            </div>
                        </div>
                    </Link>

                    {/* Menu Links */}
                    <nav className="hidden md:flex items-center gap-1">
                        {[
                            { to: "/dashboard", text: "Dashboard" },
                            { to: "#", text: "Reports" },
                            { to: "#", text: "Categories" },
                            { to: "#", text: "Settings" }
                        ].map((item, index) => (
                            <Link
                                key={item.text}
                                to={item.to}
                                className="relative px-4 py-3 rounded-2xl text-sm font-bold text-gray-600 hover:text-indigo-700 transition-all duration-300 group overflow-hidden"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Background hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100/50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-2xl"></div>
                                
                                {/* Text */}
                                <span className="relative z-10">{item.text}</span>
                                
                                {/* Bottom accent line */}
                                <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></div>
                                
                                {/* Subtle glow */}
                                <div className="absolute inset-0 bg-indigo-400/5 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            </Link>
                        ))}
                    </nav>

                    {/* Auth */}
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link
                                to={"/login"}
                                className="relative px-6 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:text-gray-900 transition-all duration-300 group overflow-hidden"
                            >
                                {/* Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 scale-95 group-hover:scale-100 transition-transform duration-300 rounded-2xl"></div>
                                
                                {/* Border */}
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-200/80 group-hover:ring-gray-300/80 transition-colors duration-300"></div>
                                
                                <span className="relative z-10">Login</span>
                            </Link>
                            
                            <Link
                                to={"/signup"}
                                className="relative px-6 py-3 rounded-2xl text-sm font-black text-white transition-all duration-300 group overflow-hidden hover:scale-105"
                            >
                                {/* Gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 group-hover:from-indigo-700 group-hover:via-indigo-700 group-hover:to-indigo-800 transition-all duration-300 rounded-2xl"></div>
                                
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-2xl"></div>
                                
                                {/* Shadow */}
                                <div className="absolute inset-0 shadow-lg group-hover:shadow-xl group-hover:shadow-indigo-500/30 transition-all duration-300 rounded-2xl"></div>
                                
                                <span className="relative z-10">Sign Up</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            {/* User Profile */}
                            <div className="relative group">
                                <div className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-gray-50 via-white to-gray-50 px-4 py-2.5 shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-200/60 group-hover:border-gray-300/60">
                                    {/* Avatar with animated ring */}
                                    <div className="relative">
                                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-white grid place-items-center text-xs font-black shadow-sm">
                                            {initial}
                                        </div>
                                        {/* Rotating ring */}
                                        <div className="absolute inset-0 rounded-full ring-2 ring-indigo-300/30 group-hover:ring-indigo-400/50 group-hover:scale-110 transition-all duration-300"></div>
                                    </div>
                                    
                                    <span className="text-sm font-bold text-gray-800 max-w-[10rem] truncate">
                                        {displayName}
                                    </span>
                                    
                                    {/* Status indicator */}
                                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm animate-pulse"></div>
                                </div>
                            </div>
                            
                            {/* Logout Button */}
                            <Link
                                to={"#"}
                                onClick={(e) => {
                                    logoutUser();
                                }}
                                className="relative px-5 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-300 group overflow-hidden hover:scale-105"
                            >
                                {/* Gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-600 to-red-700 group-hover:from-red-700 group-hover:via-red-700 group-hover:to-red-800 transition-all duration-300 rounded-2xl"></div>
                                
                                {/* Shadow */}
                                <div className="absolute inset-0 shadow-lg group-hover:shadow-xl group-hover:shadow-red-500/30 transition-all duration-300 rounded-2xl"></div>
                                
                                {/* Pulse effect on hover */}
                                <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 group-hover:animate-ping rounded-2xl"></div>
                                
                                <span className="relative z-10">Logout</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
        </header>
    );
}

export default Header;