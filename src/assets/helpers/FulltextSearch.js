export function jsonFullTextSearch(obj, searchTerm, matches = []) {
    if (typeof obj === 'object') {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                if (typeof value === 'object') {
                    jsonFullTextSearch(value, searchTerm, matches);
                } else if (typeof value === 'string' && new RegExp(searchTerm, 'i').test(value)) {
                    matches.push(obj);
                    break;  // If a match is found, no need to check other fields in this object
                }
            }
        }
    }

    return matches;
}