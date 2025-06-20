'use client';

export default function BridgeSettingsIcons() {
  return (
    <div className="flex space-x-2 absolute top-4 right-4">
      <button className="bg-gray-900 p-2 rounded-full hover:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
      </button>
      <button className="bg-gray-900 p-2 rounded-full hover:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
      </button>
    </div>
  );
} 