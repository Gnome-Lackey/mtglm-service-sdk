import { AttributeType } from "aws-sdk/clients/cognitoidentityserviceprovider";

export const getAttributeByName = (name: string, attrs: AttributeType[]): string =>
  attrs.find((attr) => attr.Name === name).Value;
