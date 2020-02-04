import {
  ErrorResponse,
  RecordResponse,
  RecordDetailsResponse,
  MatchResponse,
  MatchDetailsResponse,
  SeasonResponse,
  SeasonDetailsResponse,
  SuccessResponse,
  LoginResponse,
  AuthResponse,
  PlayerResponse,
  PlayerDetailsResponse,
  PlayerRoleResponse
} from "../models/Responses";

import { ScryfallCardView, ScryfallSetView } from "../models/Views";

export function logSuccess(resource: string, event: string, data: AuthResponse): void;
export function logSuccess(resource: string, event: string, data: LoginResponse): void;
export function logSuccess(resource: string, event: string, data: MatchResponse): void;
export function logSuccess(resource: string, event: string, data: MatchResponse[]): void;
export function logSuccess(resource: string, event: string, data: MatchDetailsResponse): void;
export function logSuccess(resource: string, event: string, data: MatchDetailsResponse[]): void;
export function logSuccess(resource: string, event: string, data: PlayerResponse): void;
export function logSuccess(resource: string, event: string, data: PlayerResponse[]): void;
export function logSuccess(resource: string, event: string, data: PlayerRoleResponse): void;
export function logSuccess(resource: string, event: string, data: PlayerRoleResponse[]): void;
export function logSuccess(resource: string, event: string, data: PlayerDetailsResponse): void;
export function logSuccess(resource: string, event: string, data: PlayerDetailsResponse[]): void;
export function logSuccess(resource: string, event: string, data: RecordResponse): void;
export function logSuccess(resource: string, event: string, data: RecordResponse[]): void;
export function logSuccess(resource: string, event: string, data: RecordDetailsResponse): void;
export function logSuccess(resource: string, event: string, data: RecordDetailsResponse[]): void;
export function logSuccess(resource: string, event: string, data: ScryfallCardView): void;
export function logSuccess(resource: string, event: string, data: ScryfallCardView[]): void;
export function logSuccess(resource: string, event: string, data: ScryfallSetView): void;
export function logSuccess(resource: string, event: string, data: ScryfallSetView[]): void;
export function logSuccess(resource: string, event: string, data: SeasonResponse): void;
export function logSuccess(resource: string, event: string, data: SeasonResponse[]): void;
export function logSuccess(resource: string, event: string, data: SeasonDetailsResponse): void;
export function logSuccess(resource: string, event: string, data: SeasonDetailsResponse[]): void;
export function logSuccess(resource: string, event: string, data: SuccessResponse): void;
export function logSuccess(resource: string, event: string, data: any): void {
  console.log(`Success: ${resource.toUpperCase()} ${event}`);
  console.log(`\t> ${data ? JSON.stringify(data) : "Passed"}`);
}

export const logFailure = (resource: string, event: string, reason: ErrorResponse): void => {
  console.log(`Failure: ${resource.toUpperCase()} ${event}`);
  console.log(`\t> ${reason ? JSON.stringify(reason) : "Failed"}`);
};
