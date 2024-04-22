import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowItem = () => {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/api/item/${id}`)
            .then((response) => {
                console.log(response);
                setItem(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4 ">
            <BackButton />
            <h1 className="text-3xl my-4">Show Item</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Id</span>
                        <span>{item.id}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Name</span>
                        <span>{item.name}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Student
                        </span>
                        <span>{item.author ? item.author : "-"}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Quantity
                        </span>
                        <span>{item.quantity}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Remaining
                        </span>
                        <span>{item.remaining}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowItem;
