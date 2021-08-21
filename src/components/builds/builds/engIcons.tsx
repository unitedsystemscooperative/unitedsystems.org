import { makeStyles } from '@material-ui/core';
const engineerIcon = '/img/shipBuilds/Engineer_icon.svg';

const useStyles = makeStyles({
  engineering: {
    '& p': {
      '& img': {
        height: '20px',
        width: '20px',
        verticalAlign: 'middle',
      },
    },
  },
});

export const EngIcons = (props: { engLevel: number; ditchText?: boolean }) => {
  const classes = useStyles();
  let icons: JSX.Element[] = [];
  if (props.engLevel > 3 || props.engLevel < 1) {
    return (
      <div className={classes.engineering}>
        <p>{props.ditchText ? 'None' : 'Engineering Level: None'}</p>
      </div>
    );
  } else {
    for (let i = 1; i <= props.engLevel; i++) {
      icons = [
        ...icons,
        <img src={engineerIcon} key={i} alt="Engineering Icon" />,
      ];
    }
    if (props.ditchText)
      return (
        <div className={classes.engineering}>
          <p>{icons.map((icon) => icon)}</p>
        </div>
      );
    return (
      <div className={classes.engineering}>
        <p>
          <span>Engineering Level:</span> {icons.map((icon) => icon)}
        </p>
      </div>
    );
  }
};
