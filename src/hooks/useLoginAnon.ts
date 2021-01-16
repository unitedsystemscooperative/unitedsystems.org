import { useRealmApp } from './useRealmApp';

export const useLoginAnon = async () => {
  const realm = useRealmApp();
  if (realm.currentUser === null) {
    try {
      await realm.logInAnon();
      console.log(realm.currentUser);
    } catch (_) {
      throw new Error('Unable to login anon');
    }
  }
};
