import React, { useState, useEffect } from "react";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./SettingsStyle.css";
import packageJson from '../../../package.json';
import countAge from "../../functionality/countAge";
import genderOfName from "../../functionality/genderOfName";

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
    console.log(`handleInputChange - Received input: ${name} = ${value}`);
    setEditedUserData((prevData) => {
      const newState = {
        ...prevData,
        [name]: value,
      };
      console.log('handleInputChange - Updated state:', newState);
      return newState;
    });
  };

  const handleSaveEdit = async () => {
    try {
      const userId = userData._id;
      const editedData = {
        ...editedUserData,
        birth_date: editedUserData.birth_date.split('T')[0], // Usuń informacje o czasie
      };
      console.log('handleSaveEdit - Sending data to server:', editedData);
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      console.log('handleSaveEdit - Received response:', response);
  
      if (response.ok) {
        console.log("handleSaveEdit - Updating state with edited data:", editedUserData);
        setUserData(editedUserData);
        console.log("handleSaveEdit - Updated state:", userData);
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

        <div className="container-with-divs">
        <h1 className="settings-h1">O użytkowniku</h1>

        <div className="information-about-app-user">
          {userData ? (
            <>
              {!isEditing ? (
                <h5>
                  <p>{`Imię: ${userData.first_name}`}</p>
                  <p>{`Nazwisko: ${userData.second_name}`}</p>
                  <p>{`Płeć: ${genderOfName(userData.first_name)}`}</p>
                  <p>{`Data urodzenia: ${formatDate(userData.birth_date)}`}</p>
                  <p>{`W tej chwili masz lat: ${countAge(userData.birth_date)}`}</p>
                </h5>
              ) : (
                <div className="form-from-settings">
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
    </div>
  );
};
