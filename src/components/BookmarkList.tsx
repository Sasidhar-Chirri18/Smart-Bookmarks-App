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
        if (!confirm('Are you sure you want to delete this bookmark?')) return
        const { error } = await supabase.from('bookmarks').delete().eq('id', id)
        if (error) {
            console.error('Error deleting bookmark:', error)
            alert('Failed to delete bookmark')
        }
    }

    return (
        <div className="space-y-4">
            {bookmarks.length === 0 ? (
                <div className="text-center py-10 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
                    <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-white">No bookmarks</h3>
                    <p className="mt-1 text-sm text-slate-400">Get started by creating a new bookmark.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {bookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="relative group bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-2xl shadow-lg hover:shadow-xl hover:bg-slate-800/50 transition-all">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="rounded-lg inline-flex p-3 bg-blue-900/20 text-blue-400 ring-1 ring-white/10">
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            handleDelete(bookmark.id)
                                        }}
                                        className="text-slate-500 hover:text-red-400 transition-colors relative z-10"
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">
                                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none text-white group-hover:text-blue-400 transition-colors">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {bookmark.title}
                                        </a>
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-400 truncate pr-6">
                                        {bookmark.url}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
