const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getMovieRecommendations = async (userInput) => {
  const response = await fetch(`${API_BASE_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_input: userInput }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
};