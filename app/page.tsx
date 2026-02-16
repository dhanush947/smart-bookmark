'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {

const router = useRouter()

useEffect(() => {

checkUser()

}, [])

const checkUser = async () => {

const { data } = await supabase.auth.getUser()

if (data.user) {

router.push('/dashboard')

}

}

const login = async () => {

await supabase.auth.signInWithOAuth({

provider: 'google',

options: {

redirectTo: 'http://localhost:3000/dashboard'

}

})

}

return (

<div className="flex justify-center items-center h-screen">

<button
onClick={login}
className="bg-black text-white px-6 py-3 rounded"
>

Login with Google

</button>

</div>

)

}
