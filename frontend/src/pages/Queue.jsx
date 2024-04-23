import { useState } from "react";
const Queue = ({ showQueue, setShowQueue }) => {
    return (
        <div className={"h-screen w-screen absolute z-100 top-0 left-0"}>
            <div
                className="h-screen w-screen absolute z-200 bg-gray-800 opacity-50"
                onClick={() => {
                    setShowQueue(!showQueue);
                }}
            ></div>
            <div className="flex justify-center items-center h-screen ">
                <div
                    className={
                        "w-1/2 h-1/2 bg-slate-50 rounded-md absolute z-300 overflow-scroll"
                    }
                    id="queue"
                >
                    <div className="flex justify-between items-center p-4">
                        <h1 className="text-3xl">Queue for Item</h1>
                        <button
                            onClick={() => {
                                setShowQueue(!showQueue);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="flex flex-col p-4">
                        <div className="flex justify-between items-center border-b-2 border-gray-300 p-4">
                            <div>Name</div>
                            <div>Time</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Queue;
