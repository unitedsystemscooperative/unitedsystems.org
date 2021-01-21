import { useLoginAnon } from 'hooks/useLoginAnon';
import { useSnackbar } from 'notistack';

export const LoginAnon = () => {
  const { enqueueSnackbar } = useSnackbar();

  try {
    useLoginAnon();
  } catch (e) {
    enqueueSnackbar('Unable to login for database', { variant: 'error' });
  }

  return <></>;
};
