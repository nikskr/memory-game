let results = [];

try {
  const serializedResult = localStorage.getItem("topResults");

  if (serializedResult) {
    results = JSON.parse(serializedResult);
  }
} catch (e) {
  console.error("Error reading localStorage", error);
  results = [];
}

export function addTopResult(moves, date) {
  const requiredIndex = getResultPosition(moves);
  if (requiredIndex === -1) {
    return;
  }
  results.splice(requiredIndex, 0, {
    moves: moves,
    date: new Date(date).toLocaleDateString("ru-RU"),
  });
  if (results.length > 10) results.length = 10;
  localStorage.setItem("topResults", JSON.stringify(results));
}

function getResultPosition(moves) {
  let requiredIndex = results.findIndex((result) => result.moves > moves);
  if (requiredIndex === -1 && results.length < 11) {
    requiredIndex = results.length;
  }
  return requiredIndex;
}

export const topResults = results;
