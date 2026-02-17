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
        <div className="bg-white shadow sm:rounded-lg p-6 mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Bookmark</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="My Cool Bookmark"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                        URL
                    </label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                    >
                        {loading ? 'Adding...' : 'Add Bookmark'}
                    </button>
                </div>
                {msg && <p className={`text-sm ${msg.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{msg}</p>}
            </form>
        </div>
    )
}
