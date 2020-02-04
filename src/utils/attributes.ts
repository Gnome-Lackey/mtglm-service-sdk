import { AttributeType } from "aws-sdk/clients/cognitoidentityserviceprovider";

export const getAttributeByName = (name: string, attrs: AttributeType[]): string => {
  const attribute = attrs.find((attr) => attr.Name === name);

  return attribute ? attribute.Value : "";
};
