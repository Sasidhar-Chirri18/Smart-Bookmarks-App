'use client'

import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
    const handleLogin = async () => {
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent select_account',
                },
            },
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0f172a] text-white">
            <div className="w-full max-w-sm p-4 text-center">
                {/* Logo Section */}
                <div className="mb-8 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 ring-1 ring-blue-500/50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-500"
                        >
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                    </div>
                </div>

                {/* Title Section */}
                <div className="mb-10 space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-blue-600">
                        Smart Bookmarks App
                    </h1>
                    <p className="text-slate-400">
                        Keep your important links organized and accessible anytime.
                    </p>
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-4 font-medium text-slate-900 shadow-lg transition-all hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Sign in with Google
                </button>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0f172a] px-2 text-slate-600">
                            Google Auth Only
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-xs text-slate-500">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}
