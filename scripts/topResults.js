export const topResults = JSON.parse(localStorage.getItem("topResults")) || [];

export function addTopResult(moves, date) {
    const requiredIndex = getResultPosition(moves);
    if (requiredIndex === -1) {
        return;
    }
    topResults.splice(requiredIndex, 0, {
        moves: moves,
        date: new Date(date).toLocaleDateString("ru-RU"),
    });
    if (topResults.length > 10) topResults.length = 10;
    localStorage.setItem("topResults", JSON.stringify(topResults));
}

function getResultPosition(moves) {
    let requiredIndex = topResults.findIndex((result) => result.moves > moves);
    if (requiredIndex === -1 && topResults.length < 11) {
        requiredIndex = topResults.length;
    }
    return requiredIndex;
}
