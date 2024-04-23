import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
const Queue = ({ showQueue, setShowQueue, item }) => {
    console.log("ID: ", item.id);
    const [queue, setQueue] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:5555/api/item/${item.id}/queue/`)
            .then((response) => {
                console.log(response);
                setQueue(response.data.requests);
                console.log(response.data.requests);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
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
                        <h1 className="text-3xl">
                            Queue for Item: {item.name}
                        </h1>
                        <button
                            onClick={() => {
                                setShowQueue(!showQueue);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="flex flex-col p-4">
                        <div className="flex font-semibold justify-between items-center border-b-2 border-gray-300 p-4">
                            <div>Person</div>
                            <div>Time</div>
                            <div>Quantity</div>
                        </div>
                    </div>
                    {queue.map((request, key) => (
                        <div className="flex flex-col" key={key}>
                            <div className="flex justify-between items-center border-b-2 border-gray-300 p-4">
                                <div>{request.student.user.name}</div>
                                <div>
                                    {moment(request.createdAt).format("lll")}
                                </div>
                                <div>{request.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Queue;
