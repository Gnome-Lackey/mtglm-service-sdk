import { ScryfallCardView, ScryfallSetView } from "../models/Views";
import {
  ErrorResponse,
  MatchResponse,
  SeasonResponse,
  SuccessResponse,
  LoginResponse,
  AuthResponse,
  PlayerResponse,
  PlayerRoleResponse
} from "../models/Responses";

export default class MTGLMLogger {
  constructor() {
    Function.prototype.bind(this.success, this);
  }

  success(resource: string, event: string, data: AuthResponse): void;
  success(resource: string, event: string, data: LoginResponse): void;
  success(resource: string, event: string, data: MatchResponse): void;
  success(resource: string, event: string, data: MatchResponse[]): void;
  success(resource: string, event: string, data: PlayerResponse): void;
  success(resource: string, event: string, data: PlayerResponse[]): void;
  success(resource: string, event: string, data: PlayerRoleResponse): void;
  success(resource: string, event: string, data: PlayerRoleResponse[]): void;
  success(resource: string, event: string, data: ScryfallCardView): void;
  success(resource: string, event: string, data: ScryfallCardView[]): void;
  success(resource: string, event: string, data: ScryfallSetView): void;
  success(resource: string, event: string, data: ScryfallSetView[]): void;
  success(resource: string, event: string, data: SeasonResponse): void;
  success(resource: string, event: string, data: SeasonResponse[]): void;
  success(resource: string, event: string, data: SuccessResponse): void;
  success(resource: string, event: string, data: any): void {
    console.log(`Success: ${resource.toUpperCase()} ${event}`);
    console.log(`\t> ${data ? JSON.stringify(data) : "Passed"}`);
  }

  failure = (resource: string, event: string, reason: ErrorResponse): void => {
    console.log(`Failure: ${resource.toUpperCase()} ${event}`);
    console.log(`\t> ${reason ? JSON.stringify(reason) : "Failed"}`);
  };
}
