const volunteers = [
  { id: 1, name: "John Doe", location: "California, USA" },
  { id: 2, name: "Jane Smith", location: "Sydney, Australia" },
  { id: 3, name: "Carlos Rodríguez", location: "Madrid, Spain" },
  { id: 4, name: "Aisha Khan", location: "Mumbai, India" },
  { id: 5, name: "Liam O'Connor", location: "Dublin, Ireland" },
];

// Generate initials for avatar
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Volunteers = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        🌟 Top Volunteers
      </h3>
      <div className="space-y-4">
        {volunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Avatar */}
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-semibold rounded-full text-lg">
              {getInitials(volunteer.name)}
            </div>

            {/* Volunteer Info */}
            <div>
              <h4 className="text-md font-semibold text-gray-800">
                {volunteer.name}
              </h4>
              <p className="text-sm text-gray-600">{volunteer.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Volunteers;