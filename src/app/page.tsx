'use client';
import Appbar from '@/components/Appbar'
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useState } from 'react';
import { BsArrowLeftShort, BsSearch, BsChevronDown } from 'react-icons/bs';
import { AiFillEnvironment } from 'react-icons/ai';
import { RiAccountCircleFill, RiDashboardFill, RiLogoutCircleFill } from 'react-icons/ri'

export default function Home() {

    const {data:session, update} = useSession()

    async function updateSession() {
      // if(session) session.user.accessToken = "aaaa";
      await update({
       ...session,
       user:{
        ...session?.user,
        accessToken:"d"
       }
      })
    }


    return (
      <Layout>
        <h2 className="text-xl font-bold mb-4">Home Page</h2>
        {/* Tambahkan konten profil lainnya di sini */}
      </Layout>
      // <div className="flex flex-wrap gap-5">
      //   <Appbar/>
      //   <button className="border bg-violet-600 text-white rounded px-4 py-2"
      //   onClick={updateSession}
      //   >Update Session</button>
      //   <button className="border bg-violet-600 text-white rounded px-4 py-2"
      //   onClick={()=>console.log({session})}
      //   >Log Session</button>
      // </div>
    )
  
}
