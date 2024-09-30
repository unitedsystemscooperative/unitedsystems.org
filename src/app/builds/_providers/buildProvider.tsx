import { EDSpinner } from '@/app/_components/_common/spinner';
import { ConfirmDialog } from '@/app/_components/confirmDialog';
import { BuildDialog, BuildDialogProps } from '@/app/builds/_components/dialog/buildDialog';
import { getShipInfofromID } from '@/app/builds/_functions/getShipInfo';
import { useShipBuilds } from '@/app/builds/_hooks/useShipBuilds';
import { IBuildInfov2 } from '@/app/builds/_models';
import { useSnackbar } from 'notistack';
import { createContext, ReactNode, useContext, useState } from 'react';
import {
  AddBuildFunction,
  EditorDeleteFunction,
  FindBuildandShipInfoFunc,
  IBuildContext,
} from '../_models/action-models';

const findBuildandShipInfo: FindBuildandShipInfoFunc = (
  buildId: string,
  builds: IBuildInfov2[]
) => {
  const build = builds.find((x) => x._id === buildId);

  if (build) {
    return { build, shipInfo: getShipInfofromID(build.shipId)! };
  } else {
    return null;
  }
};

export const BuildContext = createContext<IBuildContext | undefined>(undefined);

export const useBuildService = () => useContext(BuildContext);

export const BuildContextProvider = ({
  children,
  init,
}: {
  children: ReactNode;
  init?: IBuildInfov2[];
}) => {
  const {
    shipBuilds,
    loading: isLoading,
    error,
    addBuild,
    updateBuild,
    deleteBuild,
  } = useShipBuilds(init);
  const { enqueueSnackbar } = useSnackbar();
  const [showDeleteDialog, setShowDeleteDialog] = useState<IBuildInfov2 | undefined>(undefined);

  const handleDialogClose = async (newBuild?: IBuildInfov2) => {
    if (newBuild) {
      try {
        if (newBuild._id) await updateBuild(newBuild);
        else await addBuild(newBuild);

        setDialogProps((prev) => ({
          ...prev,
          open: false,
          addType: undefined,
          refId: undefined,
          build: undefined,
        }));
        enqueueSnackbar('Build successfully submitted', { variant: 'success' });
      } catch (e) {
        enqueueSnackbar(`Submit Failed: ${e.message}`, { variant: 'error' });
        console.error(e);
      }
    } else {
      setDialogProps((prev) => ({
        ...prev,
        open: false,
        addType: undefined,
        refId: undefined,
        build: undefined,
      }));
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
  const handleEditBuild: EditorDeleteFunction = (build: IBuildInfov2) => {
    setDialogProps((prev) => ({
      ...prev,
      build,
      open: true,
    }));
  };
  const handleDeleteBuild: EditorDeleteFunction = (build: IBuildInfov2) => {
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
    builds: shipBuilds ?? [],
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
        <BuildDialog builds={shipBuilds ?? []} {...dialogProps} />
        <ConfirmDialog
          title="Delete"
          open={showDeleteDialog !== undefined}
          onClose={() => setShowDeleteDialog(undefined)}
          onConfirm={() => confirmDelete(showDeleteDialog!)}>
          Are you sure you want to delete build '{showDeleteDialog?.title}'?
        </ConfirmDialog>
      </>
    </BuildContext.Provider>
  );
};
