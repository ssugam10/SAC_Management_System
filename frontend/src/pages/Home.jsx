import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import moment from "moment";
import Queue from "./Queue";

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState({});
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/api/item")
            .then((response) => {
                setItems(response.data.data);
                setLoading(false);
                console.log(response.data.data);
                let newParams = [];
                response.data.data.forEach((item, key) => {
                    newParams[key] = item["name"];
                });
                console.log(newParams);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const [showQueue, setShowQueue] = useState(false);

    function search(items) {
        return items.filter((item) =>
            item["name"].toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div className="p-4 h-screen bg-gray-100" style={{ color: "#333" }}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">SAC Mgmt.</h1>
                <div className="input-box relative right-16">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search item by name"
                    />
                </div>
                <Link to="/items/create">
                    <MdOutlineAddBox
                        className="mr-5 mt-5 text-blue-500 text-5xl hover:text-blue-700 cursor-pointer"
                        title="Add New Item"
                    />
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full">
                    <thead>
                        <tr
                            className=" text-white"
                            style={{ backgroundColor: "#333" }}
                        >
                            <th className="px-4 py-2">Index</th>
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
                        {search(items).map((item, index) => (
                            <tr
                                key={item.id}
                                className={
                                    index % 2 === 0
                                        ? ""
                                        : "bg-gray-200 text-gray-800"
                                }
                            >
                                <td className="px-4 py-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.name}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.timeOfIssue
                                        ? moment(item.timeOfIssue).format("lll")
                                        : "-"}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.needRepairs ? "Yes" : "No"}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.quantity}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.remaining}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {moment(item.createdAt).format("lll")}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {moment(item.updatedAt).format("lll")}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.studentId ? item.studentId : "-"}
                                </td>
                                <td className="px-4 py-2 flex items-center justify-center gap-x-4">
                                    <button
                                        className="text-green-600 hover:text-green-800"
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setShowQueue(!showQueue);
                                        }}
                                    >
                                        {/* <Link
                                        to={`/items/details/${item.id}`}
                                        className="text-green-600 hover:text-green-800"
                                        title="View Details"
                                    > */}
                                        <BsInfoCircle className="text-3xl cursor-pointer" />
                                    </button>
                                    <Link
                                        to={`/items/edit/${item.id}`}
                                        className="text-yellow-600 hover:text-yellow-800"
                                        title="Edit Item"
                                    >
                                        <AiOutlineEdit className="text-3xl cursor-pointer" />
                                    </Link>
                                    <Link
                                        to={`/items/delete/${item.id}`}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete Item"
                                    >
                                        <MdOutlineDelete className="text-3xl cursor-pointer" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showQueue && (
                <Queue
                    showQueue={showQueue}
                    setShowQueue={setShowQueue}
                    item={selectedItem}
                ></Queue>
            )}
        </div>
    );
};

export default Home;
