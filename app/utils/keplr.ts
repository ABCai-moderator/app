import { Keplr } from "@keplr-wallet/types";

const getKeplrFromWindow = (): Keplr | undefined => {
  if ("keplr" in window) {
    return window.keplr as Keplr;
  }
};
export const getKeplr = () =>
  new Promise<Keplr>((resolve, reject) => {
    let keplr = getKeplrFromWindow();
    if (keplr) {
      return resolve(keplr);
    }

    if (document.readyState === "complete") {
      keplr = getKeplrFromWindow();
      if (keplr) {
        return resolve(keplr);
      }
    }

    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        keplr = getKeplrFromWindow();
        if (keplr) {
          resolve(keplr);
        } else {
          reject(new Error("Keplr not found"));
        }
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
