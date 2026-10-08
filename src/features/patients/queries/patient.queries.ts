import { useQuery } from "@tanstack/react-query";
import { patientRequest } from "../api/patient.request";

const FindAllByUser = () => {
  return useQuery({
    queryKey: ["findAllByUser"],
    queryFn: patientRequest.findAllByUser,
  });
};

export { FindAllByUser };
