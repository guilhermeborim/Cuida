import { profileUser } from "../queries/auth.queries";

export const useProfileUser = () => {
  const profile = profileUser();

  return profile;
};
