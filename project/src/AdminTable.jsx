import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Trophy } from 'lucide-react';
import AdminLobbyTable from './components/adminLobbyTable';

const queryClient = new QueryClient();

const lobbyIds = {
  A: `${import.meta.env.VITE_LOBBY_A}`,
  B: `${import.meta.env.VITE_LOBBY_B}`,
  C: `${import.meta.env.VITE_LOBBY_C}`,
  D: `${import.meta.env.VITE_LOBBY_D}`,
  E: `${import.meta.env.VITE_LOBBY_E}`,
  F: `${import.meta.env.VITE_LOBBY_F}`,
  G: `${import.meta.env.VITE_LOBBY_G}`,
  H: `${import.meta.env.VITE_LOBBY_H}`,
  Quarterfinals: `${import.meta.env.VITE_LOBBY_Quarterfinals}`
};

const blockIds = {
  A: `${import.meta.env.VITE_BLOCK_A}`,
  B: `${import.meta.env.VITE_BLOCK_B}`,
  C: `${import.meta.env.VITE_BLOCK_C}`,
  D: `${import.meta.env.VITE_BLOCK_D}`,
  E: `${import.meta.env.VITE_BLOCK_E}`,
  F: `${import.meta.env.VITE_BLOCK_F}`,
  G: `${import.meta.env.VITE_BLOCK_G}`,
  H: `${import.meta.env.VITE_BLOCK_H}`,
};

function AdminTable() {
  const [activeTab, setActiveTab] = useState('A');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
              Free Fire Event Tables
            </h1>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {Object.keys(lobbyIds).map((lobby) => (
              <button
                key={lobby}
                onClick={() => setActiveTab(lobby)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === lobby
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                Lobby {lobby}
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <AdminLobbyTable 
              lobbyId={lobbyIds[activeTab]} 
              blockId={blockIds[activeTab]} 
            />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default AdminTable;
