'use client'

import { supabase } from '@/lib/supabase'

export default function BookmarkList({ bookmarks }: any) {

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark: any) => (
        <div
          key={bookmark.id}
          className="flex justify-between items-center border p-3 rounded"
        >
          <div>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-blue-600 font-medium hover:underline"
            >
              {bookmark.title}
            </a>
          </div>
          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
