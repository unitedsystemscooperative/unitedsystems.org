import { Container, Fade, makeStyles, Typography } from '@material-ui/core';
import { useInfographic } from 'hooks/information/useInfographic';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
});

/**
 * Displays an infographic
 * @param props imgID to display
 */
export const Infographic = (props: { img: string }) => {
  const infographic = useInfographic(props.img);
  const classes = useStyles();
  return (
    <Fade in={true}>
      <Container className={classes.root}>
        {infographic ? (
          <>
            <Typography variant="h3">{infographic.title}</Typography>
            <img src={infographic.img} alt={infographic.title} />
          </>
        ) : (
          <Typography>Image not found</Typography>
        )}
      </Container>
    </Fade>
  );
};
