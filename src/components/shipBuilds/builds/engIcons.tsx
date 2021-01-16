import { makeStyles } from '@material-ui/core';
import engineerIcon from 'assets/shipBuilds/Engineer_icon.svg';

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

export const EngIcons = (props: { engLevel: number }) => {
  const classes = useStyles();
  let icons: JSX.Element[] = [];
  if (props.engLevel > 3 || props.engLevel < 1) {
    return (
      <div className={classes.engineering}>
        <p>Engineering Level: None</p>
      </div>
    );
  } else {
    for (let i = 1; i <= props.engLevel; i++) {
      icons = [
        ...icons,
        <img src={engineerIcon} key={i} alt="Engineering Icon" />,
      ];
    }
    return (
      <div className={classes.engineering}>
        <p>
          <span>Engineering Level:</span> {icons.map((icon) => icon)}
        </p>
      </div>
    );
  }
};
