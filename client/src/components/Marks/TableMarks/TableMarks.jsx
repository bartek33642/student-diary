import React from "react";
import "./TableMarksStyle.css";

export const TableMarks = () => {
    return(
<div className="marks-table">
                    <table className="table-of-grades">
                        <tr className="marks-table-tr">
                            <th className="marks-table-th">Przedmiot</th>
                            <th className="marks-table-th">Oceny</th>
                            <th className="marks-table-th">Średnia <br/>arytmetyczna</th>
                            <th className="marks-table-th">Średnia <br/>ważona</th>
                            <th className="marks-table-th">Mediana</th>
                            <th className="marks-table-th">Przewidywana ocena <br/>końcowa</th>
                            <th className="marks-table-th">Ocena <br /> końcowa</th>
                        </tr>

                        <tr className="marks-table-tr">
                            <td className="marks-table-td">Język polski</td>
                            <td className="marks-table-td">2+</td>
                            <td className="marks-table-td">2.5</td>
                            <td className="marks-table-td">2.5</td>
                            <td className="marks-table-td">2.5</td>
                            <td className="marks-table-td">3</td>
                            <td className="marks-table-td"></td>
                        </tr>

                        <tr className="marks-table-tr">
                            <td className="marks-table-td">Język angielski</td>
                            <td className="marks-table-td">4, 3</td>
                            <td className="marks-table-td">3.5</td>
                            <td className="marks-table-td">3.8</td>
                            <td className="marks-table-td">3.5</td>
                            <td className="marks-table-td">4</td>
                            <td className="marks-table-td"></td>
                        </tr>

                        <tr className="marks-table-tr">
                            <td className="marks-table-td">Matematyka</td>
                            <td className="marks-table-td">4, 3, 4</td>
                            <td className="marks-table-td">3.6</td>
                            <td className="marks-table-td">3.9</td>
                            <td className="marks-table-td">4</td>
                            <td className="marks-table-td">4</td>
                            <td className="marks-table-td"></td>
                        </tr>
                    </table>
                </div>
    );
}