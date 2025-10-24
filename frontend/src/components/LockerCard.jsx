export default function LockerCard({ locker, onReserve }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg">Locker {locker.locker_number}</h3>
      <p className="text-gray-600">{locker.location}</p>
      <span className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(locker.status)}`}>
        {locker.status}
      </span>
      {locker.status === 'available' && onReserve && (
        <button
          onClick={() => onReserve(locker.id)}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Reserve
        </button>
      )}
    </div>
  );
}