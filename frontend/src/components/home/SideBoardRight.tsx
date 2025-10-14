"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface UserVoteRank {
    nick: string;
    total_count:number;
}

interface PostVoteRank {
    title: string;
}

export default function SideBoardRight() {
    const [userVoteRank, setUserVoteRank] = useState<UserVoteRank[]>([])
    const [postVoteRank, setPostVoteRank] = useState<PostVoteRank[]>([])
    useEffect(() => {
        axios.get("http://localhost:8000/rank/user").then((res) => {
            console.log(res.data)
            setUserVoteRank(res.data)
        })

        axios.get("http://localhost:8000/rank/post").then((res) => {
            console.log(res.data)
            setPostVoteRank(res.data)
        })
    }, [])
    return(
        <div className="w-1/5 h-full bg-white border-2 border-gray-200 rounded-xl p-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 pl-1 mb-2">
                    인기 예측 글 top3
                </h3>
                {postVoteRank.map((r,i) => {
                    return(
                        <div key={i} className="border-2 border-gray-100 text-center shadow-sm rounded-md px-2 py-1 bg-white mb-2">
                            <span className="block text-xs text-gray">{i+1}등</span>
                            <span className="text-primary-color text-md font-bold mb-2">
                            {r.title}
                            </span>
                        </div>
                    )
                })}            
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 pl-1 mb-2">
                    최다 참여자 top3
                </h3>
                {userVoteRank.map((r,i) => {
                    return(
                        <div key={i} className="border-2 border-gray-100 text-center shadow-sm rounded-md px-2 py-1 bg-white mb-2">
                            <span className="block text-xs text-gray">{i+1}등</span>
                            <span className="text-primary-color text-md font-bold mb-2">
                            {r.nick} ({r.total_count}표)
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}