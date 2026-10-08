import { useQuery } from "@tanstack/react-query";
import { authRequest } from "../api/auth.request";

const profileUser = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authRequest.profile,
  });
};

export { profileUser };
