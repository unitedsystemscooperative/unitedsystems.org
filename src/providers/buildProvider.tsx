import { BuildDialog, BuildDialogProps } from 'components/builds/dialog/buildDialog';
import { ConfirmDialog } from 'components/confirmDialog';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { IBuildInfov2, IShipInfo } from 'models/builds';
import { useSnackbar } from 'notistack';
import { createContext, ReactNode, useState } from 'react';
import { getShipInfofromID } from 'functions/builds/getShipInfo';
import { EDSpinner } from '@admiralfeb/react-components';

/**
 * Add Build Function. Used in the Build Provider to trigger the dialog.
 *
 * Type made to standardize the function.
 */
export type AddBuildFunction = (refId?: string) => void;
export type FindBuildandShipInfoFunc = (
  buildId: string,
  builds?: IBuildInfov2[]
) => { build: IBuildInfov2; shipInfo: IShipInfo } | null;

const findBuildandShipInfo: FindBuildandShipInfoFunc = (buildId: string, builds: IBuildInfov2[]) => {
  const build = builds.find((x) => x._id.toString() === buildId);

  if (build) {
    return { build, shipInfo: getShipInfofromID(build.shipId) };
  } else {
    return null;
  }
};

interface IBuildContext {
  builds: IBuildInfov2[];
  areBuildsLoading: boolean;
  buildError?: { message: string };
  addBuild: AddBuildFunction;
  editBuild: (build: IBuildInfov2) => void;
  deleteBuild: (build: IBuildInfov2) => void;
  findBuildandShipInfo: FindBuildandShipInfoFunc;
}

export const BuildContext = createContext<IBuildContext | null>(null);

export const BuildContextProvider = ({ children, init }: { children: ReactNode; init?: IBuildInfov2[] }) => {
  const { shipBuilds, loading: isLoading, error, addBuild, updateBuild, deleteBuild } = useShipBuilds(init);
  const { enqueueSnackbar } = useSnackbar();
  const [showDeleteDialog, setShowDeleteDialog] = useState<IBuildInfov2 | undefined>(undefined);

  const handleDialogClose = async () => {
    const { build } = dialogProps;
    if (build) {
      try {
        if (build._id) await updateBuild(build);
        else await addBuild(build);

        setDialogProps((prev) => ({ ...prev, open: false, addType: undefined, refId: undefined, build: undefined }));
        enqueueSnackbar('Build successfully submitted', { variant: 'success' });
      } catch (e) {
        enqueueSnackbar(`Submit Failed: ${e.message}`, { variant: 'error' });
        console.error(e);
      }
    } else {
      setDialogProps((prev) => ({ ...prev, open: false, addType: undefined, refId: undefined, build: undefined }));
    }
  };

  const [dialogProps, setDialogProps] = useState<Omit<BuildDialogProps, 'builds'>>({
    open: false,
    onClose: handleDialogClose,
  });

  const handleAddBuild: AddBuildFunction = (refId?: string) => {
    setDialogProps((prev) => ({
      ...prev,
      refId,
      open: true,
    }));
  };
  const handleEditBuild = (build: IBuildInfov2) => {
    setDialogProps((prev) => ({
      ...prev,
      build,
      open: true,
    }));
  };
  const handleDeleteBuild = (build: IBuildInfov2) => {
    setShowDeleteDialog(build);
  };
  const handleFindBuildandShipInfo: FindBuildandShipInfoFunc = (buildId: string) => {
    return findBuildandShipInfo(buildId, shipBuilds);
  };

  const confirmDelete = async (build: IBuildInfov2) => {
    setShowDeleteDialog(undefined);
    await deleteBuild(build._id.toString(), build.authorId);
  };

  const wrapper: IBuildContext = {
    builds: shipBuilds,
    areBuildsLoading: isLoading,
    buildError: error,
    addBuild: handleAddBuild,
    editBuild: handleEditBuild,
    deleteBuild: handleDeleteBuild,
    findBuildandShipInfo: handleFindBuildandShipInfo,
  };

  if (isLoading) {
    return <EDSpinner />;
  }

  return (
    <BuildContext.Provider value={wrapper}>
      <>
        {children}
        <BuildDialog builds={shipBuilds} {...dialogProps} />
        <ConfirmDialog
          title="Delete"
          open={showDeleteDialog !== undefined}
          onClose={() => setShowDeleteDialog(undefined)}
          onConfirm={() => confirmDelete(showDeleteDialog)}>
          Are you sure you want to delete build '{showDeleteDialog?.title}'?
        </ConfirmDialog>
      </>
    </BuildContext.Provider>
  );
};
