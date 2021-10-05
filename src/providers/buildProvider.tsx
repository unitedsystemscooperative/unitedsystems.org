import { BuildDialog } from 'components/builds/dialog/buildDialog';
import { useShipBuildMutations } from 'hooks/builds/useShipBuildMutations';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { IBuildInfov2 } from 'models/builds';
import { useSession } from 'next-auth/client';
import { useSnackbar } from 'notistack';
import { createContext, ReactNode, useState } from 'react';

interface IBuildContext {
  builds: IBuildInfov2[];
  areBuildsLoading: boolean;
  buildError?: { message: string };
  addBuild: (addType?: 'related' | 'variant', refId?: string) => void;
  editBuild: (build: IBuildInfov2) => void;
  deleteBuild: (id: string, authorId?: string) => Promise<void>;
}

export const BuildContext = createContext<IBuildContext | null>(null);

export const BuildContextProvider = ({ children }: { children: ReactNode }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [buildToEdit, setBuildtoEdit] = useState<IBuildInfov2 | undefined>(undefined);

  const { shipBuilds, loading: isLoading, error, addBuild } = useShipBuilds();
  const { updateBuild, deleteBuild } = useShipBuildMutations();
  const { enqueueSnackbar } = useSnackbar();
  const session = useSession();

  const handleAddBuild = (addType?: 'related' | 'variant', refId?: string) => {
    return;
  };
  const handleEditBuild = (build: IBuildInfov2) => {
    setBuildtoEdit(build);
    setShowDialog(true);
  };
  const handleDeleteBuild = async (id: string, authorId?: string) => {
    await deleteBuild(id, authorId);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const wrapper: IBuildContext = {
    builds: shipBuilds,
    areBuildsLoading: isLoading,
    buildError: error,
    addBuild: handleAddBuild,
    editBuild: handleEditBuild,
    deleteBuild: handleDeleteBuild,
  };

  return (
    <BuildContext.Provider value={wrapper}>
      <>
        {children}
        <BuildDialog open={showDialog} onClose={handleCloseDialog} build={buildToEdit} builds={shipBuilds} />
      </>
    </BuildContext.Provider>
  );
};
