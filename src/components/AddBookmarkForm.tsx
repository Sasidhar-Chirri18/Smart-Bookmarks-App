'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AddBookmarkForm({ user }: { user: any }) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMsg('')

        try {
            if (!user) {
                setMsg('User not authenticated')
                return
            }

            const { error } = await supabase.from('bookmarks').insert({
                title,
                url,
                user_id: user.id,
            })

            if (error) {
                setMsg('Error adding bookmark')
                console.error(error)
            } else {
                setTitle('')
                setUrl('')
                setMsg('Bookmark added!')
                // Router refresh is handled by Realtime in the list component, 
                // but we can also refresh here just in case or for optimistic UI.
                // For this app, we rely on Realtime for the list update, 
                // but clearing form is important.
            }
        } catch (err) {
            console.error(err)
            setMsg('Unexpected error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 shadow-xl sm:rounded-2xl p-8 mb-6">
            <h3 className="text-2xl leading-6 font-bold text-white mb-4">Add New Bookmark</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-lg font-medium text-slate-200">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="mt-1 focus:ring-blue-800 focus:border-blue-800 block w-full shadow-sm sm:text-sm border-white/10 rounded-xl p-3 bg-slate-900/50 text-white placeholder-slate-500"
                        placeholder="My Cool Bookmark"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url" className="block text-lg font-medium text-slate-200">
                        URL
                    </label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        required
                        className="mt-1 focus:ring-blue-800 focus:border-blue-800 block w-full shadow-sm sm:text-sm border-white/10 rounded-xl p-3 bg-slate-900/50 text-white placeholder-slate-500"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-lg text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-700 disabled:text-slate-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {loading ? 'Adding...' : 'Add Bookmark'}
                    </button>
                </div>
                {msg && <p className={`text-sm ${msg.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>{msg}</p>}
            </form>
        </div>
    )
}
