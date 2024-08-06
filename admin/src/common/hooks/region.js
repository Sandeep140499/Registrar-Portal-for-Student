import { useQuery } from "@tanstack/react-query";
import {
  get_city_by_id,
  get_country,
  get_state_by_id,
} from "../../api/services/region";
import { KEYS } from "../../api/handlers";

const UseRegion = (props) => {
  const { countryId, stateId } = props;
  const cId = countryId ?? "";
  const sId = stateId ?? "";
  const {
    data: stateData,
    isLoading: stateLoading,
    refetch: stateRefetch,
  } = useQuery({
    queryKey: [KEYS.STATE, cId],
    queryFn: () => get_state_by_id(cId),
    enabled: !!cId,
  });

  const {
    data: cityData,
    isLoading: cityLoading,
    refetch: cityRefetch,
  } = useQuery({
    queryKey: [KEYS.CITY, sId],
    queryFn: () => get_city_by_id(sId),
    enabled: !!sId,
  });

  const {
    data: countryData,
    isLoading: countryLoading,
    refetch: countryRefetch,
  } = useQuery({
    queryKey: [KEYS.COUNTRY],
    queryFn: get_country,
  });

  return {
    stateData,
    stateLoading,
    stateRefetch,
    countryData,
    countryLoading,
    countryRefetch,
    cityData,
    cityLoading,
    cityRefetch,
  };
};

export default UseRegion;
