const calculateWeightedAverage = (rows) => {
    const totalWeightedValue = rows.reduce((acc, row) => {
        const value = parseFloat(row.value);
        const weight = parseFloat(row.weight);

        if (isNaN(value) || isNaN(weight)) {
            throw new Error('Nieprawidłowe dane wejściowe. Wartość i waga muszą być liczbami.');
        }

        if (value < 0 || weight < 0) {
            throw new Error('Nieprawidłowe dane wejściowe. Wartość i waga nie mogą być ujemne.');
        }

        return acc + value * weight;
    }, 0);

    const totalWeight = rows.reduce((acc, row) => {
        const weight = parseFloat(row.weight);

        if (isNaN(weight)) {
            throw new Error('Nieprawidłowe dane wejściowe. Waga musi być liczbą.');
        }

        return acc + weight;
    }, 0);

    if (totalWeight === 0) {
        return 0;
    }

    return totalWeightedValue / totalWeight;
};

module.exports = calculateWeightedAverage;