export function sortObjects<T>(key: keyof T, order: 'asc' | 'desc' = 'asc') {
    return function innerSort(a: T, b: T) {
        const varA = a[key];
        const varB = b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return order === 'desc' ? comparison * -1 : comparison;
    };
}
