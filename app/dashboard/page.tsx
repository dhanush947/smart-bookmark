'use client'

export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'
import Loader from '@/components/Loader'

import { motion } from 'framer-motion'

import { FiEdit, FiTrash } from 'react-icons/fi'


export default function Dashboard() {


const router = useRouter()

const [user, setUser] = useState<any>(null)

const [bookmarks, setBookmarks] = useState<any[]>([])

const [loading, setLoading] = useState(false)

const [title, setTitle] = useState('')

const [url, setUrl] = useState('')

const [search, setSearch] = useState('')

const [editId, setEditId] = useState<string | null>(null)


useEffect(()=>{

getUser()
fetchBookmarks()

},[])



const getUser = async()=>{

const { data } = await supabase.auth.getUser()

if(!data.user) router.push('/')

else setUser(data.user)

}



const fetchBookmarks = async()=>{

setLoading(true)

const { data } = await supabase

.from('bookmarks')

.select('*')

.order('created_at',{ascending:false})

setBookmarks(data || [])

setLoading(false)

}



const addBookmark = async()=>{

if(!title || !url){

toast.error("Enter title and URL")

return

}



await supabase.from('bookmarks').insert([

{

title,

url,

user_id:user.id

}

])



toast.success("Bookmark added")

setTitle('')
setUrl('')

fetchBookmarks()

}



const deleteBookmark = async(id:string)=>{

await supabase

.from('bookmarks')

.delete()

.eq('id',id)

toast.success("Deleted")

fetchBookmarks()

}



const startEdit = (bookmark:any)=>{

setEditId(bookmark.id)

setTitle(bookmark.title)

setUrl(bookmark.url)

}



const updateBookmark = async()=>{

await supabase

.from('bookmarks')

.update({title,url})

.eq('id',editId)



toast.success("Updated")

setEditId(null)

setTitle('')
setUrl('')

fetchBookmarks()

}



const logout = async()=>{

await supabase.auth.signOut()

router.push('/')

}



const filtered = bookmarks.filter(b=>

title.toLowerCase().includes(search.toLowerCase())

)



return(



<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">


{/* Navbar */}



<div className="flex justify-between p-6 border-b border-gray-800">

<h1 className="text-xl font-semibold">

Smart Bookmark

</h1>


<button

onClick={logout}

className="text-red-400"

>

Logout

</button>

</div>



<div className="max-w-2xl mx-auto mt-10 px-4">



{/* Search */}



<input

placeholder="Search..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full p-3 mb-4 bg-black/40 border border-gray-700 rounded"

/>



{/* Add / Edit */}



<div className="bg-white/5 p-4 rounded-xl mb-6">

<input

placeholder="Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="w-full p-2 mb-2 bg-black border border-gray-700 rounded"

/>


<input

placeholder="URL"

value={url}

onChange={(e)=>setUrl(e.target.value)}

className="w-full p-2 mb-3 bg-black border border-gray-700 rounded"

/>



<button

onClick={editId ? updateBookmark : addBookmark}

className="bg-blue-600 px-4 py-2 rounded"

>


{editId ? "Update" : "Add"}

</button>



</div>



{/* Loader */}



{loading && <Loader/>}



{/* List */}



{filtered.map(bookmark=>(



<motion.div

key={bookmark.id}

initial={{opacity:0,y:10}}

animate={{opacity:1,y:0}}

className="bg-white/5 p-4 mb-3 rounded flex justify-between items-center"

>



<div>



<a

href={bookmark.url}

target="_blank"

className="text-blue-400"

>



{bookmark.title}

</a>



<img

src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}

className="inline ml-2"

/>



</div>



<div className="flex gap-3">



<button

onClick={()=>startEdit(bookmark)}

>

<FiEdit/>

</button>



<button

onClick={()=>deleteBookmark(bookmark.id)}

>

<FiTrash/>

</button>



</div>



</motion.div>



))}



</div>



</div>

)

}
