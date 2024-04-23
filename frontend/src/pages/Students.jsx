// import React, { useState, useEffect } from 'react';

// const StudentPage = () => {
//     const [logs, setLogs] = useState([]);

//     useEffect(() => {
//         // Fetch logs data from backend
//         fetchLogsData();
//     }, []);

//     const fetchLogsData = async () => {
//         try {
//             // Make an API call to fetch logs data
//             const response = await fetch('/api/logs');
//             const data = await response.json();
//             setLogs(data);
//         } catch (error) {
//             console.error('Error fetching logs data:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Previous Logs</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Item Name</th>
//                         <th>Return Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.map(log => (
//                         <tr key={log.id}>
//                             <td>{log.itemName}</td>
//                             <td>{log.returnTime || <span style={{ color: 'yellow' }}>PENDING</span>}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default StudentPage;

// import React, { useState, useEffect } from 'react';

// const StudentPage = () => {
//     const [logs, setLogs] = useState([]);

//     useEffect(() => {
//         // Fetch logs data from backend
//         fetchLogsData();
//     }, []);

//     const fetchLogsData = async () => {
//         try {
//             // Make an API call to fetch logs data
//             const response = await fetch('/api/logs');
//             const data = await response.json();
//             setLogs(data);
//         } catch (error) {
//             console.error('Error fetching logs data:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Previous Logs</h2>
//             <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//                 <thead>
//                     <tr>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Item Name</th>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Return Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.map(log => (
//                         <tr key={log.id} style={{ border: '1px solid black' }}>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>{log.itemName}</td>
//                             <td style={{ border: '1px solid black', padding: '8px' }}>{log.returnTime || <span style={{ color: 'yellow' }}>PENDING</span>}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default StudentPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentPage = () => {
    const idd = useParams();
    console.log(idd);
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
    const [borrowTime, setBorrowTime] = useState(Date());
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
            console.log(fetchItems);
            setItems([fetchItems.data.data]);
        })();
    }, []);

    const handleAddItemClick = () => {
        setShowAddItemForm(true);
    };

    const handleAddItemSubmit = () => {
        // Submit the new item details to the backend
        // You can add your logic here to send the data to the backend
        // After successful submission, you may want to update the logs data
        // and hide the form
        setShowAddItemForm(false);
        (async () => {
            const data = {
                itemId, // Replace with the actual item ID
                timeOfBorrowing: borrowTime, // Replace with the actual time of borrowing
            };
            const histsory = await axios.post(
                `http://localhost:5555/api/students/${idd.id}/addItem`,
                data
            );
            console.log(histsory);
            // console.log(logs);
            setChanged(1);
            // setLogs([...histsory.data.student.historyLogs])
        })();
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
            {!logs.some((log) => !log.timeOfReturn) && ( // Check if there are no pending items
                <button onClick={handleAddItemClick}>+</button>
            )}
            {showAddItemForm && (
                <div>
                    <h2>Add New Item</h2>
                    <input
                        type="text"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        placeholder="Item ID"
                    />
                    <input
                        type="datetime-local"
                        value={borrowTime}
                        onChange={(e) => setBorrowTime(e.target.value)}
                        placeholder="Borrow Time"
                    />
                    <button onClick={handleAddItemSubmit}>Request Item</button>
                </div>
            )}

            <div>
                <h2 className="font-semibold text-xl mt-10">
                    Create a request for an item!
                </h2>
            </div>
        </div>
    );
};

export default StudentPage;
