import { WithOptionalId } from '@/utils/db';

export interface CmdrDialogProps<T> {
  open: boolean;
  values: WithOptionalId<T>[];
  onClose: (value?: WithOptionalId<T>, membersToEdit?: WithOptionalId<T>[]) => void;
}
