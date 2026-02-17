'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface Bookmark {
    id: string
    title: string
    url: string
    created_at: string
}

export default function BookmarkList({ initialBookmarks, user }: { initialBookmarks: Bookmark[], user: any }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        setBookmarks(initialBookmarks)
    }, [initialBookmarks])

    useEffect(() => {
        const channel = supabase
            .channel('realtime bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    console.log('Change received!', payload)
                    // Simply refresh the router to re-fetch data server-side
                    // Or update local state for faster feedback.
                    // Let's update local state to be truly "real-time" without full page reload feels.

                    if (payload.eventType === 'INSERT') {
                        setBookmarks((current) => [payload.new as Bookmark, ...current])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((current) => current.filter((b) => b.id !== payload.old.id))
                    } else if (payload.eventType === 'UPDATE') {
                        setBookmarks((current) => current.map((b) => b.id === payload.new.id ? payload.new as Bookmark : b))
                    }
                    router.refresh()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, router, user.id])

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from('bookmarks').delete().eq('id', id)
        if (error) {
            console.error('Error deleting bookmark:', error)
            alert('Failed to delete bookmark')
        }
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {bookmarks.length === 0 ? (
                    <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No bookmarks yet. Add one!</li>
                ) : (
                    bookmarks.map((bookmark) => (
                        <li key={bookmark.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-indigo-600 truncate hover:underline">
                                        {bookmark.title}
                                    </a>
                                    <p className="mt-1 flex items-center text-sm text-gray-500 truncate">
                                        {bookmark.url}
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <button
                                        onClick={() => handleDelete(bookmark.id)}
                                        className="font-medium text-red-600 hover:text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
