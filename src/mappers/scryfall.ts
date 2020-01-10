import { ScryfallSetView, ScryfallCardView } from "../models/Views";
import { ScryfallSetNode, ScryfallCardNode } from "../models/Nodes";
import { ScryfallCardQueryParameters } from "../models/QueryParameters";

export const toCardView = (data: ScryfallCardNode): ScryfallCardView => {
  const [type, subtype] = data.type_line.includes("—")
    ? data.type_line.split(" — ")
    : [data.type_line];

  return {
    id: data.id,
    name: data.name,
    language: data.lang,
    releasedOn: data.released_at,
    image: data.image_uris.normal,
    costs: {
      mana: data.mana_cost,
      converted: data.cmc
    },
    type,
    subtype,
    colors: data.colors,
    identity: data.color_identity,
    set: {
      code: data.set,
      name: data.set_name
    },
    rarity: data.rarity
  };
};

export const toSetView = (data: ScryfallSetNode): ScryfallSetView => ({
  id: data.id,
  name: data.name,
  releasedOn: data.released_at,
  cardCount: data.card_count,
  code: data.code
});

export function toQueryString(map: ScryfallCardQueryParameters): string;
export function toQueryString(map: any): string {
  if (!map) {
    return "";
  }

  const keys = Object.keys(map);
  const query = keys.map((key) => {
    const value: string = map[key];

    switch (key) {
      case "colors":
        return `c=${value}`;
      case "language":
        return `lang=${value}`;
      case "subtype":
        return `-t=${value}`;
      case "type":
        return `t=${value}`;
      case "format":
        return `f=${value}`;
      case "border":
        return `border=${value}`;
      default:
        return "";
    }
  });

  return `q=${query.join("+")}`;
}
