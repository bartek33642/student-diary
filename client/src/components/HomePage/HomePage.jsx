import React from 'react';
import "./HomePageStyle.css";
import SchoolImage from "../../assets/school_image.png"
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
    return (
        <div className="home-page-container">

            <div className="home-page-container-header-elements">
                <div className="home-page-hamburger">
                    <Link to="/menu"><RiMenuFill className="home-page-rimenufill"/></Link>
                </div>

                <div className="home-page-image-icon">
                    <img src={SchoolImage} alt="przyrzady-szkolne" />
                </div>
                
                <div className="home-page-container-header">
                    <p>Witaj w Twoim<br/> 
                    prywatnym<br/>
                    uczniowskim<br/> 
                    dzienniczku</p>
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
            Nazwa: <Input type="text" value="nazwa przedmiotu" />
            <Input type="submit" value="Zapisz"/>
          </Typography>
        </Box>
      </Modal>
            </div>
                
        </div>
    );
};