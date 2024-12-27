

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }
        return res.json(); // Parse the JSON response
    } catch (error) {
        console.error("Error loading topics:", error);
        return { topics: [] }; // Return an empty array if fetching fails
    }
};

export default async function TopicsList() {
    const { topics } = await getTopics();

    return (
        <>
            {topics.length > 0 ? (
                topics.map((t) => (
                    <div
                        key={t._id} // Unique key for React elements
                        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                    >
                        <div>
                            <h2 className="font-bold text-2xl">{t.title}</h2>
                            <p>{t.description}</p>
                        </div>

                        <div className="flex gap-2">
                            <RemoveBtn  id= {t._id} />
                            <Link href={`/editTopic/${t._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500">
                    No topics found. Add some topics to get started.
                </div>
            )}
        </>
    );
}
