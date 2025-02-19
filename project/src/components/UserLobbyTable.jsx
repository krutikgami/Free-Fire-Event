import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Users, Target, Crosshair, Award } from "lucide-react";
import axios from "axios";

const fetchLobbyData = async (lobbyId) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/notion/${lobbyId}`);
  return response.data;
};


const mapNotionResponse = (apiResponse) => {
  return apiResponse?.data?.results?.map((item) => ({
    "Team Name": item.properties["Team Name"]?.title?.[0]?.plain_text.trim() || "N/A",
    "1-Position": item.properties["1-Position"]?.number ?? "N/A",
    "1-Kill-Point": item.properties["1-kill-point"]?.number ?? "N/A",
    "2-Position": item.properties["2-Position"]?.number ?? "N/A",
    "2-Kill-Point": item.properties["2-kill-point"]?.number ?? "N/A",
    "3-Position": item.properties["3-Position"]?.number ?? "N/A",
    "3-Kill-Point": item.properties["3-kill-point"]?.number ?? "N/A",
    "Total Points": item.properties["Total Point"]?.formula?.number ?? 0,
  })) || [];
};

function UserLobbyTable({ lobbyId,blockId}) {
  const { data, isLoading, isError } = useQuery(["lobby", lobbyId], () => fetchLobbyData(lobbyId));
  const [loading, setLoading] = useState(false);
  const [mappedData, setMappedData] = useState([]);
  const[block,setBlockId] = useState(blockId);
  const [retrievSummaray,setRetrievSummaray] = useState("");
  
 
  useEffect(() => {
    if (data) {
      const teams = mapNotionResponse(data);
      setMappedData(teams);
    }
  }, [data]);

  const retrievBlock=async(id)=>{
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/notion/block/fetch/${id}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.data?.data?.paragraph?.rich_text?.length > 0) {
        const res = response.data.data.paragraph.rich_text[0].text.content;
        setRetrievSummaray(res); 
      } else {
        setRetrievSummaray("No summary available."); 
      }
    } catch (error) {
      console.error("Error retrieving block:", error);
      setRetrievSummaray("Error loading summary."); 
    }
  }

  useEffect(() => {
    setBlockId(blockId); 
    if (blockId) {
      retrievBlock(blockId); 
    }
  }, [blockId]); 

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading lobby data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error loading lobby data. Please try again later.</p>
      </div>
    );
  }

  const columns = [
    { icon: Award, label: "S.No.", key: "S.No." },
    { icon: Users, label: "Team Name", key: "Team Name" },
    { icon: Target, label: "1-Position", key: "1-Position" },
    { icon: Crosshair, label: "1-Kill-Point", key: "1-Kill-Point" },
    { icon: Target, label: "2-Position", key: "2-Position" },
    { icon: Crosshair, label: "2-Kill-Point", key: "2-Kill-Point" },
    { icon: Target, label: "3-Position", key: "3-Position" },
    { icon: Crosshair, label: "3-Kill-Point", key: "3-Kill-Point" },
    { icon: Target, label: "Total Points", key: "Total Points" },
  ];


  return (
    <>
    <div className="overflow-x-auto">
    <table className="w-full min-w-[1200px] table-fixed border-collapse">
      <thead>
        <tr className="bg-gray-900">
          {columns.map(({ icon: Icon, label }, index) => (
            <th
              key={index}
              className="px-4 py-3 text-center text-sm font-semibold text-gray-300 border border-gray-700"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {label}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mappedData.map((team, index) => (
          <tr
            key={index}
            className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors"
          >
            <td className="w-[70px] px-4 py-3 font-medium text-center bg-gray-800 text-white rounded-l-lg border border-gray-700">
              {index + 1}
            </td>
            {columns.slice(1).map(({ key }, colIndex) => (
              <td
                key={colIndex}
                className="px-4 py-3 font-medium text-center border border-gray-700 break-words whitespace-normal"
              >
                {team[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  <div className="mt-6 bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-extrabold text-gray-300">Performance Summaries:</h3>
    {retrievSummaray.trim().length === 0 ? (
      <p className="text-gray-500">No performance summaries available.</p>
    ) : (
      <div className="mt-4 pl-3 font-semibold text-gray-300 break-words whitespace-normal">
        {retrievSummaray.split("\n").map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}
      </div>
    )}
  </div>
</>  
  );
}

export default UserLobbyTable;
