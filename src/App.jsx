import { useState } from 'react'

function App() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [results, setResults] = useState(null);

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (type === "followers") {
        const jsonData = JSON.parse(e.target.result);
        console.log(jsonData);
        const usernames = jsonData.map(item => item.string_list_data[0].value);
        setFollowers(usernames);
      } else {
        const jsonData = JSON.parse(e.target.result);
        const jsonFollowings = jsonData.relationships_following;
        console.log(jsonData);
        console.log(jsonFollowings);
        const usernames = jsonFollowings.map(item => item.string_list_data[0].value);
        setFollowing(usernames);
      }
    };

    reader.readAsText(file);
  };

  const analyzeData = () => {
    if (followers.length > 0 && following.length > 0) {
      const followersSet = new Set(followers);
      const followingSet = new Set(following);

      const notFollowingBack = [...followingSet].filter(user => !followersSet.has(user));
      const notFollowedBack = [...followersSet].filter(user => !followingSet.has(user));
      const mutualFollowers = [...followingSet].filter(user => followersSet.has(user));

      setResults({
        notFollowingBack,
        notFollowedBack,
        mutualFollowers,
      });

      console.log(results);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-semibold mb-6">Instagram Follow Check</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Cargar archivo de seguidores:</label>
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileUpload(e, "followers")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Cargar archivo de seguidos:</label>
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileUpload(e, "following")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={analyzeData}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Analizar
        </button>
      </div>

      {results && (
        <div className="mt-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
          <div>
            <h3 className="text-lg font-semibold">No te siguen de vuelta:</h3>
            <ul className="list-disc pl-5">
              {results.notFollowingBack.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">No sigues de vuelta:</h3>
            <ul className="list-disc pl-5">
              {results.notFollowedBack.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Seguimiento mutuo:</h3>
            <ul className="list-disc pl-5">
              {results.mutualFollowers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App
