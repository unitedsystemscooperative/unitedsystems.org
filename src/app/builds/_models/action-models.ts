import { IBuildInfov2 } from './buildInfo';
import { IShipInfo } from './shipInfo';

/**
 * Add Build Function. Used in the Build Provider to trigger the dialog.
 */
export type AddBuildFunction = (refId?: string) => void;
export type EditorDeleteFunction = (build: IBuildInfov2) => void;

export type FindBuildandShipInfoFunc = (
  buildId: string,
  builds?: IBuildInfov2[]
) => { build: IBuildInfov2; shipInfo: IShipInfo } | null;

export type IBuildContext = {
  builds: IBuildInfov2[];
  areBuildsLoading: boolean;
  buildError?: { message: string };
  addBuild: AddBuildFunction;
  editBuild: EditorDeleteFunction;
  deleteBuild: EditorDeleteFunction;
  findBuildandShipInfo: FindBuildandShipInfoFunc;
};
