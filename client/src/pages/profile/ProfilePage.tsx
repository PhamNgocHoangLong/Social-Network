import React from 'react'
import { Avatar, Button } from "@material-tailwind/react";
import { UserRoundCog } from 'lucide-react';
import { Film } from 'lucide-react';
import { Pocket } from 'lucide-react';
import { Newspaper } from 'lucide-react';


export const ProfilePage = () => {
    return (
        <div className="max-w-2xl mx-8 mt-4 md:mx-auto border-2 rounded-lg shadow-sm gap-4">
            <div className="flex justify-around">
                <div className="flex items-center gap-2">
                    <Avatar alt="Remy Sharp" src="/avatar.png" size='xxl' />
                </div>
                <div className=" justify-between items-center">
                    <div className="flex gap-4 mt-2 items-center">
                        <div className="">wnhu</div>
                        <Button className='bg-gray-100 text-black py-2 ' size="sm" color='gray'
                        >Chỉnh sửa trang cá nhân</Button>
                        <Button className='bg-gray-100 text-black py-2 ' size="sm" color='gray'
                        >Xem kho lưu trữ</Button>
                        <UserRoundCog />
                    </div>
                    <div className="flex gap-4 mt-4 justify-between">
                        <div><b>31</b> bài viết</div>
                        <div><b>152</b>người theo dõi</div>
                        <div>Đang theo dõi <b>46</b> người dùng</div>
                    </div>
                    <div className="font-bold mt-4">Xòi</div>
                </div>
            </div>
            <div className="flex justify-between items-center border-b p-4">
                <div className="relative flex-1   text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
                    <span className="justify-center  flex hover:underline focus:underline">
                    <Newspaper />
                    Bài viết</span>
                    <div className="absolute right-0 top-0 h-full border-r"></div>
                </div>
                <div className="relative flex-1 text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
                    <span className="justify-center hover:underline focus:underline flex ">
                    <Film />
                        Reels           
                         </span>
                    <div className="absolute right-0 top-0 h-full border-r"></div>
                </div>
                <div className="flex-1 text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
                    <span className="justify-center hover:underline flex focus:underline">
                    <Pocket/>
                    Đã lưu            </span>
                </div>
            </div>
        </div>
    )
}