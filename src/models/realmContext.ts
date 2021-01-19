export interface IRealmContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: Realm.User<globalThis.Realm.DefaultFunctionsFactory, any> | null;
  logInAnon: () => Promise<void>;
  logInEmail: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  completePasswordReset: (
    token: string,
    tokenId: string,
    newPass: string
  ) => Promise<void>;
  checkUserProvider: (provider: string) => boolean | null;
  app: Realm.App | undefined;
}
