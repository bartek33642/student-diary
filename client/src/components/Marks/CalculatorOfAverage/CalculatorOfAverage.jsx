import React, { useState } from "react";
import "./CalculatorOfAverageStyle.css";
import calculateWeightedAverage from "../../../functionality/countAverageCalculator";

export const CalculatorOfAverage = () => {
    const [rows, setRows] = useState([{ value: "", weight: "" }]);
    const [average, setAverage] = useState(null);

    const handleAddRow = () => {
        setRows([...rows, { value: "", weight: "" }]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleCalculateAverage = () => {
        const calculatedAverage = calculateWeightedAverage(rows);
        setAverage(calculatedAverage);
    };

    return (
        <div className="calculator-of-average-container">
            <div className="calculator-of-average-elements">
                <h5 className="calculator-h5">Wprowadź wartości (np. oceny szkolne) i ich wagi:</h5>
                {rows.map((row, index) => (
                    <div className="calculator-of-average-input" key={index}>
                        <input
                            type="number"
                            min="0"
                            className="calculator-value calculator-view-of-button-and-input"
                            placeholder="Wartość"
                            value={row.value}
                            onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].value = e.target.value;
                                setRows(updatedRows);
                            }}
                        />
                        <input
                            type="number"
                            min="0"
                            className="calculator-value calculator-view-of-button-and-input"
                            placeholder="Waga"
                            value={row.weight}
                            onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].weight = e.target.value;
                                setRows(updatedRows);
                            }}
                        />
                        <button
                            type="button"
                            className="calculator-view-of-button-and-input calculator-button-X-view"
                            onClick={() => handleRemoveRow(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
                <div className="calculator-of-average-buttons">
                    <button className="calculator-button-new-rows-and-calculate" type="button" onClick={handleCalculateAverage}>
                        Oblicz
                    </button>

                    <button className="calculator-button-new-rows-and-calculate" type="button" onClick={handleAddRow}>
                        Dodaj nowy wiersz
                    </button>
                </div>
                <div className="calculator-of-average-result">
                    <h5 className="calculator-h5">Średnia ważona wynosi: {average !== null ? average.toFixed(2) : "Brak danych"}</h5>
                </div>
            </div>
        </div>
    );
};
