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
        const usernames = jsonData.map(item => ({
          username: item.string_list_data[0].value,
          href: item.string_list_data[0].href
        }));
        setFollowers(usernames);
      } else {
        const jsonData = JSON.parse(e.target.result);
        const jsonFollowings = jsonData.relationships_following;
        console.log(jsonData);
        console.log(jsonFollowings);
        const usernames = jsonFollowings.map(item => ({
          username: item.string_list_data[0].value,
          href: item.string_list_data[0].href
        }));
        setFollowing(usernames);
      }
    };

    reader.readAsText(file);
  };

  const analyzeData = () => {
    if (followers.length > 0 && following.length > 0) {
      const followersMap = new Map(followers.map(user => [user.username, user.href]));
      const followingMap = new Map(following.map(user => [user.username, user.href]));

      const notFollowingBack = [...followingMap.keys()].filter(user => !followersMap.has(user));
      const notFollowedBack = [...followersMap.keys()].filter(user => !followingMap.has(user));
      const mutualFollowers = [...followingMap.keys()].filter(user => followersMap.has(user));

      setResults({
        notFollowingBack: notFollowingBack.map(user => ({ username: user, href: followingMap.get(user) })),
        notFollowedBack: notFollowedBack.map(user => ({ username: user, href: followersMap.get(user) })),
        mutualFollowers: mutualFollowers.map(user => ({ username: user, href: followingMap.get(user) })),
      });

      console.log(results);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-6">Instagram Follow Check</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-6">
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
        <div className="w-full flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold mb-4">No te siguen de vuelta:</h2>
            <ul className="space-y-2">
              {results.notFollowingBack.map((user, index) => (
                <li key={index}>
                  <a href={user.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {user.username}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold mb-4">No sigues de vuelta:</h2>
            <ul className="space-y-2">
              {results.notFollowedBack.map((user, index) => (
                <li key={index}>
                  <a href={user.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {user.username}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Se siguen mutuamente:</h2>
            <ul className="space-y-2">
              {results.mutualFollowers.map((user, index) => (
                <li key={index}>
                  <a href={user.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {user.username}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App
