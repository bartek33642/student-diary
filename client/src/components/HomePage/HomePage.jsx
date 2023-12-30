import React, { useState, useEffect } from 'react';
import "./HomePageStyle.css";
import SchoolImage from "../../assets/school_image.png"
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [userName, setUserName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [birthDate, setBirthDate] = useState('');



  useEffect(() => {
    // Pobierz dane użytkownika przy montowaniu komponentu
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3001/user');
      if (response.ok) {
        const users = await response.json();
        const firstUser = users[0]; 
        setUserName(firstUser.first_name);
      } else {
        toast.error(`Błąd podczas pobierania danych użytkownika: ${response.statusText}`);
      }
    } catch (error) {
      toast.error(`Błąd podczas komunikacji z serwerem: ${error.message}`);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSubjectName(''); // Wyczyść nazwę przedmiotu po zamknięciu modala
  };

  const handleOpen2 = () => setOpen2(true);

  const handleClose2 = () => {
    setUserName('');
    setSecondName('');
    setBirthDate('');
    setOpen2(false); // Przenieś zamknięcie okna do tego miejsca
  };
  
  
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    if (name === 'userName') {
      setUserName(value);
    } else if (name === 'secondName') {
      setSecondName(value);
    } else if (name === 'birthDate') {
      setBirthDate(value);
    }
  };

  const handleInputChange = (e) => {
    setSubjectName(e.target.value);
  };


  

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: subjectName }),
      });
  
      if (response.ok) {
        toast.success('Przedmiot został dodany pomyślnie');
        handleClose();
      } else {
        const errorData = await response.json(); // Dodaj tę linię
        toast.error(`Błąd podczas dodawania przedmiotu: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Błąd podczas komunikacji z serwerem: ${error.message}`);
    }
  };
  
  const handleSave2 = async (e) => {
    e.preventDefault(); // Zapobiegaj domyślnemu zachowaniu przycisku submit
  
    try {
      const response = await fetch('http://localhost:3001/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: userName, second_name: secondName, birth_date: birthDate }),
      });
  
      if (response.ok) {
        toast.success('Użytkownik został dodany pomyślnie');
        handleClose2();
        window.location.reload();
      } else {
        const errorData = await response.json(); // Dodaj tę linię
        toast.error(`Błąd podczas dodawania Użytkownika: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Błąd podczas komunikacji z serwerem: ${error.message}`);
    }
  };
  


  return (
    <div className="home-page-container">

      <div className="home-page-container-header-elements">
        <div className="home-page-hamburger">
          <Link to="/menu"><RiMenuFill className="home-page-rimenufill" /></Link>
        </div>

        <div className="home-page-image-icon">
          <img src={SchoolImage} alt="przyrzady-szkolne" />
        </div>

        <div className="home-page-container-header">
          <p>{`Witaj ${userName}, w Twoim
            prywatnym
            uczniowskim
            dzienniczku`}</p> 
        </div>
      </div>

      <div className="home-page-container-button">
        <button className="home-page-button" type="button" onClick={handleOpen}>Dodaj przedmioty</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Dodaj przedmioty szkolne:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Nazwa: <Input type="text" value={subjectName} onChange={handleInputChange} />
              <Input type="submit" value="Zapisz" onClick={handleSave} />
            </Typography>
          </Box>
        </Modal>
      </div>

      <div className="home-page-container-button">
        <button className="home-page-button" type="button" onClick={handleOpen2}>Podaj swoje dane</button>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Podaj swoje dane:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Imię: <Input type="text" name="userName" value={userName} onChange={handleInputChange2} required/> <br />
              Nazwisko: <Input type="text" name="secondName" value={secondName} onChange={handleInputChange2} required/> <br />
              Data urodzenia: <Input type="date" name="birthDate" value={birthDate} onChange={handleInputChange2} required/>
              <Input type="submit" value="Zapisz" onClick={handleSave2} />
            </Typography>
          </Box>
        </Modal>
      </div>
{/* {userName ? null : (
      <div className="home-page-container-button">
        <button className="home-page-button" type="button" onClick={handleOpen2}>
          Podaj swoje dane
        </button>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Podaj swoje dane:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Imię: <Input type="text" name="userName" value={userName} onChange={handleInputChange2} /> <br />
              Nazwisko: <Input type="text" name="secondName" value={secondName} onChange={handleInputChange2} /> <br />
              Data urodzenia: <Input type="date" name="birthDate" value={birthDate} onChange={handleInputChange2} />
              <button type="submit" onClick={handleSave2}>Zapisz</button>
            </Typography>
          </Box>
        </Modal>
      </div>
    )} */}
    </div>
  );
};
