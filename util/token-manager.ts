import Cookies from "cookies-js";
import crypto from "./crypto";
import { LoginResponse } from "@/model/auth";

type TokenData = {
  access_token: string;
  access_token_expire: string;
  refresh_token: string;
  refresh_token_expire: string;
};

export default class Token {
  public static token: TokenData;

  public static saveEncryptToken(payload: LoginResponse): void {
    let expires = new Date(
      new Date().getTime() + payload.access_token_expire * 10000
    );
    Cookies.set(
      "token",
      JSON.stringify(crypto.encrypt(JSON.stringify(payload))),
      {
        expires,
      }
    );
  }

  public static getDescryptToken(): TokenData {
    const decrypt: string = Cookies.get("token");

    if (decrypt) {
      const token = crypto.decrypt(JSON.parse(decrypt));
      this.token = JSON.parse(token);
    }

    return this.token;
  }

  public static removeToken(): boolean {
    try {
      Cookies.expire("token");
      return true;
    } catch (error) {
      return false;
    }
  }

  public static haveToken(): boolean {
    const decrypt: string = Cookies.get("token");
    return decrypt !== undefined;
  }
}
