import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import { useCallback } from "react";
import { getRooms, setRoom } from "../../actions";



export function useGetRooms(){
    const dispatch = useDispatch();
    let { rooms, pick } = useSelector(state => ({
        rooms: state.growRooms.rooms,
        pick: state.growRooms.roomIndex

    }), shallowEqual)

    const boundAction = useCallback(() => {
        return dispatch(getRooms())
    }, [dispatch]);

    useEffect(() => {
        if (rooms === undefined || rooms[0].stage === "loading") {
            boundAction();
        }
    }, [boundAction, rooms])

    //check if data has loaded and if not display loading text
    if (rooms === undefined || rooms.length === 0) {
        console.log("loading Room data")
        rooms = [
            {
                name: "Loading rooms",
                tempSetPoint: 72,
                humiditySetPoint: 44,
                CO2SetPoint: 3000,
                pressureSetPont: 1114,
                stage: "loading",
                dateStarted: 1597017600,
                CloneTime: 864000,
                VegTime: 3024000,
                FlowerTime: 2419200,
            },
        ]
        pick = 0;
    }

    return {
        rooms,
        getRooms:boundAction,
        pick,
        error
    }
}