import { Button, Paper, styled, Typography } from '@mui/material';
import { IInfoButton } from 'models/information/infoButtonModel';
import NextLink from 'next/link';

const SpecialButton = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ButtonList = styled('div')(({ theme }) => ({
  '& a': {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  [theme.breakpoints.down('lg')]: {
    display: 'grid',
    gridTemplateRows: 'auto',
    '& a': {
      marginRight: theme.spacing(0),
    },
  },
}));

/** Interface for Info Section Props */
interface ISectionProps {
  /** id of section */
  id: string;
  /** header to display */
  header: string;
  /** Buttons to display */
  buttons: IInfoButton[];
}

/**
 * Displays an info Section set of buttons
 * @param props id, header, and button array.
 */
export const InfoSection = (props: ISectionProps) => {
  const { id, header, buttons } = props;

  return (
    <Paper id={id} sx={{ mb: 1, p: 1, textAlign: 'center' }}>
      <Typography variant="h4">{header}</Typography>
      <div style={{ display: 'grid', gridTemplateRows: 'auto' }}>
        <ButtonList>
          {buttons
            .filter((x) => x.beginner === true)
            .map((guide) => {
              return guide.local ? (
                <NextLink
                  href={`/information/${guide.link}`}
                  key={guide.title}
                  passHref
                >
                  <Button
                    variant="outlined"
                    color={guide.beginner ? 'secondary' : 'primary'}
                  >
                    <SpecialButton>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </SpecialButton>
                  </Button>
                </NextLink>
              ) : (
                <Button
                  variant="outlined"
                  color={guide.beginner ? 'secondary' : 'primary'}
                  href={`${guide.link}`}
                  key={guide.title}
                >
                  <SpecialButton>
                    <Typography>{guide.title}</Typography>
                    <Typography variant="caption">{guide.caption}</Typography>
                  </SpecialButton>
                </Button>
              );
            })}
        </ButtonList>
        <ButtonList>
          {buttons
            .filter((x) => x.beginner === false)
            .map((guide) => {
              return guide.local ? (
                <NextLink
                  href={`/information/${guide.link}`}
                  key={guide.title}
                  passHref
                >
                  <Button
                    variant="outlined"
                    color={guide.beginner ? 'secondary' : 'primary'}
                  >
                    <SpecialButton>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </SpecialButton>
                  </Button>
                </NextLink>
              ) : (
                <Button
                  variant="outlined"
                  color={guide.beginner ? 'secondary' : 'primary'}
                  href={`${guide.link}`}
                  key={guide.title}
                >
                  <SpecialButton>
                    <Typography>{guide.title}</Typography>
                    <Typography variant="caption">{guide.caption}</Typography>
                  </SpecialButton>
                </Button>
              );
            })}
        </ButtonList>
      </div>
    </Paper>
  );
};
