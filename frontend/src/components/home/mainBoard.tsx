"use client";
import { useState } from "react";
import PostList from "./PostList";
import PostWriteModal from "./PostWriteModal";

export default function MainBoard() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    return(
        <div className="h-screen h-full flex flex-col w-3/5 bg-white border-2 border-gray-200 rounded-xl p-4">
            <div className="h-12 flex items-baseline">
                <h1 className="text-2xl font-bold text-gray-900 mr-4">예측하기</h1>
                <button onClick={() => setIsOpenModal(true)} className="bg-primary-color text-white text-sm font-semibold py-1.5 px-3 rounded-md">새 예측 작성</button>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <PostList />    
            </div>
            {isOpenModal && <PostWriteModal onClose={() => setIsOpenModal(false)}/>}
        </div>
    );
}