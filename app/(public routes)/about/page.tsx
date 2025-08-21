import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'About page',
};

export default function About(){
    redirect('/');
    return null;
};
