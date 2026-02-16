'use client'

import { supabase } from '@/lib/supabase'

export default function Home() {

const login = async () => {

await supabase.auth.signInWithOAuth({

provider: 'google',

options: {

redirectTo: `${window.location.origin}/dashboard`

}

})

}

return (

<div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-lg text-center">

<h1 className="text-2xl font-semibold text-white mb-6">
Smart Bookmark
</h1>

<button
onClick={login}
className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
>

Login with Google

</button>

</div>

</div>

)

}
