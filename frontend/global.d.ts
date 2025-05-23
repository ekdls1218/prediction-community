export {};

declare global {
  interface Window {
    daum: {
      Postcode: new (options: unknown) => {
        open: () => void;
      };
    };
  }
}