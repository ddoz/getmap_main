import React from 'react';
import Link from 'next/link';
import SigninButton from './SigninButton';

const Appbar = () => {
    return (
        <header className='flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow'>
            <Link href={"/"} className='transition-colors hover:text-blue-500'>Home Page</Link>
            <Link href={"/UserPost"} className='transition-colors hover:text-blue-500'>User Post Page</Link>
            <Link href={"/Admin"} className='transition-colors hover:text-blue-500'>Admin Page</Link>
            <SigninButton/>
        </header>
    );
}

export default Appbar;