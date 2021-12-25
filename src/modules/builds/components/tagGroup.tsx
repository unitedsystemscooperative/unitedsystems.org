import { IBuildInfov2 } from '@@/builds/models';
import { Box, Chip } from '@mui/material';

export const TagGroup = (props: { build: IBuildInfov2 }) => {
  const { build } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        m: 1,
        '& div': { mr: 1, mb: 1 },
      }}>
      {build.specializations.map((v) => (
        <Chip label={v} key={v} />
      ))}
      {build.hasGuardian && <Chip label="Guardian" key="guardian" />}
      {build.hasPowerplay && <Chip label="PowerPlay" key="powerplay" />}
      {build.isBeginner && <Chip label="Beginner" key="beginner" color="secondary" />}
    </Box>
  );
};
