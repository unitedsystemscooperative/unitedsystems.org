import { IRealmContext } from 'models/realmContext';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Realm from 'realm-web';

export const RealmAppContext = createContext<IRealmContext | null>(null);

export const RealmAppProvider = (props: {
  appId: string | undefined;
  children: ReactNode;
}) => {
  const { appId, children } = props;
  if (appId === undefined) {
    throw new Error('appId is not defined');
  }
  const [app, setApp] = useState(new Realm.App(appId));
  const history = useHistory();

  useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);

  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  const logInAnon = async () => {
    await app.logIn(Realm.Credentials.anonymous());
    setCurrentUser(app.currentUser);
  };

  const logInEmail = async (email: string, password: string) => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      const user: Realm.User = await app.logIn(credentials);
      if (user.id === app.currentUser?.id) {
        console.log('logged in as', currentUser);
        setCurrentUser(app.currentUser);
      } else {
        throw new Error('Failed to login');
      }
    } catch (err) {
      throw new Error(`Failed to login: ${err}`);
    }
  };

  const logOut = async () => {
    // Log out the currently active user
    await app.currentUser?.logOut();
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    setCurrentUser(app.currentUser);
    history.push('/login');
  };

  const requestPasswordReset = async (email: string) => {
    await app.emailPasswordAuth.sendResetPasswordEmail(email);
  };

  const completePasswordReset = async (
    token: string,
    tokenId: string,
    newPass: string
  ) => {
    try {
      await app.emailPasswordAuth.resetPassword(token, tokenId, newPass);
    } catch (err) {
      throw new Error(`Failed to reset password: ${err}`);
    }
  };

  const checkUserProvider = (provider: string): boolean | null => {
    if (currentUser) {
      const matchedProvider = currentUser.identities.find(
        (x) => x.providerType.toLowerCase() === provider.toLowerCase()
      );
      return matchedProvider ? true : false;
    } else {
      return null;
    }
  };

  const wrapped = {
    app,
    currentUser,
    logInEmail,
    logInAnon,
    logOut,
    requestPasswordReset,
    completePasswordReset,
    checkUserProvider,
  };
  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
