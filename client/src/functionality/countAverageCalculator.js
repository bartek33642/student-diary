export const calculateWeightedAverage = (rows) => {
    const totalWeightedValue = rows.reduce((acc, row) => {
        const value = parseFloat(row.value);
        const weight = parseFloat(row.weight);
        
        if ((value < 0 && weight < 0) || (value < 0 || weight < 0)) {
            alert("Podałeś niedozwolone wartości. Wartości nie mogą być ujemne.");
            return NaN;
        }

        if(!isNaN(value) && !isNaN(weight)) {
            return acc + value * weight;
        }
        return acc;
    }, 0);

    const totalWeight = rows.reduce((acc, row) => {
        const weight = parseFloat(row.weight);
        if (!isNaN(weight)) {
            return acc + weight;
        }
        return acc;
    }, 0);

    if (totalWeight === 0) {
        return 0;
    }

    return totalWeightedValue / totalWeight;
};
