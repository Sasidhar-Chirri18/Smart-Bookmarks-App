import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import AddBookmarkForm from '@/components/AddBookmarkForm'
import BookmarkList from '@/components/BookmarkList'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar user={user} />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <AddBookmarkForm user={user} />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl leading-6 font-bold text-white mb-4">Your Bookmarks</h3>
              <BookmarkList initialBookmarks={bookmarks || []} user={user} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
