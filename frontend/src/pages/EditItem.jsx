import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditItem = () => {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/api/item/${id}`)
            .then((response) => {
                setItem(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                alert("An error has occurred, please check the console!");
                console.log(err);
            });
    }, []);

    const handleEditItem = () => {
        setLoading(true);
        axios
            .put(`http://localhost:5555/api/item/${id}`, item)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((err) => {
                setLoading(false);
                alert("An error has occurred, please check the console.");
                console.log(err);
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Item</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={item?.name}
                        onChange={(e) =>
                            setItem({ ...item, name: e.target.value })
                        }
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">
                        Quantity
                    </label>
                    <input
                        type="text"
                        name="quantity"
                        value={item?.quantity}
                        onChange={(e) =>
                            setItem({ ...item, quantity: e.target.value })
                        }
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">
                        Needs Repairs?
                    </label>
                    <div>
                        <select
                            id="needRepairs"
                            value={item?.needRepairs ? item.needRepairs : false}
                            onChange={(e) => {
                                setItem({
                                    ...item,
                                    needRepairs: e.target.value,
                                });
                                console.log(e.target.value);
                            }}
                            className="border-2 border-gray-500 px-4 py-2  w-full "
                        >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleEditItem}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditItem;
