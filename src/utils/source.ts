import { AttributeMap } from "aws-sdk/clients/dynamodb";

export async function updateConnectedSource(
  source: string[],
  targetId: string,
  handleUpdate: Function
): Promise<AttributeMap[]>;
export async function updateConnectedSource(
  source: string,
  targetId: string,
  handleUpdate: Function
): Promise<AttributeMap>;
export async function updateConnectedSource(
  source: string | string[],
  targetId: string,
  handleUpdate: Function
): Promise<any> {
  if (source) {
    return await handleUpdate(source, targetId);
  }

  return typeof source === "string" ? undefined : [];
}
