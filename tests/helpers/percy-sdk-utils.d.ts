declare module "@percy/sdk-utils" {
  const utils: {
    isPercyEnabled(): Promise<boolean>;
    fetchPercyDOM(): Promise<string>;
    postSnapshot(options: {
      name: string;
      url: string;
      domSnapshot: unknown;
      clientInfo: string;
      environmentInfo: string;
    }): Promise<void>;
  };

  export default utils;
}
