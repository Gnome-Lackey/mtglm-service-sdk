import { ScryfallSetView } from "src/models/Views";
import { ScryfallSetNode } from "src/models/Nodes";

export const toSetView = (data: ScryfallSetNode): ScryfallSetView => ({
  id: data.id,
  name: data.name,
  releasedOn: data.released_at,
  cardCount: data.card_count,
  code: data.code
});
