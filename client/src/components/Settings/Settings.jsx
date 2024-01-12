import React, { useState, useEffect } from "react";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./SettingsStyle.css";
import packageJson from '../../../package.json';

export const Settings = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    first_name: '',
    second_name: '',
    birth_date: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/user');
        if (response.ok) {
          const users = await response.json();
          if (users && users.length > 0) {
            setUserData(users[0]);
            setEditedUserData(users[0]); // Ustawienie początkowych danych do edycji
          }
        } else {
          console.error('Błąd podczas pobierania danych użytkownika:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    };

    fetchUserData();
  }, []);

  // Funkcja do formatowania daty
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      const userId = userData._id;
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("Usunięto użytkownika");
        setUserData(null);
      } else {
        console.error('Błąd podczas usuwania użytkownika:', response.statusText);
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const userId = userData._id;
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserData),
      });

      if (response.ok) {
        console.log("Zaktualizowano dane użytkownika");
        setUserData(editedUserData);
        setIsEditing(false);
      } else {
        console.error('Błąd podczas aktualizacji danych użytkownika:', response.statusText);
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem:', error.message);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-elements">
        <div className="home-page-hamburger">
          <Link to="/menu">
            <RiMenuFill className="home-page-rimenufill" />
          </Link>
        </div>

        <h1 className="settings-h1">O użytkowniku</h1>

        <div className="information-about-app-user">
          {userData ? (
            <>
              {!isEditing ? (
                <h5>
                  <p>{`Imię: ${userData.first_name}`}</p>
                  <p>{`Nazwisko: ${userData.second_name}`}</p>
                  <p>{`Data urodzenia: ${formatDate(userData.birth_date)}`}</p>
                </h5>
              ) : (
                <div>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Nowe imię"
                    value={editedUserData.first_name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="second_name"
                    placeholder="Nowe nazwisko"
                    value={editedUserData.second_name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="date"
                    name="birth_date"
                    value={formatDate(editedUserData.birth_date)} // Dodano formatowanie daty
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div>
                {!isEditing ? (
                  <button onClick={handleEditClick}>
                    Edytuj dane użytkownika
                  </button>
                ) : (
                  <button onClick={handleSaveEdit}>
                    Zapisz zmiany
                  </button>
                )}
                <button onClick={handleDeleteClick}>
                  Usuń użytkownika
                </button>
              </div>
            </>
          ) : (
            <p>Brak danych w bazie</p>
          )}
        </div>

        <h1 className="settings-h1">O aplikacji</h1>

        <div className="information-about-app">
          <h5>
            <p>Aplikacja ta jest projektem zrealizowanym w ramach przedmiotu Testowanie i jakość oprogramowania.</p>
            <p>Jest to dzienniczek elektroniczny dla ucznia.</p>
            <p>Umożliwia dodawanie przedmiotów, ocen oraz sprawdzanie średnich.</p>
            <p>Wersja aplikacji: {packageJson.version}</p>
          </h5>
        </div>
      </div>
    </div>
  );
};
