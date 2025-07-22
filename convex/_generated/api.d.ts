/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as tables_penggunaan from "../tables/penggunaan.js";
import type * as tables_tagihan from "../tables/tagihan.js";
import type * as tables_tarif from "../tables/tarif.js";
import type * as tables_user from "../tables/user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "tables/penggunaan": typeof tables_penggunaan;
  "tables/tagihan": typeof tables_tagihan;
  "tables/tarif": typeof tables_tarif;
  "tables/user": typeof tables_user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
