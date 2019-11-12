/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUsers
// ====================================================

export interface FetchUsers_user {
  __typename: "User";
  name: string;
}

export interface FetchUsers {
  user: (FetchUsers_user | null)[];
}
