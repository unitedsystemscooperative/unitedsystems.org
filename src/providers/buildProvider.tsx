import { BuildDialog, BuildDialogProps } from 'components/builds/dialog/buildDialog';
import { ConfirmDialog } from 'components/confirmDialog';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { IBuildInfov2, IShipInfo } from 'models/builds';
import { useSnackbar } from 'notistack';
import { createContext, ReactNode, useState } from 'react';
import { getShipInfofromID } from 'functions/builds/getShipInfo';

/**
 * Add Build Function. Used in the Build Provider to trigger the dialog.
 *
 * Type made to standardize the function.
 */
export type AddBuildFunction = (addType?: 'related' | 'variant', refId?: string) => void;

interface IBuildContext {
  builds: IBuildInfov2[];
  areBuildsLoading: boolean;
  buildError?: { message: string };
  addBuild: AddBuildFunction;
  editBuild: (build: IBuildInfov2) => void;
  deleteBuild: (build: IBuildInfov2) => void;
  getShipInfofromId: (id: string) => IShipInfo;
}

export const BuildContext = createContext<IBuildContext | null>(null);

export const BuildContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    shipBuilds,
    loading: isLoading,
    error,
    addBuild,
    addVariant,
    addRelated,
    updateBuild,
    deleteBuild,
  } = useShipBuilds();
  const { enqueueSnackbar } = useSnackbar();
  const [showDeleteDialog, setShowDeleteDialog] = useState<IBuildInfov2 | undefined>(undefined);

  const handleDialogClose = async () => {
    const { build, addType, refId } = dialogProps;
    try {
      if (build._id) {
        await updateBuild(build);
      } else {
        switch (addType) {
          case 'variant':
            if (refId) await addVariant(refId, shipBuilds, build);
            else throw new Error('Build reference ID missing from URL');
            break;
          case 'related':
            if (refId) await addRelated(refId, shipBuilds, build);
            else throw new Error('Build reference ID missing from URL');
            break;
          default:
            await addBuild(build);
            break;
        }
      }
      setDialogProps((prev) => ({ ...prev, open: false, addType: undefined, refId: undefined, build: undefined }));
      enqueueSnackbar('Build successfully submitted', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar(`Submit Failed: ${e.message}`, { variant: 'error' });
      console.error(e);
    }
  };

  const [dialogProps, setDialogProps] = useState<BuildDialogProps>({
    open: false,
    onClose: handleDialogClose,
    builds: shipBuilds,
  });

  const handleAddBuild: AddBuildFunction = (addType?: 'related' | 'variant', refId?: string) => {
    setDialogProps((prev) => ({
      ...prev,
      addType,
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
    getShipInfofromId: getShipInfofromID,
  };

  return (
    <BuildContext.Provider value={wrapper}>
      <>
        {children}
        <BuildDialog {...dialogProps} />
        <ConfirmDialog
          title="Delete"
          open={showDeleteDialog !== undefined}
          onClose={() => setShowDeleteDialog(undefined)}
          onConfirm={() => confirmDelete(showDeleteDialog)}>
          Are you sure you want to delete build '{showDeleteDialog.title}'?
        </ConfirmDialog>
      </>
    </BuildContext.Provider>
  );
};
