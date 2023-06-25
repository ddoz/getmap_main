"use client";

import Button from '@/components/elements/Button';
import TextBox from '@/components/elements/TextBox';
import { signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react'

const SignInPage = () => {
    const [error, setError] = useState("");
    const userName = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        // Reset error state
        setError("");

        // Validate form inputs
        if (!userName.current || !pass.current) {
            setError('Username and password are required');
            return;
        }

        const result = await signIn("credentials", {
            username: userName.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/"
        });

        // Handle sign-in result and errors
        if (!result) {
            setError("Username or password are invalid");
        }
    };

    const handleKeyDown = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onSubmit();
        }
    };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-r from-dark-tosca to-light-tosca">
      <div className="md:w-1/2 bg-gray-200 items-center p-8 md:block hidden">
        <div className='text-center'>
            <h1 className="text-2xl mb-4">Selamat datang di </h1>
            <div className="flex items-center justify-center">
                <img src="/getmap.png" alt="Gambar GetMap" className="h-20 max-w-full" />
            </div>
        </div>
      </div>
      <div className="md:w-1/2 bg-white p-8 rounded-md shadow">
        <h2 className="text-xl mb-4">Form Login</h2>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <form>
          <div className="mb-4">
            <TextBox id='username' lableText='Username' onChange={(e) => {userName.current = e.target.value}} />
          </div>
          <div className="mb-4">
            <TextBox id="password" lableText='Password' onKeyDown={handleKeyDown} type={'password'} onChange={(e) => {pass.current = e.target.value}} />
          </div>
          <Button onClick={onSubmit}>Login</Button>
        </form>
      </div>
    </div>
  )
}

export default SignInPage;
