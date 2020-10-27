import React from 'react'
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    return {
      top: `20%`,
      left: `20%`,
      transform: `translate(-20%, -20%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const VideoPage = (props) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require(`../lotties/${props.video.lottie_name}`),
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
  const body = (

      <iframe className="video" width="760" height="515" src={props.video.vid_url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  );
    return (
        <div style={{backgroundColor: props.video.bg_color}} className="video-container">
            <div className="video-child">
            <h2>{props.video.vid_name}</h2>
            <hr style={{background: props.video.line_color}}></hr>
            <h4>{props.video.desc}</h4>
            <button className="completion-button" type="button" onClick={handleOpen}>
                    Watch More!
                </button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
                <div className="video-child2">
                <Lottie 
                    options={defaultOptions}
                    height={400}
                    width={400}
                />
                </div>
        </div>
        
    )
}

export default VideoPage;