'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BookmarkForm({ user }: any) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBookmark = async (e: any) => {
    e.preventDefault()

    if (!title || !url) return

    await supabase.from('bookmarks').insert([
      {
        title,
        url,
        user_id: user.id
      }
    ])

    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBookmark} className="space-y-3 mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Bookmark
      </button>
    </form>
  )
}
