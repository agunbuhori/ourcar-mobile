import { Response } from "../../interfaces/Response"
import http from "../http/http"

const useUnitService = () => {

    const getUnits = async (): Promise<Unit[] | undefined> => {
        try {
            const unit = await http.get<Response<Unit[]>>(`/units`)
            return unit.data.data
        } catch (error) {
            console.error(error)
        }
    }

    const getUnit = async (id: number): Promise<Unit | undefined> => {
        try {
            const unit = await http.get<Response<Unit>>(`/units/${id}/maintenance`)
            return unit.data.data
        } catch (error) {
            console.error(error)
        }
    }

    const changeActiveUnit = async (unitId: number) => {
        try {
            const unit = await http.put('/units/change-active-unit', {unit_id: unitId})
        } catch (error) {
            console.error(error)
        }
    }

    const saveKM = async (unitId: number, km: number) => {
        try {
            const unit = await http.put(`/units/${unitId}/change-km`, {km})
        } catch (error) {
            console.error(error)
        }
    }

    const getProgress = async (unitId: number): Promise<MaintenanceItem[] | undefined> => {
        try {
            const progress = await http.get<Response<MaintenanceItem[]>>(`/units/${unitId}/progress`)

            if (progress.data.data) {
                return progress.data.data
            }
        } catch (error) {
            console.error(error)
        }
    }

    return {
        getUnits,
        getUnit,
        changeActiveUnit,
        getProgress,
        saveKM
    }
}

export default useUnitService