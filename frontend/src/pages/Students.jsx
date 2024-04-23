import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const StudentPage = () => {
    const idd = useParams();
    const [logs, setLogs] = useState([
        {
            item: {
                name: "hello",
            },
            timeOfReturn: Date.now(),
        },
    ]);
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [itemId, setItemId] = useState("");
    const [itemQty, setItemQty] = useState(1);
    const [borrowingTime, setBorrowingTime] = useState(Date.now());
    const [changed, setChanged] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const histsory = await axios.get(
                `http://localhost:5555/api/student/${idd.id}/historyLogs`
            );
            console.log(histsory);
            setLogs([...histsory.data.student.historyLogs]);
        })();
    }, [changed]);

    useEffect(() => {
        (async () => {
            const fetchItems = await axios.get(
                `http://localhost:5555/api/item`
            );
            setItems(fetchItems.data.data);
            console.log(fetchItems.data.data);
        })();
    }, []);

    const handleAddItemClick = () => {
        setShowAddItemForm(!showAddItemForm);
    };

    const handleAddItemSubmit = async () => {
        // Submit the new item details to the backend
        // You can add your logic here to send the data to the backend
        // After successful submission, you may want to update the logs data
        // and hide the form
        setShowAddItemForm(false);
        (async () => {
            const data = {
                itemId, // Replace with the actual item ID
                timeOfBorrowing: borrowingTime,
            };
            const histsory = await axios.post(
                `http://localhost:5555/api/student/addItem`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log(histsory);
            // console.log(logs);
            setChanged(1);
            // setLogs([...histsory.data.student.historyLogs])
        })();
        const data = {
            itemId, // Replace with the actual item ID
            quantity: itemQty, // Replace with the actual time of borrowing
        };
        const histsory = await axios.post(
            `http://localhost:5555/api/request/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        console.log(histsory.data);
    };

    return (
        <div>
            <h2>
                Previous Logs For Student with ID: {idd.id} and Name: {}
            </h2>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}
                        >
                            Item Name
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}
                        >
                            Issue Time
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}
                        >
                            Return Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => {
                        // if(log.returnTime){
                        //     var timeIts=new Date(log.returnTime);
                        //     var hours = timeIts.getHours();
                        //     var minutes = timeIts.getMinutes();
                        //     var seconds = timeIts.getSeconds();

                        //     // Format the time to ensure leading zeros if needed
                        //     hours = (hours < 10 ? "0" : "") + hours;
                        //     minutes = (minutes < 10 ? "0" : "") + minutes;
                        //     seconds = (seconds < 10 ? "0" : "") + seconds;

                        //     // Create a string representing the current time
                        //     var currentTime = hours + ":" + minutes + ":" + seconds;
                        // }
                        return (
                            <tr
                                key={index}
                                style={{ border: "1px solid black" }}
                            >
                                <td
                                    style={{
                                        border: "1px solid black",
                                        padding: "8px",
                                    }}
                                >
                                    {log.item.name}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid black",
                                        padding: "8px",
                                    }}
                                >
                                    {log.timeOfIssue || (
                                        <span style={{ color: "red" }}>
                                            PENDING
                                        </span>
                                    )}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid black",
                                        padding: "8px",
                                    }}
                                >
                                    {log.timeOfReturn || (
                                        <span style={{ color: "red" }}>
                                            PENDING
                                        </span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-center items-center w-full">
                <div className="h-[90%]  flex flex-col justify-center items-center w-1/2">
                    <div>
                        <h2 className="font-semibold text-xl mt-10">
                            Create a request for an item!
                        </h2>
                    </div>
                    {!logs.some((log) => !log.timeOfReturn) && ( // Check if there are no pending items
                        <button
                            className=" bg-slate-400 w-8 rounded-full"
                            onClick={handleAddItemClick}
                        >
                            +
                        </button>
                    )}
                    {showAddItemForm && (
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <label htmlFor="itemId">Item ID :</label>
                                <input
                                    name="itemId"
                                    type="text"
                                    value={itemId}
                                    onChange={(e) => setItemId(e.target.value)}
                                    placeholder="Item ID"
                                />
                            </div>
                            <div>
                                <label htmlFor="itemqty">Item Qty:</label>
                                <input
                                    name="itemqty"
                                    type="number"
                                    value={itemQty}
                                    onChange={(e) => setItemQty(e.target.value)}
                                    placeholder="Borrow Time"
                                />
                            </div>
                            <div>
                                <label htmlFor="itemqty">BorrowingTime: </label>
                                <input
                                    name="borrowingTime"
                                    type="datetime-local"
                                    value={borrowingTime}
                                    onChange={(e) =>
                                        setBorrowingTime(e.target.value)
                                    }
                                    placeholder="Borrow Time"
                                />
                            </div>
                            <button
                                className="mt-4 p-2 rounded-md bg-slate-300"
                                onClick={handleAddItemSubmit}
                            >
                                Request Item
                            </button>
                        </div>
                    )}
                </div>
                <div className="h-[90%] flex flex-col justify-center items-center w-1/2">
                    Items available:
                    <div>
                        <table className="w-full">
                            <thead>
                                <tr
                                    className=" text-white"
                                    style={{ backgroundColor: "#333" }}
                                >
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Time of Issue</th>
                                    <th className="px-4 py-2">Need repairs?</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Remaining</th>
                                    <th className="px-4 py-2">Created At?</th>
                                    <th className="px-4 py-2">Updated At?</th>
                                    <th className="px-4 py-2">Student ID</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className={
                                                index % 2 === 0
                                                    ? ""
                                                    : "bg-gray-200 text-gray-800"
                                            }
                                        >
                                            <td className="px-4 py-2 text-center">
                                                {item.id}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {item.name}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {item.timeOfIssue
                                                    ? moment(
                                                          item.timeOfIssue
                                                      ).format("lll")
                                                    : "-"}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {item.needRepairs
                                                    ? "Yes"
                                                    : "No"}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {item.remaining}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {moment(item.createdAt).format(
                                                    "lll"
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {moment(item.updatedAt).format(
                                                    "lll"
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {item.studentId
                                                    ? item.studentId
                                                    : "-"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPage;
