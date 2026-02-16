export const dynamic = 'force-dynamic'

'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {

const router = useRouter()

const [user, setUser] = useState<any>(null)
const [bookmarks, setBookmarks] = useState<any[]>([])
const [title, setTitle] = useState('')
const [url, setUrl] = useState('')

useEffect(() => {
getUser()
fetchBookmarks()
}, [])

const getUser = async () => {
const { data } = await supabase.auth.getUser()
if (!data.user) router.push('/')
else setUser(data.user)
}

const fetchBookmarks = async () => {
const { data } = await supabase
.from('bookmarks')
.select('*')
.order('created_at', { ascending: false })

if (data) setBookmarks(data)
}

const addBookmark = async () => {

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
fetchBookmarks()

}

const deleteBookmark = async (id:string) => {

await supabase
.from('bookmarks')
.delete()
.eq('id', id)

fetchBookmarks()

}

useEffect(() => {

const channel = supabase
.channel('bookmarks')
.on(
'postgres_changes',
{ event: '*', schema: 'public', table: 'bookmarks' },
() => fetchBookmarks()
)
.subscribe()

return () => {
supabase.removeChannel(channel)
}

}, [])

const logout = async () => {
await supabase.auth.signOut()
router.push('/')
}

return (

<div className="min-h-screen bg-gray-100 flex justify-center items-center">

<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">

<div className="flex justify-between items-center mb-4">

<h1 className="text-2xl font-bold text-gray-800">
Smart Bookmarks
</h1>

<button
onClick={logout}
className="text-red-500 hover:text-red-700 font-medium"
>
Logout
</button>

</div>

<input
placeholder="Bookmark Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-2 w-full mb-2 rounded"
/>

<input
placeholder="Bookmark URL"
value={url}
onChange={(e)=>setUrl(e.target.value)}
className="border p-2 w-full mb-3 rounded"
/>

<button
onClick={addBookmark}
className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
>
Add Bookmark
</button>

<div className="mt-6">

{bookmarks.length === 0 && (

<p className="text-gray-500 text-center">
No bookmarks yet
</p>

)}

{bookmarks.map(bookmark=>(

<div
key={bookmark.id}
className="flex justify-between items-center border p-3 rounded mb-2 hover:bg-gray-50"
>

<a
href={bookmark.url}
target="_blank"
className="text-blue-600 hover:underline"
>
{bookmark.title}
</a>

<button
onClick={()=>deleteBookmark(bookmark.id)}
className="text-red-500 hover:text-red-700"
>
Delete
</button>

</div>

))}

</div>

</div>

</div>

)

}
